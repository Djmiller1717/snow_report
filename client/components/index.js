/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <main>
              <Switch />
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
