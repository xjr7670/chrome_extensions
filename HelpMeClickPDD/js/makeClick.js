chrome.storage.local.get(['data'], (result)=>{
    // 获取到的 data 全部都是需要勾选的
    var div = document.querySelector("div.goods-table-list");
    var trs = div.querySelectorAll('tr[data-testid="beast-core-table-body-tr"]');
    var idArr = [];
    var currentMatch = 0;
    var data = result['data'];  // data 里面是匹配到的 id 值
    // 打勾
    for (let i = 0; i < trs.length; i++) {
        let tds = trs[i].querySelectorAll('td[data-testid="beast-core-table-td"]')
        let like = tds[3].innerText;
        let salesVolume = tds[5].innerText;
        var id = tds[0].querySelector('div.detail p.goods-id').innerText;
        if (data.indexOf(id) < 0 && like <= 0 && salesVolume <= 0) {
            // 访问量为 0 && 收藏数为 0 && 销售量为 0，则点击一下左边的框
            let isChecked = trs[i].querySelector('input[mode="checkbox"]').checked
            let square = trs[i].querySelector('td i[data-testid="beast-core-icon-check"]');
            ++currentMatch;
            if (isChecked != true) {
                square.click();
            }
        }
    }

    chrome.storage.local.set({'data': data, 'currentMatch': currentMatch});
    chrome.storage.local.get(['allMatch'], (result)=>{
        if (result.allMatch != undefined) {
            console.log('All ID: \n', result.allMatch);
        }
    });    
});