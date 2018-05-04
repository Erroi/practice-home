//高级组件  https://react.bootcss.com/react/docs/higher-order-components.html
// 方法1 属性代理  props proxy 原始组件作为参数被高级组件调用，使得通过高级组件来传递props，达到原始组件具备高级组件对他的修饰
import React,{Component} from 'React';
const MyContainer = (WrappedComponent) => {
    class extends Component{
        constructor(props){
            super(props);
            this.state = {
                name:''
            }
            this.onNameChange = this.onNameChange.bind(this);
        }

        onNameChange(event){
            this.setState({
                name:event.target.value
            })
        }

        render(){
            const newProps = {
                name:{
                    value:this.state.name,
                    onChange:this.onNameChange,
                }
            }
            return <WrappedComponent {...this.props} {...newProps}/>
        }
    }
}
//把input组件中对name prop的onChange方法提取到高级组件，有效的抽象了同样的state操作。

// 使用
// 得到一个被控制的input组件
@MyContainer
class MyComponent extends Component {
    render(){
        return <input name="name" {...this.props.name}/>
    }
}

//例二
// 函数接受一个组件参数……
function withSubscription(WrappedComponent, selectData) {
    // ……返回另一个新组件……
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          data: selectData(DataSource, props)
        };
      }
  
      componentDidMount() {
        // ……注意订阅数据……
        DataSource.addChangeListener(this.handleChange);
      }
  
      componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange);
      }
  
      handleChange() {
        this.setState({
          data: selectData(DataSource, this.props)
        });
      }
  
      render() {
        // ……使用最新的数据渲染组件
        // 注意此处将已有的props属性传递给原组件
        return <WrappedComponent data={this.state.data} {...this.props} />;
      }
    };
  }

//2 反向继承 高阶组件可以使用WrapedComponent引用，可以使用wrappedComponent的state、props、生命周期render方法。
// 应用1 渲染劫持
const MyContainer = (WrappedComponent) =>{
    class extends WrappedComponent{
        render(){
            if(this.props.loggedIn){
                return super.render();
            }else{
                return null;
            }
        }
    }
    return WrappedComponent;
}

//注意事项
// 不要在高级组件内部修改 元组件的原型属性
function logProps(InputComponent){
    InputComponent.prototype.componentWillReceiveProps(nextProps){
        console.log('Current props:',this.props);
        console.log('Next props:',nextProps);
    }
    return InputComponent;
}
const EnhancedComponent = logProps(InputComponent);  //EnhancedComponent会纪律所有的props属性；

// 不应该修改原组件，高阶组件应该使用组合技术，将input组件包含到容器组件中
function logProps(WrappedComponent){
    return class extends React.Component{
        componentWillReceiveProps(nextProps){
            console.log('Current props:',this.props);
            console.log('next props',nextProps);
        }
        render(){
            //用容器组件组合包裹组件且不修改包裹组件，才是正确的打开方式
            return <WrappedComponent {...this.props}/>;
        }
    }
}

//约定 ： 能够确保高阶组件最大程度的灵活性和可重用性
function logProps(WrappedComponent){
    return class extends React.Component{
        render() {
            // 过滤掉与高阶函数功能相关的props属性，
            // 不再传递
            const { extraProp, ...passThroughProps } = this.props;
          
            // 向包裹组件注入props属性，一般都是高阶组件的state状态
            // 或实例方法
            const injectedProp = someStateOrInstanceMethod;
          
            // 向包裹组件传递props属性
            return (
              <WrappedComponent
                injectedProp={injectedProp}
                {...passThroughProps}
              />
            );
          }
    }
}

// 注意事项2 不要在render函数内使用高阶组件
            // 必须将静态方法做拷贝
            // 高阶组件可以传递所有props属性给包裹的组件，但不能传递refs引用。
  
