import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { deleteProject } from '../../../actions/manageProjects'

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

const DeleteProjectButton = ({project, deleteProject}) => {
    return (
        <div className='d-inline-block'>
        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#deleteProjectModal" >
            Delete Project
        </button> 
        <div className="modal fade" id="deleteProjectModal" role="dialog" aria-labelledby="deleteNewProject" aria-hidden="true">
            <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Project</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete {project.name}?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id="closeModal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={deleteProject}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    )
}

export class ProjectView extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            shouldRedirect: false
        }
    }
    deleteProject = () => {
        console.log('DELETING PROJECT')
        this.props.deleteProject(this.props.slug)
        var closeButton = document.getElementById('closeModal')
        closeButton.click()
        this.setState({...this.state, shouldRedirect: true })
    }

    render() {
        const project = this.props
        if (this.state.shouldRedirect) return <Redirect to="/" />
        return (
            <div className="col-md-10 pt-3">
                <div className="row pr-5 d-flex flex-row-reverse">
                    <DeleteProjectButton project={project} deleteProject={this.deleteProject.bind(this)} />
                </div>
                <div className="row pt-2 px-5">
                    <h3 className="my-5 w-100">{project.name}</h3>
                    <br /><br />
                    <div><h5 className="mb-3">Time Entries</h5></div>
                    <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Total Time</th>
                        </tr>
                    </thead>
                    <tbody>
                    {project.timeEntries.map((te, i)=> 
                        <tr>
                            <th scope="row">{i+1}</th>
                            <td>{new Date(te.startTime*1000).toLocaleString()}</td>
                            <td>{new Date(te.endTime*1000).toLocaleString()}</td>
                            <td>{msToTime(((te.endTime - te.startTime)*1000))}</td>
                        </tr>
                    )
                    }
                    </tbody>
                    </table>
                </div>            
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps)=>({
    ...state.projects.filter(p => p.slug === ownProps.slug)[0]
})

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (slug) => {
            dispatch(deleteProject(slug))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectView))
