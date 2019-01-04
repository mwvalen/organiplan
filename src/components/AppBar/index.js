import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { FaPlayCircle, FaStopCircle } from 'react-icons/fa'
import _ from 'lodash'
import './styles.scss'
import { ProjectBullet } from '../Dashboard/Sidebar'
import { msToTime } from '../../helpers/time'
import { initCurrentSession, endCurrentSession } from '../../actions/sessions'


const getStartTimeString = timestamp => {
    const date = new Date(timestamp)
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    return hours + ":" + minutes + ":" + seconds
}

const StartStopButton = ({currentSession, endSession, initSession}) => {
    return (
        <div className='stop-start-button text-danger'>
            {_.isEmpty(currentSession) ?  <FaPlayCircle size={32} onClick={initSession} /> : <FaStopCircle size={32} onClick={endSession} />}
        </div>
    )
}

class AppBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            elapsedTime: 0   //inMs
        }
        this.intervalHandle = null;
    }
    componentDidMount() {
        if (!_.isEmpty(this.props.currentSession) && !this.intervalHandle) {
            this.updateElapsedTime()
            this.intervalHandle = setInterval(this.updateElapsedTime.bind(this), 1000)
        }
    }
    componentDidUpdate(prevProps, prevState) {
        //clear existing interval if new session or just removed session
        if (prevProps.currentSession.projectSlug !== this.props.currentSession.projectSlug) {
            this.intervalHandle = null
        }
        //check if new session started, and set elapsed time update interval
         if (prevProps.currentSession.projectSlug !== this.props.currentSession.projectSlug && !_.isEmpty(this.props.currentSession) && !this.intervalHandle) {
            this.intervalHandle = setInterval(this.updateElapsedTime.bind(this), 1000)
        }
    }
    updateElapsedTime = () => {
        const elapsedTime = 
            (new Date()).getTime() - this.props.currentSession.startTime
        this.setState({...this.state, elapsedTime: elapsedTime}) 
    }
    initSession = () => {
        if(this.props.selectedProject)
            this.props.initSession(this.props.selectedProject.slug, (new Date()).getTime())
        
    }
    endCurrentSession = () => {
        this.props.endCurrentSession(this.props.currentSession)
        this.setState({...this.state, elapsedTime: 0})
    }
    render() {
        let elapsedTime = this.state.elapsedTime > 0 ? msToTime(this.state.elapsedTime) : "00:00:00"
        return (
            <nav className="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-y-0 p-x-20 shadow appBar">
                <Link to='/' className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">OrganiPlan</Link>
                <div className="col-sm-8 col-md-8 bg-light h-100 w-100 m-y-0 d-flex align-items-center justify-content-center">
                    <div className="d-flex d-row align-items-center justify-content-around w-75">
                        <div className="active-project-text text-dark ">
                            <div>
                                {!_.isEmpty(this.props.currentSession) ?
                                (<div className="d-flex d-row align-items-center"><ProjectBullet project={this.props.currentSessionProject} />
                                <h5 className="m-0 pl-2">{this.props.currentSessionProject.name}</h5></div>)
                                : 
                                (this.props.selectedProject ? 
                                (<div className="d-flex d-row align-items-center"><ProjectBullet project={this.props.selectedProject} />
                                <h5 className="m-0 pl-2">{this.props.selectedProject.name}</h5></div>)
                                : <div></div>)
                                }
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <div style={{'lineHeight': 1}}><small>Start Time</small></div>
                            {!_.isEmpty(this.props.currentSession) ? 
                            (<h4 className="m-0">{getStartTimeString(this.props.currentSession.startTime)}</h4>)
                            : (<h4 className="m-0">--:--:--</h4>)}
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <div style={{'lineHeight': 1}}><small>Total Time</small></div>
                            {!_.isEmpty(this.props.currentSession) ?
                            (<h4 className="m-0">{elapsedTime}</h4>)
                            : (<h4 className="m-0">--:--:--</h4>)}
                        </div>
                        <div className='text-danger'>
                            <StartStopButton currentSession={this.props.currentSession} 
                                            endSession={this.endCurrentSession} 
                                            initSession={this.initSession.bind(this)} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-2 col-md-2 bg-primary w-100"></div>
            </nav>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentSession: state.currentSession,
        currentSessionProject: state.projects.find(p => p.slug === state.currentSession.projectSlug),
        selectedProject: state.projects.find(p => p.slug === state.selectedProject)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initSession: (slug, startTime) => dispatch(initCurrentSession(slug, startTime)),
        endCurrentSession: currentSession => dispatch(endCurrentSession(currentSession))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppBar))