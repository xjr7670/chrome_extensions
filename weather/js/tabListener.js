chrome.system.display.getInfo(function(displayInfoArray) {
    var d0 = displayInfoArray[0];
    var display = document.getElementById('display');
    display.innerHTML = d0['name'];
});