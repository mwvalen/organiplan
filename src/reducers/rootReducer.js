import {
    ADD_PROJECT,
    DELETE_PROJECT,
    SET_SELECTED_PROJECT,
    INIT_CURRENT_SESSION,
    END_CURRENT_SESSION,
    ADD_TIME_ENTRY
} from '../actions/types'
import sampleProjects from '../utils/sampleProjects'

const initialState = {
    projects: sampleProjects,
    currentSession: {},
    selectedProject: ""
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
        case SET_SELECTED_PROJECT:
            return {
                ...state,
                selectedProject: action.slug
            }
        case INIT_CURRENT_SESSION:
            let { currentSession } = action
            return {
                ...state,
                currentSession
            }
        case END_CURRENT_SESSION:
            currentSession = action.currentSession
            let project = state.projects.filter(p => p.slug === currentSession.projectSlug)[0]
            if (project) {
                project.timeEntries.push({
                    startTime: currentSession.startTime,
                    endTime: (new Date()).getTime()
                })
            }
            projectsUpdated = state.projects.filter(p => p.slug !== currentSession.projectSlug)
            projectsUpdated.push(project)
            return {
                ...state,
                currentSession: {},
                projects: projectsUpdated
            }
        case ADD_TIME_ENTRY:
            projectsUpdated = state.projects.slice()
            projectsUpdated.find(p => {
                    p.slug === action.slug
                })
                .timeEntries.push(action.entry)
            return {
                ...state,
                projects: projectsUpdated
            }
    }
    return state
}