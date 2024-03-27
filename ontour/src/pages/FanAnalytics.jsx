import React, { useEffect, useState } from 'react';
import parse from "html-react-parser"
import { html } from '../html';
import { mixPanelReportUrl } from '../constants/constants';
const FanAnalytics = () => {
    const [html,setHtml] = useState(null)
    const [show,setShow] = useState(false)
    async function getHtml() {
        try {
            let res = await fetch(mixPanelReportUrl);
            if (res.ok) {
                let htmlText = await res.text();
                console.log(htmlText)
                setHtml(htmlText);
            } else {
                console.error('Failed to fetch HTML:', res.status, res.statusText);
            }
        } catch (error) {
            console.error('Error fetching HTML:', error);
        }
    }
    const load = ()=>{
        setTimeout(()=>{
            setShow(true)
        },3000)
    }
    useEffect(() => {
        // getHtml()
    },[])
    return (
      <div style={{position:"relative"}}>

     <div style={{backgroundColor:"black",height:"12vh",width:"100%",position:"absolute",display:"flex",justifyContent:"center",alignItems:"center"}}>
     <img style={{width:"5%",height:"50%",objectFit:"contain"}} src="../images/logo.png" alt="" />
        <h1 style={{fontSize:"30px",marginTop:"20px", marginLeft:"10px",color:"white"}}>Fan Analytics</h1>

     </div>

        <iframe onLoadCapture={load}    id="iframe" style={{width:"99vw",height:"110vh",overflow:"hidden",scrollbarWidth:"none",display:show?"block":"none"}}  src="https://mixpanel.com/public/HNrJzwXEDnxmUipwP1Gmfw" frameborder="0">
            
        </iframe>
        </div>
        // <> {html && parse(html)}</>
       

      
      

    );
};
  
export default FanAnalytics;