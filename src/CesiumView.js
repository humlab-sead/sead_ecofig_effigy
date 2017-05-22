"use strict";

// Alt #1: var Viewer = require('cesium/Source/Widgets/Viewer/Viewer');
// Alt #1: var Cesium = require('cesium/Source/Cesium');
import { default as Cesium } from "cesiumDll/Cesium";

//import { default as ecofigConfig } from './config.js';
import { default as cesiumUtility } from './CesiumUtility.js';

// const terrainProviders = [

//     new Cesium.CesiumTerrainProvider({
//         url: 'https://assets.agi.com/stk-terrain/world',
//         requestWaterMask: true,
//         requestVertexNormals: true
//     })

// ];
//     layers.removeAll();

const imageryProviders = [

    {
        name: 'Tiles mapbox',
        provider: new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png',
        })
    }, {

        /*
        ** 1) Natural Earth II layer downloaded from
                http://www.naturalearthdata.com/downloads/10m-raster-data/10m-natural-earth-2/
        ** 2) ImagePyramid plugin (v2.5) downloaded from
                https://sourceforge.net/projects/geoserver/files/GeoServer/2.5/extensions/
              Jar file in downloaded package copied to
                /var/lib/tomcat7/webapps/geoserver/WB-INF/lib
              Tomcat & Apache restarted:
                /etc/init.d/tomcat7 restart
        ** 3) GDAL tools installed
                apt-get install gdal-bin
                apt-get install dans-gdal-scripts (necessary?)
                apt-get install python-gdal
        ** 4) Pyramid built with:
                gdal_retile.py -v -s_srs EPSG:4326 -r bilinear -levels 4 -ps 512 512 -co "TILED=YES" \
                    -co "COMPRESS=JPEG" -targetDir pyramid/ NE2_HR_LC_SR_W_DR.tif.gz
              Files copied to /var/geodata/workspaces/NE2_HR_LC_SR_W_DR
        ** 5) Store "NE2_pyramid" created in GeoServer (type "ImagePyramid") 
        */
        name: 'NE2 HR pyramid',
        provider: new Cesium.WebMapServiceImageryProvider({
            url : 'http://geoserver.humlab.umu.se:8080/geoserver/sead/wms',        
            layers: 'NE2_HR_LC_SR_W_DR',
                
        })
    }
];

class CesiumView {

    constructor(container /*, config=ecofigConfig*/) {

        Cesium.BingMapsApi.defaultKey = "AtX_asZEVy_1leXfOPX_93jqHdVNDK1_c4m_vafwQLV5-2GLt6yLQIjIQZJHWKSp";

        //let terrainProvider = terrainProviders[0];

        this.viewer = new Cesium.Viewer(container, {
            homeButton: false,
            infoBox: true,
            imageryProvider: imageryProviders[1].provider,
            baseLayerPicker: false,
            //terrainProvider: terrainProvider,
            terrainExaggeration: 3.0,
            shadows: false, //true,
            mapProjection: new Cesium.WebMercatorProjection(),
            animation: false,
            timeline: false,
            sceneMode: Cesium.SceneMode.COLUMBUS_VIEW
        });

    }

    flyTo(destination, orientation) { 
        cesiumUtility.flyTo(this.viewer.camera, destination, orientation);
    }

    display(models) {
        models.forEach(x => { x.forEach(y => this.viewer.entities.add(y)); });
    }

    reset() {
        this.viewer.entities.removeAll();
    }

}

export default CesiumView;

// const imageryProviders = [
//     {
//         name: 'Bing Maps Aerial',
//         provider: undefined
//     },  // the current base layer
//     {
//         name: 'Bing Maps Road',
//         provider: new Cesium.BingMapsImageryProvider({
//             url: 'https://dev.virtualearth.net',
//             mapStyle: Cesium.BingMapsStyle.ROAD
//         })
//     },
//     {
//         name: 'ArcGIS World Street Maps',
//         provider: new Cesium.ArcGisMapServerImageryProvider({
//             url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
//         })
//     },
//     {
//         name: 'OpenStreetMaps',
//         provider: Cesium.createOpenStreetMapImageryProvider()
//     },
//     {
//         name: 'MapQuest OpenStreetMaps',
//         provider: Cesium.createOpenStreetMapImageryProvider({
//             url: 'https://otile1-s.mqcdn.com/tiles/1.0.0/osm/'
//         })
//     },
//     {
//         name: 'Stamen Maps',
//         provider:
//         Cesium.createOpenStreetMapImageryProvider({
//             url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/',
//             fileExtension: 'jpg',
//             credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
//         })
//     },
//     {
//         name: 'Natural Earth II (local)',
//         provider:
//         Cesium.createTileMapServiceImageryProvider({
//             url: require.toUrl('Assets/Textures/NaturalEarthII')
//         })
//     },
//     {
//         name: 'USGS Shaded Relief (via WMTS)',
//         provider:
//         new Cesium.WebMapTileServiceImageryProvider({
//             url: 'http://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer/WMTS',
//             layer: 'USGSShadedReliefOnly',
//             style: 'default',
//             format: 'image/jpeg',
//             tileMatrixSetID: 'default028mm',
//             maximumLevel: 19,
//             credit: new Cesium.Credit('U. S. Geological Survey')
//         })
//     }

// ];

// const baseLayers = imageryLayers.map(x => { }
// function addBaseLayerOption(name, imageryProvider) {
//     var layer;
//     if (typeof imageryProvider === 'undefined') {
//         layer = imageryLayers.get(0);
//         viewModel.selectedLayer = layer;
//     } else {
//         layer = new Cesium.ImageryLayer(imageryProvider);
//     }

//     layer.name = name;
//     baseLayers.push(layer);
// }


// // ######################################

// var viewer = new Cesium.Viewer('cesiumContainer', {
//     baseLayerPicker : false
// });
// var imageryLayers = viewer.imageryLayers;

// var viewModel = {
//     layers : [],
//     baseLayers : [],
//     upLayer : null,
//     downLayer : null,
//     selectedLayer : null,
//     isSelectableLayer : function(layer) {
//         return baseLayers.indexOf(layer) >= 0;
//     },
//     raise : function(layer, index) {
//         imageryLayers.raise(layer);
//         viewModel.upLayer = layer;
//         viewModel.downLayer = viewModel.layers[Math.max(0, index - 1)];
//         updateLayerList();
//         window.setTimeout(function() { viewModel.upLayer = viewModel.downLayer = null; }, 10);
//     },
//     lower : function(layer, index) {
//         imageryLayers.lower(layer);
//         viewModel.upLayer = viewModel.layers[Math.min(viewModel.layers.length - 1, index + 1)];
//         viewModel.downLayer = layer;
//         updateLayerList();
//         window.setTimeout(function() { viewModel.upLayer = viewModel.downLayer = null; }, 10);
//     },
//     canRaise : function(layerIndex) {
//         return layerIndex > 0;
//     },
//     canLower : function(layerIndex) {
//         return layerIndex >= 0 && layerIndex < imageryLayers.length - 1;
//     }
// };
// Cesium.knockout.track(viewModel);

// var baseLayers = viewModel.baseLayers;

// function setupLayers() {
//     addBaseLayerOption(
//             'Bing Maps Aerial',
//             undefined); // the current base layer
//     addBaseLayerOption(
//             'Bing Maps Road',
//             new Cesium.BingMapsImageryProvider({
//                 url : 'https://dev.virtualearth.net',
//                 mapStyle: Cesium.BingMapsStyle.ROAD
//             }));
//     addBaseLayerOption(
//             'ArcGIS World Street Maps',
//             new Cesium.ArcGisMapServerImageryProvider({
//                 url : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
//             }));
//     addBaseLayerOption(
//             'OpenStreetMaps',
//             Cesium.createOpenStreetMapImageryProvider());
//     addBaseLayerOption(
//             'MapQuest OpenStreetMaps',
//             Cesium.createOpenStreetMapImageryProvider({
//                 url : 'https://otile1-s.mqcdn.com/tiles/1.0.0/osm/'
//             }));
//     addBaseLayerOption(
//             'Stamen Maps',
//             Cesium.createOpenStreetMapImageryProvider({
//                 url : 'https://stamen-tiles.a.ssl.fastly.net/watercolor/',
//                 fileExtension: 'jpg',
//                 credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
//             }));
//     addBaseLayerOption(
//             'Natural Earth II (local)',
//             Cesium.createTileMapServiceImageryProvider({
//                 url : require.toUrl('Assets/Textures/NaturalEarthII')
//             }));
//     addBaseLayerOption(
//             'USGS Shaded Relief (via WMTS)',
//             new Cesium.WebMapTileServiceImageryProvider({
//                 url : 'http://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer/WMTS',
//                 layer : 'USGSShadedReliefOnly',
//                 style : 'default',
//                 format : 'image/jpeg',
//                 tileMatrixSetID : 'default028mm',
//                 maximumLevel: 19,
//                 credit : new Cesium.Credit('U. S. Geological Survey')
//             }));

//     // Create the additional layers
//     addAdditionalLayerOption(
//             'United States GOES Infrared',
//             new Cesium.WebMapServiceImageryProvider({
//                 url : 'https://mesonet.agron.iastate.edu/cgi-bin/wms/goes/conus_ir.cgi?',
//                 layers : 'goes_conus_ir',
//                 credit : 'Infrared data courtesy Iowa Environmental Mesonet',
//                 parameters : {
//                     transparent : 'true',
//                     format : 'image/png'
//                 },
//                 proxy : new Cesium.DefaultProxy('/proxy/')
//             }));
//     addAdditionalLayerOption(
//             'United States Weather Radar',
//             new Cesium.WebMapServiceImageryProvider({
//                 url : 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?',
//                 layers : 'nexrad-n0r',
//                 credit : 'Radar data courtesy Iowa Environmental Mesonet',
//                 parameters : {
//                     transparent : 'true',
//                     format : 'image/png'
//                 },
//                 proxy : new Cesium.DefaultProxy('/proxy/')
//             }));
//     addAdditionalLayerOption(
//             'TileMapService Image',
//             Cesium.createTileMapServiceImageryProvider({
//                 url : '../images/cesium_maptiler/Cesium_Logo_Color'
//             }),
//             0.2);
//     addAdditionalLayerOption(
//             'Single Image',
//             new Cesium.SingleTileImageryProvider({
//                 url : '../images/Cesium_Logo_overlay.png',
//                 rectangle : Cesium.Rectangle.fromDegrees(-115.0, 38.0, -107, 39.75)
//             }),
//             1.0);
//     addAdditionalLayerOption(
//             'Grid',
//             new Cesium.GridImageryProvider(), 1.0, false);
//     addAdditionalLayerOption(
//             'Tile Coordinates',
//             new Cesium.TileCoordinatesImageryProvider(), 1.0, false);
// }

// const baseLayers = imageryLayers.map(x => )
// function addBaseLayerOption(name, imageryProvider) {
//     var layer;
//     if (typeof imageryProvider === 'undefined') {
//         layer = imageryLayers.get(0);
//         viewModel.selectedLayer = layer;
//     } else {
//         layer = new Cesium.ImageryLayer(imageryProvider);
//     }

//     layer.name = name;
//     baseLayers.push(layer);
// }

// function addAdditionalLayerOption(name, imageryProvider, alpha, show) {
//     var layer = imageryLayers.addImageryProvider(imageryProvider);
//     layer.alpha = Cesium.defaultValue(alpha, 0.5);
//     layer.show = Cesium.defaultValue(show, true);
//     layer.name = name;
//     Cesium.knockout.track(layer, ['alpha', 'show', 'name']);
// }

// function updateLayerList() {
//     var numLayers = imageryLayers.length;
//     viewModel.layers.splice(0, viewModel.layers.length);
//     for (var i = numLayers - 1; i >= 0; --i) {
//         viewModel.layers.push(imageryLayers.get(i));
//     }
// }

// setupLayers();
// updateLayerList();

// //Bind the viewModel to the DOM elements of the UI that call for it.
// var toolbar = document.getElementById('toolbar');
// Cesium.knockout.applyBindings(viewModel, toolbar);

// Cesium.knockout.getObservable(viewModel, 'selectedLayer').subscribe(function(baseLayer) {
//     // Handle changes to the drop-down base layer selector.
//     var activeLayerIndex = 0;
//     var numLayers = viewModel.layers.length;
//     for (var i = 0; i < numLayers; ++i) {
//         if (viewModel.isSelectableLayer(viewModel.layers[i])) {
//             activeLayerIndex = i;
//             break;
//         }
//     }
//     var activeLayer = viewModel.layers[activeLayerIndex];
//     var show = activeLayer.show;
//     var alpha = activeLayer.alpha;
//     imageryLayers.remove(activeLayer, false);
//     imageryLayers.add(baseLayer, numLayers - activeLayerIndex - 1);
//     baseLayer.show = show;
//     baseLayer.alpha = alpha;
//     updateLayerList();
// });
