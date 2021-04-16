let url="https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login";
const puppeteer = require("puppeteer");
let {password,email} = require("../secret.js");
let {codes}=require("./code");
let browserPromise = puppeteer.launch({
    headless:false
})
let tab;
browserPromise.then(function(browser){
    let tabsArrpromise = browser.pages();
    return tabsArrpromise;
})
.then(function (tabArr){
    tab = tabArr[0];
    let gotoHkpagePromise = tab.goto(url);
    return gotoHkpagePromise;
}).then(function(){
   let emailPromise = tab.type("#input-1",email,{delay:300});
   return emailPromise;
}).then (function (){
    let passwordPromise = tab.type("#input-2",password,{delay:300});
    return passwordPromise;
}).then(function(){
    let loginButtonClickPromise = tab.click("button[data-analytics='LoginPassword']");
    let combinedPromise = Promise.all([loginButtonClickPromise,tab.waitForNavigation({waitUntil:"networkidle0"})]);
    return combinedPromise;
}).then(function(){
    let enterClcik = waitAndClick("h3[title='Interview Preparation Kit']");
    let CombinedenterClcik = Promise.all([enterClcik,tab.waitForNavigation({waitUntil:"networkidle0"})]);
    return CombinedenterClcik;
}).then(function(){
    let enterChallenge = waitAndClick("a[data-attr1='warmup']");
    let combineChallenge = Promise.all([enterChallenge,tab.waitForNavigation({waitUntil:"networkidle0"})]);
    return combineChallenge;
}).then(function(){
    let enterChallenge = waitAndClick("a[data-attr1='warmup']");
    let combineChallenge = Promise.all([enterChallenge,tab.waitForNavigation({waitUntil:"networkidle0"})]);
    return combineChallenge;
}).then(function(){
    // let enterChallenge = waitAndClick("a[data-attr1='sock-merchant']");
    // let combineChallenge = Promise.all([enterChallenge,tab.waitForNavigation({waitUntil:"networkidle0"})]);
    // return combineChallenge;
    return tab.url();
}).then(function(url){
   // console.log(url);
    let questionObj = codes[0];
   // console.log(questionObj);
    console.log(questionObj.qName);
    questionSolver(url,questionObj.soln,questionObj.qName);
}).catch(function(err){
    console.log(err);
})


function questionSolver(modulepageUrl, code, questionName) {
    return new Promise(function (resolve, reject) {
        // page visit 
        let reachedPageUrlPromise = tab.goto(modulepageUrl);
        reachedPageUrlPromise
            .then(function () {
                //  page h4 -> mathcing h4 -> click
                // function will exceute inside the browser
                function browserconsolerunFn(questionName) {
                    let allH4Elem = document.querySelectorAll("h4");
                    let textArr = [];
                    for (let i = 0; i < allH4Elem.length; i++) {
                        let myQuestion = allH4Elem[i]
                            .innerText.split("\n")[0];
                        textArr.push(myQuestion);
                    }
                    let idx = textArr.indexOf(questionName);
                    console.log(idx);
                    console.log("hello");
                    allH4Elem[idx].click();
                }
                let pageClickPromise = tab.evaluate(browserconsolerunFn, questionName);
                return pageClickPromise;
            })
            .then(function () {
                // checkbox click
                let inputWillBeClickedPromise = waitAndClick(".checkbox-input");
                return inputWillBeClickedPromise;
             })
            // .then(function () {
            //     // type `
            //     let codeWillBeTypedPromise = tab.type(".custominput", code);
            //     return codeWillBeTypedPromise;
            // })
            //.then(function () {
            //     let controlIsHoldPromise = tab.keyboard.down("Control");
            //     return controlIsHoldPromise; 
            // }).then(function () {
            //     // ctrl a
            //     let aisPressedpromise = tab.keyboard.press("a");
            //     return aisPressedpromise;
            //     // ctrl x
            // }).then(function () {
            //     let cutPromise = tab.keyboard.press("x");
            //     return cutPromise;
            // })
            // .then(function () {
            //     let editorWillBeClickedPromise = tab.click(".monaco-editor.no-user-select.vs");
            //     return editorWillBeClickedPromise;
            // })
            // .then(function () {
            //     // ctrl a
            //     let aisPressedpromise = tab.keyboard.press("a");
            //     return aisPressedpromise;
            //     // ctrl x
            // })
            // .then(function () {
            //     let pastePromise = tab.keyboard.press("v");
            //     return pastePromise;
            // })
            // .then(function () {
            //     let submitIsClickedPromise = tab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
            //     return submitIsClickedPromise;
            // })
            // .then(function () {
            //     resolve();
            //})
            .catch(function (err) {
                reject(err);
            })
        // questionName-> appear -> click
        // read 
        // copy
        // paste
        // submit 
    })
}



//promise based functon->wait and click
function waitAndClick(selector){
    return new Promise(function(resolve,reject){
        let selectorPromise = tab.waitForSelector(selector,{visible:true});
        selectorPromise.then(function(){
            let selectorClickPromise = tab.click(selector);
            return selectorClickPromise;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}