/* exported sendMessage */
/* global submitFilesToAndroidAgent, setConnectionStatusHTML */


const ProviderAppName = "SAPAndroidClient", CHANNELID = 110;
var SASocket = null;
var SAAgent = null;

var agentCallback = {
	onconnect : function(socket) {
		SASocket = socket;
		SASocket.setDataReceiveListener(onreceive);
		console.log("connected to the SAPAndroidClient");
		setConnectionStatusHTML(true);

		SASocket.setSocketStatusListener(function(reason) {
			console.log("Connection with SAPAndroidClient lost. Reason : [" + reason + "]");
			disconnect();
			setConnectionStatusHTML(false);
		});
	},
	onerror : onerror
};

var peerAgentFindCallback = {
	onpeeragentfound : function(peerAgent) {
		try {
			if (peerAgent.appName === ProviderAppName) {
				SAAgent.setServiceConnectionListener(agentCallback);
				SAAgent.requestServiceConnection(peerAgent);
			} else {
				alert("Different app : " + peerAgent.appName);
			}
		} catch (err) {
			console.log("Failed to request service connection [" + err.name + "] msg[" + err.message + "]");
		}
	},
	onerror : onerror
};

function onsuccess(agents) {
	try {
		if (agents.length > 0) {
			SAAgent = agents[0];

			SAAgent.setPeerAgentFindListener(peerAgentFindCallback);
			SAAgent.findPeerAgents();
		} else {
			alert("SAPAndroidClient not found!");
		}
	} catch (err) {
		console.log("Failed to find peers [" + err.name + "] msg[" + err.message + "]");
	}
}

function connect() {
	if (SASocket) {
		alert('Already connected!');

		SASocket.setSocketStatusListener(function(reason) {
			console.log("Service connection lost. Reason : [" + reason + "]");
			disconnect();
		});

		return false;
	}
	try {
		webapis.sa.requestSAAgent(onsuccess, function(err) {
			console.log("Failed to request SAAgent [" + err.name + "] msg[" + err.message + "]");
		});
	} catch (err) {
		console.log("Failed to request SAAgent [" + err.name + "] msg[" + err.message + "]");
	}
}

function disconnect() {
	try {
		if (SASocket !== null) {
			SASocket.close();
			SASocket = null;

			console.log("disconnected from SAPAndroidClient");
		}
	} catch (err) {
		console.log("Failed to disconnect [" + err.name + "] msg[" + err.message + "]");
	}
}

function sendMessage(data) {
	try {
		if (SASocket === null) {
			connect();
			return false;
		}
		SASocket.sendData(CHANNELID, data);
		return true;
	} catch (err) {
		console.log("Failed to send data [" + err.name + "] msg[" + err.message + "]");
		return false;
	}
}

function onreceive(channelId, data) {
	if (data.length === 1) {
		submitFilesToAndroidAgent();
	}
}