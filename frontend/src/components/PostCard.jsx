import React, { useEffect, useState } from "react";

function PostCard({ orderInfo }) {
  console.log("Order info:", orderInfo);

  // State to manage image load success
  const [imageLoaded, setImageLoaded] = useState(true);

  // State to manage comment visibility, comment text, user info, and comments
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); // Array to store comments
  const [userInfo, setUserInfo] = useState({ username: "" });
  const [showMore, setShowMore] = useState(false); // State for showing more comments

  // Fetch user data
  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("x-access-token");

      try {
        const response = await fetch("http://localhost:5555/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });
        const data = await response.json();
        setUserInfo({
          ...userInfo,
          username: data.username,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    fetchUserData();
  }, []);

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      text: comment,
      username: userInfo.username,
    };
    setComments((prevComments) => [...prevComments, newComment]); // Add new comment to the comments array
    setComment(""); // Reset comment input
    setShowCommentInput(false); // Hide the input after submission
  };

  // Toggle show more comments
  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  // Determine the comments to show based on "showMore" state
  const displayedComments = showMore ? comments : comments.slice(0, 2); // Adjust this number as needed

  return (
    <div className="w-[500px] mb-8 p-8 rounded-lg shadow-2xl bg-white">
      <div className="flex py-3">
        <img
          src={orderInfo.client_profile}
          alt="Profile Picture"
          className="rounded-full w-12 h-12"
        />
        <div>
          <div className="flex px-2">
            <p className="font-bold flex-auto">{orderInfo.client_name}</p>
          </div>
          <div className="flex px-2 ">
            <p className="text-sm">{orderInfo.date}</p>
          </div>
        </div>
      </div>
      <hr className="mb-8" />
      <div
        className={`flex flex-col bg-slate-200 p-8 ${
          imageLoaded ? "flex" : "hidden"
        }`}
      >
        <img
          src={orderInfo.order_picture}
          alt="Order Picture"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
          className="w-full h-auto"
        />
      </div>
      <p className="my-8 text-lg">{orderInfo.detail}</p>{" "}
      {/* Bigger text for post */}
      {/* Comment button */}
      <div className="flex flex-row-reverse mb-4">
        <button
          className="w-full lg:w-40 border py-2 px-4 rounded hover:cursor-pointer"
          onClick={() => setShowCommentInput(!showCommentInput)} // Toggle input visibility
        >
          Comment
        </button>
      </div>
      {/* Comment input and submit button */}
      {showCommentInput && (
        <form onSubmit={handleCommentSubmit} className="flex flex-col">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comment"
            className="border py-2 px-4 mb-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full lg:w-40 border py-2 px-4 rounded bg-blue-500 text-white"
          >
            Add Comment
          </button>
        </form>
      )}
      {/* Comments section */}
      {displayedComments.length > 0 && (
        <div className="mt-4">
          {displayedComments.map((c, index) => (
            <div key={index} className="border-b py-2 text-sm">
              {" "}
              {/* Smaller text for comments */}
              <strong>{c.username}</strong>: {c.text}
            </div>
          ))}
          {comments.length > 2 && (
            <button onClick={toggleShowMore} className="text-blue-500 mt-2">
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PostCard;
