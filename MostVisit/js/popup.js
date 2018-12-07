$(function() {

    function createTab(tabName, value) {
        var newTab = document.createElement(tabName);
        newTab.appendChild(document.createTextNode(value));

        return newTab;
    }

    chrome.storage.local.get(null, function(result) {

        // 倒序排列
        var result2 = Object.keys(result).sort(function(a, b) {
            return -(result[a][0] - result[b][0]);
        });

        for (let idx in result2) {
            if (idx < 10) {
                let domainSpan = createTab('td', result2[idx]);
                let countSpan = createTab('td', result[result2[idx]][0]);
                let itemDiv = document.createElement('tr');
                itemDiv.appendChild(domainSpan);
                itemDiv.appendChild(countSpan);
                $('#mainTable').append(itemDiv);
            }
        }
    });

    $('#clear').click(function() {
        chrome.storage.local.clear(function() {
            alert("All clear!");
        });
    });
});

