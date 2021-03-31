import React from 'react'

import Header from './components/header/index'
import Routes from './routes';

export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <Routes />
            </React.Fragment>
        )
    }
}