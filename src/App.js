import React, { Component } from 'react';

import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import { signinUser } from './actions/index'

import ObjectSelector from './containers/objectSelector'
import ObjectCommand from './containers/objectCommand'
import ObjectDetail from './containers/objectDetail'
import Header from './containers/header'
import Map from './containers/map'


class App extends Component {


  //Login the user 
  async componentWillMount(){
    try{
      await this.props.signinUser("josephandrewkoon@gmail.com","jei8942!!oi")

    } catch(error){
      console.error(error)
    }
  }


  render() {
    return (
      <div>
        <Header />
        <div className='col-xs-3'>
          <ObjectSelector />
        </div>
        <div className='col-xs-9'>
        
          <Map />

          <div className="panel panel-default">
            <div className='panel-heading clearfix'>
              <ObjectCommand />
            </div>
            <div className="panel-body">
              <ObjectDetail />
            </div>
          </div>

        </div>
      </div>
    );
  }
}




function mapStateToProps(state){
	return { 
      user_name:state.user.user_name,
      brand:state.user.brand,
      user_permissions:state.user.user_permissions,
      user_preferences:state.user.user_preferences
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signinUser: signinUser
  }, dispatch);
};




App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App






