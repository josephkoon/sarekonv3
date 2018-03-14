import React, { Component } from 'react';

import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';


var ol = require('openlayers')




const markerSource = new ol.source.Vector();


// 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9zZXBoa29vbiIsImEiOiJjamVna202cmExdGtxMzNvZDUwOXkxcWI1In0.XRbkoDpmLr_sJLCDcIHq4g'
//Raster mapbox layer
var rasterLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
    url: 'https://api.mapbox.com/styles/v1/josephkoon/cjehjd5k56ttb2snpxqwvzhl8/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9zZXBoa29vbiIsImEiOiJjamVna202cmExdGtxMzNvZDUwOXkxcWI1In0.XRbkoDpmLr_sJLCDcIHq4g'
  })
})


//Scaleline
var scaleLineControl = new ol.control.ScaleLine()
scaleLineControl.setUnits('us')


//Create the map
const map = new ol.Map({
  controls: ol.control.defaults({ attribution:false }).extend([new ol.control.FullScreen(), scaleLineControl]),
  layers: [
    rasterLayer,
    new ol.layer.Vector({
      source: markerSource
    }),
  ],
  view: new ol.View({
      center: ol.proj.transform([0,0],'EPSG:4326','EPSG:3857'),
      zoom: 1
    })
});







class Map extends Component {


  componentDidMount(){
      map.setTarget("map");
  }


  componentDidUpdate(){


      //Clear markers
      markerSource.clear()

      if(this.props.dvds.length>0){

        //Markers array
        var markers = []
        var coordinateArray = []

        this.props.dvds.map((dvd,i) => {


            //Random coordinate
            var latitude = dvd.dvdLocations.locations[i].latitude
            var longitude = dvd.dvdLocations.locations[i].longitude

            //Add
            coordinateArray.push([longitude,latitude])

            var iconFeature = new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.transform([longitude,latitude],'EPSG:4326','EPSG:3857')),
            });

            //Set icon style
            iconFeature.setStyle(new ol.style.Style({
              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
              crossOrigin: 'anonymous',
              src: 'https://image.ibb.co/ibEBoS/markerwhite.png',
              // size:[10,10]
              color:'red',
              scale:.04
              }))
            }));

            //Add markers to array
            markers.push(iconFeature)
            
        })

        markerSource.addFeatures(markers);
        

        //Zoom to extents
        var ext = ol.extent.boundingExtent(coordinateArray);
        ext = ol.proj.transformExtent(ext, ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));
        map.getView().fit(ext,map.getSize());

        //Zoom out 1
        map.getView().setZoom(map.getView().getZoom() + -1);

      }

  }




  render() {
    

    return (
      <div>
        <div>
        <div id="map" className="map"></div>
        </div>
      </div>
    );
  }
}



function mapStateToProps(state){
	return { 
      dvds:state.dvds.dvds
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};




Map = connect(mapStateToProps, mapDispatchToProps)(Map);

export default Map