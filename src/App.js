import React, {Component} from 'react'
import './app.scss'
import MainLogo from './assets/main-logo.png'

class App extends Component {
    render() {
        return (
            <div className="appContainer">
                <div className="appBar">
                    <img src={MainLogo} />
                </div>
                <div className="main">
                    OrganiPlan, Up Up and Away!
                </div>
                
            </div>
        )
    }
}

export default App