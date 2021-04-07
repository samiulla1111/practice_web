let request = require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let path=require("path");
let PDFDocument = require('pdfkit');
const { createInflate } = require("zlib");

let url="https://github.com/topics";

// requst module help us to requset to server

request(url,cb);

function cb(err,res,html){
    if(err){
        console.log(err);
        return;
    }
    // console.log(html);
    extractHtml(html);
}

function extractHtml(html){
    let selectTool = cheerio.load(html);
    let cards = selectTool(".col-12.col-sm-6.col-md-4.mb-4 a");
   for(let i=0;i<cards.length;i++){
       let link=selectTool(cards[i]).attr("href");
       let fullLink="https://github.com"+link;
      // console.log(fullLink);
       processRepoPage(fullLink);
   }
    
}

function processRepoPage(fullLink){
   request(fullLink,cb);
   function cb(err,res,html){
       if(err){
           console.log(err);
       }
       else{
           getReplinks(html);
       }
   }
}

function getReplinks(html){
    let selectTool = cheerio.load(html);
    let topicEle = selectTool(".h1-mktg");
   // console.log(topicEle.text());
   let topicName=topicEle.text().trim();
   dirCreator(topicName);

    let arr=selectTool("a.text-bold");
    for(let i=0;i<8;i++){
        let link=selectTool(arr[i]).attr("href");
        let repoName = link.split("/").pop();
        repoName=repoName.trim();
        //.log(repoName);
       // createFile(repoName,topicName);
//console.log(link);
        let fullRepoLink = "https://github.com"+link+"/issues";
        getIssues(repoName,topicName,fullRepoLink);
    }

    console.log("`````````````````````````````````````````````");
}

function getIssues(repoName,topicName,repoPageLink){
    request(repoPageLink,cb);
    function cb(err,res,html){
        if(err){
            if(res.statusCode == 404){
                console.log("No issues page found");
            }else{
                console.log(err);
            }
        }else{
            extractIssues(html,repoName,topicName);
        }
    }
}

function extractIssues(html,repoName,topicName){
    let selectTool = cheerio.load(html);
    let IssuesAncAr = selectTool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let arr =[];
    for(let i=0;i<IssuesAncAr.length;i++){
        let name = selectTool(IssuesAncAr[i]).text();
        let link = selectTool(IssuesAncAr[i]).attr("href");
        arr.push({
            "Name":name,
            "Link":"https://github.com"+link
        })
    }

    let filePath = path.join(__dirname,topicName,repoName+".pdf");
    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(JSON.stringify(arr));
    pdfDoc.end();
}

function createFile(repoName,topicName){
    let pathOfFolder=path.join(__dirname,topicName,repoName+".json");
    if(fs.existsSync(pathOfFolder)==false){
        let createStream = fs.createWriteStream(pathOfFolder);
        createStream.end();
    }
}

function dirCreator(topicName){
    let pathOfFolder = path.join(__dirname,topicName);
    if(fs.existsSync(pathOfFolder)==false){
        fs.mkdirSync(pathOfFolder);
    }
}