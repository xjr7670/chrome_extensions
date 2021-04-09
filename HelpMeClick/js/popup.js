$(function popup() {
    var activeTabId;
   


    chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs)=>{
        let url = tabs[0].url;
        activeTabId = tabs[0].id;
        if (url == 'http://www.xjr7670.com/ItemVisit.html') {
            // 商品访问页： https://mms.pinduoduo.com/sycm/goods_effect/detail
            chrome.storage.local.set({'ItemVisitTabId': activeTabId});
            chrome.tabs.executeScript({file: "./js/getData.js"});
        } else if (url == 'http://www.xjr7670.com/ItemManager.html') {
            // 商品列表页： https://mms.pinduoduo.com/goods/goods_list
            chrome.tabs.executeScript({file: "./js/makeClick.js"})
        }        
    });
    
    chrome.storage.local.get(['currentMatch', 'totalLeft', 'totalMatch'], (result) => {
        let s = `${result.currentMatch}/${result.totalLeft}/${result.totalMatch}`;
        $("#main > span")[0].innerText = s;
    });

    // 初始化存储
    // 当插件被安装时执行
    chrome.runtime.onInstalled.addListener(function() {
        chrome.storage.local.remove(['data', 'currentMatch', 'totalLeft', 
                                     'totalMatch', 'allMatch']);
    });

    // 访问页面被关闭时也要初始化
    chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
        chrome.storage.local.remove(['data', 'currentMatch', 'totalLeft', 'totalMatch']);
    });
});