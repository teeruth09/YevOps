import React, { useEffect, useState } from "react";
import DeliveryAddressInfoCard from "./DeliveryAddressInfoCard";
import CustomerSizeInfoCard from "./CustomerSizeInfoCard";
import ShopOrderInfoSidebar from "./ShopOrderInfoSidebar";
import InputBox from "./InputBox";
import UserRequestDetail from "./UserRequestDetail";
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

  const {order,shop,client,onCodeChange,userRequest,orderId} = props;

  const [confirmDeadline, setConfirmDeadline] = useState(shop.confirmDeadline);
  const [confirmPrice, setConfirmPrice] = useState(shop.confirmPrice);
  useEffect(() => {
    // Update state when shop prop changes
    setConfirmDeadline(shop.confirmDeadline);
    setConfirmPrice(shop.confirmPrice);
  }, [shop]); // Add shop as a dependency to the effect

  const [orderInfo, setOrder] = useState();
  const [clientInfo, setClient] = useState();
  const [isEditing, setIsEditing] = useState(true);
  
  const size = client.size
  // console.log("ajfkeoakokgeokko",size)
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
      userRequest,
    };
    console.log("Submitting data:", requestData);
    // You can make an API call here
  };

  const handleReply = (e) => {
    const { name, value } = e.target;
    if (name === "confirmDeadline") {
        setConfirmDeadline(value);
    } else if (name === "confirmPrice") {
        setConfirmPrice(value);
    }
  };

  const handleSaveReply = () =>{
    console.log("Replying with:",confirmDeadline,confirmPrice);
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

  useEffect(() =>{
    const fetchSizeById = async () =>{
      try {

        if (!size) {
          console.error("Size ID is missing");
          return;
        }

        const response = await fetch(`http://localhost:5555/clientSize/${size}`,{
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }
        const data = await response.json();
          
        // console.log("Size id info", data);
        setUserInfo({
          shirtLength: data.shirtLength,
          chestSize: data.chestSize,
          waistline: data.waistline,
          hip: data.hip,
          waistShirt: data.waistShirt,
          hipShirt: data.hipShirt,
          thigh: data.thigh,
          crotch: data.crotch,
          shoulder: data.shoulder,
          armLength: data.armLength,
          calf: data.calf,
          tipLeg: data.tipLeg,
          legLength: data.legLength,
          upperArm: data.upperArm
        })
        
      } catch (error) {
        console.error("Fail to fetch SizeId",error);
      }
    }
    fetchSizeById();
  }, [size]);

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
                value={confirmDeadline} 
                className="border border-gray-300 rounded-xl h-10 px-5 mb-4 lg:mb-0"
                onChange={handleReply}
                disabled={!isEditing}
                />
                <p>Confirm Price</p>
                <input 
                name="confirmPrice" 
                type="text" 
                value={order.status !== 'Pending' ? order.price: confirmPrice} 
                className="border border-gray-300 rounded-xl h-10 px-5 mb-4 lg:mb-0"
                onChange={handleReply}
                disabled={!isEditing}/>
                
                {isReplying &&order.status === 'Pending' ? (
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
                  order.status === "Pending" && (
                  <div className="flex flex-row-reverse">
                    <button
                      onClick={() => setIsReplying(true)}
                      className="w-full mt-10 lg:w-40 bg-white hover:bg-red-500 hover:text-white text-red-500 border py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  </div>
                  )
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

            <UserRequestDetail userRequest={userRequest} />
          </div>

          <div>
            <ShopOrderInfoSidebar
              client={client}
              order={order}
              onCodeChange={onCodeChange}
              onSendRequest={handleSubmit}
              orderId={orderId}
              confirmDeadline={confirmDeadline}
              confirmPrice={confirmPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopViewOrderInformation;
