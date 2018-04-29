import React, { Component } from 'react';
import './App.css';
import { List, Map } from 'immutable';


const activities = ['Yoga', 'Pilates', 'Barre']
function formatSelection(array) {
  return array.join(', ')
}

class App extends Component {
  constructor () {
    super();
    this.state = {
      selection: List(['Yoga']),
      dropdownVisible: true,
    }
  }

  onClick = () => {
    this.setState({dropdownVisible:true});
  }

  onSingleSelectActivity = (activity) => {
    this.setState({
      selection: List([activity]),
      dropdownVisible: false,
    });
  }

  onSelectActivity = (activity) => {
    let index = this.state.selection.findIndex(e => e === activity)
    this.setState({
      selection:
        this.state.selection.includes(activity) ?
          this.state.selection.delete(index) :
          this.state.selection.push(activity),
      // dropdownVisible: false,
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
              <div className="list-item" key={v}>
                <div
                  style={{flex:1}}
                  onClick={(e) => this.onSingleSelectActivity(v)}>{v}</div>
                <input
                  type="checkbox"
                  checked={ this.state.selection.includes(v) }
                  onClick={(e) => this.onSelectActivity(v)}/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
