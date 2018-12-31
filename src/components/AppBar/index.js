import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import MainLogo from '../../assets/main-logo.png'
import './styles.scss'

class AppBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-y-0 p-x-20 shadow appBar">
                {//<img src={MainLogo} />
                }
                <Link to='/' className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">OrganiPlan</Link>
                <div className="col-sm-8 col-md-8 bg-light h-100 w-100 m-y-0"> </div>
                <div className="col-sm-2 col-md-2 bg-primary w-100"></div>
            </nav>
        )
    }
}

export default AppBar