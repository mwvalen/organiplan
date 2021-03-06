import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { setSelectedProject, deleteProject } from '../../../actions/manageProjects'
import { msToTime } from '../../../helpers/time'

export const DeleteProjectButton = ({project, deleteProject}) => {
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

export const TimeEntriesTable = ({project}) => {
    return (
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
                <tr key={i + 'tr'}>
                    <th scope="row" key={i + 'th'}>{i+1}</th>
                    <td key={i + 'td1'}>{new Date(te.startTime*1).toLocaleString()}</td>
                    <td key={i + 'td2'}>{new Date(te.endTime*1).toLocaleString()}</td>
                    <td key={i + 'td3'}>{msToTime(((te.endTime - te.startTime)*1))}</td>
                </tr>
            )
            }
            </tbody>
        </table>
    )
}

export class ProjectView extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            shouldRedirect: false
        }
    }
    componentDidMount() {
        this.props.setSelectedProject(this.props.slug)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.slug !== this.props.slug) {
            this.props.setSelectedProject(this.props.slug)
        }
    }

    deleteProject = () => {
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
                <div className="row px-5">
                    <h3 className="mt-2 mb-5 w-100">{project.name}</h3>
                    <br /><br />
                    <div><h5 className="mb-3">Time Entries</h5></div>
                    <TimeEntriesTable project={project} />
                </div>            
            </div>
        )
    }
}

export const mapStateToProps = (state, ownProps)=>({
    ...state.projects.filter(p => p.slug === ownProps.slug)[0]
})

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (slug) => {
            dispatch(deleteProject(slug))
        },
        setSelectedProject: slug => {
            dispatch(setSelectedProject(slug))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectView))
