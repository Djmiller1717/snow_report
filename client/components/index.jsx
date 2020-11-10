/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Map from './map';

class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <main>
              <Switch>
                <Route exact path="/" component={Map} />
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect()(Routes);
