function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

function showWeather(result){
    //alert(result);
    result = JSON.parse(result);
    daily = result['results'][0]['daily'];
    var table = '<table><tr><th>日期</th><th>天气</th><th>最低温度</th><th>最高温度</th></tr>';
    for(var i in daily){
        table += '<tr>';
        table += '<td>'+daily[i]['date']+'</td>';
        table += '<td>'+daily[i]['text_day']+'</td>';
        table += '<td>'+daily[i]['low']+' °C</td>';
        table += '<td>'+daily[i]['high']+' °C</td>';
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('weather').innerHTML = table;
}

var city = localStorage.city;
city = city?city:'beijing';
var url = "https://api.seniverse.com/v3/weather/daily.json?key=0rdekx77x1ve3vlu&location=guangzhou&language=zh-Hans&unit=c&start=0&days=5";
httpRequest(url, showWeather);
