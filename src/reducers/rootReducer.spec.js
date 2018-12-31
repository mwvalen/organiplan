import rootReducer  from './rootReducer'
import testProjects from '../utils/sampleProjects'

describe("The root reducer", ()=> {
    describe("ADD_PROJECT action", ()=> {
        it("should work with an empty array", ()=>{
            const state = {projects: []}
            const newState = rootReducer(state, 
                                {type: 'ADD_PROJECT', project: testProjects[0]})

            expect(newState.projects).toContain(testProjects[0])
            expect(state.projects).not.toContain(testProjects[0])
            expect(newState.projects).toHaveLength(1)
        })
        it ("should work with a non-empty array", ()=>{
            const state = {projects: [testProjects[0]]}
            const newState = rootReducer(state, 
                                {type: 'ADD_PROJECT', project: testProjects[1]})
            
            expect(newState.projects).toContain(testProjects[0])
            expect(newState.projects).toContain(testProjects[1])
            expect(state).not.toContain(testProjects[1])
            expect(newState.projects).toHaveLength(2)
        })
    })
    describe("DELETE_PROJECT action", ()=> {
        it ("should work with an array of length > 1", ()=> {
            const state = {projects: [testProjects[0], testProjects[1]]}
            const newState = rootReducer(state,
                                {type: 'DELETE_PROJECT', slug: testProjects[0].slug})
            expect(newState.projects).toContain(testProjects[1])
            expect(newState.projects).not.toContain(testProjects[0])
            expect(state.projects).toContain(testProjects[0])
            expect(newState.projects).toHaveLength(1)
        })  
        it ("should work with an array of length 1", ()=>{
            const state = {projects: [testProjects[0]]}
            const newState = rootReducer(state,
                                {type: 'DELETE_PROJECT', slug: testProjects[0].slug})
            expect(newState.projects).toHaveLength(0)
            expect(state.projects).toHaveLength(1)
            expect(state.projects).toContain(testProjects[0])
        })
    })
})