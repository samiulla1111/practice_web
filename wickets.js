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
    extractHtml1(html);
}

function extractHtml(html){
    let selectTool = cheerio.load(html);
    let bowlertab = selectTool(".table.bowler");
    //console.log(bowlertab.html());
    let hwkt=0;
    let hname="";
    for(let i=0;i<bowlertab.length;i++){
        let singleInningBol = selectTool(bowlertab[i]).find("tbody tr");

        for(let j=0;j<singleInningBol.length;j++){
            let singleAllCol = selectTool(singleInningBol[j]).find("td");
            let name = selectTool(singleAllCol[0]).text();
            let wickets = selectTool(singleAllCol[4]).text();

            console.log( "name ->",name,"wickets->",wickets);

            if(hwkt<Number.parseInt(wickets)){
                hwkt=Number.parseInt(wickets);
                hname=name;
            }
        }

        console.log("highest",hwkt,"wickets taken by ",hname);

        console.log("``````````````````````````````````````````````");
    }

}

function extractHtml1(html){
    let selectTool = cheerio.load(html);
    let teamNameArrEle = selectTool(".Collapsible h5");
    let teamNameArr = [];
    for(let i=0;i<teamNameArrEle.length;i++){
        let teamName = selectTool(teamNameArrEle[i]).text();
        teamName=teamName.split("INNINGS");
        teamName=teamName[0].trim();
        teamNameArr.push(teamName);
    }
    
    for(let i=0;i<teamNameArr.length;i++){
        

        let batsmantableArr = selectTool(".table.batsman");
        for(let j=0;j<batsmantableArr.length;j++){
            let batsmanName = selectTool(batsmantableArr[i]).find("tbody tr .batsman-cell");
            for(let j=0;j<batsmanName.length;j++){
                let name=selectTool(batsmanName[j]).text();
                console.log(name+" of "+teamNameArr[i]);
            }

            console.log("``````````````````````````````````````````");
        }
    }

}