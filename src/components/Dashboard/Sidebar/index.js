import React from 'react'
import './styles.scss'

const sidebarProjectsSort = (a, b) => {
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
}

const ProjectListing = ({project}) => (
    <li className="nav-item d-flex flex-row align-items-center" key={project.slug}>
        <div className="pl-2 project-bullet"
             style={{ 'backgroundColor':"#"+project.color }}>
        </div>
        <a className="nav-link pl-0 ml-2" href="#">              
            {project.name}
        </a>
    </li>
)

export default ({projects}) => (
    <div className="sidebar-sticky h-100 pt-3 pl-4">
        <h6><a className="nav-title" href="#">All Projects</a></h6>
        <ul className="nav flex-column pl-2">
            { 
                projects.sort(sidebarProjectsSort).map(p => (
                    <ProjectListing project={p} />             
                ))
            }
        </ul>
    </div>
)