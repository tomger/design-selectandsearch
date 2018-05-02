import React, { Component } from 'react';
import './App.css';
import { List } from 'immutable';
import arrow from './chevron-right.svg'
import magnify from './magnify.svg'
import close from './close.svg'
// free query
// storing free query
// toggling verticals
// storing and return to previous multi-select


const activities = ['Yoga', 'Pilates', 'Barre', 'Boxing', 'HIIT', 'Wellness']

class App extends Component {
  constructor () {
    super();
    this.state = {
      query: undefined,
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
      query: undefined,
      selection: List([activity]),
      dropdownVisible: false,
    });
  }

  onSelectActivity = (activity) => {
    let index = this.state.selection.findIndex(e => e === activity);
    this.setState({
      query: undefined,
      applyButtonVisible: this.state.dropdownVisible,
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
          <div key={activity}>{activity} + </div>
        ))
      }</div>];
    }

    let elements;
    if (this.state.selection.count() === 1) {
      elements = (<input className="singleInput" value={this.state.query !== undefined ? this.state.query : this.state.selection.get(0)} onChange={e => {
        this.setState({
          query: e.target.value,
          // selection: this.state.selection.set(0, e.target.value),
        })
      }}/>);

    } else if (this.state.selection.count() > 3) {
      elements = (<div className="pill-many">{this.state.selection.count()} categories</div>);
    } else {
      elements = this.state.selection.map(activity => (
        <div key={activity} className="pill">{activity}
        <span onClick={e=> {e.stopPropagation(); this.onSelectActivity(activity) }}><img className="closeButton" src={close}/></span></div>
      ))
    }

    let topcats = (
      <div>
        {lastMultiSelection}
        <div className="list-header">Top Activities</div>
        {
          activities.map(v => (
            <div className="list-item" key={v}>
            <div
              onClick={(e) => this.onSelectActivity(v)}
              style={{flex:1, cursor: 'pointer', padding: '4px 0'}}>
              <span className="checkboxContainer">
              <input
              type="checkbox"
              onChange={(e) => this.onSelectActivity(v)}
              checked={ this.state.selection.includes(v) }
              />
              </span>
              <span>{v}</span>
              </div>
              <div
                onClick={(e) => this.onSingleSelectActivity(v)}
                style={{width: 32, height: 32, cursor: 'pointer'}}>
                <img src={arrow}/>
              </div>
            </div>
          ))
        }
      </div>
    );

    return (
      <div className="App">
        <div className="inputbox" onClick={this.onClick}>
          <img src={magnify} style={{marginRight: 5}}/>
          <div className="inputbox-activities">{elements}</div>
          <div className="applyButton"
            onClick={this.onClickApplyButton}
            style={{ display: this.state.applyButtonVisible ? 'block' : 'none' }}>
            Done
          </div>
        </div>
        <div className="dropdown" style={dropdownStyle}>
          {this.state.query ? (
            <div>
              <div className="list-header">Matched activities</div>
              {
                [0].map(e=><div className="list-item" onClick={e=> {
                  this.onSingleSelectActivity(this.state.query)
                }}>{this.state.query}</div>)
              }
            </div>) : topcats}
        </div>
      </div>
    );
  }
}

export default App;
