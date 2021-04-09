$(function popup() {

    function show() {
        chrome.storage.local.get(['currentMatch', 'totalMatch'], (result) => {
            let s = `${result.currentMatch}/${result.totalMatch}`;
            $("#main > span")[0].innerText = s;
        });        
    }
    chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs)=>{
        let url = tabs[0].url;
        if (url == 'https://mms.pinduoduo.com/sycm/goods_effect/detail') {
            chrome.storage.local.set({'ItemVisitTabId': tabs[0].id});
            chrome.tabs.executeScript({file: "./js/getData.js"}, show);
        } else if (url == 'https://mms.pinduoduo.com/goods/goods_list') {
            chrome.tabs.executeScript({file: "./js/makeClick.js"}, show)
        }        
    });
    


});