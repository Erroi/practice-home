export default function compose(...funcs,initFunc){
    if(funcs.length == 0){
        return arg => arg;
    }

    if(funcs.length == 1){
        return funcs[0]
    }

    // return funcs.reduce((pre,cur)=>cur(pre),initFunc)
    return (...args)=> funcs.reduceRight((pre,cur)=>cur(pre),initFunc);
}