import './wdyr';
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisitorList from "./components/visitors/VisitorList";


const App = ({ }) => {

    return (
        <Fragment>
            {/* <Alert /> */}
            <Switch>
                <Route exact path="/" component={VisitorList} />
                {/* <Route component={Routes} /> */}
            </Switch>
            <ToastContainer autoClose={5000} limit={1} />
        </Fragment>
    );
};


export default App;
