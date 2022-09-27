import React from 'react'

export const Header = () => {

    const headerStyle = {

        width: '100%',
        padding: '4%',
        backgroundColor: "royalblue",
        color: 'white',
        textAlign: 'center'
    }

    return(
        <div style={headerStyle}>
            <h1>eRational Complaint Tracking System</h1>
        </div>
    )
}