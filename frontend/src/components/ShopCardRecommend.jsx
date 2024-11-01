import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const ShopcardRecommend = ({
  genre,
  shopId,
  previewImage,
  verifyStatus,
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
    <div
      onClick={() => alert("shopID is : " + shopId)}
      className="flex flex-col items-center m-4 w-[400px] h-[320px] rounded-sm border-[1px] shadow-md"
    >
      {" "}
      {/* Shop preview picture */}
      <img
        className="mt-4 w-[368px] h-[200px] rounded-md"
        src={previewImage}
        alt="Image"
      />
      {/* Shop pfp, name, rating */}
      <div className="flex justify-start relative mt-6 w-[368px] h-[60px] px-4">
        <img className="w-[60px] h-100 rounded-full" src={shopProfile} alt="" />
        <div className="flex flex-col ml-4 w-60 h-100 ">
          <div className="flex justify-start items-center h-[30px]">
            <p className="text-2xl font-bold">{shopName}</p>
            {verifyStatus && (
              <img
                className="w-[28px] h-[28px] ml-2"
                src="https://cdn-icons-png.flaticon.com/128/11412/11412145.png"
                alt=""
              />
            )}
          </div>
          <div className="flex justify-start items-center h-[30px]">
            <Stack spacing={1}>
              <Rating defaultValue={shopRating} precision={0.1} readOnly />
            </Stack>
            <p className="text-sm font-medium ml-1 mt-0.5 text-gray-400">
              {shopRating} ({reviewCount})
            </p>
          </div>
        </div>
        <div class="absolute top-0 right-2">
          <img
            className="w-[24px] h-[24px]"
            src="https://cdn-icons-png.flaticon.com/128/151/151910.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ShopcardRecommend;
