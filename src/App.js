import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Main from './components/main';
import './App.css';


class App extends Component {
  render() {
    return (        
      <Container>        
        <Main />
      </Container>
    );
  }
}

export default App;
