import React from 'react';
import Tilt from 'react-tilt';   
import brain from './brain.png';
import './Logo.css';
const Logo = ()=>{

	return (

		<div className='ma4 nt0'> 
	<Tilt className="Tilt br1 shadow-2" options={{ max : 15 }} style={{ height: 80, width: 80 }} >
 	<div className="Tilt-inner pa3"> <img style={{paddingTop:'10px'}}alt='logo' src={brain}/> </div>
		</Tilt>
		</div> 
		);
}

export default Logo;