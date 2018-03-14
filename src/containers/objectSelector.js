import React, { Component } from 'react';

import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import { enumerateDVDfilters } from '../actions/index'
import { enumerateDVDs } from '../actions/index'
import { showDVD } from '../actions/index'
import { unshowDVD } from '../actions/index'


class ObjectSelector extends Component {

  //Load filters and dvds
  async componentWillMount(){
    try{
      await this.props.enumerateDVDfilters()
      await this.props.enumerateDVDs()
    } catch(error){
      console.error(error)
    }
  }



  //Show dvd
  showDVD(dvd){
    var i;

    //If nothing in list, add one
    if(this.props.dvds.length === 0 ){
        this.props.showDVD(dvd.device_id)
    } else {

      for (i = 0; i < this.props.dvds.length; i++) {
          //If it already exists, unshow it
          if(this.props.dvds[i].dvdDetails.device.device_id === dvd.device_id){
            this.props.unshowDVD(dvd.device_id)
            return
          }
      }

      //Otherwise add another one
      this.props.showDVD(dvd.device_id)
    }

  }



  render() {
    var groups = null
    var modes = null
    var dvdList = null
    var count = null

    //Modes
    if(this.props.modes !== null){
      modes = this.props.modes.map(mode => {
        return (
                <li key={mode.mode_id}>{mode.description}</li>
        )
      })
    }

    //Groups
    if(this.props.groups !== null){
      groups = this.props.groups.map(group => {
        return (
                <li key={group.group_id}>{group.description}</li>
        )
      })
    }

    //DVD
    if(this.props.dvdList !== null){

      dvdList = this.props.dvdList.map(dvd => {
        return (
            <li key={dvd.device_id} className='list-group-item'>
                <h6><input onClick={() => this.showDVD(dvd)} type='checkbox'></input><span>{dvd.description} {dvd.device_id}</span></h6>
            </li>
        )
      })
    }


    //Count
    if(this.props.count !== null){
      count = <div>{this.props.count}</div>
    }





    return (
      <div>

      <div className='row'>
        <div className='col-xs-8'>
          <input className='form-control'/>
        </div>
        <div className='col-xs-4'>
          <button className='btn btn-sm'>Go</button>
        </div>
      </div>

      <br />


      <div style={{paddingLeft:'0px'}} className='col-xs-4'>
        <div className="dropdown">
          <button className="btn btn-sm dropdown-toggle" type="button" data-toggle="dropdown">Groups
          <span className="caret"></span></button>
          <ul className="dropdown-menu">
            {groups}
          </ul>
        </div>
      </div>

      <div style={{paddingLeft:'0px'}} className='col-xs-4'>
        <div className="dropdown">
          <button className="btn btn-sm dropdown-toggle" type="button" data-toggle="dropdown">Modes
          <span className="caret"></span></button>
          <ul className="dropdown-menu">
            {modes}
          </ul>
        </div>
      </div>


      <div style={{paddingLeft:'0px'}} className='col-xs-4'>
        <div className="dropdown">
          <button className="btn btn-sm dropdown-toggle" type="button" data-toggle="dropdown">Page Size
          <span className="caret"></span></button>
          <ul className="dropdown-menu">
            <li>5</li>
            <li>10</li>
            <li>20</li>
            <li>50</li>
          </ul>
        </div>
      </div>



        <br/>
        <br/>


        <ul className='list-group'>
          {dvdList}
        </ul>



        <nav aria-label="Page navigation">
          <ul className="pagination ">

            <li>
              <a href="" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li><a href="">1</a></li>
            <li><a href="">2</a></li>
            <li><a href="">3</a></li>
            <li><a href="">4</a></li>


            <li>
              <a href="" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>

          </ul>
        </nav>


        <h6>{count} DVDs</h6>



      </div>
    );
  }
}



function mapStateToProps(state){
	return { 
      groups:state.filters.groups,
      modes:state.filters.modes,
      dvdList:state.dvdList.dvds,
      count:state.dvdList.count,
      dvds:state.dvds.dvds
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    enumerateDVDfilters: enumerateDVDfilters,
    enumerateDVDs: enumerateDVDs,
    showDVD: showDVD,
    unshowDVD: unshowDVD

  }, dispatch);
};




ObjectSelector = connect(mapStateToProps, mapDispatchToProps)(ObjectSelector);

export default ObjectSelector

