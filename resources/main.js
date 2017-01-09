

var environmentalIndicators2ModelsTranslation = {
  "Aquatics":                     "waterdrop.gltf",
  "Carrion":                      "carcass.gltf",
  "Disturbed/arable":             "plow.gltf",
  "Dung/foul habitats":           "dung.gltf", //Double with "Indicators: Dung"!
  "General synanthropic":         "human.gltf",
  "Halotolerant":                 "salt2.gltf",
  "Heathland & moorland":         "grass.gltf",
  "Indicators: Coniferous":       "pine2.gltf",
  "Indicators: Deciduous":        "tree-deciduous.gltf",
  "Indicators: Dung":             "dung.gltf",
  "Indicators: Running water":    "stream.gltf",
  "Indicators: Standing water":   "pond.gltf",
  "Meadowland":                   "flower2.gltf",
  "Open wet habitats":            "water-meadow.gltf",
  "Pasture/Dung":                 "fence.gltf",
  "Sandy/dry disturbed/arable":   "",
  "Stored grain pest":            "wheat.gltf",
  "Wetlands/marshes":             "marsh.gltf",
  "Wood and trees":               "tree5.gltf"
};

/*
var environmentalIndicators2ModelsTranslation = {
  "Aquatics":                     "tree2.gltf",
  "Carrion":                      "tree2.gltf",
  "Disturbed/arable":             "tree2.gltf",
  "Dung/foul habitats":           "", //Double with "Indicators: Dung"!
  "General synanthropic":         "tree2.gltf",
  "Halotolerant":                 "tree2.gltf",
  "Heathland & moorland":         "tree2.gltf",
  "Indicators: Coniferous":       "tree2.gltf",
  "Indicators: Deciduous":        "tree2.gltf",
  "Indicators: Dung":             "",
  "Indicators: Running water":    "tree2.gltf",
  "Indicators: Standing water":   "tree2.gltf",
  "Meadowland":                   "tree2.gltf",
  "Open wet habitats":            "tree2.gltf",
  "Pasture/Dung":                 "tree2.gltf",
  "Sandy/dry disturbed/arable":   "",
  "Stored grain pest":            "tree2.gltf",
  "Wetlands/marshes":             "tree2.gltf",
  "Wood and trees":               "tree2.gltf"
};
*/

var markers = [];
var lastHeight = 0;
var viewer = null;

$(document).ready(function() {

  new Timeline();

  
  Cesium.BingMapsApi.defaultKey = "AtX_asZEVy_1leXfOPX_93jqHdVNDK1_c4m_vafwQLV5-2GLt6yLQIjIQZJHWKSp";

    viewer = new Cesium.Viewer('cesiumContainer', {
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url : 'http://{s}.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png',
      }),
      baseLayerPicker : false,
      //imageryProviderViewModels: [],
      terrainProvider: null,
      /*
      terrainProvider : new Cesium.CesiumTerrainProvider({
        url : 'https://assets.agi.com/stk-terrain/world',
        requestWaterMask: true,
        requestVertexNormals: true
      }),
      */
      terrainExaggeration: 10.0,
      shadows: true,
      mapProjection : new Cesium.WebMercatorProjection(),
      animation: false,
      timeline: false
    });

  viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(-1.257677, 48.752022, 600000.0),
    orientation : {
        heading : Cesium.Math.toRadians(180.0),
        pitch : Cesium.Math.toRadians(-120.0),
        roll : Math.PI
    }
  });

  var promise = Cesium.loadJson("/pvs/data/geo2.json");
  promise.then(function(jsonData) {
    //console.log(jsonData);
    loadMarkers(jsonData.features);
  }).otherwise(function(error) {
    console.log(error);
  });
  


  /*
  var intervalHandle = setInterval(function() {
    var height = getDistanceToTerrain();

    if(height != lastHeight) {
      for(var key in markers) {
        markers[key].setScaleByHeight(height);
      }
      lastHeight = height;
    }
   }, 250);
  */

});

function loadMarkers(data) {
  for(var key in data) {
    //Merge with existing marker in close proximity (if any)

    var collisionKey = markerMerge(data[key], 15000);
    if(collisionKey !== false) {
      var marker = markers[collisionKey];
      mergeWithMarker(marker, data[key]);
    }
    else {
      var m = new EnvironmentMarker(viewer, data[key]);
      markers.push(m);
    }
  }
}

function mergeWithMarker(marker, data) {

  //Update Coords

  var pointA = Cesium.Cartesian3.fromDegreesArray([marker.lng, marker.lat]);
  var pointB = Cesium.Cartesian3.fromDegreesArray(data.geometry.coordinates);

  var avgLng = null;
  var avgLat = null;

  if(marker.lng > data.geometry.coordinates[0]) {
    avgLng = marker.lng - (marker.lng - data.geometry.coordinates[0]);
  }
  else {
    avgLng = data.geometry.coordinates[0] - (data.geometry.coordinates[0] - marker.lng);
  }

  if(marker.lat > data.geometry.coordinates[1]) {
    avgLat = marker.lat - (marker.lat - data.geometry.coordinates[1]);
  }
  else {
    avgLat = data.geometry.coordinates[1] - (data.geometry.coordinates[1] - marker.lat);
  }

  marker.lng = avgLng;
  marker.lat = avgLat;  

  //Update EI
  for(var ei in data.properties.environmentalIndicators) {
    var eiValue = data.properties.environmentalIndicators[ei];
    
    marker.environmentalIndicators[ei] = (marker[ei] + eiValue) / 2; //Modify percentage

    /*
    var eiFound = false;
    for(var markerEi in marker.environments) {
      if(markerEi == ei) {
        eiFound = true;
        marker[markerEi] = (marker[markerEi] + eiValue) / 2; //Modify percentage
      }
    }

    if(!eiFound) {
      console.log("EI NOT FOUND");
      marker.environmentalIndicators[ei] = eiValue;
    }
    */

  }
}


function markerMerge(env, mergeDistance) {

  for(var key in markers) {
    var markerPos = Cesium.Cartesian3.fromDegrees(markers[key].lng, markers[key].lat);
    var envPos = Cesium.Cartesian3.fromDegrees(env.geometry.coordinates[0], env.geometry.coordinates[1]);
    var distance = Cesium.Cartesian3.distance(markerPos, envPos);
    //console.log(distance);
    if(distance < mergeDistance) {
      return key;
    }
  }
  return false;
}

function getDistanceToTerrain() {
    var cameraPosition = viewer.scene.camera.positionWC;
    var ellipsoidPosition = viewer.scene.globe.ellipsoid.scaleToGeodeticSurface(cameraPosition);
    var distance = Cesium.Cartesian3.magnitude(Cesium.Cartesian3.subtract(cameraPosition, ellipsoidPosition, new Cesium.Cartesian3()));
    return distance;
  }

function addEntity(entityData) {

  var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame( Cesium.Cartesian3.fromDegrees(entityData.coordinates[0], entityData.coordinates[1], 0.0) );

  var model = Cesium.Model.fromGltf({
      url : 'lib/client/cesium/Apps/Models/tree1.glb',
      //url : 'lib/client/cesium/Apps/Models/'+entityData.type+'.glb',
      modelMatrix : modelMatrix,
      scale : 20000.0,
      show: true
  });

  var entity = new Cesium.Entity({
    name: "",
    show: true,
    position: Cesium.Cartesian3.fromDegrees(1, 2, 0),
    model: model
  });
  
  myDataSource.entities.add(entity);
  
}

function addModel(type, coordinates) {
  //var coordinates = [-75.62898254394531, 40.02804946899414];
  var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame( Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], 0.0) );
  var model = scene.primitives.add(Cesium.Model.fromGltf({
      url : 'lib/client/cesium/Apps/Models/tree1.glb',
      //url : 'lib/client/cesium/Apps/Models/'+type+'.glb',
      modelMatrix : modelMatrix,
      scale : 20000.0
  }));
}

function getModelsFromEnvironmentalIndicators(environmentalIndicators) {
  
  //console.log(environmentalIndicators);

  var models = [];

  for(var key in environmentalIndicators) {
    if(!(key in environmentalIndicators2ModelsTranslation)) {
      //console.log("No key: "+key);
    }

    if(environmentalIndicators[key] > 0) {
      if(environmentalIndicators2ModelsTranslation[key] != "") {
        models.push({
          model: environmentalIndicators2ModelsTranslation[key],
          scale: parseFloat(environmentalIndicators[key] / 100)
        });
      }
    }
  }
  //console.log(models);
  return models;
}

