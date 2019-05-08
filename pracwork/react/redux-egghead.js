const reducer = (state = 0, action) => {
    switch(action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state,action);    //得到新的state
        listeners.forEach(listener => listener());
    }

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }

    dispatch({});   //初始化么？

    return { getState, dispatch, subscribe }
}

import { createStore } from 'redux';
const todoApp = combineReducers({
    todos,
    visibilityFilter
})
const store = createStore(todoApp);


const combineReducers = (reducers) => {
    return (state = {},action) => {
        return Object.keys(reducers).reduce(
            (nextState,key) => {
                nextState[key] = reducers[key](state[key],action);
                return nextState;
            },{}
        )
    }
}


//store methods
const counter = (state = 0, action) => {
    switch(action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}
const { createStore } = Redux;
const store = createStore(counter);

console.log(store.getState());   // 0
store.dispatch({ type: 'INCREMENT' });     //dispatch了一个action
console.log(store.getState());   //1

store.subscribe(() => {                     //subscribe 监听到state改变，就会触发
    document.body.innerText = store.getState()
})
document.addEventListener('click',()=>{
    store.dispatch({ type:'INCREMENT' })
})

//action 和 reducer
const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
}
const action = {
    type: 'TOGGLE_TODO',
    id: 1
}
const todosReducer = (state=[],action) => {
    switch(action.type){
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id:action.id,
                    text:action.text,
                    completed:false
                }
            ];
        case 'TOGGLE_TODO':
            return state.map(todo => {          //这里可以单独提出来一个function
                if(todo.id !== action.id){
                    return todo;
                }
                return {
                    ...todo,
                    completed: !todo.completed
                };
            });
        default:
            return state;
    }
}
const visibilityFilterReducer = (state = 'SHOW_ALL',action)=>{
    switch(action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}
const { combineReducers } = Redux;
const todoApp = combineReducers({
    todos: todosReducer,
    visibilityFilter: visibilityFilterReducer
})

store.dispatch({ type: 'SET_VISIBILITY_FILTER',filter: 'SHOW_COMPLETE' }); 
console.log(store.getState());  
// {
//     todos: [{completed:true,id:0,text:'Learn Redux'},{completed:false,id:1,text:'go shopping'}],
//     visibilityFilter: 'SHOW_COMPLETE'
// }



// react redux
// Provide 提供 this.context.store 任意子组件可获取
class Provider extends Component {
    getChildContext() {
        return {
            store: this.props.store
        }
    }

    return (){
        this.props.children;
    }
}
Provider.childContextTypes = {
    store: React.PropTypes.object
}
// =>  import { Provider } from 'react-redux

//例 子组件取 const TodoApp = (props,context)=>{}    //2.context.store; 1.但是要写contextType
TodoApp.contextTypes = {
    store: React.PropTypes.object
}
//this.context.store

const { createStore } = Redux;

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
)


import { connect } from 'react-redux';   // 连接redux和react；将store的state和dispatch传给mapStateToProps和mapDispatchToProps，并经过处理定义变量当做组件的props。就不需要用this.context.store获取了
const mapStateToProps = (state,ownProps) => {     //此state 是store.getState()
    return {
        todos: getVisibleTodos(state.todos,state.visibilityFilter)   //筛选出需要的state
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onTodoClick: (id) => {
            dispatch({
                type: 'TOGGLE_TODO',
                id
            })
        }
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);



// 某一子组件
let nextTodoId = 0;
const AddTodo = (props, { store }) => {    //store = context.store
    let input;
    return (
        <div>
            <input ref={node => input = node}/>
            <button onClick={()=>{
                store.dispatch({                // 这里写成一个action
                    type: 'ADD_TODO',           //const addToDo = (text) => ({type:'ADD_TODO',id:nextTodoId++,text})
                    id: nextTodoId++,
                    text: input.value
                })
                input.value = ''
            }}>
                Add Todo
            </button>
        </div>
    )
}
AddTodo.contextTypes = {
    store: React.PropTypes.object
}
//=> 改写成 用 connect 获取store，dispatch，替换context
let nextTodoId = 0;
let AddTodo = ({ dispatch }) => {    //stateA和dispatchA是从props上取的
    let input;
    return (
        <div>
            <input ref={node => input = node}/>
            <button onClick={()=>{
                dispatch(addToDo)
                input.value = ''
            }}>
                Add Todo
            </button>
        </div>
    )
}
// AddTodo = connect(state => {stateA:xxxx},dispatch => {dispatchA:dispatch(xxx)})(AddTodo)  //将dispatch作为props赋给了AddTodo
connect(null,dispatch => ({dispatch}))(AddTodo)  //或写成 AddTodo = connect()(AddTodo)  

// Link
// ownProps 当state变化或ownProps变化时，mapStateToProps都会被调用生成一个新的stateProps(在与ownProps merge后)更新给组件
const mapStateToLinkProps = (state,ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
})
// 当ownProps变化的时候，该函数也会被调用，生成一个新的dispatchProps,(在与新的stateProps,ownProps merge后)更新给组件
const mapDispatchToLinkProps = (dispatch,ownProps) => ({
    onClick: ()=> {dispatch(setVisibilityFilterAction(ownProps.filter))}
})
// action必须在store上调用dispatch方法，为了不让组件感知到dispatch的存在，改写成可直接被调用的函数
// redux本身提供了bindActionCreators 函数，来将action包装成直接可被调用的函数
import { bindActionCreators } from 'redux'
const mapDispatchToLinkProps = (dispatch,ownProps) => {
    return bindActionCreators({
        onClick: setVisibilityFilterAction(ownProps.filter)
    })
}
const setVisibilityFilterAction = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})
const FilterLink = connect(mapStateToLinkProps,mapDispatchToLinkProps)(Link)

//不管是 stateProps 还是 dispatchProps，都需要和 ownProps merge 之后才会被赋给 MyComp。connect 的第三个参数就是用来做这件事。通常情况下，你可以不传这个参数，connect 就会使用 Object.assign 替代该方法。)
connect(null,null,mergeProps(stateProps,dispatchProps,ownerProps)
// connect方法归总
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
    mapStateToProps(state, ownProps): stateProps  // 将store中的数据作为props绑定到组件上
    mapDispatchToProps(dispatch, ownProps ): dispatch // 将action作为props绑定到组件上
    mergeProps(stateProps, dispatchProps, ownProps): props// 如果指定了这个参数，mapStateToProps() 与 mapDispatchToProps() 的执行结果和组件自身的 props 将传入到这个回调函数中。该回调函数返回的对象将作为 props 传递到被包装的组件中。
    //你也许可以用这个回调函数，根据组件的 props 来筛选部分的 state 数据，或者把 props 中的某个特定变量与 action creator 绑定在一起。
    //如果你省略这个参数，默认情况下返回 Object.assign({}, ownProps, stateProps, dispatchProps)的结果
    [options]: // 如果指定这个参数，可以定制connector的行为
        [pure = true]: // 如果为 true，connector 将执行 shouldComponentUpdate,并且浅对比,mergeProps的结果，避免不必要的更新，前提是当前组件是一个“纯”组件
        [withRef = false]: // 如果为true，connector会保存一个对被包含的组件实例的引用，改引用通过 getWrappedInstance()方法获取。默认为false

// connect 源码
export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options={}) {
    return function wrapWithConnect(WrappedComponent) {
        class Connect extends Component {
            constructor(props, context) {
                this.store = props.store || context.store
                this.stateProps = computeStateProps(this.store, props)
                this.dispatchProps = computeDispatchProps(this.store, props)
                this.state = { storeState: null }
                // 对stateProps,dispatchProps,parentProps进行合并
                this.updateState()
            }
            
            shouldComponentUpdate = (nextProps, nextState) => {
              if (propsChanged || mapStateProducedChange || dispatchPropsChanged) {
                  this.updateState(nextProps)
                  return true
              }
            }
            componentDidMount() {
                // 改变Component的state  监听数据改变，有改变则setState，使storeState始终为最新新的
                this.store.subscribe(() => {
                    this.setState({
                        storeState: this.store.getState()
                    })
                })
            }
            render() {
                return (
                    <WrappedComponent {...this.nextState} />
                )
            }
            
        }
        Connect.contextTypes = {
            store: storeShape
        }
        return Connect
    }
}


// 简洁易懂的connect原理，参见 https://blog.csdn.net/c_kite/article/details/79018469
const connect = (mapStateToProps) => (People) => {
    class Connect extends Component {
      static contextTypes = {
        store: PropTypes.object
      }
  
      constructor () {
        super()
        this.state = { allProps: {} }
      }
  
      componentWillMount () {
        const { store } = this.context
        this.setProps()
      }

      componentDidMount(){
          store.subscribe(() => {
              this.setState({
                  
              })
          })
      }
  
      setProps () {
        const { store } = this.context
        let stateProps = mapStateToProps(store.getState(), this.props) // 额外传入 props
        this.setState({
          allProps: { // 整合普通的 props 和从 state 生成的 props
            ...stateProps,
            ...this.props
          }
        })
      }
  
      render () {
        return <People {...this.state.allProps} />
      }
    }
    return Connect
  }

  const connect = (mapStateToProps, mapDispatchToProps) => (People) => {
    class Connect extends Component {
      static contextTypes = {
        store: PropTypes.object
      }
  
      constructor () {
        super()
        this.state = {
          allProps: {}
        }
      }
  
      componentWillMount () {
          // 此处store 是从provider的context取得
        const { store } = this.context
        this.setProps()
        store.subscribe(() => this.setProps())
      }
  
      setProps () { // 做了一下完整性的判断
        const { store } = this.context
        let stateProps = mapStateToProps
          ? mapStateToProps(store.getState(), this.props)
          : {} // 防止 mapStateToProps 没有传入
        let dispatchProps = mapDispatchToProps
          ? mapDispatchToProps(store.dispatch, this.props)
          : {} // 防止 mapDispatchToProps 没有传入
        this.setState({
          allProps: {
            ...stateProps,
            ...dispatchProps,
            ...this.props
          }
        })
      }
  
      render () {
        return <People {...this.state.allProps} />
      }
    }
    return Connect
  }

