import React, {Component} from 'react'
import MainLogo from '../../assets/main-logo.png'

class AppBar extends Component {
    render() {
        return (
            <div className="appBar">
                <img src={MainLogo} />
            </div>
        )
    }
}

export default AppBar