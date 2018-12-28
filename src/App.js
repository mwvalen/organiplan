import React, {Component} from 'react'
import './app.scss'
import AppBar from './components/AppBar'
import Dashboard from './components/Dashboard'

class App extends Component {
    render() {
        return (
            <div>
                    <AppBar />
                <div className="container-fluid">
                    <div className="row">
                        <Dashboard />
                    </div>
                </div>
            </div>
        )
    }
}

export default App