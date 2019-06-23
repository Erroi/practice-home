import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Api from '...';

function* fetchUser(action) {
    try{
        const user = yield call(Api.fetchUser, action.payload.userId);
        yield put({type: 'USER_FETCH_SUCCEEDED', user: user});
    } catch (e) {
        yield put({type: 'USER_FETCH_FAILED', message: e.message});
    }
}

/**
 * takeEvery
 * 在每个 `USER_FETCH_REQUESTED` action 被dispatch时调用fetchUser,允许并发（同时处理多个相同的action）
 */
function* mySaga() {
    yield takeEvery('USER_FETCH_REQUESTED', fetchUser);
}

/**
 * takeLatest
 * 不允许并发，dispatch 一个 `USER_FETCH_REQUESTED` action 时，
  如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
  那么处理中的 action 会被取消，只会执行当前的
 */
function* mySaga() {
    yield takeLatest('USER_FETCH_REQUESTED', fetchUser)
}


/**
 * takeEvery
 * redux-saga 提供的辅助函数 takeEvery，用于监听所有的 INCREMENT_ASYNC action，并在 action 被匹配时执行 incrementAsync 任务。
 * 
 * takeLatest
 * 在任何时刻 takeLatest 只允许一个 fetchData 任务在执行。并且这个任务是最后被启动的那个。 如果已经有一个任务在执行的时候启动另一个 fetchData ，那之前的这个任务会被自动取消。
 * 
 * 
 * call(fn, ...args)  易于测试
 * 不立即执行异步调用，而是，call创建了一条描述结果的信息。（就像redux里的action创建器，创建一个描述action的纯文本对象），
 * *** call创建一个纯文本对象描述函数调用。redux-saga middleware确保执行函数调用、并在响应被resolve时恢复generator。** ？？
 * 
 * 
 * */ 

 // call 易于测试
const iterator = fetchProducts()
assert.deepEqual(
    iterator.next().value,
    call(Api.fetch, '/products',"fetchProducts should yield an Effect call(Api.fetch, './products')"))

// call 支持调用对象方法，apply提供另一种调用方式
yield call([obj, obj.method], arg1, arg2) // 如同 obj.method(arg1, arg2 ...)
yield apply(obj, obj.method, [arg1, arg2])

// 另外一个函数 cps 可以用来处理 Node 风格的函数 
// （例如，fn(...args, callback) 中的 callback 是 (error, result) => () 这样的形式，cps 表示的是延续传递风格（Continuation Passing Style））。
import { cps } from 'redux-saga';
const content = yield cps(readFile, '/path/to/file')


// redux-saga 为此提供了另外一个函数 put，这个函数用于创建 dispatch Effect。
// 只需创建一个对象来指示 middleware 我们需要发起一些 action，然后让 middleware 执行真实的 dispatch。 
// 这种方式我们就可以同样的方式测试 Generator 的 dispatch：只需检查 yield 后的 Effect，并确保它包含正确的指令
function* fetchProducts() {
    const products = yield call(Api.fetch, '/products')
    // 创建并 yield 一个 dispatch Effect
    yield put({ type: 'PRODUCTS_RECEIVED', products })
  }


/**
 * take: 可以全面控制action观察进程 来构建复杂的控制流
 * 他创建一个命令对象，会暂停generator，直到一个匹配的action被发起了
 * 在takeEvery中，被调用的任务无法控制何时被调用，它们将在每次action被匹配时一遍一遍的被调用，且无法控制合适停止监听。
 * 而take中，saga像是在执行一个普通的函数调用 action = getNextAction(),此函数将在action被发起时resolve 
 */

import { take, put } from 'redux-saga/effects'

function* watchFirstThreeTodosCreation() {
  for (let i = 0; i < 3; i++) {
    const action = yield take('TODO_CREATED')
  }
  yield put({type: 'SHOW_CONGRATULATION'})
}


import { take, call, put } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}

function* loginFlow() {
  while(true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    const token = yield call(authorize, user, password) // call是阻塞行，如果未执行完，用户就点击登出，就miss了LOGOUT
    if(token) {
      yield call(Api.storeItem({token}))
      yield take('LOGOUT')
      yield call(Api.clearItem('token'))
    }
  }
}


/**
 * 相继问题：
 * call是一个会阻塞的Effect,(Generator在调用结束之前都不能执行或处理任何其他事情)，
 * 但在用户点登入立马又点了登出时，希望loginflow进行授权调用，也想监听可能发生在调用未完成之前的LOGOUT action。因为LOGOUT与调用authorize是并发的。
 * 
 * 于是有了 *** fork ***
 * 当我们 fork 一个 任务，任务会在后台启动，调用者也可以继续它自己的流程，而不用等待被 fork 的任务结束。
 */
function* authorize(user, password){
    try {
        const token = yield call(Api.authorize, user, password)
        yield put({type: 'LOGIN_SUCCESS', token})
    } catch(error) {
        yield put({type: 'LOGIN_ERROR', error})
    }
}

function* loginFlow() {
    while(true) {
        const { user, password } = yield take('LOGIN_REQUEST')
        yield fork(authorize, user, password)
        // 监听2个并发的action
        // 如果先收到LOGOUT action，必须取消authorize处理进程。使用指定的Effect cancel。
        yield take(['LOGOUT', 'LOGIN_ERROR'])
        yield call(Api.clearItem('token'))
    }
}

/**
 * cancel 取消fork任务
 * 原理：yield fork的返回结果是一个task object。
 */
function* loginFlow() {
    while(true) {
        const {user, password} = yield take('LOGIN_REQUEST');
        // fork return a task object
        const task = yield fork(authorize, user, password);
        const action = yield take(['LOGOUT', 'LOGIN_ERROR']);
        if(action.type === 'LOGOUT'){
            yield cancel(task)
        } else {
            yield call(Api.clearItem('token'))
        }
    }
}

/**
 * cancelled Effect
 * 执行清理逻辑
 */
function* authorize(user, password) {
    try {
        const token = yield call(Api.authorize, user, password);
        yield put({type: 'LOGIN_SUCCESS', token})
        yield call(Api.storeItem, {token})
        return token
    } catch(error) {
        yield put({type: 'LOGIN_ERROR', error})
    } finally{
        if(yield cancelled()){
            // ...put special cancellation handling code here
        }
    }
}

/**
 * 同时执行多个任务
 * yield 一个包含 effects 的数组，generator 会被阻塞直到所有的 effects 都执行完毕，或者当一个 effect 被拒绝 （就像 Promise.all 的行为）。
 */
const [users, repos] = yield [
    call(fetch, '/users'),
    call(fetch, '/repos')
]

/**
 * race 
 */
