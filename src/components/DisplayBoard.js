import React from 'react'

export const DisplayBoard = ({numberOfComplaints, getAllComplaints, getTodayComplaints}) => {

    const headerStyle = {

        width: '100%',
        padding: '2%',
        backgroundColor: "red",
        color: 'white',
        textAlign: 'center'
    }
    
    return(
        <div style={{backgroundColor:'lightblue'}} className="display-board">
            <h4 style={{color: 'black'}}>Complaints Created</h4>
            <div className="number" style={{color: 'black'}}>
            {numberOfComplaints}
            </div>
            <div className="btn">
            <button type="button" onClick={(e) => getAllComplaints()} className="btn btn-primary" style={{ width:190 }}>Get All Complaints</button>
            <button type="button" onClick={(e) => getTodayComplaints()} className="btn btn-danger" style={{ width:190 }}>Today Complaints</button>
            <input type="date" onClick={(e) => getTodayComplaints()} className="btn btn-success" style={{ width:190 }}/>
            <select onClick={(e) => getTodayComplaints()} className="btn btn-warning" style={{ width:190 }}>
                <option>Status - Completed</option>
                <option>Status - Postponed</option>
                <option>Status - Not Attended</option>
            </select>

            </div>
        </div>
    )
}