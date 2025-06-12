import React, { Suspense } from 'react';
import Banner from './Banner';
import FindLostItems from './FindLostItems';

const Home = () => {

    const itemsPromise = fetch('http://localhost:3000/items')
    .then(res =>res.json())
    return (
        <div>
           <Banner></Banner>
         <Suspense fallback={'loading find lost items'}>
              <FindLostItems itemsPromise={itemsPromise}></FindLostItems>
         </Suspense>
        </div>
    );
};

export default Home;