(function() {

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

        if (changeInfo.status == 'complete' && tab.status == 'complete') {
            var url = tab.url;
            var schema = url.split('/')[0];
            var domain = url.split('/')[2].toString();
            var curDate = new Date();
            var formatDate = curDate.toLocaleDateString() + " " + curDate.toTimeString().split(" ")[0];

            if (domain != 'newtab' && (schema.indexOf("chrome") == -1) && (domain.trim() != "")) {
                // 处理域名次数，如无则次数为1，如有则次数加1
                chrome.storage.local.get(domain, function(result) {
                    var currentDomainCount = result[domain];
                    let tempObj = result;
                    if (typeof(currentDomainCount) == "undefined") {
                        tempObj[domain] = [1, formatDate];
                        chrome.storage.local.set(tempObj, function() {
                            console.log("new domain: \n" + domain)
                        });
                    } else {
                        tempObj[domain][0] = result[domain][0] + 1;
                        tempObj[domain][1] = formatDate;
                        chrome.storage.local.set(tempObj, function() {
                            console.log(domain + '\n after added:\n' + result[domain]);
                        });
                    }
                });
            }
        }
    });
})()