import {
    ADD_PROJECT
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
    }
    return state
}