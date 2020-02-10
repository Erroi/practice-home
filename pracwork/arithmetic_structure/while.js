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



/**
 *                  时间复杂度
 * 冒泡、插入、选择      O(n ** 2)
 * 快排、归并           O(n log n)    分治思想
 * 桶、计数、基数       O(n)           线性排序：非基于比较的排序算法，不涉及元素之间的比较操作
 */

 /**
  * 冒泡排序：
  * 只会操作相邻的两个数据。每次冒泡操作都会对相邻的两个元素进行比较，看是否满则大小关系要求。
  * 如果不满足就让他俩互换。
  * 一次冒泡会让至少一个元素移动到它应该在的位置，重复n次，就完成了n个数据的排序工作。
  */


/**
 * 插入排序：
 * 先将数组中的数据分为两个区间，已排序区间和未排序区间。
 * 初始已排序区间只有一个元素，就是数组的第一个元素。
 * 插入算法的核心思想是取未排序区间中的元素，在已排序区间中找到合适的插入位置将其插入，
 *   并保证已排序区间数据一直有序。
 * 重复此过程，直至未排序区间中元素为空。
 */



/**
 * 选择排序：
 * 也区分排序区间和未排序区间。
 * 每次会从未排序区间中找到最小的元素，将其放到已排序区间的末尾。
 */


/**
 * 归并排序：
 * 要排序一个数组，先把数组从中间分成前后两部分，然后对前后两部分分别排序，再将排好序的两部分合并在一起。
 * 
 * 涉及到另个有序数组合并为一个有序数组的问题：
 * 1. 申请一个临时数组 tmp， 大小与 A[p...r]相同。
 * 2. 用另个游标 i 和 j ，分别指向 前一半数组B[p...r/2] 和 后一半数组C[r/2 + 1...r]，
 * 3. 比较 B[i] 和 C[j],如果 B[i] <= C[j], 则把 B[i]放入temp，i后移一位，
 * 4. 否则 C[j] 放入到数组tmp，j后移一位。
 * 5. 直到其中一个子数组中的所有数据都放入tmp中，再把另一个数组中的数据依次加入到临时数组的末尾，
 *    此时，tmp中存储的就是两个子数组合并之后的结果了。
 */



/**
 * 快速排序：
 * 如果要排序数组中下标从 p 到 r 之间的一组数据，我们选择 p 到 r 之间的任意一个数据作为pivot。
 * 1. 遍历 p 到 r 之间的数据， 将小于 pivot 的放到左边，大于 pivot 的放到右边，pivot 放到中间。
 *    此时，数组 p 到 r 之间的数据就被分成了三部分。
 * 2. 用递归依次拆分，直至区间缩小为1，就说明所有的数据都有序了。
 */



