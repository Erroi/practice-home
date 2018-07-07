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
