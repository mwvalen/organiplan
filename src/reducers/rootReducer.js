import {
    ADD_PROJECT,
    DELETE_PROJECT
} from '../actions/types'
import sampleProjects from '../utils/sampleProjects'

const initialState = {
    projects: sampleProjects
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_PROJECT:
            let projectsUpdated = state.projects.slice()
            projectsUpdated.push(action.project)
            return {
                ...state,
                projects: projectsUpdated
            }
        case DELETE_PROJECT:
            projectsUpdated = state.projects.slice()
            projectsUpdated = projectsUpdated.filter(p => {
                return p.slug !== action.slug
            })
            return {
                ...state,
                projects: projectsUpdated
            }
    }
    return state
}