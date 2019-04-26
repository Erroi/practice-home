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



// 重排reflow：布局、结构、尺寸发生变化；重绘repaint：颜色等发生变化； 重排一定重绘，反之不然。
// 任何改变用来构建渲染树的信息都会导致一次重排或重绘。

// 添加、删除、更新DOM节点

// 通过display: none隐藏一个DOM节点-触发重排和重绘

// 通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有几何变化

// 移动或者给页面中的DOM节点添加动画

// 添加一个样式表，调整样式属性

// 用户行为，例如调整窗口大小，改变字号，或者滚动
  