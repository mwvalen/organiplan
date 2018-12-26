import {
    ADD_PROJECT
} from '../actions/types'

const initialState = {
    projects: []
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