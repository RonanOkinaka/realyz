import QRCode from "qrcode";
import { useEffect, useState } from "react";
import React from "react";


 const QRobject = ({ text }) => { // object for qrcodes
     const [src, setSrc] = useState("");

     useEffect(() => {
         QRCode.toDataURL(text).then((setSrc)); // sets data for qrcodes
     }, []);

     return (
         <div id="QRCode">
           <img src ={src} /> 
         </div>
     );
 };

 export default QRobject;
 //test