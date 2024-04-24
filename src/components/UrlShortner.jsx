import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import axios from "axios";
import { apiConnector } from "../utils/apiConnector";
import { BASE_URL, ShortURL_API } from "../utils/apis"
import { TailSpin } from "react-loader-spinner";
// import { QRCodeSVG } from 'qrcode.react';
import QRCode from 'qrcode.react';
import { IoCloudDownload } from "react-icons/io5";

const UrlShortner = () => {
  const textRef = useRef();

  // state for short url
  const [shortURL, setShortURL] = useState("");
  const [longURL, setLongURL] = useState("");
  const [loading, setLoading] = useState(false)

  // qr status
  const [genQR, setGenQR] = useState(false)

  const downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrCodeEl')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL)
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }

  // function to shorten-url
  const shortenUrl = async () => {
    setShortURL('')
    try {
      setLoading(true)
      if (longURL === "") {
        toast.error("It Can't be Empty")
        return;
      }
      const response = await apiConnector({
        method: 'POST',
        url: ShortURL_API.Create_ShortURL,
        bodyData: { longURL }
      })

      setLoading(false)
      setShortURL(BASE_URL + '/' + response.data.shortURL)
    } catch (error) {
      toast.error("Something went wrong")
      toast.error("Error ->" , error)
    }
  };

  const copyToClipboard = () => {
    let copyText = textRef?.current?.value;
    let isCopy = copy(copyText);
    if (isCopy) {
      toast.success("Copied to Clipboard");
    }
  };
  return (
    <div className="w-[100%] font-[Preahvihear] flex flex-col items-center px-8 py-12 bg-[#1a0b2e] min-h-[200px] rounded-2xl shadow-2xl">
      <div className="w-[100%] flex gap-4 flex-col items-center">
        <input
          type="text"
          className="w-[100%] p-3 text-black font-extrabold bg-[#e1d2f4] rounded-lg"
          onChange={(e) => setLongURL(e.target.value)}
          value={longURL}
          placeholder="Enter your long Url"
        />
        <button
          onClick={() => {
            shortenUrl();
          }}
          className="bg-[#4f228d] text-white rounded-lg px-4 py-2 w-[70%] min-w-fit mx-auto cursor-pointer hover:scale-[1.04] hover:shadow-2xl duration-700 transition-all"
        >
          Shorten URL
        </button>
      </div>

      {/* handle the loader */}
      {
        loading ? (<div className="w-[50px]">
          <TailSpin color="#e1d2f4" radius={"2px"} />
        </div>) : (<></>)
      }

      {/* short url div */}
      {shortURL != "" ? (
        <div className="mt-12 flex flex-col items-center justify-between gap-4 px-4 py-2 w-[100%]">

          {/* <p className="p-4 rounded-lg bg-[#e1d2f4] text-black font-extrabold" ref={textRef}>
            {shortURL}
          </p> */}

          <div className="w-[60%] font-extrabold flex flex-col lg:flex-row gap-4 items-center justify-between">
            <input
              type="text"
              className="w-[100%] p-4 rounded-lg bg-[#e1d2f4] text-black "
              ref={textRef}
              value={shortURL}
            />
            {
              genQR ? (
                <div className="relative pr-8">
                  <QRCode id="qrCodeEl" value={shortURL} bgColor="#1a0b2e" fgColor="#FFFFFF" size={'64'} />
                  <IoCloudDownload className="text-white text-lg absolute top-0 right-0 cursor-pointer duration-200 transition-all hover:scale-[1.5]" onClick={downloadQRCode} />
                </div>
              ) : (<p className="text-white min-w-fit cursor-pointer hover:underline" onClick={() => setGenQR(true)}>Generate QR</p>)
            }
          </div>

          <button
            onClick={copyToClipboard}
            className="bg-[#4f228d] text-white px-2 py-2 rounded-lg text-sm w-[20%] min-w-fit hover:scale-[1.04] hover:shadow-2xl duration-700 transition-all"
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
