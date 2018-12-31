import React, { Component } from 'react'
import * as d3 from 'd3'

export const AddProjectButton = ({onAddProject, errorText, updateNewProjectText, projectText}) => {
    
    const inputKeyPress = e => {
        if (e.key === "Enter") onAddProject()
    }
    return (
        <div className='d-inline-block'>
        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#addProjectModal" >
            Add New Project
        </button> 
        <div className="modal fade" id="addProjectModal" role="dialog" aria-labelledby="addNewProject" aria-hidden="true">
            <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Project</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="projectTitleInput control-label">Project Name</label>
                            <input  
                                className="form-control"
                                type="text" 
                                name="projectText" 
                                onChange={updateNewProjectText} 
                                value={projectText}
                                onKeyPress={inputKeyPress}
                                id="projectNameInput"
                            />
                            <div className="errorText pt-2">{errorText}</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id="closeModal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onAddProject}>Add Project</button>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    )
}

export const ProjectBubbles = ({projects}) => {
    return (
            <svg className="w-100" 
                  id="bubbles-svg" 
                  style={{'minHeight': '700px'}}
                  >
            </svg>
    )
}

class ProjectsView extends Component {
    drawBubbles = () => {
        let animationDuration = 1000
        const svg = document.getElementById("bubbles-svg")
        if (svg.innerHTML != '') animationDuration = 0
        svg.innerHTML = ''
        const positionInfo = svg.getBoundingClientRect()
        const svg_width = positionInfo.width

        const maxR = 250
        const minR = 50
        const bubbleMargin = 16

        let projectsTime = this.props.projects.map(p => {
            let totalTime = p.timeEntries.    //this is without time constraint
                reduce((sum, te) => {
                    return sum + (te.endTime - te.startTime)
                }, 0)
            return {...p, totalTime: totalTime}
        })
        projectsTime = projectsTime.sort((a, b) => {
            return a.totalTime < b.totalTime ? 1 : -1
        })
        const totalPeriodTime = 
            projectsTime.reduce((sum, p) => {
                return sum + p.totalTime
            }, 0)
        const projectsProportionalTime = 
            projectsTime.map(p => {
                let proportionalTime = p.totalTime / totalPeriodTime
                return {...p, proportionalTime}
            })

        let prevCX = 0
        let prevR = 0
        let rowNum = 0
        let bubbleData =  
            projectsProportionalTime.map(p => {
                let circleData = {}
                circleData.r = p.proportionalTime * (maxR - minR) + minR
                if (!prevCX) circleData.cx = circleData.r + bubbleMargin
                else circleData.cx = prevCX + prevR + (2 * bubbleMargin) + circleData.r
                circleData.cy = 200
                prevCX = circleData.cx
                prevR = circleData.r
                if (circleData.cx + circleData.r + bubbleMargin > svg_width) { //new row
                    circleData.cx = circleData.r + bubbleMargin  //set circle cx to start from start of new line
                    prevCX = circleData.cx
                    prevR = circleData.r
                    ++rowNum
                }
                circleData.rowNum = rowNum
                return {...p, circleData}
            })
        
        //set y values
        rowNum = 0
        let prevRowCY = 0
        let prevRowR = 0
        let rowsCY = 
            bubbleData.reduce((acc, bubble) => {
                var key = bubble.circleData.rowNum
                if (!acc[key]) acc[key] = []
                acc[key].push(bubble.circleData.r)
                return acc
            }, [])
        rowsCY = 
            rowsCY.map(rs => {
                return Math.max(...rs) //array of max radiuses in each row
            })
        rowsCY = 
            rowsCY.map(r => {
                let rowCY;
                if (!prevRowCY) {
                    rowCY = r + bubbleMargin
                    prevRowCY = rowCY
                    prevRowR = r
                    return rowCY 
                } else {
                    rowCY = prevRowCY + prevRowR + (2 * bubbleMargin) + r
                    prevRowCY = rowCY
                    prevRowR = r
                    return rowCY     
                }
            })
        bubbleData =
            bubbleData.map(b => {
                b.circleData.cy = rowsCY[b.circleData.rowNum]
                return {...b}
            })
        bubbleData = bubbleData.sort((a, b) => {
            return d3.descending(a.circleData.r, b.circleData.r)
        })

        d3.select("#bubbles-svg")
            .selectAll(".bubble-a")
            .data(bubbleData)
        .enter().append("a")
            .attr("href", (d) => `/projects/${d.slug}`)
            .attr('class', () => 'bubble-a')
        .call (a => {
            a.append("g")
            .call(g => {
                g.append("circle")
                .attr("cx", d => d.circleData.cx)
                .attr("cy", d => d.circleData.cy)
                .transition()
                .duration(animationDuration)
                .delay((d, i) => i * 10)
                .attr("r", d => d.circleData.r)
                .attr("fill", d=> "#" + d.color)
                .attr("opacity", 0.65)
                g.append('text')
                .text(d => d.name)
                .attr('fill', d => "black")
                .attr('x', d => d.circleData.cx)
                .attr('y', d => d.circleData.cy+6)
                .attr('text-anchor', () => "middle")
                .style('width', d => d.circleData.r * 2 + 'px')      
            })
        })
    }
    componentDidMount() {
        this.drawBubbles();
        window.addEventListener("resize", this.drawBubbles);
    }
    componentDidUpdate(prevProps, prevState) {
        //TODO: update bubbles live when add new project
        this.drawBubbles(); 
    }
    render() {
        const {onAddProject, errorText, updateNewProjectText, projectText, projects} = this.props
        return (
            <div className="col-md-10 pt-3">
                <div className="row pr-3">
                    <div className="col-md-12  d-flex  flex-row-reverse">
                        <AddProjectButton onAddProject={onAddProject}
                            updateNewProjectText={updateNewProjectText}
                            projectText={projectText}
                            errorText={errorText} />
                        
                    </div>
                </div>
                <div className="row pt-5">
                    <ProjectBubbles projects={projects} />
                </div>
            </div>
        )
    }
}

export default ProjectsView