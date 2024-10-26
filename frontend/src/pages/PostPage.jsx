import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NavbarClient from "../components/NavbarClient";
import NavbarShop from "../components/NavbarShop";
import NavbarAdmin from "../components/NavbarAdmin";
import Filterbar from "@/components/FilterBar";
import Shopcard from "@/components/ShopCard";
import myImage from "../../public/website_picture.png"; // Assuming your component is in src/components
import { jwtDecode } from "jwt-decode";
import PostCard from "@/components/PostCard";
import { Link } from "react-router-dom";
import PostCard2 from "@/components/PostCard2";

const PostPage = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      client_name: "Nantita Lukmoo",
      order_picture:
        "https://th.bing.com/th/id/OIP.VgTfsglMSIRrHk1ZlW1LbwHaIc?w=570&h=650&rs=1&pid=ImgDetMain",
      client_profile:
        "https://th.bing.com/th/id/OIP.2UgtaTL--UtqX-LFVsMh6gHaH_?w=1000&h=1080&rs=1&pid=ImgDetMain",
      date: "15 Aug 2024",
      detail: "อยากได้ชุดสวยๆมาใส่ในงานแต่งงาน",
    },
    {
      id: 2,
      client_name: "Somchai Srisuk",
      order_picture: "https://example.com/order2.jpg",
      client_profile: "https://example.com/profile2.jpg",
      date: "12 Jul 2024",
      detail: "เสื้อใส่ออกงานกลางคืน",
    },
    {
      id: 3,
      client_name: "Suphansa Nitipong",
      order_picture: "https://example.com/order3.jpg",
      client_profile: "https://example.com/profile3.jpg",
      date: "22 Jun 2024",
      detail: "ชุดใส่ไปสัมภาษณ์งาน",
    },
    {
      id: 4,
      client_name: "Jirawat Thanom",
      order_picture: "https://example.com/order4.jpg",
      client_profile: "https://example.com/profile4.jpg",
      date: "5 Sep 2024",
      detail: "ชุดสูทเข้าร่วมประชุม",
    },
    {
      id: 5,
      client_name: "Ploy Rattanaporn",
      order_picture: "https://example.com/order5.jpg",
      client_profile: "https://example.com/profile5.jpg",
      date: "8 Oct 2024",
      detail: "ชุดไปงานเลี้ยง",
    },
    {
      id: 6,
      client_name: "Siriwan Pornsiri",
      order_picture: "https://example.com/order6.jpg",
      client_profile: "https://example.com/profile6.jpg",
      date: "1 Jan 2024",
      detail: "เสื้อผ้าแฟชั่นแนวสตรีท",
    },
    {
      id: 7,
      client_name: "Patipat Jaroensak",
      order_picture: "https://example.com/order7.jpg",
      client_profile: "https://example.com/profile7.jpg",
      date: "23 Feb 2024",
      detail: "ชุดใส่ออกกำลังกาย",
    },
    {
      id: 8,
      client_name: "Kamolchanok Sukphong",
      order_picture: "https://example.com/order8.jpg",
      client_profile: "https://example.com/profile8.jpg",
      date: "30 Mar 2024",
      detail: "ชุดไปทะเล",
    },
    {
      id: 9,
      client_name: "Chaiyapat Krittameth",
      order_picture: "https://example.com/order9.jpg",
      client_profile: "https://example.com/profile9.jpg",
      date: "12 Apr 2024",
      detail: "ชุดทางการสำหรับงานเลี้ยง",
    },
    {
      id: 10,
      client_name: "Thida Pornchai",
      order_picture: "https://example.com/order10.jpg",
      client_profile: "https://example.com/profile10.jpg",
      date: "25 May 2024",
      detail: "ชุดสำหรับไปสัมภาษณ์",
    },
    {
      id: 11,
      client_name: "Manas Chuthathip",
      order_picture: "https://example.com/order11.jpg",
      client_profile: "https://example.com/profile11.jpg",
      date: "10 Jun 2024",
      detail: "ชุดสูททางการ",
    },
    {
      id: 12,
      client_name: "Chanachai Srithep",
      order_picture: "https://example.com/order12.jpg",
      client_profile: "https://example.com/profile12.jpg",
      date: "22 Jul 2024",
      detail: "เสื้อใส่ทำงาน",
    },
    {
      id: 13,
      client_name: "Arisara Kanjana",
      order_picture: "https://example.com/order13.jpg",
      client_profile: "https://example.com/profile13.jpg",
      date: "15 Aug 2024",
      detail: "ชุดนักเรียน",
    },
    {
      id: 14,
      client_name: "Thanapon Boonmee",
      order_picture: "https://example.com/order14.jpg",
      client_profile: "https://example.com/profile14.jpg",
      date: "9 Sep 2024",
      detail: "ชุดกีฬา",
    },
    {
      id: 15,
      client_name: "Saowanee Nittaya",
      order_picture: "https://example.com/order15.jpg",
      client_profile: "https://example.com/profile15.jpg",
      date: "14 Oct 2024",
      detail: "ชุดใส่ในงานเลี้ยงหรู",
    },
    {
      id: 16,
      client_name: "Pornsawan Theera",
      order_picture: "https://example.com/order16.jpg",
      client_profile: "https://example.com/profile16.jpg",
      date: "11 Nov 2024",
      detail: "ชุดใส่สำหรับงานแต่งงาน",
    },
    {
      id: 17,
      client_name: "Atitaya Khan",
      order_picture: "https://example.com/order17.jpg",
      client_profile: "https://example.com/profile17.jpg",
      date: "22 Dec 2024",
      detail: "เสื้อผ้าแนววินเทจ",
    },
    {
      id: 18,
      client_name: "Rattana Phoonsri",
      order_picture: "https://example.com/order18.jpg",
      client_profile: "https://example.com/profile18.jpg",
      date: "5 Jan 2024",
      detail: "ชุดไปทำงาน",
    },
    {
      id: 19,
      client_name: "Chatchai Supanan",
      order_picture: "https://example.com/order19.jpg",
      client_profile: "https://example.com/profile19.jpg",
      date: "3 Feb 2024",
      detail: "ชุดใส่ประชุมออนไลน์",
    },
    {
      id: 20,
      client_name: "Nipon Pranee",
      order_picture: "https://example.com/order20.jpg",
      client_profile: "https://example.com/profile20.jpg",
      date: "20 Mar 2024",
      detail: "เสื้อผ้าทางการ",
    },
    {
      id: 21,
      client_name: "Tida Ratanasiri",
      order_picture: "https://example.com/order21.jpg",
      client_profile: "https://example.com/profile21.jpg",
      date: "15 Apr 2024",
      detail: "ชุดใส่ในงานปาร์ตี้",
    },
    {
      id: 22,
      client_name: "Siripong Kantanan",
      order_picture: "https://example.com/order22.jpg",
      client_profile: "https://example.com/profile22.jpg",
      date: "28 May 2024",
      detail: "ชุดสำหรับงานแฟชั่นโชว์",
    },
    {
      id: 23,
      client_name: "Praew Namtip",
      order_picture: "https://example.com/order23.jpg",
      client_profile: "https://example.com/profile23.jpg",
      date: "18 Jun 2024",
      detail: "ชุดไทยสำหรับงานสำคัญ",
    },
    {
      id: 24,
      client_name: "Chatmongkol Meechai",
      order_picture: "https://example.com/order24.jpg",
      client_profile: "https://example.com/profile24.jpg",
      date: "27 Jul 2024",
      detail: "ชุดใส่ไปทำบุญ",
    },
    {
      id: 25,
      client_name: "Ananya Vongsawat",
      order_picture: "https://example.com/order25.jpg",
      client_profile: "https://example.com/profile25.jpg",
      date: "30 Sep 2024",
      detail: "ชุดไทยสำหรับงานแต่ง",
    },
  ]); // Array to store fetched orders

  const centerdiv = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,432px)",
  };

  const [shops, setShop] = useState([
    // Dummy data (Fetched array of data from db)
    {
      id: 1, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage: "https://i.imgur.com/SjjJVdY.png",
      shopProfile:
        "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "Hinoshii is cool",
      shopRating: "5.0",
      reviewCount: "1384",
      shopDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      startBudget: "2100",
      stopBudget: "999999",
    },
    {
      id: 2, // Add an ID for easier identification
      verifyStatus: "N",
      previewImage: "https://i.imgur.com/SjjJVdY.png",
      shopProfile:
        "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "Bunny4Eva",
      shopRating: "3.8",
      reviewCount: "12",
      shopDescription: "I luv bnuy",
      startBudget: "1300",
      stopBudget: "4000",
    },
    {
      id: 3, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage:
        "https://m.media-amazon.com/images/I/61ILcasnX7L._AC_UF894,1000_QL80_.jpg",
      shopProfile:
        "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "A",
      shopRating: "1.4",
      reviewCount: "14",
      shopDescription: "A quick brown",
      startBudget: "10000",
      stopBudget: "57000",
    },
    {
      id: 4, // Add an ID for easier identification
      verifyStatus: "N",
      previewImage: "https://i.imgur.com/SjjJVdY.png",
      shopProfile:
        "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "Chamber Stupid",
      shopRating: "3.7",
      reviewCount: "1384",
      shopDescription: "book.",
      startBudget: "0",
      stopBudget: "100",
    },
    {
      id: 5, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage:
        "https://animetv-jp.net/wp-content/uploads/2024/06/%E3%80%90%E3%83%AD%E3%82%B7%E3%83%87%E3%83%AC%E3%80%91%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BCPV-%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%A3ver.%EF%BD%9C2024%E5%B9%B47%E6%9C%883%E6%97%A5%E6%B0%B4%E6%94%BE%E9%80%81%E9%96%8B%E5%A7%8B-YouTube-0-0-18.jpeg",
      shopProfile:
        "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "TakdanaiKaitod",
      shopRating: "4.9",
      reviewCount: "946672",
      shopDescription:
        "ขายไก่ทอดมา 37 ปี ปีนี้ปีท้ายละ เบื่อ อยากไปนอนแล้วอย่ามาสั่งจะได้มั้ย",
      startBudget: "100000",
      stopBudget: "600000",
    },
    {
      id: 6, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage:
        "https://animetv-jp.net/wp-content/uploads/2024/06/%E3%80%90%E3%83%AD%E3%82%B7%E3%83%87%E3%83%AC%E3%80%91%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BCPV-%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%A3ver.%EF%BD%9C2024%E5%B9%B47%E6%9C%883%E6%97%A5%E6%B0%B4%E6%94%BE%E9%80%81%E9%96%8B%E5%A7%8B-YouTube-0-0-18.jpeg",
      shopProfile:
        "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "TakdanaiKaitod",
      shopRating: "4.9",
      reviewCount: "946672",
      shopDescription:
        "ขายไก่ทอดมา 37 ปี ปีนี้ปีท้ายละ เบื่อ อยากไปนอนแล้วอย่ามาสั่งจะได้มั้ย",
      startBudget: "100000",
      stopBudget: "600000",
    },
    {
      id: 7, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage:
        "https://animetv-jp.net/wp-content/uploads/2024/06/%E3%80%90%E3%83%AD%E3%82%B7%E3%83%87%E3%83%AC%E3%80%91%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BCPV-%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%A3ver.%EF%BD%9C2024%E5%B9%B47%E6%9C%883%E6%97%A5%E6%B0%B4%E6%94%BE%E9%80%81%E9%96%8B%E5%A7%8B-YouTube-0-0-18.jpeg",
      shopProfile:
        "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "TakdanaiKaitod",
      shopRating: "4.9",
      reviewCount: "946672",
      shopDescription:
        "ขายไก่ทอดมา 37 ปี ปีนี้ปีท้ายละ เบื่อ อยากไปนอนแล้วอย่ามาสั่งจะได้มั้ย",
      startBudget: "100000",
      stopBudget: "600000",
    },
    {
      id: 8, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage:
        "https://animetv-jp.net/wp-content/uploads/2024/06/%E3%80%90%E3%83%AD%E3%82%B7%E3%83%87%E3%83%AC%E3%80%91%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BCPV-%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%A3ver.%EF%BD%9C2024%E5%B9%B47%E6%9C%883%E6%97%A5%E6%B0%B4%E6%94%BE%E9%80%81%E9%96%8B%E5%A7%8B-YouTube-0-0-18.jpeg",
      shopProfile:
        "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "TakdanaiKaitod",
      shopRating: "4.9",
      reviewCount: "946672",
      shopDescription:
        "ขายไก่ทอดมา 37 ปี ปีนี้ปีท้ายละ เบื่อ อยากไปนอนแล้วอย่ามาสั่งจะได้มั้ย",
      startBudget: "100000",
      stopBudget: "600000",
    },
    {
      id: 9, // Add an ID for easier identification
      verifyStatus: "Y",
      previewImage:
        "https://animetv-jp.net/wp-content/uploads/2024/06/%E3%80%90%E3%83%AD%E3%82%B7%E3%83%87%E3%83%AC%E3%80%91%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BCPV-%E3%83%9E%E3%83%BC%E3%82%B7%E3%83%A3ver.%EF%BD%9C2024%E5%B9%B47%E6%9C%883%E6%97%A5%E6%B0%B4%E6%94%BE%E9%80%81%E9%96%8B%E5%A7%8B-YouTube-0-0-18.jpeg",
      shopProfile:
        "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg",
      shopName: "TakdanaiKaitod",
      shopRating: "4.9",
      reviewCount: "946672",
      shopDescription:
        "ขายไก่ทอดมา 37 ปี ปีนี้ปีท้ายละ เบื่อ อยากไปนอนแล้วอย่ามาสั่งจะได้มั้ย",
      startBudget: "100000",
      stopBudget: "600000",
    },
  ]);

  // Fetch Orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/shop/shopdata"); // Replace with shop API endpoint
        const data = await response.json();
        setShop(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }

    fetchOrders();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let token = localStorage.getItem("x-access-token");
  console.log("token", token);
  let role = localStorage.getItem("role");
  console.log("role", role);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  let NavbarComponent;
  if (isAuthenticated) {
    if (role === "client") {
      NavbarComponent = NavbarClient;
    } else if (role === "shop") {
      NavbarComponent = NavbarShop;
    }
  } else {
    NavbarComponent = Navbar;
  }

  return (
    <div>
      <Link to="/create-post">
        <div className=" fixed right-8 bottom-8 shadow-lg w-20 h-20 bg-red-500 text-white text-[36px] rounded-full flex items-center justify-center text-center">
          +
        </div>
      </Link>
      <div className="flex flex-col items-center">
        <div className="flex flex-col-reverse gap-2">
          {orders.map((order) => (
            //   <Link key={order.id} to={`/order/${order.id}`} state={{ order }}>
            <PostCard2 key={order.id} orderInfo={order} />
            
            //   </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
