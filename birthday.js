let request = require("request");
let cheerio=require("cheerio");

let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";


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
    let teamNameArrEle = selectTool(".Collapsible h5");
    let teamNameArr = [];
    for(let i=0;i<teamNameArrEle.length;i++){
        let teamName = selectTool(teamNameArrEle[i]).text();
        teamName=teamName.split("INNINGS")[0];
        teamName=teamName.trim();
        teamNameArr.push(teamName);
    }

    let batsmantableArr = selectTool(".table.batsman");
    for(let i=0;i<batsmantableArr.length;i++){
        let batsmanNameAnchor = selectTool(batsmantableArr[i]).find("tbody tr .batsman-cell a");

        for(let j=0;j<batsmanNameAnchor.length;j++){
            let name = selectTool(batsmanNameAnchor[j]).text();
            let teamName = teamNameArr[i];

            let link = selectTool(batsmanNameAnchor[j]).attr("href");
            printBirthdays(link,name,teamName);
        }
    }    
}

function printBirthdays(link,name,teamName){
    request(link,cb);
    function cb(error,response,html){
        if(error){
            console.log(error);
        }
        else{
            extractBirthday(html,name,teamName);
            console.log("```````````````````````````");
        }
    }
}

function extractBirthday(html,name,teamName){
    let selectorTool = cheerio.load(html);
    let birthdayElem = selectorTool(".ciPlayerinformationtxt span");
    let birthday = selectorTool(birthdayElem[1]).text();
    console.log(name+"plays for "+teamName+" was born on "+birthday);
}