import React, { Component } from 'react';

import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';



class Header extends Component {



  render() {
    let userName = null
    let brandName = null
    let brandLogo = null
    
    //Render Brand
    if(this.props.brand !== null){
      // brandName = <span>{this.props.brand.name}</span>
      brandLogo = this.props.brand.logo_url
    }

    //Render Username
    if(this.props.user_name !== null){
      userName = <span>{this.props.user_name}</span>
    }

    return (
      <div>




      <div>
        <nav className="navbar navbar-default">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href=""><img alt="Brand" height='100%' src={brandLogo} /></a>
            </div>

            <div id="navbar" className="navbar-collapse collapse">

              <ul className="nav navbar-nav navbar-left">
                <li className="active"><a href="">Vehicles</a></li>
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="glyphicon glyphicon-user"></i> {userName}<span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="">Settings</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="">Logout</a></li>

                  </ul>
                </li>
              </ul>

            </div>
            
        </nav>
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
  }, dispatch);
};




Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header

