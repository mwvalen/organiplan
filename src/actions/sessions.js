import {
    ADD_TIME_ENTRY,
    INIT_CURRENT_SESSION,
    END_CURRENT_SESSION
} from './types'

export const initCurrentSession = (slug, startTime) => {
    return {
        type: INIT_CURRENT_SESSION,
        currentSession: {
            projectSlug: slug, 
            startTime: startTime
        }
    }
}

export const endCurrentSession = (currentSession) => {
    return {
        type: END_CURRENT_SESSION,
        currentSession
    }
}

export const addTimeEntry = (slug, entry) => {
    return {
        type: ADD_TIME_ENTRY,
        slug,
        entry
    }
}