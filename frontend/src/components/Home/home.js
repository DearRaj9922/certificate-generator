import React,{useState} from 'react'
import './home.css';
import axios from 'axios';
import {saveAs} from 'file-saver';
// import imgcertificate from "../../assets/participation.png"

function App() {
  // const imgcertificate="https://drive.google.com/file/d/14t4uIqenoBvjgZkWt9etesW6rIBmrQ8d/view?usp=drive_link";

  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[event,setEvent]=useState('')
  const [position, setPosition] = useState('');
  const [certificateType, setCertificateType] = useState('');
  const data={name,event,email,certificateType,position};
  // const[name,setName]=useState('')

  const SubmitForm=async(e)=>{
    e.preventDefault()

    await axios.post("http://localhost:8000/createPdf",data)  //create pdf next=>get pdf
    .then(()=>
        axios.get("http://localhost:8000/fetchPdf",{responseType:'blob'})
    .then((res)=>{
      const pdfBlob=new Blob([res.data],{type:'application/pdf'}) //to fetch the generatde pdf

      //to save we use file saver
      saveAs(pdfBlob,'InvoiceDocument.pdf')


      //to clear all input after downloading
      // setName('')
      // setReceipt('')
      // setEmail('')
    })
    .then(()=>
      axios.post(`http://localhost:8000/sendPdf`,{email:email})
    .then(response=>{
      console.log(response);
      alert(response.data)
    })
    )

    )
  }

  // const SubmitForm = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     // Generate PDF
  //     await axios.post("http://localhost:8000/createPdf", data);
  
  //     // Fetch generated PDF
  //     const fetchRes = await axios.get("http://localhost:8000/fetchPdf", { responseType: 'blob' });
  //     const pdfBlob = new Blob([fetchRes.data], { type: 'application/pdf' });
  
  //     // Save the PDF locally
  //     saveAs(pdfBlob, 'InvoiceDocument.pdf');
  
  //     // Clear input fields
  //     setName('');
  //     setReceipt('');
  //     setEmail('');
  //     setPrice1(0);
  //     setPrice2(0);
  //     setPrice3(0);
  
  //     // Send the PDF via email
  //     const sendRes = await axios.post("http://localhost:8000/sendPdf", { email: email });
  
  //     // Handle response from sending email
  //     console.log(sendRes);
  //     alert(sendRes.data);
  
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.error('Response data:', error.response.data);
  //       console.error('Response status:', error.response.status);
  //       console.error('Response headers:', error.response.headers);
  //       alert(`Error: ${error.response.status} - ${error.response.data}`);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.error('Request data:', error.request);
  //       alert('Error: No response received from server.');
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.error('Error message:', error.message);
  //       alert(`Error: ${error.message}`);
  //     }
  //   }
  // };

  return (
    <div className="main-block">
      <h1>Generate And Download Pdf</h1>
      <form onSubmit={SubmitForm}>
        <div className="info">
          <input type="text" placeholder="name" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
          <br/>
          <input type="email" placeholder="Email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <br/>
          <input type="text" placeholder="Event" name="event" value={event} onChange={(e)=>setEvent(e.target.value)}/>   
          <br/>
          <select name="certificateType" value={certificateType} onChange={(e) => setCertificateType(e.target.value)}>
            <option value="">Select Certificate Type</option>
            <option value="Participation Certificate">Participation Certificate</option>
            <option value="Winner Certificate">Winner Certificate</option>
          </select> 
          <br/>
          {certificateType === 'Winner Certificate' && (
            <>
              <select name="position" value={position} onChange={(e) => setPosition(e.target.value)}>
                <option value="">Select Position</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
              </select>
              <br />
            </>
          )}    
        </div>
        <button type="submit">Download Pdf</button>
      </form>
    </div>
  );
}

export default App;

