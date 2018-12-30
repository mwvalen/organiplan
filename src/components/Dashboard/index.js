import React, {Component} from 'react'
import { connect } from 'react-redux';
import slugify from 'slugify';
import _ from 'lodash';
import colors from '../../utils/colorList'
import { addProject } from '../../actions/manageProjects'
import './styles.scss'


const sidebarProjectsSort = (a, b) => {
    return a.name < b.name ? -1 : 1
}

const Sidebar = ({projects}) => (
    <div className="sidebar-sticky h-100 pt-3 pl-4">
        <h6><a className="nav-title" href="#">All Projects</a></h6>
        <ul className="nav flex-column">
            { 
                projects.sort(sidebarProjectsSort).map(p => (
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            {p.name}
                        </a>
                    </li>
                ))
            }
        </ul>
    </div>
)

const AddProjectButton = ({onAddProject, errorText, updateNewProjectText, projectText}) => {
    
    const inputKeyPress = e => {
        if (e.key === "Enter") onAddProject()
    }
    const focusInput = e => {
        window.setTimeout(function ()
            {
                document.getElementById('projectNameInput').focus();
            }, 0);
    }
    return (
        <div className='d-inline-block'>
        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#addProjectModal" onClick={focusInput}   >
            Add New Project
        </button> 
        <div className="modal fade" id="addProjectModal" role="dialog" aria-labelledby="addNewProject" aria-hidden="true">
            <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Project</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="projectTitleInput control-label">Project Name</label>
                            <input  
                                className="form-control"
                                type="text" 
                                name="projectText" 
                                onChange={updateNewProjectText} 
                                value={projectText}
                                onKeyPress={inputKeyPress}
                                id="projectNameInput"
                            />
                            <div className="errorText pt-2">{errorText}</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id="closeModal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onAddProject}>Add Project</button>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    )
}

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newProjectText: '',
            addProjectErrorText: ''
        }
    }
    updateNewProjectText = e => {
        this.setState({...this.state, newProjectText: e.target.value})
    }
    validateNewProject = () => {
        if (this.state.newProjectText.length === 0) {
            this.setState({...this.state, addProjectErrorText: 'Project Name Can Not Be Blank'})
            return false
        }
        if (!RegExp(/^[a-z0-9 ]+$/i).test(this.state.newProjectText)) {
            this.setState({...this.state, addProjectErrorText: 'Project Name Must Only Contain Alphanumeric Characters'})
            return false
        }
        if (this.props.projects.filter(p => {   //use filter because IE doesn't support find
            return p.name.toLowerCase() === this.state.newProjectText.trim()
            })[0]) 
        {
            this.setState({...this.state, addProjectErrorText: 'Project Name Must Be Unique'})
            return false
        }
        if (this.props.projects.length >= 20) {
            this.setState({...this.state, addProjectErrorText: 'Max 20 Projects'})
            return false
        }
        /*else if (this.props.projects.find((p) => p.name.toLowerCase() === this.state.newProjectText.trim())) {
            this.setState({...this.state, addProjectErrorText: 'Project Name Must Be Unique'})
            return false
        }*/
        return true
    }
    generateProjectColor = () => {
        let filteredColors = colors.filter(c => {
            return !_.includes(this.props.projects  //USE LODASH INCLUDES FOR IE (NO SUPPORT FOR NATIVE INCLUDES)
                .map(p => p.color), c)
        })
        let color = filteredColors[Math.floor(Math.random()*filteredColors.length)];
        return color
    }
    addProject = e => {
        if (this.validateNewProject()) {
            this.props.addProject(
                {
                    name: this.state.newProjectText, 
                    slug: slugify(this.state.newProjectText),
                    color: this.generateProjectColor()
                })
            this.setState({...this.state, newProjectText: '', addProjectErrorText: ''})
            document.getElementById("closeModal").click()
        }
    }
    setProjectModalOpen = open => {
        if (this.state.addProjectModalOpen != open) 
            this.setState({...this.state, addProjectModalOpen: !this.state.addProjectModalOpen})
    }
    render() {
        const {projects} = this.props
        console.log(projects)
        return (    
            <div className="row main-row">  
                <div className="col-md-2 bg-light sidebar projects-sidebar h-100">
                    <Sidebar projects={this.props.projects} />
                </div>
                <div className="col-md-10 pt-2">
                    <div className="rowpr-3">
                        <div className="col-md-12  d-flex  flex-row-reverse">
                        <AddProjectButton onAddProject={this.addProject.bind(this)}
                                updateNewProjectText={this.updateNewProjectText.bind(this)}
                                projectText={this.state.newProjectText}
                                errorText={this.state.addProjectErrorText} />
                           
                        </div>
                    </div>
                    <div className="row">
                    </div>
                    
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