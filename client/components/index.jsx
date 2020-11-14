import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Map from './Map.jsx';
import Weather from './Weather.jsx';

class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <main>
              <Switch>
                <Route exact path="/" component={Map} />
                <Route exact path="/:resortName" component={Weather} />
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect()(Routes);
