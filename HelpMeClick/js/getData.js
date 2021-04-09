(function getData() {
    var table = document.getElementsByTagName("table")[0];
    var trs = table.querySelectorAll("tr");
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
        
        for (let i = 1; i < trs.length; i++) {
            var tds = trs[i].querySelectorAll("td");
            id = tds[0].innerText;
            name = tds[1].innerText;
            visit = tds[2].innerText;
            if (data.indexOf(id) < 0 && visit > 0) {
                data.push(id);
            }
        }

        // 保存 data
        let backupData = JSON.parse(JSON.stringify(data));
        chrome.storage.local.set({'allMatch': backupData});
        
        chrome.storage.local.get(['allMatch'], (result)=>{
            if (result.allMatch != undefined) {
                console.log('All ID: \n', result.allMatch);
            }
        });
    
        chrome.storage.local.set({'data': data});
        chrome.storage.local.set({'totalMatch': data.length});  
    });    
})()
