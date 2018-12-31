import React from 'react'
import renderer from 'react-test-renderer'
import { AddProjectButton, ProjectBubbles } from './ProjectsView'
import sampleProjects from '../../utils/sampleProjects'

describe("The Projects View Component",()=>{
    describe("The AddProjectButton element",()=>{
        it("should not regress",()=>{
            const tree = renderer.create(
                <AddProjectButton
                    onAddProject={()=>{}}
                    errorText="This is an error"
                    updateNewProjectText={()=>{}}
                    projectText="Project Name"
                />
            )

            expect(tree.toJSON()).toMatchSnapshot()
        })
    })
    describe("The ProjectBubbles element",()=>{
        it('should not regress',()=>{
            const tree = renderer.create(
                <ProjectBubbles projects={sampleProjects} />
            )

            expect(tree.toJSON()).toMatchSnapshot()
        })
    })
})

