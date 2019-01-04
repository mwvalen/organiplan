import {
    ADD_PROJECT, 
    DELETE_PROJECT,
    SET_SELECTED_PROJECT
} from './types'

export const addProject = project => {
    return {
        type: ADD_PROJECT,
        project: project
    }
}

export const deleteProject = slug => {
    return {
        type: DELETE_PROJECT,
        slug
    }
}

export const setSelectedProject = slug => {
    return {
        type: SET_SELECTED_PROJECT,
        slug
    }
}