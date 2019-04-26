// react-router V4.~
一、拆分三个包：
    react-router: 提供核心的路由组件与函数
    react-router-dom: 提供 浏览器 运行环境所需的特定组件
    react-router-native: 提供 react-native 运行环境所需的特定组件

    我们浏览器只需安装react-router-dom 即可.react-router-dom暴露出react-router中暴露的对象与方法，因此你只需要安装并引用react-router-dom即可.

    达到的要求：每个视图都应该有与之对应的唯一URL用来区分视图；动态生成的嵌套视图更应该有对应的URL，"example.com/products/shoes/101"

二、react-router-dom
<BrowserRouter>
使用的是HTML5的history API记录路由历史
http://example.com/about

<HashRouter>
使用window.localtion.hash记录，可兼容老式浏览器
http://example.com/#/about   

每一个router组件创建了一个history对象，用来记录当前路径（history.location）,上一步也存储在堆栈中。
history.push()      <Link/>  重新渲染视图，不会导致浏览器刷新；
history.replace()    <Redirect/>


三、'/'同时匹配'/'和'/category'。因此，所有路由都匹配并被渲染。我们该如何避免呢？应该给 path='/'的路由传递exact= {true}props：

`<Route exact={true} path="/" component={Home}/>`


##### <Prompt>

> 当离开一个页面的时候，进行的提醒

        <Prompt
        when={true}
        message={'are you sure to leave'}
        message={(location) => location.pathname.startWidth('app') ? true : 'are you sure you want to go to ${lacation.pathname}'}>


#### <Route>

* <Route path='/path' component={React.Element}> 
> 每次render的时候都会创建一个新的component

* <Route path='/path' render={({match, location, history}) => {}}>
> inline rendering,可通过function。。。

* <Route children={({match, location, history}) => (<animate>{match && <something>}</animate>)}>
> 无论路径皮比匹配，总是会渲染，适用于切换页面时的animation

* <Route path='/path' children={({match}) => <li className={match ? 'active' : ''}/> }>
> 路径匹配失败，则match为null,用于动态标注连接



##### withRouter

> 为什么withRouter要包在connect外面： 
    
* 避免更新受阻: 因为react-router的connect高阶组件会为传入的参数组件进行shouldComponentUpdate()钩子函数比较。未防止location被浅比较拦截出去(即使url变化，也无法重新渲染)

> 组件如何拿到location对象

* 直接通过<Route>渲染的组件

        // 当 url 变化时，<Blocker> 的 location 属性一定会变化，通过this.props.location获得
        <Route path='/:place' component={Blocker}/>

        // 不传path属性的<Route>组件，总是会渲染
        <Route component={Blocker}/>

* 使用withRouter高阶组件包裹，会给组件传入location、history、match属性

        const BlockerCom = withRouter(Blocker)

> withRouter()高阶组件的实现源码(抽离简易版)

        const withRouter = (Component) => {
            return <Route
                    children={routeProps => (
                        <Component {...routeProps}/>
                    )}>
        }






