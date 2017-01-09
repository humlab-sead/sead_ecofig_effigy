class EnvironmentMarker {

	constructor(viewer, geoJsonFeature) {
		this.viewer = viewer;
		//this.modelType = geoJsonFeature.properties.markerType;

		this.environmentalIndicators = [];
		this.models = [];
		//this.position = Cesium.Cartesian3.fromDegreesArray(geoJsonFeature.geometry.coordinates);
    	this.lng = geoJsonFeature.geometry.coordinates[0];
    	this.lat = geoJsonFeature.geometry.coordinates[1];
    	
    	this.scale = 15000;

    	this.environmentalIndicators = geoJsonFeature.properties.environmentalIndicators;
    	this.modelFiles = getModelsFromEnvironmentalIndicators(geoJsonFeature.properties.environmentalIndicators);
    	this.popupText = "";

    	for(var key in geoJsonFeature.properties.environmentalIndicators) {
    		if(geoJsonFeature.properties.environmentalIndicators[key] > 0) {
    			this.popupText += key+" "+geoJsonFeature.properties.environmentalIndicators[key]+"%<br />";
    		}
    	}

    	//Create a spacing pattern based on the number of models for this environment
    	var modelsNum = this.modelFiles.length;

    	var offsetLat = 0;
    	var offsetLng = 0;
    	var zRotStep = 0;

    	var circleZRotStep = Math.PI / 4;

    	if(modelsNum > 1) {
    		var zRotStep = (2*Math.PI) / modelsNum;
    	}

    	var zRot = 0;

    	this.modelCoords = [];
    	var circleCoords = [];

    	for(var key in this.modelFiles) {

    		if(modelsNum > 1) {
	    		zRot += zRotStep;
	    		offsetLat = Math.sin(zRot) * 0.075;
	    		offsetLng = Math.cos(zRot) * 0.1;
    		}

    		this.modelCoords.push([this.lng+offsetLng, this.lat+offsetLat]);

    		this.makeModel(this.modelFiles[key].model, this.modelCoords[this.modelCoords.length-1], this.modelFiles[key].scale);
    	}

    	var circleZRot = 0.0;
		while(circleZRot < 2*Math.PI) {
    		var circleLng = Math.sin(circleZRot) * 0.2;
    		var circleLat = Math.cos(circleZRot) * 0.15;
    		circleCoords.push(this.lng+circleLng);
    		circleCoords.push(this.lat+circleLat);
    		circleZRot += circleZRotStep;
    	}

    	var circle = viewer.entities.add({
		    name : "Environment",
		    description: this.popupText,
		    polygon : {
		        hierarchy : {
		        	positions: Cesium.Cartesian3.fromDegreesArray(circleCoords),
		        },
		        material : Cesium.Color.ORANGE.withAlpha(0.25)
		    }
		});
	}

	makeModel(modelFilename, modelCoords, modelScale) {

		var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame( Cesium.Cartesian3.fromDegrees(modelCoords[0], modelCoords[1], 0.0) );
		this.models[modelFilename] = this.viewer.scene.primitives.add(Cesium.Model.fromGltf({
		  url : 'resources/Models/'+modelFilename,
		  modelMatrix : modelMatrix,
		  scale : this.scale*modelScale
		}));

	}

	setScaleByHeight(height) {
		this.scale = 0.001 * height;

		/*
		if(this.scale < 1800) {
			this.scale = 1800;
		}
		if(this.scale > 4000) {
			this.scale = 4000;
		}
		*/

		for(var key in this.models) {
			this.models[key].scale = this.scale;
		}

		//this.model.scale = this.scale;
	}

}