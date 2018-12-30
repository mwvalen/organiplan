import React, {Component} from 'react'
import { connect } from 'react-redux';
import { addProject } from '../../actions/manageProjects'
import './styles.scss'

const sidebarProjectsSort = (a, b) => {
    return a.name < b.name ? -1 : 1
}

const AddProjectButton = ({onAddProject, updateNewProjectText, projectText}) => {
    return (
        <div>
            <form onSubmit={onAddProject}>
                <input type="text" 
                        name="projectText" 
                        onChange={updateNewProjectText} 
                        value={projectText}
                />
                <button type="submit">
                    Add Project
                </button>
            </form>
        </div>
    )
}

const Sidebar = ({projects}) => (
    <div className="sidebar-sticky h-100 pt-3 pl-4">
        <h6><a className="nav-title" href="#">All Projects</a></h6>
        <ul className="nav flex-column">
            { 
                projects.sort(sidebarProjectsSort).map(p => (
                    <li className="nav-item">
                        <a class="nav-link" href="#">
                            {p.name}
                        </a>
                    </li>
                ))
            }
        </ul>
    </div>
)

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newProjectText: ''
        }
    }
    updateNewProjectText = e => {
        this.setState({...this.state, newProjectText: e.target.value})
    }
    addProject = e => {
        e.preventDefault();
        this.props.addProject({name: this.state.newProjectText})
        this.setState({...this.state, newProjectText: ''})
    }
    render() {
        const {projects} = this.props
        return (    
            <div className="row main-row">  
                <div className="col-md-2 bg-light sidebar projects-sidebar h-100">
                    <Sidebar projects={this.props.projects} />
                </div>
                <div className="col-md-10 pt-2">
                    <AddProjectButton onAddProject={this.addProject}
                                    updateNewProjectText={this.updateNewProjectText}
                                    projectText={this.state.newProjectText}
                    />
                </div>
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
        addProject: (project) => {
            dispatch(addProject(project))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)