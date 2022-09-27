import React from 'react'

export const Complaints = ({complaints}) => {

    console.log('complaints length:::', complaints.length)
    if (complaints.length === 0) return null

    const ComplaintRow = (complaint, index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td><b>{index + 1} - {complaint.complaintId}</b></td>
                  <td><b>{complaint.complaintDate}</b></td>
                  <td><b>{complaint.complaintStatus}</b></td>
                  <td><b>{complaint.customerName}</b></td>
                  <td><b>{complaint.customerDesc}</b></td>
              </tr>
          )
    }

    const complaintTable = complaints.map((complaint,index) => ComplaintRow(complaint,index))

    return(
        <div className="container">
            <h2>Complaints</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th className="lable"><font size="3"><b>Id</b></font></th>
                    <th className="lable"><font size="3"><b>Date</b></font></th>
                    <th className="lable"><font size="3"><b>Status</b></font></th>
                    <th className="lable"><font size="3"><b>Customer Name</b></font></th>
                    <th className="lable"><font size="3"><b>Desc</b></font></th>
                </tr>
                </thead>
                <tbody>
                    {complaintTable}
                </tbody>
            </table>
        </div>
    )
}