// array
uniq() // 创建一个不重复的数组副本
_uniq([2,1,2,3])
    [2,1,3]
_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
    // => [{ 'x': 1 }, { 'x': 2 }]
_.take(array, [n=1]) // 从数组的起始位置开始提取N个元素
    _.take([1,2,3,4]) // [1]
    _.take([1,2,3,4,5], 3) // [1,2,3]
_.tail([1, 2, 3]);
    // => [2, 3]
_.initial([1, 2, 3]);
    // => [1, 2]
pull() //   移除经过SameValueZero等值比较为true的元素，返回移除后的数组本身
    var array = [1, 2, 3, 1, 2, 3];
    _.pull(array, 2, 3);
    // => [1, 1]
    _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
    _.pullAll(array, [2, 3]);
remove() // 改变原数组
    var array = [1, 2, 3, 4];
    var evens = _.remove(array, function(n) {
      return n % 2 == 0;
    });
    console.log(array); // => [1, 3]
    console.log(evens); // => [2, 4]
drop(array, [n=1]) // 裁剪数组中的前n个，返回剩余的部分
    _.drop([1,2,3]); // => [2,3]
compact() // 移除数组中的所有假值，0、null、undefined、false、‘’、NaN
    _.compact([2,0,3,''])
    // => [2,3]
    
    
    
    

// collection
keyBy() 
var array = [
    { 'dir': 'left', 'code': 97 },
    { 'dir': 'right', 'code': 100 }
  ];
_.keyBy(array,'dir')
    {'left': { 'dir': 'left', 'code': 97 },
    'right': { 'dir': 'right', 'code': 100 }}

groupBy()
_.groupBy([6.1,4.2,6.3], Math.floor);
    {'4': [4.2],
    '6': [6.1, 6.3]}
sortBy() //以处理的结果稳定升序排序
_.sortBy(users, 'user', function(o) {
    return Math.floor(o.age / 10);
  });
    // => 排序结果 [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
orderBy(collection, [iteratees=[_.identity]],[orders]) // 如果没指定orders，以升序排序，如果指定‘desc’降序；指定‘asc'升序
    // 以 `user` 升序排序 再 以 `age` 降序排序。
    _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
    // => 结果: [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
filter() 
reject() // filter()的反向；取非真值的元素
sample() // 随机取个元素
    _.sample([1, 2, 3, 4]);
    // => 2

// function
debounce() // 返回具有防抖函数
    window.on('resize', _.debounce(calculateLayout, 150))
    window.on('popstate', debounced.cancel) // 取消一个防抖
delay(func, wait, [args])
  _.delay( text => console.log(text), 1000, 'later') //  => 一秒后输出 'later'。
memoize(func, [resolver])
  // 创建一个会缓存func结果的函数。如果提供了resolver，就用resolver的返回值作为key缓存函数的结果，默认情况下是用第一个参数作为缓存的key。
  // func 在调用的时候 this会绑定在缓存函数上。
  // 缓存存在 缓存函数的cache上，是可定制的
  _memoize(func).cache.set() // _memoize(func)结果是个map，便可通过.set()去设置
throttle(func, [wait=0], [options])
  // 创建一个节流函数，在wait内最多执行一次，
  .cancel()// 提供一个cancel方法取消延迟的函数调用，
  .flush() // 提供一个flush方法立即调用
  // 避免在滚动时过分的更新定位
    window.on('scroll', _.throttle(updatePosition, 100));
    // 点击后就调用 `renewToken`，但5分钟内超过1次。
    var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
    element.on('click', throttled);
    // 取消一个 trailing 的节流调用
    window.on('popstate', throttled.cancel);

// Object
assign()
_.assign({ 'a': 1 }, new Foo, new Bar);
    // => { 'a': 1, 'c': 3, 'e': 5 }
defaults()
_.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
    // => { 'user': 'barney', 'age': 36 }

pick()
var object = { 'a': 1, 'b': '2', 'c': 3 };
_.pick(object, ['a', 'c']);
    // => { 'a': 1, 'c': 3 }
omit()
_.omit(object, ['a', 'c']);
    // => { 'b': '2' }

// .result(),默认值可是个执行函数
_.result(object, 'a[0].b.c3', _.constant('default'));
    // => 'default'
_.get(object, 'a.b.c', 'default');
    // => 'default'
_.has(object, 'a.b.c');
    // => true
_.set(object, 'a[0].b.c', 4);
    console.log(object.a[0].b.c);
    // => 4
    
// string
truncate([string=''], [options])  // 截断字符串超过长度的部分
    // options.length;options.omission='...',options.separator=/,?+/
