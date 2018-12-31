import rootReducer  from './rootReducer'

describe("The root reducer", ()=> {
    describe("ADD_PROJECT action", ()=> {
        it("should work with an empty array", ()=>{
            const state = {projects: []}
            const project = {
                name: "test",
                slug: "test",
                color: "000000",
                timeEntries: []
            }
            const newState = rootReducer(state, 
                                {type: 'ADD_PROJECT', project})
            console.log(newState)
        })
    })
})