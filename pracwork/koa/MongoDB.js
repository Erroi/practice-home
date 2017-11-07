/**
 * Created by a1501 on 2017/9/13.
 */
database   database//数据库
table      collection //集合
row        document  //文档
column     field     //字段\域
index      index     //索引
primary key    primary key  //主键 MongoDB自动将_id字段设置为主键

键不能含有 空格 \0.
. 和 $ 有特别的意义，只有在特定环境下可以使用。
_ 开头的健是保留的  （不是严格要求的）。


//创建数据库
use DATABASE_NAME
//插入数据
db.DATABASE_NAME.insert({"name","xxxx"});
//删除当前数据库
db.dropDatabase()

//删除集合
show tables
db.COLLECTION_NAME.drop()

//向集合中插入文档
db.COLLECTION_NAME.insert(document)
db.COLLECTION_NAME.save(document)

//更新文档
db.collection.update(query,update,{     //query,查询条件，  update的对象和更新的操作符（$,$inc...)等，
    upset:false,    //如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入
    multi:false,    //mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新
    writeConcern:document,
})

//save()方法 通过传入的文档来替换已有文档
db.collection.save(document,{
    writeConcern:document
})

//remove()方法  删除集合中的数据
db.collection.remove(query,{
    justOne:false,  //若为true，则只删除一个文档
    writeConcern:document,
})

//删除所有数据
db.collection.remove({})

db.collection.find().pretty()  //查询集合中的所有数据
db.collection.findOne()   //只返回一个文档

//查询条件
db.col.find({'by':'solt'}).pretty()
      where by = 'solt'
db.col.find({'by':{$lt:50}}).pretty()
        where by < 50
{$lt:50}    where by<50
{$lte:50}   where by<= 50
{$gt:50}    where by > 50
{$gte:50}   where by>= 50

//查询 AND条件  以 , 隔开
db.collection.find({key1:value1,key2:value2}).pretty();

//查询 OR条件
db.collection.find({$or:[{key1:value1},{key2:value2}]});

//and和or结合
db.col.find({"like":{$gt:50},$or:[{"by":"cainiao"},{"title":"Mongo"}]}).pretty()
    where likes > 50 AND (by = "cainiao" OR title = 'Mongo')

//条件操作符 $type   基于BSON类型来检索集合中条件 匹配的数据类型
db.col.find(("title":{$type:2}))

Double   {$type:1}
String   {$type:2}
Object   {$type:3}
Array    {$type:4}
Binary data {$type:5}
Object id {$type:7}
Boolean   {$type:8}
Date      {$type:9}
Null      {$type:10}
Ragular Expression {$type:11}
JavaScript {$type:13}
Symbol     {$type:14}
JavaScript  {$type:15}
Timestamp   {$type:17}

//limit()   skip()
// limit()方法来读取指定数量的数据外，还可以使用skip()方法来跳过指定数量的数据，skip方法同样接受一个数字参数作为跳过的记录条数
db.col.find({},{"title":1,_id:0}).limit(1).skip(1)      //1--显示   0--不显示

//sort()  通过指定参数 排序  1--升序  -1 --降序
db.col.find({},{"title":1,_id:0}).sort({"like":-1})

//