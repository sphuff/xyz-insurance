import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from '../App'
import { PATHS } from '../constants'

const Routes = (
        <Switch>
            <Route path={ PATHS.HOME } component={ App }/>
        </Switch>
    )

export default Routes