chrome.storage.local.get(['data'], (result)=>{
    // 获取到的 data 全部都是需要勾选的
    var table = document.getElementsByTagName('table')[0];
    var trs = table.querySelectorAll('tr');
    var idArr = [];
    var needToRemoveID = [];
    var data = result['data'];  // data 里面是匹配到的 id 值
    // 打勾
    for (var i = 1; i < trs.length; i++) {
        var id = trs[i].querySelector('td:nth-child(2)').innerText;
        if (data.indexOf(id) >= 0) {
            let input = trs[i].querySelector('input');
            input.click();
            needToRemoveID.push(id)
        }
    }
    // 把已经勾选的部分去掉
    for (var i = 0; i < needToRemoveID.length; i++) {
        data.splice(data.indexOf(needToRemoveID[i]), 1);
    }
    chrome.storage.local.set({'data': data});
    chrome.storage.local.get(['allMatch'], (result)=>{
        if (result.allMatch != undefined) {
            console.log('All ID: \n', result.allMatch);
        }
    });    
    chrome.storage.local.set({'totalLeft': data.length});
    chrome.storage.local.set({'currentMatch': needToRemoveID.length});
});