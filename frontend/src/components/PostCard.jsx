import React, { useState } from "react";

function PostCard({ orderInfo }) {
  console.log("Order info:", orderInfo);

  // State to manage image load success
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <div className="w-[400px] mb-8 p-8 rounded-lg shadow-2xl bg-white">
      <div className="flex py-3">
        <img
          src={orderInfo.client_profile}
          alt="รูปโปรไฟล์ร้าน"
          className="rounded-full w-12 h-12"
        />
        <div>
          <div className="flex px-2">
            <p className="font-bold flex-auto">{orderInfo.client_name}</p>
          </div>
          <div className="flex px-2 ">
            <p>{orderInfo.date}</p>
          </div>
        </div>
      </div>

      <hr className="mb-8" />

      {/* Use conditional className for flex or hidden */}
      <div
        className={`flex flex-col bg-slate-200 p-8 ${
          imageLoaded ? "flex" : "hidden"
        }`}
      >
        <img
          src={orderInfo.order_picture}
          alt="รูปสั่งซื้อ"
          className=""
          onLoad={() => setImageLoaded(true)} // Set to true if image loads successfully
          onError={() => setImageLoaded(false)} // Set to false if image fails to load
        />
      </div>

      <p className="my-8">{orderInfo.detail}</p>
      <div className="flex flex-row-reverse">
        <button className="w-full lg:w-40 border py-2 px-4 rounded hover:cursor-pointer">
          Comment
        </button>
      </div>
    </div>
  );
}

export default PostCard;
