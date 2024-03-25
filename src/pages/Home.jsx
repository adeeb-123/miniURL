import React from "react";
import UrlShortner from "../components/UrlShortner";

const Home = () => {
  return (
    // <div className="h-screen w-full bg-black text-white flex justify-center items-center ">
    //   <div className="border py-16 w-[90%] flex flex-col gap-6 items-center justify-between rounded-2xl">
    //     <h2 className="text-4xl font-[Poppins]">Free URL Shortner</h2>
    //     <p className="text-lg font-[Poppins]">Make your url short for free</p>
    // <UrlShortner />
    //   </div>
    // </div>

    <div className="w-[100%] bg-[#ebe2f8]">
      <div className="w-[90%] max-w-[1400px] mx-auto h-full flex flex-col items-center gap-16 py-24">
        <div className="text-center py-2 px-4 space-y-2">
          <h2 className="font-[Preahvihear] text-2xl md:text-4xl lg:text-5xl">Free URL <span className="text-[#4f228d]">Shortner</span></h2>
          <p className="font-[Preahvihear] text-xs md:text-sm">Create short URLs with miniURL</p>
        </div>
        <div className="w-[80%] mx-auto">
          <UrlShortner />
        </div>
      </div>
    </div>
  );
};

export default Home;
