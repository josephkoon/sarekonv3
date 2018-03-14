import React, { Component } from 'react';

class ObjectCommand extends Component {

  render() {

    return (

        <div>
            <div className="btn-group pull-right" role="group">
                <button type="button" className="btn btn-danger"><i className="glyphicon glyphicon-user"></i> Locate</button>
                <button type="button" className="btn btn-default"> Quickfence</button>
                <button type="button" className="btn btn-default"> Starter Enable</button>
                <button type="button" className="btn btn-default"> Starter Disable</button>
                <button type="button" className="btn btn-default"> More Commands  <span className="caret"></span></button>
            </div>
        </div>
      
    )

  }
}

export default ObjectCommand;