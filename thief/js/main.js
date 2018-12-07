window.onload = function() {
    var runTime = 1
    var ticket = setInterval(function() {
        var res = gogogo();
        if (res) {
            clearInterval(ticket);
        }
    }, runTime);

    var orderUrl = "https://kyfw.12306.cn/otn/confirmPassenger/initDc";
    if (window.location.href == orderUrl) {
        var so = setInterval(function() {
            var soRes = submitOrder();
            if (soRes) {
                clearInterval(so);
            }
        }, runTime);
    }

};

function gogogo() {

    // 订票页面的URL
    var ticketURL = "https://kyfw.12306.cn/otn/leftTicket/init";
    if (window.location.href != ticketURL) {
        return true;
    }

    var btn72 = document.getElementById('ticket_650000K2970E');
    var b2 = btn72.getElementsByClassName("no-br")[0];
    var tag = b2.getElementsByTagName('a');
    console.log(tag);
    if (tag.length == 1) {
        tag[0].click();
        return true;
    } else {
        console.log("no tag");
        return false;
    }
}

function submitOrder() {

    // 选中4个乘客
    document.getElementById('normalPassenger_0').click();
    //document.getElementById('normalPassenger_1').click();
    document.getElementById('normalPassenger_8').click();
    //document.getElementById('normalPassenger_9').click();
    // 座位类型指定为硬卧
    document.getElementById('seatType_1')[0].selectedIndex = 0;
    // 提交订单
    document.getElementById('submitOrder_id').click();

    return true;
}