import React from 'react';

class UseComponent extends React.Component{

    // 待续 https://redux-saga-in-chinese.js.org/
    // 函数式编程 https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/

    onSomeButtonClicked() {
        const { userId, dispatch } = this.props
        dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
        // 创建一个Saga监听所有的USER_FETCH_REQUESTED action
    }
}