import React from "react";
import UrlShortner from "../components/UrlShortner";

const Home = () => {
  return (
    <div className="h-screen w-full bg-black text-white flex justify-center items-center ">
      <div className="border py-16 w-[90%] flex flex-col gap-6 items-center justify-between rounded-2xl">
        <h2 className="text-4xl font-[Poppins]">Free URL Shortner</h2>
        <p className="text-lg font-[Poppins]">Make your url short for free</p>
        <UrlShortner />
      </div>
    </div>
  );
};

export default Home;
