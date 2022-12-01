import QRCode from 'qrcode';
 import { useEffect, useState } from 'react';


 const QRobject = ({ text }) => { // object for qrcodes
     const [src, setSrc] = useState("");

     useEffect(() => {
         QRCode.toDataURL(text).then((setSrc)); // sets data for qrcodes
     }, []);

     return (
         <div>
           <img src ={src} /> 
         </div>
     );
 };