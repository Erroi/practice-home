/**
 * immutable的作用
*/
// 很好的规避了js中对象是可变的，而使用引用赋值，新的对象简单的引用了原始对象，改变新的对象的时候将影响到原始对象。
// 另一种方法是使用浅拷贝深拷贝，来避免修改，但这样造成了内存和CPU的浪费。

/**
 * immutable 原理
 */
// immutable date 一旦创建就不能被更改，增删改都会返回一个新的immutable对象；其原理是持久化数据结构（旧数据创建新数据的时候，要保证旧数据同时可用）
// 在deepcopy的时候，采用结构共享（如果对象树的某个节点改变，只修改节点和其父节点，其他节点共享）


/**
 * immutable 优点及使用
 */
// 当然我们也可以在 shouldComponentUpdate() 中使用使用 deepCopy 和 deepCopy 来避免无必要的 render()，但 deepCopy 和 deepCompare 一般都是非常耗性能的。
// Immutable 则提供了简洁高效的判断数据是否变化的方法，只需 === 和 is 比较就能知道是否需要执行 render()，而这个操作几乎 0 成本，所以可以极大提高性能。修改后的 shouldComponentUpdate 是这样的

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







