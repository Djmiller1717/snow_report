import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Map from './map.jsx';
import Weather from './Weather.jsx';

class Routes extends Component {
  render() {
    return (
      <Router>
        <main>
          <Switch>
            <Route exact path="/" component={Map} />
            <Route path="/:resortName" component={Weather} />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default connect()(Routes);
