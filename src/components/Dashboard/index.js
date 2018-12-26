import React, {Component} from 'react'
import { connect } from 'react-redux';
import { addProject } from '../../actions/manageProjects'


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
            <div>
                {projects.length === 0 && 
                <div>No projects found</div>
                }
                {projects.length > 0 && 
                    projects.map((project) => {
                        return (<div>{project.name}</div>)
                    })
                }
                <AddProjectButton onAddProject={this.addProject}
                                updateNewProjectText={this.updateNewProjectText}
                                projectText={this.state.newProjectText}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)