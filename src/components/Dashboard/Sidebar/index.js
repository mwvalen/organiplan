import React, {Component} from 'react'
import { connect } from 'react-redux'
import { FaPlay, FaStop } from 'react-icons/fa'
import './styles.scss'
import { Link } from 'react-router-dom'
import { initCurrentSession } from '../../../actions/sessions'


const sidebarProjectsSort = (a, b) => {
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
}

export const ProjectBullet = ({project}) => 
    <div className="pl-2 project-bullet"
             style={{ 'backgroundColor':"#"+project.color }}>
        </div>


const ProjectListing = ({project, initCurrentSession}) => (
    
    <li className="nav-item d-flex flex-row align-items-center" key={project.slug}>
        <ProjectBullet project={project} />
        <Link to={`/projects/${project.slug}`} className="nav-link pl-0 ml-2" >  
            {project.name}
        </Link>
        {/*<div onClick={() => initCurrentSession(project.slug)} style={{'position': 'absolute', 'right':'20px'}} className="sidebar-pause-play">
            <FaPlay />
        </div>*/}
    </li>
)

class Sidebar extends Component {
    initCurrentSession = (slug) => {
        const startTime = (new Date()).getTime()
        this.props.initCurrentSession(slug, startTime)
    }
    setSelectedProject = slug => {
        this.props.setSelectedProject(slug)
    }
    render() {
        const {projects} = this.props
        return (
            <div className="sidebar-sticky h-100 pt-3 pl-4">
                <h6><Link to='/' className="nav-title">All Projects</Link></h6>
                <ul className="nav flex-column pl-2">
                    { 
                        projects.sort(sidebarProjectsSort).map(p => (
                            <ProjectListing project={p}
                                            initCurrentSession={this.initCurrentSession.bind(this)}
                                            currentSession={this.props.currentSession} />             
                        ))
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initCurrentSession: (slug, startTime) => dispatch(initCurrentSession(slug, startTime))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)