import React from 'react'
import Navbar from '../../../common/Navbar/Navbar'
import { useNavigate } from 'react-router';
import WishlistPage from './card';
// import WhisListProductCards from './card';

function WhislistLayyout() {

  
 
  return (
 <>
 <Navbar/>
<WishlistPage/>

 </>
  )
}

export default WhislistLayyout