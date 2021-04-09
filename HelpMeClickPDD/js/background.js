function clearData() {
    chrome.storage.local.remove(['data', 'currentMatch', 'totalLeft', 'totalMatch', 'allMatch'], (result)=>{
        console.log('all clear');
    });    
}
// 当插件被安装时执行
chrome.runtime.onInstalled.addListener(clearData);
// 访问页面被关闭时也要初始化
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    chrome.storage.local.get(['ItemVisitTabId'], (result)=>{
        if (tabId == result.ItemVisitTabId) {
            clearData();
        }
    });
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(changeInfo);
    chrome.storage.local.get(['ItemVisitTabId'], (result)=>{
        if (tabId == result.ItemVisitTabId) {
            clearData();
        }
    });
});