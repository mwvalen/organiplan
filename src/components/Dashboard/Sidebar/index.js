import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'


const sidebarProjectsSort = (a, b) => {
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
}

const ProjectListing = ({project}) => (
    <li className="nav-item d-flex flex-row align-items-center" key={project.slug}>
        <div className="pl-2 project-bullet"
             style={{ 'backgroundColor':"#"+project.color }}>
        </div>
        <Link to={`/projects/${project.slug}`} className="nav-link pl-0 ml-2" >  
            {project.name}
        </Link>
    </li>
)

export default ({projects}) => (
    <div className="sidebar-sticky h-100 pt-3 pl-4">
        <h6><Link to='/' className="nav-title">All Projects</Link></h6>
        <ul className="nav flex-column pl-2">
            { 
                projects.sort(sidebarProjectsSort).map(p => (
                    <ProjectListing project={p} />             
                ))
            }
        </ul>
    </div>
)