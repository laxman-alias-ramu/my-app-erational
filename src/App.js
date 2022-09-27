import React, { useState, useEffect } from 'react';
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { Complaints } from './components/Complaints'
import { DisplayBoard } from './components/DisplayBoard'
import { CreateComplaint } from './components/CreateComplaint'
import { getAllComplaints, createComplaint } from './services/ComplaintServiceAxios'

function App() {

  const [complaint, setComplaint] = useState({})
  const [complaints, setComplaints] = useState([])
  const [numberOfComplaints, setNumberOfComplaints] = useState(0)
  const [message, setMessage] = useState({})

  const complaintCreate = (e) => {

      createComplaint(complaint)
        .then(response => {
          console.log(response);
          setNumberOfComplaints(numberOfComplaints+1)
      });
  }

  const fetchAllComplaints = () => {
      
    axios.get("http://localhost:3322/api/complaints")
      .then(response => response.data)
      .then((data) => {
        console.log(data);
        console.log('connected');
        setMessage('connected');
        setComplaints(data);
        setNumberOfComplaints(data.length); 
      })
      .catch((err)=>{
        console.log(err);
        setMessage('Not connected');
      });

  }

  
  const fetchTodayComplaints = () => {
      
    axios.get("http://localhost:3322/api/complaints_today")
      .then(response => response.data)
      .then((data) => {
        console.log(data);
        console.log('connected');
        setMessage('connected');
        setComplaints(data);
        setNumberOfComplaints(data.length); 
      })
      .catch((err)=>{
        console.log(err);
        setMessage('Not connected');
      });

  }

  useEffect(() => {
    getAllComplaints()
      .then(complaints => {
        console.log(complaints)
        setComplaints(complaints);
        setNumberOfComplaints(complaints.length)
      });
  }, [])


  const onChangeForm = (e) => {
      if (e.target.name === 'complaintDate') {
        complaint.complaintDate = e.target.value;
      } else if (e.target.name === 'complaintId') {
          complaint.complaintId = e.target.value;
      } else if (e.target.name === 'customerName') {
          complaint.customerName = e.target.value;
      } else if (e.target.name === 'complaintStatus') {
        complaint.complaintStatus = e.target.value;
      } else if (e.target.name === 'customerDesc') {
        complaint.customerDesc = e.target.value;
      }
      setComplaint(complaint)
  }
    
    return (
        <div className="App">
          <Header>API - {message}</Header>
          <div className="container mrgnbtm">
            <div className="row">
              <div className="col-md-8">
                  <CreateComplaint 
                    complaint={complaint}
                    onChangeForm={onChangeForm}
                    createComplaint={complaintCreate}
                    >
                  </CreateComplaint>
              </div>
              <div className="col-md-4">
                  <DisplayBoard
                    numberOfComplaints={numberOfComplaints}
                    getAllComplaints={fetchAllComplaints}
                    getTodayComplaints={fetchTodayComplaints}

                  >
                  </DisplayBoard>
              </div>
            </div>
          </div>
          <div className="row mrgnbtm">
            <Complaints complaints={complaints}></Complaints>
          </div>
        </div>
    );
}

export default App;