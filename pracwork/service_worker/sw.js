//Service worker 是一段脚本，它有能力往我们的浏览器中写入缓存，过滤网络请求，将缓存内容作为网络响应结果输出。

//app内的js注册
if ('serviceWorker' in navigator) {
    //注册站点的serviceWorker  参数1是相对于origin的一个SW驻在项目内的js文件的url; 参数2 scope可选，指定SW可控制的子目录；
    navigator.serviceWorker.register('/sw-test/sw.js', { scope: '/sw-test/' }).then(function(reg) {
        // 这就注册了一个 service worker，它工作在 worker context，所以没有访问 DOM 的权限。在正常的页面之外运行 service worker 的代码来控制它们的加载。
      if(reg.installing) {
        console.log('Service worker installing');
      } else if(reg.waiting) {
        console.log('Service worker installed');
      } else if(reg.active) {
        console.log('Service worker active');
      }
  
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  }

//相对于origin的js文件
// 安装并激活
this.addEventListener('install', function(event) {
    event.waitUntil( //waitUntil指在内部的存完之后才会安装完成
      caches.open('v1').then(function(cache) { //创建了一个叫做 v1 的新的缓存，
          //SW的全局存储API：cache，存储响应的资源，同时生成相应的key值（在特定的域内会一直存在，除非自己操作）
        return cache.addAll([ //addAll()，这个方法的参数是一个由一组相对于 origin 的 URL 组成的数组，这些 URL 就是你想缓存的资源的列表。
          '/sw-test/',
          '/sw-test/index.html',
        //   ...
        ]);
      })
    );
  });

  this.addEventListener('fetch', function(event) {  //每次资源请求到时会触发fetch方法
    event.respondWith(      //劫持http响应
      caches.match(event.request)
            .then(function(response) { //响应回 缓存中能够匹配(相应请求)的资源,如果缓存内有则取缓存的
                if (response !== undefined) {
                    return response;      //如果有匹配则返回
                } else {                //如果没有匹配 择去请求
                    return fetch(event.request).then(function (response) {
                                //同时对请求到的资源进行 put到cache中存储
                                let responseClone = response.clone();
                                
                                caches.open('v1').then(function (cache) {
                                    cache.put(event.request, responseClone);
                                });
                                return response;
                            })
                }
            })   
    ).catch(function () {
        //如果离线，请求不到相应的资源，则返回cache中指定的资源
        return caches.match('/sw-test/gallery/myLittleVader.jpg');
    });
  });

  //清理操作：在新的存储版本激活前，清除掉旧的版本
  this.addEventListener('activate', function(event) {
    var cacheWhitelist = ['v2'];    //1 现在版本中要存的东西 '/sw-test/','/sw-test/index.html',
  
    event.waitUntil(
      caches.keys().then(function(keyList) {
        //2 keyList： 已经存储在内存中的{}，
        return Promise.all(keyList.map(function(key) {
          if (cacheWhitelist.indexOf(key) === -1) { //cache内每次存的版本是相互独立的，如果不是当前要激活的版本，就删掉
            return caches.delete(key);  //3 如果有内存里有旧的则删掉
          }
        }));
      })
    );
  });



  //sw-pracache-webpack-plugin
  Plugin:[
    new SWPrecacheWebpackPlugin({
      filename:'service-worker.js', //default
      filepath: webpack.output.path + options.filename, //default
      staticFileGlobsIgnorePatterns:[/\.map$/], //过滤掉的
      minify:false,//default
      cacheId:'',
      mergeStaticsConfig:true,  // if you don't set this to true, you won't see any webpack-emitted assets in your serviceworker config
      // stripPrefix:'',
      importScripts:[]
    })
  ]

//https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#clientsclaim
  // NOTE:WorkboxPlugin.GenerateSW 能够根据webpack 生成缓存相应文件的sw，
    // Workbox revisions each file based on its contents，应该放到最后一个plugin
    new WorkboxPlugin.GenerateSW({
      swDest:'sw.js', //! 以output.path为基础
      dontCacheBustUrlsMatching: /\.\w{8}\./,  //! 建议如果您现有的构建流程已经将[散列]值插入到每个文件名中，那么您将提供一个RegExp，它将检测这些值，因为它将减少预缓存时消耗的带宽。
      importWorkboxFrom:'cdn', //'local''disable'  //默认使用cdn上的Workbox runtime libraries；local可生成与自己目录下
      chunks:['chunk-name-1',],//预先缓存
      excludeChunks:[],//预缓存黑名单
      include: [/\.html$/, /\.js$/],// Only include HTML and JS assets when precaching:
      exclude:[/\.jpg$/, /\.png$/], //!
      importsDirectory: 'wb-assets', // 更改欲缓存清单输出目录 Use a 'wb-assets' directory for Workbox's assets,// under the top-level output directory.
      precacheManifestFilename: 'wb-manifest.[manifestHash].js',
      navigateFallback: '/app-shell',
      navigateFallbackBlacklist: [/^\/_/, /admin/],
      navigateFallbackWhitelist: [/^\/pages/],
      modifyUrlPrefix: {
        // Remove a '/dist' prefix from the URLs:
        '/dist': ''
      },
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,// Increase the limit to 4mb: 此值可用于确定预缓存的文件的最大大小。这将防止您无意中预缓存非常大的文件，
      globStrict: false, // 默认true,在生成预缓存清单时读取目录的错误将导致构建失败。如果错误，将跳过有问题的目录。
      cacheId: 'my-app', //! 对于本地开发非常有用
      directoryIndex: 'index.html',  //!  匹配这种的'/'
      ignoreUrlParametersMatching: [/./],  // ! 

      clientsClaim: true, //!是否 在激活后立刻开始控制,控制未控制的页面 .默认false 
      skipWaiting: true, //! 是否跳过 waiting 这个生命周期，指安装完成后立即激活，默认false，
      runtimeCaching: [{
        // Match any same-origin request that contains 'api'.
        urlPattern: /api/,
        // Apply a network-first strategy.
        handler: 'networkFirst',
        options: {
          // Fall back to the cache after 10 seconds.
          networkTimeoutSeconds: 10,
          // Use a custom cache name for this route.
          cacheName: 'my-api-cache',
          // Configure custom cache expiration.
          expiration: {
            maxEntries: 5,
            maxAgeSeconds: 60,
          },
          // Configure which responses are considered cacheable.
          cacheableResponse: {
            statuses: [0, 200],
            headers: {'x-test': 'true'},
          },
          // Configure the broadcast cache update plugin.
          broadcastUpdate: {
            channelName: 'my-update-channel',
          },
          // Add in any additional plugin logic you need.
          plugins: [
            {cacheDidUpdate: () => /* custom plugin code */}
          ],
        },
      }, {
        // To match cross-origin requests, use a RegExp that matches
        // the start of the origin:
        urlPattern: new RegExp('^https://cors\.example\.com/'),
        handler: 'staleWhileRevalidate',
        options: {
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }]
    })