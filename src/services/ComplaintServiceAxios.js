import axios from "axios";

export async function getAllComplaints() {
    console.log("getAllComplaints using axios");
    try{
        const response = await axios.get('http://localhost:3322/api/complaints');
        console.log(response.data);
        return response.data;
    }catch(error) {
        return [];
    }    
}


export async function getTodayComplaints() {
    console.log("getTodayComplaints using axios");
    try{
        const response = await axios.get('http://localhost:3322/api/complaints_today');
        console.log(response.data);
        return response.data;
    }catch(error) {
        return [];
    }    
}

export async function createComplaint(data) {
  console.log("createComplaint using axios");
  console.log("data");
  console.log(data);
  const response = await fetch('http://localhost:3322/api/complaint', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}