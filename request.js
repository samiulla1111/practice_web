let request = require("request");
let cheerio=require("cheerio");

let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";


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
    let allCommentaries = selectTool(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    
    let lastbComment = selectTool(allCommentaries[0]).text();

    console.log(lastbComment);

}