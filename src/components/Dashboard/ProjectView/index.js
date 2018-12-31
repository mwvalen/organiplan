import React from 'react'
import { connect } from 'react-redux'

export const ProjectView = (project) => {
    return (
        <div className="col-md-10 pt-3">
            {project.name}
        </div>
    )
}

const mapStateToProps = (state, ownProps)=>({
    ...state.projects.find(p => p.slug === ownProps.slug)
})

export default connect(mapStateToProps)(ProjectView)
