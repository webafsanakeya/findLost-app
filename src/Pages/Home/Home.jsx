import React, { Suspense } from "react";
import Banner from "./Banner";
import FindLostItems from "./FindLostItems";
import BannerSlider from "./BannerSlider";
import Faq from "../Faq/Faq";
import HowItWorks from "./HowItWorks";

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
      <Faq></Faq>
    </div>
  );
};

export default Home;
