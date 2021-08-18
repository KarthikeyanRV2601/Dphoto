import React  from 'react';
var Navbar=({account})=>{
    return(
        <header class="navbar">
            <div class="logo">DPHOTO</div> 
            <p class="address">
                {account}
            </p>
        </header>
    )
}
export default Navbar;