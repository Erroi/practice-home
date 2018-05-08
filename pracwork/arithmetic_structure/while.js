/**
 * Created by a1501 on 2018/1/8.
//  */
// var i = 0;
// var random = null;
// var result = [];
//
// while(i < 6){
//     var random = Math.round(Math.random() * (33 - 1) + 1);
//     var has = result.some(function (item) {
//         return random === item;
//     });
//     if(!has){
//         result.push(random);
//         i++;
//     }
//     console.log(i,random,result);
// }

var z = 10;
function foo(){
    console.log(z);
}
(function(funArg){
    var z = 20;
    funArg();
})(foo); //10
foo()  //10

//
var data = [];
for(var k = 0; k < 3; k++){
    data[k] = function(){
        console.log(k);
    };
}
data[0]();
data[1]();
data[2]();
//3 3 3


var a = 100;
function testResult(){
    console.log(a);
    var b = 2 * a;
    var a = 200;     //变量提升
    var c = a / 2;
    console.log(b);
    console.log(c);
}
testResult();    // undefined  NaN  100

var name = "the Window";
var object = {
    name: "my Object",

    getNameFunc: function () {
        return function () {
            return this.name;
        }
    },
    getName:function () {
        return this.name;
    }
}
console.log(object.getNameFunc()());  //undefined
console.log(object.getName());        //my Object


Object.keys(Array.apply(null,{length:100}))

function throttle(func) {
    var timer;
    return function () {
        var context = this;
        var arg = arguments;
        console.log(arg)
        clearTimeout(timer);
        timer = setTimeout(function () {
            func.apply(context,arg);
        },100)
    }
}
a = 9999;
throttle(function(){
    console.log('333')
})();

var arr1 = [3,2,5,9,23,45,12,4,65,34,87,1,24,45];
function quickSort(arr) {
    if(arr.length <= 1){
        return arr;
    }
    var empty = arr[0];
     var left = [];
     var right = [];
    for(var i = 1;i<arr.length;i++){
        if(arr[i] < empty){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    };
    return quickSort(left).concat([empty],quickSort(right));
}

console.log(quickSort(arr1));

//快排
function sortQuick(arr, start, end) {

    if (start >= end) return;
    let target = arr[start];
    let i = start;
    let j = end;
    while(i < j) {
        while(j > i) {
            if (arr[j] < target) {
                arr[i] = arr[j];
                break;
            }
            console.log('---1',i,j)
            j--;
        }

        while(j > i) {
            console.log('---2',i,j)
            if (arr[i] > target) {
                arr[j] = arr[i];
                break;
            }
            i++;
        }
    }
    arr[i] = target;

    sortQuick(arr, start, i - 1);
    sortQuick(arr, i + 1, end);
};

sortQuick(arr1,0,arr1.length - 1)
console.log(arr1)

//归并排序
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    if (arr.length == 2) {
        if (arr[0] > arr[1]) {
            let tmp = arr[0];
            arr[0] = arr[1];
            arr[1] = tmp;
        }
        return arr;
    }
    let middle = Math.floor(arr.length / 2);
    return merge(mergeSort(arr.slice(0, middle)), mergeSort(arr.slice(middle, arr.length)));
}

function merge(arr1, arr2) {
    let i = 0, j = 0;
    let result = [];
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            result.push(arr1[i]);
            i++
        }else {
            result.push(arr2[j]);
            j++;
        }

    }
    if (i < arr1.length) {
        return result.concat(arr1.slice(i, arr1.length));
    }else {
        return result.concat(arr2.slice(j, arr2.length));
    }
}
console.log(mergeSort(arr1));
