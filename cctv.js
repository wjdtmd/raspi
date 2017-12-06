var net = require('net'); 
var os = require('os'); 
var ifaces = os.networkInterfaces(); 
var ip = 0;

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
    } else {
      // this interface has only one ipv4 adress
      if(ifname.substr(0,1)==="e"){
       cctv_ip = iface.address;
	console.log(cctv_ip);
        }
    }
    ++alias;
  });
});
function sendData() {
	 client.write('{\"num\":\"C01\",\"cctv_ip\":\"'+cctv_ip+'\"}');
}
var client = net.connect({port:8107, host:'192.168.0.176'}, function() {
                console.log('Conn Successed');
                client.setEncoding('utf8');
		setInterval(sendData, 1000);
		this.on('data', function(data) {
			console.log(data.toString());
                });
                this.on('end', function() {
                        console.log('disconnected');
                });
                this.on('close', function() {
                        console.log('Socket Closed');
                });
                this.on('error', function(err) {
                        console.log('Socket Error : ', JSON.stringify(err));
                });
        });
        return client;
