(function getData() {
    var trs = document.querySelectorAll('tr[data-testid="beast-core-table-body-tr"]')
    var data;
    // debugger;
    chrome.storage.local.get(['data'], (result)=>{

        let res = result.data;
        if (res == null) {
            data = [];
        }
        else {
            data = res.concat(); 
        }  
        
        for (let i = 0; i < trs.length/3; i++) {
            let td = trs[i].querySelector('td div[data-testid="beast-core-grid-col-wrapper"]');
            let visit = trs[i].querySelector('td div[class*="product-detail_value"]').innerText;
            id = td.innerText.split(':')[1];
            if (data.indexOf(id) < 0 && visit > 0) {
                data.push(id);
            }
        }

        // 保存 data
        chrome.storage.local.set({'data': data, 'totalMatch': data.length, 'allMatch': allMatch});
        chrome.storage.local.get(['allMatch'], (result)=>{
            if (result.allMatch != undefined) {
                console.log('All ID: \n', result.allMatch);
            }
        });
    
    });    
})()
