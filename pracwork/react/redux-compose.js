export default function compose(...funcs,initFunc){
    if(funcs.length == 0){
        return arg => arg;
    }

    if(funcs.length == 1){
        return funcs[0]
    }

    // return funcs.reduce((pre,cur)=>cur(pre),initFunc)
    return (...funcs)=> funcs.reduceRight((pre,cur)=>cur(pre),initFunc);
}

/**
 * 中间件 https://blog.csdn.net/qq_42606051/article/details/81907165 
 */

//**  1. Redux是可预测状态容器，每次修改数据时，记录修改内容
let next = store.dispatch
store.dispatch = (action) => {
    console.info('修改内容为', action);
    next(action);
}

// 与此对应的中间件applyMiddleware,作用就是改造dispatch函数，类似于上面达到一致的作用。
import {createStore, applyMiddleware} from 'redux';
const store = createStore(reducer, applyMiddleware(curStore => next => action => {
    console.info(curStore.getState(), action);
    return next(action);
}));

//* 2. redux-thunk: 处理异步action。
// 在dispatch一个action之前，去判断action是否是一个函数，如果是函数，那么就执行这个函数
function createThunkMiddleware(extraArg){
    return ({dispatch, getState}) => next => action => {  // next 是store.dispatch; action 是 自定义传入的action
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArg)
        }
        return next(action);
    }
}
// 使用redux-thunk之前
import * as T from './actionTypes';
export const changeBtnText = (text) => {
  return {
    type: T.CHANGE_BTN_TEXT,
    payload: text
  };
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeText: (text) => {
            dispatch(changeBtnText('正在加载中...'));  // 存在问题，异步请求，可能会先出现’加载完成‘，而后显示’正在加载‘
            axios.get('url').then(() => {
                dispatch(changeBtnText('加载完成'));
            },() => {
                dispatch(changeBtnText('加载失败'));
            })
        }
    }
}
// 使用redux-thunk之后
const mapDispatchToProps = (dispatch) => {
    return {
      changeText: (text) => {
        dispatch(changeBtnTextAsync(text));  // 中间件中可以拿到store,通过store.getState获取当前状态，从而判断到底是展示正在加载中还是展示加载完毕
      }
    };
}
const changeBtnTextAsync = (text) => {
    return (dispatch, getState) => { // 中间件中可以拿到store
        if (!getState().isLoading){
            dispatch(changeBtnText('正在加载中...'));
        }
        axios.get('url').then(() => {
            if (getState().isLoading) {
                dispatch(changeBtnText('加载完成'));                
            }
        }).catch(() => {
            dispatch(changeBtnText('加载失败'));
        })
    }
}

// ** 3、 redux-actions: 简化redux的使用。如handleActions
import {handleActions} from 'redux-actions';
import * as T from './actionTypes';

const initialState = {
    btnText: '按钮'
}
const pageMainReducer = handleActions({
    [T.CHANGE_BTN_TEXT]: {
        next(state, action){return {...state, btnText: action.payload}},
        throw(state){return state}
    }
},initialState);



/**
 * 高阶reducer：
 * combineReducers是高阶reducer一个典型的例子。
 * 但有一个问题：我们可以很容易跟踪整个应用的state状态（for循环reducer，所有的reducer都执行了一遍，），
 * 但是很难针对特定的action来更新特定的state的某一部分数据，特别是使用combinReducers时（因为dispatch的时候，采用的是for循环，来对每一个reducer都进行了执行）
 */
//这个reducer工厂函数接收的第二个参数是一个函数，而不是一个reducerName，这个函数用于对我们dispatch这个action进行过来
function createFilteredReducer(reducerFunction, reducerPredicate) {
    return (state, action) => {
        const isInitializationCall = state === undefined;
        const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall;
        //进行判断 reducer与需要执行的action.name 是否一致：
        //传入我们的action到reducer的filter函数中，如果返回true,那么我们会执行reducer函数，如果返回false，我们返回当前state状态即可
        return shouldRunWrappedReducer ? reducerFunction(state, action) : state;
    }
}
const rootReducer = combineReducers({
    // check for suffixed strings
    counterA : createFilteredReducer(counter, action => action.type.endsWith('_A')),
    // check for extra data in the action
    counterB : createFilteredReducer(counter, action => action.name === 'B'),
    // respond to all 'INCREMENT' actions, but never 'DECREMENT'
    counterC : createFilteredReducer(counter, action => action.type === 'INCREMENT');
})
// 好处：只要我们dispatch的这个action明确指定我们需要改变哪一部分state状态即可
store.dispatch({name:"A",type:"INCREMENT"})
//此时只会改变我们counterA对应的那部分的state的状态，同时将状态的值加1
// 高阶reducer的通用库：multireducer，他实现一种机制，解决dispatch一个action之后，所有reducer都执行一遍的情况。