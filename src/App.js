import React, { Component } from 'react';
import './App.css';
import Emprestimos from './Emprestimos';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
       
    }
  }

  componentWillUpdate() {
    // localStorage.setItem('Lista', 'item aleatório');
    
  }

  render() {
    return (
      <div>
        <Emprestimos />
      </div>
    );
  }
}

export default App;
