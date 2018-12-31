import React from 'react'

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
        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#addProjectModal" onClick={focusInput} >
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

const ProjectBubbles = ({projects}) => {
    return (
            <svg className="w-100" 
                  id="bubbles-svg" 
                  style={{'minHeight': '700px'}}
                  >
            </svg>
    )
}

export const ProjectsView = ({onAddProject, errorText, updateNewProjectText, projectText, projects}) => {
    return (
        <div className="col-md-10 pt-3">
            <div className="row pr-3">
                <div className="col-md-12  d-flex  flex-row-reverse">
                    <AddProjectButton onAddProject={onAddProject}
                        updateNewProjectText={updateNewProjectText}
                        projectText={projectText}
                        errorText={errorText} />
                    
                </div>
            </div>
            <div className="row pt-5">
                <ProjectBubbles projects={projects} />
            </div>
        </div>
    )
}