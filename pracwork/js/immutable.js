const im = require('immutable')

// Record
const { Record } = im
const ABRecord = Record({a: 1, b: 2})   // 构造函数 定义的a b属性不会被后续增加或剪掉属性(一旦被定义了，就不会被重写)
const myRecord = new ABRecord({ b: 3 }) // 实例对象 值会覆盖
  // .size  .get()
myRecord.size // 2
myRecord.get('a') // 1
myRecord.get('b') // 3 覆盖
  // .remove(key)
const myRecordWithoutB = myRecord.remove('b')
myRecordWithoutB.get('b') // 2
myRecordWithoutB.size // 2
  // Record.isRecord(me)
Record.isRecord(me) // true
  // .toString()
me.toString() // 'Person { name: 'my name' }'
  // .has
me.has('name') // true
  // .set
const her = me.set('name','hahah')  // me {name: 'my name'}  her {name: 'hahah'}

// List
List() // List []
List([1,2,3,4]) // List [1,2,3,4]
List(Set([1,2,3,2,4])) // List [1,2,3,4]
  // List.isList(maybeList: any): boolean
List.isList([]) //false
List.isList(List()) // true
  // List.of(...values: Array): List
List.of(1,2,3,4) // List [1,2,3,4]
List.of({x:1}, 2,[3],4) // List [{x:1}, 2, [3], 4]
  // .size
  // .set(index: number, value: T): List<T>
List([0]).set(1,1) // List [0,1]
         .set(2,2) // List [0,undefined,2]
         .set(5000, 'value').size // 5001
  // .delete(index: number): List<T>
List([0,1,2,3,4]).delete(0) // List [1,2,3,4]
List([0,1,2,3,4]).delete(-1) // List [0,1,2,3]
List([ 0, 1, 2, 3, 4 ]).insert(6, 5) // List [ 0, 1, 2, 3, 4, 5 ]
List([ 1, 2, 3, 4 ]).clear()// List []
List([ 1, 2, 3, 4 ]).push(5)// List [ 1, 2, 3, 4, 5 ]
List([ 1, 2, 3, 4 ]).pop()// List[ 1, 2, 3 ]
List([ 2, 3, 4]).unshift(1)// List [ 1, 2, 3, 4 ]
List([ 0, 1, 2, 3, 4 ]).shift()// List [ 1, 2, 3, 4 ]
List(['a','b','c']).update(1, val => val.toUpperCase()) // list ['a','B','c']







