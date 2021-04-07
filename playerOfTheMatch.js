let request = require("request");
let cheerio=require("cheerio");

let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

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
    let TeamCard = selectTool(".col-md-8.col-16");
    for(let i=0;i<TeamCard.length;i++){
        let cardButtons=selectTool(TeamCard[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let cardlink=selectTool(cardButtons[2]).attr("href");
        cardlink="https://www.espncricinfo.com"+cardlink;
        //console.log(cardlink);
        playerOfTheMatch(cardlink);
    }
}

function  playerOfTheMatch(cardlink){
    request(cardlink,cb);
    function cb(err,res,html){
        if(err){
            console.log(err);
        }
        else{
            extractPlayer(html);
        }
    }
}

function extractPlayer(html){
    let selectTool = cheerio.load(html);
    let playerDetails = selectTool(".best-player-content").text();
    console.log(playerDetails);
}
