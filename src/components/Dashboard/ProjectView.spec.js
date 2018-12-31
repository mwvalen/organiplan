import { mapStateToProps, DeleteProjectButton, TimeEntriesTable } from './ProjectView'
import renderer from 'react-test-renderer'
import React from 'react'
import sampleProjects from '../../utils/sampleProjects'

describe('The Project View Component',()=>{
    describe('The DeleteProjectButton',()=>{
        it('should not regress',()=>{
            const tree = renderer.create(
                <DeleteProjectButton
                    deleteProject={()=>{}}
                    project={sampleProjects[0]}
                />
            )

            expect(tree.toJSON()).toMatchSnapshot()
        })
    })
    describe('map state to props',()=>{
        it('should return the correct project',()=>{
            const state = {projects: sampleProjects}
            const props = mapStateToProps(state, {slug: sampleProjects[0].slug})

            expect(props).toEqual(sampleProjects[0])
        })
    })
    describe('the TimeEntriesTable',()=>{
        it('should not regress',()=>{
            const tree = renderer.create(
                <TimeEntriesTable project={sampleProjects[0]} />
            )

            expect(tree.toJSON()).toMatchSnapshot()
        })
    })
})