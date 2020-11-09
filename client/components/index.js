/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AllCostumes from './costume/AllCostumes';
import CreateCostume from './costume/CreateCostume';
import NavBar from './NavBar';
import Login from './authentication/Login';
import SingleCostume from './costume/SingleCostume';
import Cart from './Cart';
import EditCostume from './costume/EditCostume';
import CreateUser from './authentication/CreateUser';
import OrderHistory from './OrderHistory';
import PendingOrders from './admin/PendingOrders';
import CheckoutForm from './Payment/CheckoutForm';
import PaymentSuccess from './Payment/PaymentSuccess';

// const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
const stripePromise = loadStripe('pk_test_51Hj94RFSm62mRLAhb5em7vKTTRm9V6zoY3mvXE2tSlpdSPIMhW5lFXqwFgoCb3mPeCoWQJLqMqImtV65kktYaO8d00s0YJmJjb');

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
