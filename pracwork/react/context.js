//context 实现层级嵌套组件直接的数据传递

//最外层
class A extends Component{

    static childContextTypes = {
        user:React.PropTypes.object.isRequired
    }

    getChildContext(){
        return {
            user:this.props.user
        }
    }

    render(){
        <div>
            {this.props.children}
        </div>
    }
}

//里层组件
class D extends Component{

    static contextTypes = {
        user:React.PropTypes.object.isRequired
    }

    render(){
        <div>
            {this.context.user.name}
        </div>
    }
}

//stateless 中使用  context通过第二个参数传入
function D(props,context){

    return (
        <div>
            {this.context.user.name}
        </div>
    )
}
D.contextTypes = {
    user:React.PropTypes.object.isRequired
}