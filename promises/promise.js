let fs=require("fs");
console.log("before");

//this is the way of creating our own promises
//we need to use the Promises object to create a promises
//inside the promises also we use callback functions...     0
function promisewala(filepath){
    
    return new Promise(function(resolve,reject){
        fs.readFile(filepath,function cb(err,data){
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    });
}

let filePromise = promisewala("f1.txt");
console.log(filePromise);
filePromise.then(function(data){
    console.log("data->"+data);
})

filePromise.catch(function(err){
    console.log("error->"+err);
})

console.log("after");