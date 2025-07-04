import React from 'react';
import logo from '../../../assets/images//JanpriyoLogo.png'
const Logo = () => {
    return (
        <div className='flex items-center'>
            <img className='w-10 h-10 gap-2' src={logo} alt="Janopriyo Shop Logo" />
            <p><span className='text-[#010768] text-2xl font-bold'>Janopriyo.</span><span className='font-bold text-[#f00480] text-2xl'>Shop</span> </p>
        </div>
    );
};

export default Logo;