import React, { useState } from 'react';
import axios from 'axios';

const serverConfig = require("../config/server.js");

const Test = () => {

  const [message,setMessage] = useState('');

  axios.get("http://"+serverConfig.API_HOST+":"+serverConfig.API_PORT+"/api/boards/").then(response => response.data)
  .then((data) => {
    console.log('connected');
    setMessage('connected');
  })
  .catch((err)=>{
    console.log(err);
    setMessage('Not connected');
  });

  return (
    <p>{message}</p>
  );
}

export default Test