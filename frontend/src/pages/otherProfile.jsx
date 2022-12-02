import Navbar from "../components/navbar";
import { OtherProfile } from "../components/myprofile";
import OtherVideo from "../components/otherVideo";
import { getUserData } from "../util/data";
import Background from "../media/portalBackground.jpg"

import React from 'react';
import { useParams } from 'react-router-dom';

const FullOtherProfile = (_props) => {
    const [usrData, setUsrData] = React.useState({ });
    const params = useParams();

    React.useEffect(function() {
        if (params.uid) {
            getUserData(params.uid).then(function(res) {
                setUsrData(res.data);
            });
        }
    }, []);

    return (
        <body className="profilepage">
            <div className="backgroundcontainer" style={{ backgroundImage: `url(${Background})` }}>
                <Navbar isLanding={ () => false }/>
                {
                    <React.Fragment>
                        <OtherProfile info={ usrData } />
                        <OtherVideo uid={ params.uid } />
                    </React.Fragment>
                }
            </div>
        </body>
    );
}

export default FullOtherProfile;
