import React, {Component} from 'react'
import './app.scss'
import AppBar from './components/AppBar'
import Dashboard from './components/Dashboard'

class App extends Component {
    render() {
        return (
            <div className="appContainer">
                <AppBar />
                <Dashboard />
            </div>
        )
    }
}

export default App