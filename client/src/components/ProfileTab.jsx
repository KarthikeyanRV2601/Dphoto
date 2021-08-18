import React from 'react';
import man from './Media/man.jpg'
var ProfileTab=()=>{
    return(
    <div class="profileTab">
        <div class="detailsContainer">
            <img class="dp" src={man}></img>
            <div class="name">
                Karthik
            </div>
            
        </div>
    </div>
    )
}
export default ProfileTab;
