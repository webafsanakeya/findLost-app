import React, { Suspense } from 'react';
import Banner from './Banner';
import FindLostItems from './FindLostItems';
import BannerSlider from './BannerSlider';
import Faq from '../Faq/Faq';

const Home = () => {

    const itemsPromise = fetch('http://localhost:3000/items')
    .then(res =>res.json())
    return (
        <div>
           <Banner></Banner>
         <Suspense fallback={'loading find lost items'}>
              <FindLostItems itemsPromise={itemsPromise}></FindLostItems>
         </Suspense>

         <BannerSlider></BannerSlider>
         <Faq></Faq>
         
        </div>
    );
};

export default Home;