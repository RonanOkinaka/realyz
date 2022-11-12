import { useState } from 'react';

const useModal = () => {
    const [vis, setVis] = useState(0);
    
    //toggle visibility, mode0 = none, mode1 = signupModal, mode2 = loginModal
    function toggle(mode) {
        setVis(mode);
    }

    return {
        vis,
        toggle,
    }
};

export default useModal;