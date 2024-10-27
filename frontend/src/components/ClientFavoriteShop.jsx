import React from "react";
import Shopcard from "./ShopCard";
import { FaHeart } from "react-icons/fa";

const FavoriteShop = ({
  previewImage,
  shopProfile,
  shopName,
  shopRating,
  reviewCount,
  shopDescription,
  startBudget,
  stopBudget,
}) => {
  const max3lines = {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  return (
    <div className="flex flex-col items-center m-2 w-[250px] h-[360px] rounded-sm border-[2px]">
      {/* Shop preview picture */}
      <img
        className="mt-2 w-[230px] h-[120px] rounded-md"
        src={previewImage}
        alt="preview"
      />
      {/* Shop pfp, name, rating */}
      <div className="flex justify-start relative mt-3 w-[230px] h-[40px]">
        <img
          className="w-[32px] h-[32px] rounded-full"
          src={shopProfile}
          alt=""
        />
        <div className="flex flex-col ml-2 w-40">
          <div className="flex justify-start items-center h-[16px]">
            <p className="text-sm font-semibold">{shopName}</p>
            <img
              className="w-[16px] h-[16px] ml-1"
              src="https://cdn-icons-png.flaticon.com/128/11412/11412145.png"
              alt=""
            />
          </div>
          <div className="flex justify-start items-center h-[16px]">
            <img
              className="w-[12px] h-[12px]"
              src="https://cdn-icons-png.flaticon.com/128/2893/2893811.png"
              alt=""
            />
            <img
              className="w-[12px] h-[12px]"
              src="https://cdn-icons-png.flaticon.com/128/2893/2893811.png"
              alt=""
            />
            <img
              className="w-[12px] h-[12px]"
              src="https://cdn-icons-png.flaticon.com/128/2893/2893811.png"
              alt=""
            />
            <img
              className="w-[12px] h-[12px]"
              src="https://cdn-icons-png.flaticon.com/128/2893/2893811.png"
              alt=""
            />
            <img
              className="w-[12px] h-[12px]"
              src="https://cdn-icons-png.flaticon.com/128/2893/2893811.png"
              alt=""
            />
            <p className="text-xs font-medium ml-1 text-gray-400">
              {shopRating} ({reviewCount})
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-1">
          <FaHeart color="red" />
        </div>
      </div>
      {/* Shop description 3 lines */}
      <div style={max3lines} className="w-[230px] h-[50px] mt-2 text-xs">
        {shopDescription}
      </div>
      {/* Budget */}
      <p className="w-[230px] mt-2 text-xl font-bold">
        Starts at: {startBudget} THB
      </p>
    </div>
  );
};

const ClientFavoriteShop = () => {
  return (
    <div className="lg:px-20">
      <div className="py-3 px-2 text-3xl font-semibold mb-4">
        My Favorite Shop
      </div>
      <div className="grid grid-cols-3 gap-4">
        <FavoriteShop
          previewImage="http://localhost:5555/images/cc1ceeb845958036d9a5b9e8627682a8"
          shopProfile="http://localhost:5555/images/dc030af4fdd0597fa1ea1520af97e71f"
          shopName="THANA"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="รับตัดชุดสูท ทุกชนิด"
          startBudget="1000"
          stopBudget="999999"
        />
        <FavoriteShop
          previewImage="http://localhost:5555/images/cc1ceeb845958036d9a5b9e8627682a8"
          shopProfile="http://localhost:5555/images/dc030af4fdd0597fa1ea1520af97e71f"
          shopName="THANA"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="รับตัดชุดสูท ทุกชนิด"
          startBudget="1000"
          stopBudget="999999"
        />
        <FavoriteShop
          previewImage="http://localhost:5555/images/cc1ceeb845958036d9a5b9e8627682a8"
          shopProfile="http://localhost:5555/images/dc030af4fdd0597fa1ea1520af97e71f"
          shopName="THANA"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="รับตัดชุดสูท ทุกชนิด"
          startBudget="1000"
          stopBudget="999999"
        />
        <FavoriteShop
          previewImage="http://localhost:5555/images/cc1ceeb845958036d9a5b9e8627682a8"
          shopProfile="http://localhost:5555/images/dc030af4fdd0597fa1ea1520af97e71f"
          shopName="THANA"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="รับตัดชุดสูท ทุกชนิด"
          startBudget="1000"
          stopBudget="999999"
        />
        <FavoriteShop
          previewImage="http://localhost:5555/images/cc1ceeb845958036d9a5b9e8627682a8"
          shopProfile="http://localhost:5555/images/dc030af4fdd0597fa1ea1520af97e71f"
          shopName="THANA"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="รับตัดชุดสูท ทุกชนิด"
          startBudget="1000"
          stopBudget="999999"
        />
        <FavoriteShop
          previewImage="http://localhost:5555/images/cc1ceeb845958036d9a5b9e8627682a8"
          shopProfile="http://localhost:5555/images/dc030af4fdd0597fa1ea1520af97e71f"
          shopName="THANA"
          shopRating="5.0"
          reviewCount="1384"
          shopDescription="รับตัดชุดสูท ทุกชนิด"
          startBudget="1000"
          stopBudget="999999"
        />
      </div>
    </div>
  );
};

export default ClientFavoriteShop;