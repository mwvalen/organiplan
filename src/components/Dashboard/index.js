import React, {Component} from 'react'
import { connect } from 'react-redux';
import slugify from 'slugify';
import _ from 'lodash';
import * as d3 from 'd3'
import colors from '../../utils/colorList'
import { addProject } from '../../actions/manageProjects'
import './styles.scss'
import Sidebar from './Sidebar'
import { ProjectsView } from './ProjectsView'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newProjectText: '',
            addProjectErrorText: ''
        }
    }
    updateNewProjectText = e => {
        this.setState({...this.state, newProjectText: e.target.value})
    }
    validateNewProject = () => {
        if (this.state.newProjectText.length === 0) {
            this.setState({...this.state, addProjectErrorText: 'Project Name Can Not Be Blank'})
            return false
        }
        if (!RegExp(/^[a-z0-9 ]+$/i).test(this.state.newProjectText)) {
            this.setState({...this.state, addProjectErrorText: 'Project Name Must Only Contain Alphanumeric Characters'})
            return false
        }
        if (this.props.projects.filter(p => {   //use filter because IE doesn't support find
            return p.name.toLowerCase() === this.state.newProjectText.trim()
            })[0]) 
        {
            this.setState({...this.state, addProjectErrorText: 'Project Name Must Be Unique'})
            return false
        }
        if (this.props.projects.length >= 20) {
            this.setState({...this.state, addProjectErrorText: 'Max 20 Projects'})
            return false
        }
        /*else if (this.props.projects.find((p) => p.name.toLowerCase() === this.state.newProjectText.trim())) {
            this.setState({...this.state, addProjectErrorText: 'Project Name Must Be Unique'})
            return false
        }*/
        return true
    }
    generateProjectColor = () => {
        let filteredColors = colors.filter(c => {
            return !_.includes(this.props.projects  //USE LODASH INCLUDES FOR IE (NO SUPPORT FOR NATIVE INCLUDES)
                .map(p => p.color), c)
        })
        let color = filteredColors[Math.floor(Math.random()*filteredColors.length)];
        return color
    }
    addProject = e => {
        if (this.validateNewProject()) {
            this.props.addProject(
                {
                    name: this.state.newProjectText, 
                    slug: slugify(this.state.newProjectText),
                    color: this.generateProjectColor(),
                    timeEntries: []
                })
            this.setState({...this.state, newProjectText: '', addProjectErrorText: '',})
            document.getElementById("closeModal").click()
        }
    }
    setProjectModalOpen = open => {
        if (this.state.addProjectModalOpen != open) 
            this.setState({...this.state, addProjectModalOpen: !this.state.addProjectModalOpen})
    }
    drawBubbles = () => {
        let animationDuration = 1500
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
            .attr("href", () => "#")
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
                .transition()
                .duration(animationDuration)
                .delay((d, i) => i * 10)
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
    }
    render() {
        const {projects} = this.props
        return (    
            <div className="row main-row">  
                <div className="col-md-2 bg-light sidebar projects-sidebar h-100">
                    <Sidebar projects={projects} />
                </div>
                <ProjectsView onAddProject={this.addProject.bind(this)}
                        updateNewProjectText={this.updateNewProjectText.bind(this)}
                        projectText={this.state.newProjectText}
                        errorText={this.state.addProjectErrorText}
                        projects={projects} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addProject: (project) => {
            dispatch(addProject(project))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)