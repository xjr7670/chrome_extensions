$(function() {

    $("#submit").click(function() {

        var level = $("#level").val();
        var unit = $("#unit").val();
        var db = $("#db").val();  
          
        chrome.storage.local.set({'level': level, 'unit': unit, 'db': db}, function() {
            // todo...
            alert(level);
        });
    })

    chrome.storage.local.get(['level', 'unit', 'db'], function(result) {
        var level = result.level;
        var unit = result.unit;
        var db = result.db;
        var fun = function() {
            var nodeTag = document.getElementsByClassName("input-group col-md-8 data-obj padding-top4");
            if (typeof(nodeTag[0]) != "undefined") {
                var tb_name = nodeTag[0].innerText;
                var full_name = [level, unit, db, tb_name].join('_');
                document.getElementsByClassName("form-control dbType_txt")[0].value = full_name;
                document.getElementsByClassName("form-control dbType_txt")[1].value = tb_name;
            }
        };

        var si = setInterval(fun, 2000);
    });
    
});