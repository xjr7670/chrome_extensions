var udpSocket = new udp();
udpSocket.localPort = 8943;
udpSocket.receive = receiveMsg;
udpSocket.init(function() {
    udpSocket.joinGroup('224.0.1.100', function() {
        // Joined group 224.0.1.100
    });
});

chrome.runtime.onMessage.addListener(function(message, sender, callback) {
    if (message.action == 'send') {
        var buf = str2ab(message.msg);
        udpSocket.send('224.0.1.100', udpSocket.localPort, buf, function() {
            // message is sent
        });
    }
});

function receiveMsg(info) {
    var msg = ab2str(info.data);
    chrome.runtime.sendMessage({action: 'receive', msg:msg});
}

function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2);
    bufView = new Unit16Array(buf);
    for (var i=0; i<str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Unit16Array(buf));
}

chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('main.html', {
        'id': 'main',
        'bounds': {
            'width': 400,
            'height': 600
        }
    });
});