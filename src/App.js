import React, {Component} from 'react'
import './app.scss'
import AppBar from './components/AppBar'
import Dashboard from './components/Dashboard'
import { Route } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div className="appWrapper">
                    <AppBar />
                <div className="container-fluid">
                    <Dashboard />
                </div>
            </div>
        )
    }
}

export default App