import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import axios from "axios";

const UrlShortner = () => {
  const textRef = useRef();

  // state for short url
  const [shortURL, setShortURL] = useState("");
  const [longURL, setLongURL] = useState("");

  // function to shorten-url
  const shortenUrl = async () => {
    if(longURL===""){
      toast.error("It Can't be Empty")
      return ;
    }
    const response = await fetch(
      `https://tinyurl.com/api-create.php?url=${longURL}`
    );
    setShortURL(await response.text());
  };

  const copyToClipboard = () => {
    let copyText = textRef?.current?.innerText;
    let isCopy = copy(copyText);
    if (isCopy) {
      toast.success("Copied to Clipboard");
    }
  };
  return (
    <div className="w-[100%] md:w-[50%] font-[Poppins] flex flex-col items-center">
      <div className="md:w-[100%] flex gap-4 md:flex-row flex-col items-center">
        <input
          type="text"
          className="w-[100%] px-4 py-2 text-black"
          onChange={(e) => setLongURL(e.target.value)}
          value={longURL}
        />
        <button
          onClick={() => {
            shortenUrl();
          }}
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          Shorten URL
        </button>
      </div>

      {/* short url div */}
      {shortURL != "" ? (
        <div className="mt-8 flex items-center justify-between gap-4 px-4 py-2">
          <p className="border p-2 rounded-lg" ref={textRef}>
            {shortURL}
          </p>

          <button
            onClick={copyToClipboard}
            className="bg-blue-500 text-white px-2 py-2 rounded-2xl text-sm"
          >
            Copy URL
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UrlShortner;
