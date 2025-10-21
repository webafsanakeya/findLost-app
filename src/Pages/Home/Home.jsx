import React, { Suspense } from "react";
import Banner from "./Banner";
import FindLostItems from "./FindLostItems";

import Faq from "../Faq/Faq";
import HowItWorks from "./HowItWorks";
import Newsletter from "./Newsletter";
import Reviews from "./Reviews";

const Home = () => {
  const itemsPromise = fetch(
    "https://find-lost-server-plum.vercel.app/items",
    {credentials: 'include'}
  ).then((res) => res.json());
  return (
    <div>
      <Banner></Banner>
      <Suspense fallback={"loading find lost items"}>
        <FindLostItems itemsPromise={itemsPromise}></FindLostItems>
      </Suspense>

      <HowItWorks />
      <Reviews />
      <Newsletter />
      <Faq></Faq>
    </div>
  );
};

export default Home;
