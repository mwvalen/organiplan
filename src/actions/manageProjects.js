import {
    ADD_PROJECT
} from './types'

export const addProject = project => {
    return {
        type: ADD_PROJECT,
        project: project
    }
}