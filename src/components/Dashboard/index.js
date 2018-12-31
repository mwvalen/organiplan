import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import slugify from 'slugify';
import _ from 'lodash';
import colors from '../../utils/colorList'
import { addProject } from '../../actions/manageProjects'
import './styles.scss'
import Sidebar from './Sidebar'
import ProjectsView from './ProjectsView'
import ProjectView from './ProjectView'

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
    
    render() {
        const {projects} = this.props
        return (    
            <div className="row main-row">  
                <div className="col-md-2 bg-light sidebar projects-sidebar h-100">
                    <Sidebar projects={projects} />
                </div>
                <Switch>
                    <Route exact path='/' 
                            render= {() => 
                                <ProjectsView onAddProject={this.addProject.bind(this)}
                                updateNewProjectText={this.updateNewProjectText.bind(this)}
                                projectText={this.state.newProjectText}
                                errorText={this.state.addProjectErrorText}
                                projects={projects} />
                            
                        }/>
                    <Route exact path='/projects/:slug' 
                            render= {({match}) => 
                                <ProjectView slug={match.params.slug} />
                            
                            } />
               </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))