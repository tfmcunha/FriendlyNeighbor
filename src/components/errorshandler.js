import React, { Component } from 'react';

class ErrorsHandler extends Component {  
  render() {    
    return (
      <div>      
     	  {this.props.errors !== undefined &&
                this.props.errors.map(error => (
                  <div>{`${this.props.field} ${error}`}</div>
                ))
             
      	}
      </div>
    );
  }
}

export default ErrorsHandler;
