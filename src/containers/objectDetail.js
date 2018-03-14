import React, { Component } from 'react';

import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';



class ObjectDetail extends Component {


  render() {
    var dvds = null

    //Render DVD details
    if(this.props.dvds.length > 0){
      dvds = this.props.dvds.map(dvd => {
        return (

            <div key={dvd.dvdDetails.device.device_id}>
    
              <div className='row'>
                <div className='col-xs-4'>
                  <h6>Device</h6>
                  <h6>Device Description : {dvd.dvdDetails.device.device_description}</h6>
                  <h6>Device ID : {dvd.dvdDetails.device.device_id}</h6>
                </div>
                <div className='col-xs-4'>
                  <h6>Location</h6>
                  <h6>Address : {dvd.dvdDetails.location.address}</h6>
                  <h6>Latitude: {dvd.dvdDetails.location.latitude}</h6>
                  <h6>Longitude: {dvd.dvdDetails.location.longitude}</h6>
                </div>
                <div className='col-xs-4'>
                  <h6>Asset</h6>
                </div>
              </div>
              <hr/>

            </div>
        )
      })
    }


    return (
      <div>
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-default">Details</button>
                <button type="button" className="btn btn-default">Locations</button>
                <button type="button" className="btn btn-default">History</button>
            </div>

            {dvds}
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




ObjectDetail = connect(mapStateToProps, mapDispatchToProps)(ObjectDetail);

export default ObjectDetail


