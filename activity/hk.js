let url="https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login";
const puppeteer = require("puppeteer");
let {password,email} = require("../secret.js");
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
    let enterClcik = tab.click("h3[title='Interview Preparation Kit']");
    return enterClcik;
})