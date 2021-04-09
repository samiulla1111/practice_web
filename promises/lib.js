function analyzer(product,cb){
    setTimeout(function(){
        cb();
        cb();
        cb();
        cb();
    },2000);
}

function promiseAnalayzer(product){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve();
            resolve();
            resolve();
            resolve();
        },2000);
    })
}

module.exports={
    analyzer:analyzer,
    promiseAnalayzer:promiseAnalayzer
};