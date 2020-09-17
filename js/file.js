/* global sendMessage, documentsDir, onError */
/* exported saveAmbientLightSample, saveActivitySample, saveAccelerometerSample, saveHeartRateSample, savePPGSample, saveLocationSample, saveSleepSample, saveRRIntervalSample, submitFilesToAndroidAgent, bindFilestreams*/

var locationFilename = 'location.txt', locationDataSource = 35, locationCanWrite = false, locationSending = false, locationFilestream = {
	value : null
};
var rrIntervalFilename = 'rrInterval.txt', rrIntervalDataSource = 33, rrIntervalCanWrite = false, rrIntervalSending = false, rrIntervalFilestream = {
	value : null
};
var ppgFilename = 'ppgLightIntensity.txt', ppgDataSource = 30, ppgCanWrite = false, ppgSending = false, ppgFilestream = {
	value : null
};
var activityFilename = 'activity.txt', activityDataSource = 32, activityCanWrite = false, activitySending = false, activityFilestream = {
	value : null
};
var sleepFilename = 'sleep.txt', sleepDataSource = 31, sleepCanWrite = false, sleepSending = false, sleepFilestream = {
	value : null
};
var ambientLightFilename = 'ambientLight.txt', ambientLightDataSource = 37, ambientLightCanWrite = false, ambientLightSending = false, ambientLightFilestream = {
	value : null
};
var heartRateFilename = 'heartRate.txt', heartRateDataSource = 36, heartRateCanWrite = false, heartRateSending = false, heartRateFilestream = {
	value : null
};
var accelerometerFilename = 'accelerometer.txt', accelerometerDataSource = 34, accelerometerCanWrite = false, accelerometerSending = false, accelerometerFilestream = {
	value : null
};

// binding each filestream separately
function bindLocation() {
	// 1. location
	tizen.filesystem.resolve('documents/' + locationFilename, function(file) {
		// location file exists
		file.openStream('w', function(fs) {
			locationFilestream.value = fs;
			locationCanWrite = true;
		}, function(e) {
			console.log('failed to bind to an existing file : ' + locationFilename + ', error : ' + e.message);
			locationCanWrite = false;
		});
	}, function(error) {
		// location file is missing
		var file = documentsDir.createFile(locationFilename);
		if (file === null) {
			console.log('failed to create a new file : ' + locationFilename + ' error: '+ error);
			locationCanWrite = false;
		} else {
			file.openStream('w', function(fs) {
				locationFilestream.value = fs;
				locationCanWrite = true;
			}, function(e) {
				console.log('failed to bind to a new file : ' + locationFilename + ', error : ' + e.message);
				locationCanWrite = false;
			});
		}
	});
}
function bindRrInterval() {
	// 2. rrInterval
	tizen.filesystem.resolve('documents/' + rrIntervalFilename, function(file) {
		// rrInterval file exists
		file.openStream('w', function(fs) {
			rrIntervalFilestream.value = fs;
			rrIntervalCanWrite = true;
		}, function(e) {
			console.log('failed to bind to an existing file : ' + rrIntervalFilename + ', error : ' + e.message);
			rrIntervalCanWrite = false;
		});
	}, function(error) {
		// rrInterval file is missing
		var file = documentsDir.createFile(rrIntervalFilename);
		if (file === null) {
			console.log('failed to create a new file : ' + rrIntervalFilename + ' error: '+ error);
			rrIntervalCanWrite = false;
		} else {
			file.openStream('w', function(fs) {
				rrIntervalFilestream.value = fs;
				rrIntervalCanWrite = true;
			}, function(e) {
				console.log('failed to bind to a new file : ' + rrIntervalFilename + ', error : ' + e.message);
				rrIntervalCanWrite = false;
			});
		}
	});
}
function bindPpg() {
	// 3. ppg
	tizen.filesystem.resolve('documents/' + ppgFilename, function(file) {
		// ppg file exists
		file.openStream('w', function(fs) {
			ppgFilestream.value = fs;
			ppgCanWrite = true;
		}, function(e) {
			console.log('failed to bind to an existing file : ' + ppgFilename + ', error : ' + e.message);
			ppgCanWrite = false;
		});
	}, function(error) {
		// ppg file is missing
		var file = documentsDir.createFile(ppgFilename);
		if (file === null) {
			console.log('failed to create a new file : ' + ppgFilename + ' error: '+ error);
			ppgCanWrite = false;
		} else {
			file.openStream('w', function(fs) {
				ppgFilestream.value = fs;
				ppgCanWrite = true;
			}, function(e) {
				console.log('failed to bind to a new file : ' + ppgFilename + ', error : ' + e.message);
				ppgCanWrite = false;
			});
		}
	});
}
function bindActivity() {
	// 4. activity
	tizen.filesystem.resolve('documents/' + activityFilename, function(file) {
		// activity file exists
		file.openStream('w', function(fs) {
			activityFilestream.value = fs;
			activityCanWrite = true;
		}, function(e) {
			console.log('failed to bind to an existing file : ' + activityFilename + ', error : ' + e.message);
			activityCanWrite = false;
		});
	}, function(error) {
		// activity file is missing
		var file = documentsDir.createFile(activityFilename);
		if (file === null) {
			console.log('failed to create a new file : ' + activityFilename + ' error: '+ error);
			activityCanWrite = false;
		} else {
			file.openStream('w', function(fs) {
				activityFilestream.value = fs;
				activityCanWrite = true;
			}, function(e) {
				console.log('failed to bind to a new file : ' + activityFilename + ', error : ' + e.message);
				activityCanWrite = false;
			});
		}
	});
}
function bindSleep() {
	// 5. sleep
	tizen.filesystem.resolve('documents/' + sleepFilename, function(file) {
		// sleep file exists
		file.openStream('w', function(fs) {
			sleepFilestream.value = fs;
			sleepCanWrite = true;
		}, function(e) {
			console.log('failed to bind to an existing file : ' + sleepFilename + ', error : ' + e.message);
			sleepCanWrite = false;
		});
	}, function(error) {
		// sleep file is missing
		var file = documentsDir.createFile(sleepFilename);
		if (file === null) {
			console.log('failed to create a new file : ' + sleepFilename + ' error: '+ error);
			sleepCanWrite = false;
		} else {
			file.openStream('w', function(fs) {
				sleepFilestream.value = fs;
				sleepCanWrite = true;
			}, function(e) {
				console.log('failed to bind to a new file : ' + sleepFilename + ', error : ' + e.message);
				sleepCanWrite = false;
			});
		}
	});
}
function bindAmbientLight() {
	// 6. ambientLight
	tizen.filesystem.resolve('documents/' + ambientLightFilename, function(file) {
		// ambientLight file exists
		file.openStream('w', function(fs) {
			ambientLightFilestream.value = fs;
			ambientLightCanWrite = true;
		}, function(e) {
			console.log('failed to bind to an existing file : ' + ambientLightFilename + ', error : ' + e.message);
			ambientLightCanWrite = false;
		});
	}, function(error) {
		// ambientLight file is missing
		var file = documentsDir.createFile(ambientLightFilename);
		if (file === null) {
			console.log('failed to create a new file : ' + ambientLightFilename + ' error: '+ error);
			ambientLightCanWrite = false;
		} else {
			file.openStream('w', function(fs) {
				ambientLightFilestream.value = fs;
				ambientLightCanWrite = true;
			}, function(e) {
				console.log('failed to bind to a new file : ' + ambientLightFilename + ', error : ' + e.message);
				ambientLightCanWrite = false;
			});
		}
	});
}
function bindHeartRate() {
	// 7. heartRate
	tizen.filesystem.resolve('documents/' + heartRateFilename, function(file) {
		// heartRate file exists
		file.openStream('w', function(fs) {
			heartRateFilestream.value = fs;
			heartRateCanWrite = true;
		}, function(e) {
			console.log('failed to bind to an existing file : ' + heartRateFilename + ', error : ' + e.message);
			heartRateCanWrite = false;
		});
	}, function(error) {
		// heartRate file is missing
		var file = documentsDir.createFile(heartRateFilename);
		if (file === null) {
			console.log('failed to create a new file : ' + heartRateFilename + ' error: '+ error);
			heartRateCanWrite = false;
		} else {
			file.openStream('w', function(fs) {
				heartRateFilestream.value = fs;
				heartRateCanWrite = true;
			}, function(e) {
				console.log('failed to bind to a new file : ' + heartRateFilename + ', error : ' + e.message);
				heartRateCanWrite = false;
			});
		}
	});
}
function bindAccelerometer() {
	// 8. accelerometer
	tizen.filesystem.resolve('documents/' + accelerometerFilename, function(file) {
		// accelerometer file exists
		file.openStream('w', function(fs) {
			accelerometerFilestream.value = fs;
			accelerometerCanWrite = true;
		}, function(e) {
			console.log('failed to bind to an existing file : ' + accelerometerFilename + ', error : ' + e.message);
			accelerometerCanWrite = false;
		});
	}, function(error) {
		// accelerometer file is missing
		var file = documentsDir.createFile(accelerometerFilename);
		if (file === null) {
			console.log('failed to create a new file : ' + accelerometerFilename + ' error: '+ error);
			accelerometerCanWrite = false;
		} else {
			file.openStream('w', function(fs) {
				accelerometerFilestream.value = fs;
				accelerometerCanWrite = true;
			}, function(e) {
				console.log('failed to bind to a new file : ' + accelerometerFilename + ', error : ' + e.message);
				accelerometerCanWrite = false;
			});
		}
	});
}
// binding all filestreams
function bindFilestreams() {
	bindLocation();
	bindRrInterval();
	bindPpg();
	bindActivity();
	bindSleep();
	bindAmbientLight();
	bindHeartRate();
	bindAccelerometer();
}

// submitting each data source separately
function submitLocations() {
	// 1. location
	locationCanWrite = false;
	locationFilestream.value.close();
	documentsDir.moveTo('documents/' + locationFilename, 'documents/old_' + locationFilename, true, function() {
		bindLocation();
		tizen.filesystem.resolve('documents/old_' + locationFilename, function(file) {
			file.readAsText(function(str) {
				locationSending = true;
				if (str.length === 0 || sendMessage(str)) {
					documentsDir.deleteFile('documents/old_' + locationFilename, function() {
						console.log('old_' + locationFilename + ' deleted');
					}, function(e) {
						console.log('failed to delete ' + locationFilename + ', error : ' + e.message);
					});
				}
				locationSending = false;
			}, null, 'UTF-8');
		}, null);
	}, function(error) {
		console.log('failed to move the file ' + locationFilename + ' error: '+ error);
		onError();
	});
}
function submitRrInterval() {
	// 2. rrInterval
	rrIntervalCanWrite = false;
	rrIntervalFilestream.value.close();
	documentsDir.moveTo('documents/' + rrIntervalFilename, 'documents/old_' + rrIntervalFilename, true, function() {
		bindRrInterval();
		tizen.filesystem.resolve('documents/old_' + rrIntervalFilename, function(file) {
			file.readAsText(function(str) {
				rrIntervalSending = true;
				if (str.length === 0 || sendMessage(str)) {
					documentsDir.deleteFile('documents/old_' + rrIntervalFilename, function() {
						console.log('old_' + rrIntervalFilename + ' deleted');
					}, function(e) {
						console.log('failed to delete ' + rrIntervalFilename + ', error : ' + e.message);
					});
				}
				rrIntervalSending = false;
			}, null, 'UTF-8');
		}, null);
	}, function(error) {
		console.log('failed to move the file ' + rrIntervalFilename + ' error: '+ error);
		onError();
	});
}
function submitPPG() {
	// 3. ppg
	ppgCanWrite = false;
	ppgFilestream.value.close();
	documentsDir.moveTo('documents/' + ppgFilename, 'documents/old_' + ppgFilename, true, function() {
		bindPpg();
		tizen.filesystem.resolve('documents/old_' + ppgFilename, function(file) {
			file.readAsText(function(str) {
				ppgSending = true;
				if (str.length === 0 || sendMessage(str)) {
					documentsDir.deleteFile('documents/old_' + ppgFilename, function() {
						console.log('old_' + ppgFilename + ' deleted');
					}, function(e) {
						console.log('failed to delete ' + ppgFilename + ', error : ' + e.message);
					});
				}
				ppgSending = false;
			}, null, 'UTF-8');
		}, null);
	}, function(error) {
		console.log('failed to move the file ' + ppgFilename + ' error: '+ error);
		onError();
	});
}
function submitActivity() {
	// 4. activity
	activityCanWrite = false;
	activityFilestream.value.close();
	documentsDir.moveTo('documents/' + activityFilename, 'documents/old_' + activityFilename, true, function() {
		bindActivity();
		tizen.filesystem.resolve('documents/old_' + activityFilename, function(file) {
			file.readAsText(function(str) {
				activitySending = true;
				if (str.length === 0 || sendMessage(str)) {
					documentsDir.deleteFile('documents/old_' + activityFilename, function() {
						console.log('old_' + activityFilename + ' deleted');
					}, function(e) {
						console.log('failed to delete ' + activityFilename + ', error : ' + e.message);
					});
				}
				activitySending = false;
			}, null, 'UTF-8');
		}, null);
	}, function(error) {
		console.log('failed to move the file ' + activityFilename + ' error: '+ error);
		onError();
	});
}
function submitSleep() {
	// 5. sleep
	sleepCanWrite = false;
	sleepFilestream.value.close();
	documentsDir.moveTo('documents/' + sleepFilename, 'documents/old_' + sleepFilename, true, function() {
		bindSleep();
		tizen.filesystem.resolve('documents/old_' + sleepFilename, function(file) {
			file.readAsText(function(str) {
				sleepSending = true;
				if (str.length === 0 || sendMessage(str)) {
					documentsDir.deleteFile('documents/old_' + sleepFilename, function() {
						console.log('old_' + sleepFilename + ' deleted');
					}, function(e) {
						console.log('failed to delete ' + sleepFilename + ', error : ' + e.message);
					});
				}
				sleepSending = false;
			}, null, 'UTF-8');
		}, null);
	}, function(error) {
		console.log('failed to move the file ' + sleepFilename + ' error: '+ error);
		onError();
	});
}
function submitAmbientLight() {
	// 6. ambientLight
	ambientLightCanWrite = false;
	ambientLightFilestream.value.close();
	documentsDir.moveTo('documents/' + ambientLightFilename, 'documents/old_' + ambientLightFilename, true, function() {
		bindAmbientLight();
		tizen.filesystem.resolve('documents/old_' + ambientLightFilename, function(file) {
			file.readAsText(function(str) {
				ambientLightSending = true;
				if (str.length === 0 || sendMessage(str)) {
					documentsDir.deleteFile('documents/old_' + ambientLightFilename, function() {
						console.log('old_' + ambientLightFilename + ' deleted');
					}, function(e) {
						console.log('failed to delete ' + ambientLightFilename + ', error : ' + e.message);
					});
				}
				ambientLightSending = false;
			}, null, 'UTF-8');
		}, null);
	}, function(error) {
		console.log('failed to move the file ' + ambientLightFilename + ' error: '+ error);
		onError();
	});
}
function submitHeartRate() {
	// 7. heartRate
	heartRateCanWrite = false;
	heartRateFilestream.value.close();
	documentsDir.moveTo('documents/' + heartRateFilename, 'documents/old_' + heartRateFilename, true, function() {
		bindHeartRate();
		tizen.filesystem.resolve('documents/old_' + heartRateFilename, function(file) {
			file.readAsText(function(str) {
				heartRateSending = true;
				if (str.length === 0 || sendMessage(str)) {
					documentsDir.deleteFile('documents/old_' + heartRateFilename, function() {
						console.log('old_' + heartRateFilename + ' deleted');
					}, function(e) {
						console.log('failed to delete ' + heartRateFilename + ', error : ' + e.message);
					});
				}
				heartRateSending = false;
			}, null, 'UTF-8');
		}, null);
	}, function(error) {
		console.log('failed to move the file ' + heartRateFilename + ' error: '+ error);
		onError();
	});
}
function submitAccelerometer() {
	// 8. accelerometer
	accelerometerCanWrite = false;
	accelerometerFilestream.value.close();
	documentsDir.moveTo('documents/' + accelerometerFilename, 'documents/old_' + accelerometerFilename, true, function() {
		bindAccelerometer();
		tizen.filesystem.resolve('documents/old_' + accelerometerFilename, function(file) {
			file.readAsText(function(str) {
				accelerometerSending = true;
				if (str.length === 0 || sendMessage(str)) {
					documentsDir.deleteFile('documents/old_' + accelerometerFilename, function() {
						console.log('old_' + accelerometerFilename + ' deleted');
					}, function(e) {
						console.log('failed to delete ' + accelerometerFilename + ', error : ' + e.message);
					});
				}
				accelerometerSending = false;
			}, null, 'UTF-8');
		}, null);
	}, function(error) {
		console.log('failed to move the file ' + accelerometerFilename + ' error: '+ error);
		onError();
	});
}
// submitting all data sources
function submitFilesToAndroidAgent() {
	if (!locationSending) {
		submitLocations();
	}
	if (!rrIntervalSending) {
		submitRrInterval();
	}
	if (!ppgSending) {
		submitPPG();
	}
	if (!activitySending) {
		submitActivity();
	}
	if (!sleepSending) {
		submitSleep();
	}
	if (!ambientLightSending) {
		submitAmbientLight();
	}
	if (!heartRateSending) {
		submitHeartRate();
	}
	if (!accelerometerSending) {
		submitAccelerometer();
	}
}

// saving a sampled data
function saveLocationSample(sample) {
	if (locationCanWrite) {
		locationFilestream.value.write(locationDataSource + ',' + sample + '\n');
	}
}
function saveRRIntervalSample(sample) {
	if (rrIntervalCanWrite) {
		rrIntervalFilestream.value.write(rrIntervalDataSource + ',' + sample + '\n');
	}
}
function savePPGSample(sample) {
	if (ppgCanWrite) {
		ppgFilestream.value.write(ppgDataSource + ',' + sample + '\n');
	}
}
function saveActivitySample(sample) {
	if (activityCanWrite) {
		activityFilestream.value.write(activityDataSource + ',' + sample + '\n');
	}
}
function saveSleepSample(sample) {
	if (sleepCanWrite) {
		sleepFilestream.value.write(sleepDataSource + ',' + sample + '\n');
	}
}
function saveAmbientLightSample(sample) {
	if (ambientLightCanWrite) {
		ambientLightFilestream.value.write(ambientLightDataSource + ',' + sample + '\n');
	}
}
function saveHeartRateSample(sample) {
	if (heartRateCanWrite) {
		heartRateFilestream.value.write(heartRateDataSource + ',' + sample + '\n');
	}
}
function saveAccelerometerSample(sample) {
	if (accelerometerCanWrite) {
		accelerometerFilestream.value.write(accelerometerDataSource + ',' + sample + '\n');
	}
}
