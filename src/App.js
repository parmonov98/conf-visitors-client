import './wdyr';
import React, { Fragment, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisitorList from "./components/visitors/VisitorList";
import LoaderWrapper from './components/LoaderWrapper';


const App = () => {
    const [loading, setLoading] = useState(true);
    return (
        <Fragment>
            <LoaderWrapper is_shown={loading} />
            <Switch>
                <Route exact path="/" >
                    <VisitorList setLoading={setLoading} loading={loading} />
                </Route>
            </Switch>
            <ToastContainer autoClose={5000} limit={1} />
        </Fragment>
    );
};


export default App;
