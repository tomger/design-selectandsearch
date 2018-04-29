import React, { Component } from 'react';
import './App.css';
import { List } from 'immutable';

// free query
// storing free query
// toggling verticals
// storing and return to previous multi-select


const activities = ['Yoga', 'Pilates', 'Barre', 'Boxing', 'HIIT', 'Wellness']
function formatSelection(array) {
  let elements;
  if (array.count() === 1) {
    elements = (<input className="singleInput" defaultValue={array.get(0)} onChange={e => {}}/>);

  } else if (array.count() > 4) {
    elements = (<div className="pill-many">{array.count()} categories</div>);
  } else {
    elements = array.map(activity => (
      <div key={activity} className="pill">{activity}</div>
    ))
  }
  return elements;
}

class App extends Component {
  constructor () {
    super();
    this.state = {
      selection: List(['Yoga']),
      lastMultiselection: List(),
      dropdownVisible: false,
      applyButtonVisible: false,
    }
  }

  onClickApplyButton = (e) => {
    e.stopPropagation();
    this.setState({
      applyButtonVisible: false,
      dropdownVisible: false,
    });
    if (this.state.selection.count() > 1) {
      this.setState({lastMultiselection: this.state.selection });
    }
  }

  onClick = () => {
    this.setState({dropdownVisible:true});
  }

  onLastMultiselection = () => {
    this.setState({
      selection: this.state.lastMultiselection,
      dropdownVisible: false,
    });
  }

  onSingleSelectActivity = (activity) => {
    if (this.state.selection.count() > 1) {
      this.setState({lastMultiselection: this.state.selection });
    }

    this.setState({
      selection: List([activity]),
      dropdownVisible: false,
    });
  }

  onSelectActivity = (activity) => {
    let index = this.state.selection.findIndex(e => e === activity);
    this.setState({
      applyButtonVisible: true,
      selection:
        this.state.selection.includes(activity) ?
          this.state.selection.delete(index) :
          this.state.selection.push(activity),
      // dropdownVisible: false,
    });
  }

  render() {
    let dropdownStyle = {
      display: this.state.dropdownVisible === true ? 'block' : 'none',
    };
    let lastMultiSelection;
    if (this.state.selection.count() === 1 && !this.state.lastMultiselection.isSubset(this.state.selection)) {
      lastMultiSelection = [
      <div className="list-header">Recent</div>,
      <div className="list-item" onClick={this.onLastMultiselection}>
      {
        this.state.lastMultiselection.map(activity => (
          <div key={activity} className="pill">{activity}</div>
        ))
      }</div>];
    }

    return (
      <div className="App">
        <div className="inputbox" onClick={this.onClick}>
          <div className="inputbox-activities">{formatSelection(this.state.selection)}</div>
          <div className="applyButton"
            onClick={this.onClickApplyButton}
            style={{ display: this.state.applyButtonVisible ? 'block' : 'none' }}>
            Apply filters
          </div>
        </div>
        <div className="dropdown" style={dropdownStyle}>
          {lastMultiSelection}
          <div className="list-header">Top Activities</div>
          {
            activities.map(v => (
              <div className="list-item" key={v}>
                <div
                  style={{flex:1}}
                  onClick={(e) => this.onSingleSelectActivity(v)}>{v}</div>
                <input
                  type="checkbox"
                  checked={ this.state.selection.includes(v) }
                  onChange={(e) => this.onSelectActivity(v)}/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
