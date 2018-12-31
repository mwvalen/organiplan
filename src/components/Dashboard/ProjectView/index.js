import React from 'react'
import { connect } from 'react-redux'

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

export const ProjectView = (project) => {
    return (
        <div className="col-md-10 pt-3">
            <div className="row pr-3">
            
            </div>
            <div className="row pt-5 px-5">
                <h3 className="my-5 w-100">{project.name}</h3>
                <br /><br />
                <div><h5 className="mb-3">Time Entries</h5></div>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                    <th scope="col">Total Time</th>
                    </tr>
                </thead>
                <tbody>
                {project.timeEntries.map((te, i)=> 
                    <tr>
                        <th scope="row">{i+1}</th>
                        <td>{new Date(te.startTime*1000).toLocaleString()}</td>
                        <td>{new Date(te.endTime*1000).toLocaleString()}</td>
                        <td>{msToTime(((te.endTime - te.startTime)*1000))}</td>
                    </tr>
                )
                }
                </tbody>
                </table>
            </div>
            
        </div>
    )
}

const mapStateToProps = (state, ownProps)=>({
    ...state.projects.find(p => p.slug === ownProps.slug)
})

export default connect(mapStateToProps)(ProjectView)
