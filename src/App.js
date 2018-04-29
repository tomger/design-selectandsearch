import React, { Component } from 'react';
import './App.css';

const activities = ['Yoga', 'Pilates', 'Barre']
function formatSelection(array) {
  return array.join(', ')
}

class App extends Component {
  constructor () {
    super();
    this.state = {
      selection: ['Yoga'],
      dropdownVisible: false,
    }
  }

  onClick = () => {
    this.setState({dropdownVisible:true});
  }

  onSelectActivity = (activity) => {
    this.setState({
      selection: [activity],
      dropdownVisible: false,
    });
  }

  render() {
    let dropdownStyle = {
      display: this.state.dropdownVisible ? 'block' : 'none',
    };

    return (
      <div className="App">
        <div className="inputbox" onClick={this.onClick}>
          {formatSelection(this.state.selection)}
        </div>
        <div className="dropdown" style={dropdownStyle}>
          {
            activities.map(v => (
              <div onClick={(e) => this.onSelectActivity(v)}>{v}</div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
