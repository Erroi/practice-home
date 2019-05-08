//避免重复渲染  用属性和值做浅比较
shouldComponentUpdate(){
    return true/false
}

// 只做浅比较，但浅比较会忽略属性或状态突变的情况，此时就不能使用
class extends React.PureComponent{
    //数组不用push，而用concat   扩展运算  assign 返回新的对象
    // words.push('marklar');
    handleClick(){
        prevState.words.concat(['marklar'])

        [...prevState.words, 'marklar']

        Object.assign({}, colormap, {right: 'blue'});
    }
}


// 使用不可突变的数据结构   immutable.js  通过结构共享提供不可突变的持久的集合；
immutable.js
import {is} from 'immutable';
class extends React.Component{
    shouldComponentUpdate(nextProps,nextState){
        for(const key in nextState){
            if(thisState[key] !== nextState[key] || !is(thisState[key],nextState[key])){
                return true;
            }
        }
    }
}


ref
//1 DOM元素添加ref属性时，ref回调接收了底层的DOM元素作为参数，存储DOM节点的引用，访问的是DOM元素
// React 组件在加载时将 DOM 元素传入 ref 的回调函数，在卸载时则会传入 null。
// ref 回调会在componentDidMount 或 componentDidUpdate 这些生命周期回调之前执行。所以对于实现初次渲染便使input获取焦点


//2 为类组件添加ref属性，回调接收的是 已经加载的React实例，
// 如果我们想修改 CustomTextInput 组件，实现它在加载后立即点击的效果：
class AutoFocusTextInput extends React.Component {
    componentDidMount() {
      this.textInput.focusTextInput();
    }
  
    render() {
      return (
        <CustomTextInput
          ref={(input) => { this.textInput = input; }} />
      );
    }
  }

// 3 不能在函数式组件上使用ref属性，因为没有实例；
function MyFunctionalComponent() {
    // 这里必须声明 textInput，这样 ref 回调才可以引用它
    let textInput = null;
    return <input ref={(input) => { textInput = input; }}/>;
  }
  
  class Parent extends React.Component {
    render() {
      // 这里 `ref` 无效！没有这个实例
      return (
        <MyFunctionalComponent
          ref={(input) => { this.textInput = input; }} />
      );
    }
  }


/**
 * Vitual Dom diff
 *  */ 
// 1. tree diff
// 树的分层比较，只会同层级比较，
// 2. component diff
//  可以用 shouldComponentUpdate 判断来节约算法时间
// 3. element diff
// 通过设置唯一key，对element进行优化

// A、不同类型的DOM元素
// 根元素从div变为了span，所以旧的Counter组件将被销毁，然后再重新构建一个新的
// B、相同的DOM元素
// React会先查看两者的属性差异，然后保留相同的底层DOM节点，仅仅去更新那些被更改的属性。
// C、相同类型的组件元素
// 现在React就可以知道key="0"的元素是新的，并且key="1"和key="2"的元素只需移动即可



// 重排reflow：布局、结构、尺寸发生变化；重绘repaint：颜色等发生变化； 重排一定重绘，反之不然。
// 任何改变用来构建渲染树的信息都会导致一次重排或重绘。

// 添加、删除、更新DOM节点

// 通过display: none隐藏一个DOM节点-触发重排和重绘

// 通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有几何变化

// 移动或者给页面中的DOM节点添加动画

// 添加一个样式表，调整样式属性

// 用户行为，例如调整窗口大小，改变字号，或者滚动

// 重绘：当我们对 DOM 的修改导致了样式的变化、却并未影响其几何属性（比如修改了颜色或背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式（跳过了上图所示的回流环节）。
// 回流：当我们对 DOM 的修改引发了 DOM 几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后再将计算的结果绘制出来。这个过程就是回流（也叫重排
// 3）如何减少回流、重绘

// 使用 transform 替代 top
// 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）
// 不要把节点的属性值放在一个循环里当成循环里的变量
// 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
// 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame
// CSS 选择符从右往左匹配查找，避免节点层级过多
// 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点。比如对于 video 标签来说，浏览器会自动将该节点变为图层。



// 浏览器工作流程：构建DOM -> 构建CSSOM -> 构建渲染树 -> 布局 -> 绘制。
// CSSOM会阻塞渲染，只有当CSSOM构建完毕后才会进入下一个阶段构建渲染树。
// 通常情况下DOM和CSSOM是并行构建的，但是当浏览器遇到一个不带defer或async属性的script标签时，DOM构建将暂停，如果此时又恰巧浏览器尚未完成CSSOM的下载和构建，由于JavaScript可以修改CSSOM，所以需要等CSSOM构建完毕后再执行JS，最后才重新DOM构建。


// 基于上面介绍的浏览器渲染原理，DOM 和 CSSOM 结构构建顺序，初始化可以对页面渲染做些优化，提升页面性能。

// JS优化： <script> 标签加上 defer属性 和 async属性 用于在不阻塞页面文档解析的前提下，控制脚本的下载和执行。
// defer属性： 用于开启新的线程下载脚本文件，并使脚本在文档解析完成后执行。
// async属性： HTML5新增属性，用于异步下载脚本文件，下载完毕立即解释执行代码。
// CSS优化： <link> 标签的 rel属性 中的属性值设置为 preload 能够让你在你的HTML页面中可以指明哪些资源是在页面加载完成后即刻需要的,最优的配置加载顺序，提高渲染性能
