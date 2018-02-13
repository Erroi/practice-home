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

每一个router组件创建了一个history对象，用来记录当前路径（history.location）,上一步也存储在
