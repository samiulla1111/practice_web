let fs=require("fs");

let p1=fs.promises.readFile("f1.txt");
let p2=fs.promises.readFile("f2.txt");
let p3=fs.promises.readFile("f3.txt");

let p=Promise.all([p1,p2,p3]);
p.then(function (data){
    for(let i=0;i<data.length;i++){
        console.log("data->",data[i]+"");
    }
})