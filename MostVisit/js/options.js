$(function() {

    function makeTd(value, includeLink=true) {
        let td = document.createElement("td");

        if (includeLink) {
            let aTab = document.createElement("a");
            aTab.href = "https://" + value;
            aTab.appendChild(document.createTextNode(value));
            td.appendChild(aTab);
        } else {
            td.appendChild(document.createTextNode(value))
        }

        return td;
    }

    /* echarts 画柱状图函数 */
    function drawBar(xData, yData, title) {
        let myChart = echarts.init(document.getElementById('barChart'));

        // 指定图表配置
        let options = {
            title: {
                show: true,
                text: title
            },
            tooltip: {},
            legend: {
                orient: 'vertical',
                data: xData,
                x: 'left'
            },
            xAxis: {
                data: xData
            },
            yAxis: {
                show: false
            },
            label: {
                show: true,
                color: '#000',
                position: 'top',
                distance: 10
            },
            series: [{
                name: '次数',
                type: 'bar',
                data: yData,
                itemStyle: {
                    color: '#8EC9EB'
                }
            }]
        };

        myChart.setOption(options);
    }

    /* echarts 画饼图函数 */
    function drawPie(domainObjs, title) {
        var myPie = echarts.init(document.getElementById('pieChart'));

        // 生成符合 echarts 格式要求的饼图数据
        var seriesData = [];
        for (let i in domainObjs) {
            var tmp = {};
            tmp.value = domainObjs[i];
            tmp.name = i;
            seriesData.push(tmp);
        }

        let options = {
            title: {
                text: title
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                data: Object.keys(domainObjs),
                x: 'left',
                orient: 'vertical',
                show: false
            },
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            radius: ['50%', '70%'],
            series: [
                {
                    name: '访问占比',
                    type: 'pie',
                    data: seriesData
                }
            ]
        };

        myPie.setOption(options);
    }

    chrome.storage.local.get(null, function(result) {

        let sortedResult = Object.keys(result).sort(function(a, b) {
            return -(result[a][0] - result[b][0]);
        });

        // 保存顶级域数据
        var domainTable = {};

        for (let idx in sortedResult) {
            // 取出域名
            let newIndex = sortedResult[idx]
            // 获得顶级域
            let topDomain = newIndex.split(".").slice(-2).join(".");

            let siteTd = makeTd(newIndex);
            let countTd = makeTd(result[newIndex][0], false);
            let lastVisitTd = makeTd(result[newIndex][1], false)
            let tr = document.createElement('tr');
            tr.appendChild(siteTd);
            tr.appendChild(countTd);
            tr.appendChild(lastVisitTd);
            $("#mainTable").append(tr);

            // 获得顶级域表格数据
            if (!(topDomain in domainTable)) {
                domainTable[topDomain] = result[newIndex][0];
            } else {
                domainTable[topDomain] += result[newIndex][0];
            }
        }

        // 生成顶级域表格元素
        var sortedDomain = Object.keys(domainTable).sort(function(a, b) {
            return -(domainTable[a] - domainTable[b]);
        });
        for (let idx in sortedDomain) {
            let siteTd = makeTd(sortedDomain[idx]);
            let countTd = makeTd(domainTable[sortedDomain[idx]]);
            let tr = document.createElement('tr');
            tr.appendChild(siteTd);
            tr.appendChild(countTd);
            $("#domainTable").append(tr);
        }

        // 画柱状图
        drawBar(Object.keys(domainTable), Object.values(domainTable), "近期访问次数");
        // 画饼图
        drawPie(domainTable, "各域名比例");
    });

});