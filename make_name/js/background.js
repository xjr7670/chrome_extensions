$(function() {

    // code start here...
    

});


var fun = function() {
    var nodeTag = document.getElementsByClassName("input-group col-md-8 data-obj padding-top4");
    if (typeof(nodeTag[0]) != "undefined") {
        var tb_name = nodeTag[0].innerText;
        document.getElementsByClassName("form-control dbType_txt")[0].value = "stg_hbj_sharedb_" + tb_name;
        document.getElementsByClassName("form-control dbType_txt")[1].value = tb_name;
    }
};

var si = setInterval(fun, 2000);
