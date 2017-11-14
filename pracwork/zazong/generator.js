let gen = function* (n){
    for(var i = 0;i<3;i++){
        --n;

        yield n;
    }
};

var genObj =gen(5);
console.log(genObj.next());  //next();生成对象{value   done}    {value: 4, done: false }
console.log(genObj.next());   //{value: 4, done: false }
console.log(genObj.next());     //{ value: 3, done: false }
console.log(genObj.next());     // {value: 2, done: false }
console.log(genObj.next());     //  {value: undefined, done: true }


let gen2 = async function(n){
    for(var i = 0;i<3;i++){
        --n;

        await n;
    }
};

gen2(5);