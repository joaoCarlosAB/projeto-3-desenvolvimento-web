import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Main from './pages/main/index'
import List from './pages/list/index'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/list/:id' component={List} />
        </Switch>
    </BrowserRouter>
);

export default Routes