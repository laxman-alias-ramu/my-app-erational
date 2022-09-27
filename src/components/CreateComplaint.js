import React from 'react'


export const  CreateComplaint = ({onChangeForm, createComplaint }) => {

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 mrgnbtm">
                <h2>Create Complaint</h2>
                <br></br>
                <form>
                    <div className="row">
                        <div className="form-group col-sm-5">
                            <label htmlFor="exampleInputEmail1" className="lable"><font size="4">Date</font></label>
                            <input type="date" onChange={(e) => onChangeForm(e)}  className="form-control" name="complaintDate" id="complaintDate" aria-describedby="emailHelp"  placeholder="Date" />
                        </div>
                        <div className="form-group col-sm-5">
                            <label htmlFor="exampleInputPassword1" className="lable"><font size="4">Complaint Id</font></label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="complaintId" id="complaintId" placeholder="Complaint Id"/>
                        </div>
                        <div className="form-group col-sm-5">
                            <label htmlFor="exampleInputPassword1" className="lable"><font size="4">Customer Name</font></label>
                            <textarea style={{ width: 230}} onChange={(e) => onChangeForm(e)} className="form-control" name="customerName" id="customerName" placeholder="Customer Name">
                            </textarea>
                        </div>                   
                        <div className="form-group col-sm-5">
                            <label className="lable"><font size="4">Description</font></label>
                            <textarea style={{ width: 250}} onChange={(e) => onChangeForm(e)} className="form-control" name="customerDesc" id="customerDesc" placeholder="Description">
                            </textarea>
                        </div>     
                        <div className="form-group col-sm-5">
                            <label  className="lable"><font size="4">Status</font></label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="complaintStatus" id="complaintStatus" value="Not Attended" />
                        </div>
                       
                        <div className="form-group col-sm-2">
                        <label className="lable"><font size="4">Action</font></label>
                            <button type="button" onClick= {(e) => createComplaint()} className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default CreateComplaint;