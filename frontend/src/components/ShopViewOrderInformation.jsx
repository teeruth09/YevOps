import React, { useState } from "react";
import OrderDetail from "./OrderDetail";
import DeliveryAddressInfoCard from "./DeliveryAddressInfoCard";
import CustomerSizeInfoCard from "./CustomerSizeInfoCard";
import ShopOrderInfoSidebar from "./ShopOrderInfoSidebar";
import InputBox from "./InputBox";

const ShopViewOrderInformation = (props) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    imageProfile:
      "https://th.bing.com/th/id/OIP.6Vkv1Oyc641507Z8PhZrRgHaHX?w=900&h=895&rs=1&pid=ImgDetMain",
    firstname: "",
    lastname: "",
    birthdate: "",
    phone: "",
    gender: "",
    address: "",
    whose_size: "ขนาดตัวของคุณ",
    shirtLength: "45",
    chestSize: "45",
    waistline: "45",
    hip: "45",
    waistShirt: "45",
    hipShirt: "45",
    thigh: "45",
    crotch: "45",
    shoulder: "45",
    armLength: "45",
    calf: "45",
    tipLeg: "45",
    legLength: "45",
    upperArm: "45",
  });

  const {
    order: initialOrder,
    shop,
    client: initialClient,
    onCodeChange,
  } = props;

  const [order, setOrder] = useState(initialOrder);
  const [client, setClient] = useState(initialClient);
  const [isEditing, setIsEditing] = useState(true);
  const [replyText, setReplyText] = useState({
    confirmDeadline: "deadline from client request",
    confirmPrice: "start budget",
  });
  const [isReplying, setIsReplying] = useState(false);

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const requestData = {
      order,
      client,
      shop,
    };
    console.log("Submitting data:", requestData);
    // You can make an API call here
  };

  const handleReply = (e) => {
    // Here you could send the reply to an API or handle it as needed
    setReplyText({
      ...replyText,
      [e.target.name]: e.target.value,
    }); // Clear the reply input after sending
    // setIsReplying(false); // Exit reply mode
  };

  const handleSaveReply = () =>{
    console.log("Replying with:", replyText);
    setIsReplying(false);
  }

  const shirtFields = [
    { name: "shirtLength", label: "เสื้อยาว" },
    { name: "chestSize", label: "รอบอก" },
    { name: "waistShirt", label: "เอวเสื้อ" },
    { name: "hipShirt", label: "สะโพกเสื้อ" },
    { name: "shoulder", label: "ไหล่" },
    { name: "armLength", label: "แขนยาว" },
    { name: "upperArm", label: "ต้นแขน" },
  ];

  const pantsFields = [
    { name: "waistline", label: "รอบเอว" },
    { name: "hip", label: "สะโพก" },
    { name: "thigh", label: "ต้นขา" },
    { name: "crotch", label: "เป้า" },
    { name: "calf", label: "น่องขา" },
    { name: "tipLeg", label: "ปลายขา" },
    { name: "legLength", label: "ความยาวขา" },
  ];

  return (
    <div className="flex justify-center">
      <div className="mt-2 flex flex-col">
        <div className="mb-8">
          Profile {" > "} Order {" > "} Detail
        </div>
        <div className="flex flex-col md:flex-row gap-x-10">
          <div className="flex flex-col w-auto md:w-4/5">
            <div className="mb-8 p-8 rounded-lg shadow-2xl bg-white">
              <h3 className="font-bold text-2xl mb-8">Shop Reply</h3>
              <hr className="mb-8" />
              <div className="flex flex-col w-100 justify-center">
                <p>Confirm Deadline</p>
                <input 
                name="confirmDeadline" 
                type="text" 
                value={replyText.confirmDeadline} 
                className="border border-gray-300 rounded-xl h-10 px-5 mb-4 lg:mb-0"
                onChange={handleReply}
                disabled={!isEditing}
                />
                <p>Confirm Price</p>
                <input 
                name="confirmPrice" 
                type="text" 
                value={replyText.confirmPrice} 
                className="border border-gray-300 rounded-xl h-10 px-5 mb-4 lg:mb-0"
                onChange={handleReply}
                disabled={!isEditing}/>
                {/* <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  cols="48"
                  rows="10"
                  className="p-4 border-slate-200 border-[1px]"
                ></textarea> */}
                {isReplying ? (
                  <>
                    <div className="flex flex-col lg:flex-row justify-end pt-10 items-center">
                      <button
                        onClick={() => setIsReplying(false)}
                        className="w-full lg:w-40 bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded mt-2 lg:mt-0"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveReply}
                        className="ml-3 w-full lg:w-40 bg-red-700 hover:bg-red-500 hover:text-white text-white border py-2 px-4 rounded"
                      >
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-row-reverse">
                    <button
                      onClick={() => setIsReplying(true)}
                      className="w-full mt-10 lg:w-40 bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>

            <DeliveryAddressInfoCard
            
              client_name={client.fullname}
              client_phone={client.phone}
              client_address={client.address}
              onChange={(key, value) => setClient({ ...client, [key]: value })}
              isChange={false}
            />

            <div className="mb-8 p-8 rounded-lg shadow-2xl bg-white">
              <h3 className="font-bold text-2xl mb-8">Customer Information</h3>
              <hr className="mb-8" />
              <div className="flex w-100 justify-between">
                <div className="flex-col flex w-1/2">
                  <p>เสื้อ</p>
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {shirtFields.map((field) => (
                      <InputBox
                        key={field.name}
                        name={field.name}
                        value={userInfo[field.name]}
                        handleChange={handleUserInfoChange}
                        isEditing={isEditing}
                        label={field.label}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex-col flex w-1/2">
                  <p>กาวเกง</p>
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {pantsFields.map((field) => (
                      <InputBox
                        key={field.name}
                        name={field.name}
                        value={userInfo[field.name]}
                        handleChange={handleUserInfoChange}
                        isEditing={isEditing}
                        label={field.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <OrderDetail />
          </div>

          <div>
            <ShopOrderInfoSidebar
              client={client}
              order={order}
              onCodeChange={onCodeChange}
              onSendRequest={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopViewOrderInformation;
