import React from 'react';
import logo from "../images/logo.png"
import logoimg from "../images/logoimg.jpg"

import { Link } from 'react-router-dom';
function Navbar() {
    const user = {
        name: 'Tom Cook',
        email: 'tom@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=60',
      }
    return <>
        <div className="flex flex-row place-items-end space-x-8 px-8 border items-center py-4 bg-neutral-100"><img src={logo} alt='img'></img> 
        <Link to="/" className='text-green-400 text-xl md:text-3xl font-mono hover:bg-white hover:font-bold'>Movies</Link>
        <Link to="/favourites" className='text-green-400 text-xl md:text-3xl font-mono hover:bg-white hover:font-bold'>Favourites </Link>
        <Link to="/login" className='right-2 text-green-400 align-left text-xl md:text-3xl font-mono hover:bg-white hover:font-bold'>Login </Link>
        <div className='absolute right-4'>
                          {/* <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"> */}
                            <img className="h-10 w-10 rounded-full " src={user.imageUrl} alt="" />
                          {/* </Menu.Button> */}
                        </div>
            </div>
            
    </>

}
export default Navbar;