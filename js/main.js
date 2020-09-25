/* global activityInfo, saveAmbientLightSample, saveActivitySample, saveAccelerometerSample, saveHeartRateSample, savePPGSample, saveSleepSample, saveRRIntervalSample, connect, bindFilestreams */
/* exported exitApp, aboutClick */
// variables
var ppgSensor, linearAccelerationSensor, lightSensor;
var listenerIdWalking, listenerIdRunning, listenerIdStationary;
var statusText;
var connectButton;
var appStatus = false;
var appVibrate = false;
var documentsDir;


function startHeartRateCollection() {
	appStatus = true;	
	tizen.humanactivitymonitor.start('HRM', function(hrmInfo) {
		var timestamp = new Date().getTime();
		if (hrmInfo.heartRate > 0 && hrmInfo.rRInterval > 0) {
			appVibrate = false;
			saveRRIntervalSample(timestamp + ',' + hrmInfo.rRInterval);
			saveHeartRateSample(timestamp + ',' + hrmInfo.heartRate);
			console.log("HRM: " + hrmInfo.heartRate);
		} else if (hrmInfo.heartRate <= 0) {
			tizen.application.launch("WGvCVP8H7a.SAPTizenClient");
			console.log("HRM: " + hrmInfo.heartRate);
//			if (!appVibrate) {
//				appVibrate = true;
//				navigator.vibrate(700);
//			}
		}
		
	});
	console.log('HRM started');	
}
function startSleepMonitoring() {
	var timestamp = new Date().getTime();
	tizen.humanactivitymonitor.start('SLEEP_MONITOR', function(sleepInfo) {
		saveSleepSample(timestamp + "," + sleepInfo.status);
		console.log("sleep status: " + sleepInfo.status);
	});
	console.log('sleep monitoring started');
}

function startHRMRawCollection() {
	ppgSensor = tizen.sensorservice.getDefaultSensor("HRM_RAW");
	ppgSensor.start(function() {
		ppgSensor.getHRMRawSensorData(function(ppgData) {
			var timestamp = new Date().getTime();
			savePPGSample(timestamp + "," + ppgData.lightIntensity);
		}, function(error) {
			console.log("error occurred:" + error);
		});
		ppgSensor.setChangeListener(function(ppgData) {
			var timestamp = new Date().getTime();
			savePPGSample(timestamp + "," + ppgData.lightIntensity);
		}, 10);
	});
	console.log('HRM Raw collection started');
}
function startLinearAccelerationCollection() {
	linearAccelerationSensor = tizen.sensorservice.getDefaultSensor("LINEAR_ACCELERATION");
	linearAccelerationSensor.start(function() {
		linearAccelerationSensor.getLinearAccelerationSensorData(function(AccData) {
			var timestamp = new Date().getTime();
			saveAccelerometerSample(timestamp + "," + AccData.x + "," + AccData.y + "," + AccData.z);
		}, function(error) {
			console.log("error occurred:" + error);
		});
		linearAccelerationSensor.setChangeListener(function(AccData) {
			var timestamp = new Date().getTime();
			saveAccelerometerSample(timestamp + "," + AccData.x + "," + AccData.y + "," + AccData.z);
		});
	});
	console.log('Linear acc collection started');
}
function startAmbientLightCollection() {
	lightSensor = tizen.sensorservice.getDefaultSensor("LIGHT");
	lightSensor.start(function() {
		lightSensor.getLightSensorData(function(LightData) {
			var timestamp = new Date().getTime();
			saveAmbientLightSample(timestamp + "," + LightData.lightLevel);
			console.log("Ambient light level : " + LightData.lightLevel);
		}, function(error) {
			console.log("error occurred:" + error);
		});
		lightSensor.setChangeListener(function(LightData) {
			var timestamp = new Date().getTime();
			saveAmbientLightSample(timestamp + "," + LightData.lightLevel);
			// console.log("Ambient light level : "+ LightData.lightLevel );
		}, 10);
	});
	console.log('Ambient light sensor start');
}
function startActivityDetection() {
	listenerIdWalking = tizen.humanactivitymonitor.addActivityRecognitionListener('WALKING', function(activityInfo) {
		var timestamp = new Date().getTime();
		saveActivitySample(timestamp + "," + activityInfo.type);
		console.log("activity type: " + activityInfo.type);
	}, function(error) {
		console.log(error.name + ': ' + error.message);
	});
	listenerIdRunning = tizen.humanactivitymonitor.addActivityRecognitionListener('RUNNING', function(activityInfo) {
		var timestamp = new Date().getTime();
		saveActivitySample(timestamp + "," + activityInfo.type);
		console.log("activity type: " + activityInfo.type);
	}, function(error) {
		console.log(error.name + ': ' + error.message);
	});
	listenerIdStationary = tizen.humanactivitymonitor.addActivityRecognitionListener('STATIONARY', function(activityInfo) {
		var timestamp = new Date().getTime();
		saveActivitySample(timestamp + "," + activityInfo.type);
		console.log("activity type: " + activityInfo.type);
	}, function(error) {
		console.log(error.name + ': ' + error.message);
		console.log("activity type: " + activityInfo.type);
	});
}

function stopHeartRateCollection(){
	tizen.humanactivitymonitor.stop('HRM');
	console.log('HRM stopped');
}

function stopHRMRawCollection(){
	ppgSensor.stop();
	console.log('PPG stopped');
}

function stopAmbientLightCollection(){
	lightSensor.stop();
	console.log('Light sensor stopped');
}

function stopLinearAccelerationCollection(){
	linearAccelerationSensor.stop();
	console.log('Linear Acceleration stopped');
}
// sensing overall
function startSensing() {
	
	var HRM_DURATION = 25000; //25secs (~15 to initialize)
	var HRM_PERIOD = HRM_DURATION + 300000; //5mins
	var PPG_DURATION = 25000;
	var PPG_PERIOD = PPG_DURATION + 300000; //5mins
	var ACC_DURATION = 60000; //1min
	var ACC_PERIOD = ACC_DURATION + 600000; //10mins
	var LIGHT_DURATION = 15000;
	var LIGHT_PERIOD = LIGHT_DURATION + 600000; // 10 minutes
	
	startSleepMonitoring();
	startAmbientLightCollection();
	startActivityDetection();
	
	
	//collect HRM every 5 minutes for 25 seconds
	setInterval(startHeartRateCollection, HRM_PERIOD);	
	setTimeout(function(){
		setInterval(stopHeartRateCollection, HRM_PERIOD);
	}, HRM_DURATION);
	
	//collect PPG every 5 minutes for 5 seconds
	setInterval(startHRMRawCollection, PPG_PERIOD);	
	setTimeout(function(){
		setInterval(stopHRMRawCollection, PPG_PERIOD);
	}, PPG_DURATION);
   
	//collect Ambient Light every 10 minutes for 15 seconds
	setInterval(startAmbientLightCollection, LIGHT_PERIOD);	
	setTimeout(function(){
		setInterval(stopAmbientLightCollection, LIGHT_PERIOD);
	}, LIGHT_DURATION);
	

	//collect Linear Acceleration every 10 minutes for 1 minutes
	setInterval(startLinearAccelerationCollection, ACC_PERIOD);	
	setTimeout(function(){
		setInterval(stopLinearAccelerationCollection, ACC_PERIOD);
	}, ACC_DURATION);
}

// onstart
window.onload = function() {
	window.addEventListener('tizenhwkey', function(ev) {
		if (ev.keyName === "back") {
			var page = document.getElementsByClassName('ui-page-active')[0], pageid = page ? page.id : "";
			if (pageid === "main") {
				try {
					if (appStatus) {
						// window.webapis.motion.stop("HRM");
						tizen.application.getCurrentApplication().hide();
					} else {
						tizen.power.release("CPU");
						tizen.power.release("SCREEN");

						tizen.application.getCurrentApplication().exit();
					}
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});

	// bind views
	statusText = document.getElementById("status_text");
	connectButton = document.getElementById("connect_button");
	setConnectionStatusHTML(false);

	// connect to the android agent
	connect();

	// hold the CPU lock
	tizen.power.request("CPU", "CPU_AWAKE");
	tizen.power.request("SCREEN", "SCREEN_NORMAL");

	// acquire permissions and start data collection
	tizen.ppm.requestPermission("http://tizen.org/privilege/mediastorage", function() {
		tizen.ppm.requestPermission("http://tizen.org/privilege/healthinfo", function() {
			tizen.filesystem.resolve("documents", function(dir) {
				documentsDir = dir;
				bindFilestreams();
				startSensing();
			}, function(error) {
				console.log('resolve error : ' + error.message);
			}, "rw");
		}, function(error) {
			console.log('resolve permission error : ' + error.message);
		});
	}, function(error) {
		console.log('resolve permission error : ' + error.message);
	});

	tizen.power.setScreenStateChangeListener(function(oldState, newState) {
		if (newState !== "SCREEN_BRIGHT" || !tizen.power.isScreenOn()) {
			tizen.power.turnScreenOn();
			tizen.power.setScreenBrightness(0.7); // 70%
		}
	});
};

// GUI
function setConnectionStatusHTML(status) {
	if (status) {
		statusText.style.color = '#90F7EC';
		statusText.innerHTML = 'BT : CONNECTED';
		connectButton.style.display = "none";
	} else {
		statusText.style.color = 'red';
		statusText.innerHTML = 'BT : DISCONNECTED';
		connectButton.style.display = "block";
	}
}
function exitApp() {
	tizen.application.getCurrentApplication().exit();
}