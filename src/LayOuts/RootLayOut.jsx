import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';
import Faq from '../Pages/Faq/Faq';
import BannerSlider from '../Pages/Home/BannerSlider';

const RootLayOut = () => {
    return (
        <div className='max-w-7xl mx-auto space-y-10'>
            <Navbar></Navbar>
            
            <Outlet></Outlet>
            

            
            
            <Footer></Footer>
        </div>
    );
};

export default RootLayOut;