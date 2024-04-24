"use client";

// import React, { useEffect, useState } from "react";
// import { Modal, Box, Typography } from "@mui/material";
// import Image from "next/image";
// import avatar from "../../../public/images/robot.png"; // Ensure avatar is imported correctly
// import { FaUserPlus } from "react-icons/fa";
// import axios from "axios";
// import { SnackbarProvider, useSnackbar } from "notistack";
// import { FaUserCheck } from "react-icons/fa6";
// import { FiMessageCircle } from "react-icons/fi";

// const style = {
//   // position: "absolute" as "absolute",
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   // width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// // interface LikedUserModalProps {
// //   open: boolean;
// //   handleClose: () => void;
// //   likedBy: string[];
// // //   likedBy: User[]; // Define the likedBy prop as an array of User objects
// // }

// const LikedUserModal /* : React.FC<LikedUserModalProps>  */ = ({
//   open,
//   handleClose,
//   likedBy,
//   loggedInUserId,
// }) => {
//   return (
//     <SnackbarProvider
//       maxSnack={1}
//       anchorOrigin={{ vertical: "top", horizontal: "center" }}
//     >
//       <MyApp
//         open={open}
//         handleClose={handleClose}
//         likedBy={likedBy} // Pass updatedLikedBy to MyApp
//         loggedInUserId={loggedInUserId}
//       />
//     </SnackbarProvider>
//   );
// };

// function MyApp({ open, handleClose, likedBy, loggedInUserId}) {
//   const { enqueueSnackbar } = useSnackbar();
//   const [filteredLikedBy, setFilteredLikedBy] = useState([]);

//   useEffect(() => {
//     setFilteredLikedBy(likedBy.filter((user) => user._id !== loggedInUserId));
//   }, [likedBy, loggedInUserId]);

//   const handleAddFriend = async (userId) => {
//     try {
//       // Make a POST request to the backend API
//       const response = await axios.post("/api/username/add-friends", {
//         userId,
//         loggedInUserId,
//       });
//       console.log(response.data); // Logging the response for now
      
//       if (response.data.success) {
       
//         enqueueSnackbar(response.data.message, { variant: "success" });
//         setFilteredLikedBy(filteredLikedBy.filter((user) => user._id !== userId));
        
//         }

//       // Optionally, update UI or perform any other action after adding friend
//     } catch (error) {
//       console.error(error.response.data.message);
//       enqueueSnackbar(error.response.data.message, { variant: "error" });
//     }
//   };

//   const handleAcceptRequest = async (userId) => {
//     try {
//       // Make a POST request to the backend API
//       const response = await axios.post("/api/username/accept-friends", {
//         userId,
//         loggedInUserId,
//       });
//       console.log(response.data); // Logging the response for now
      
//       if (response.data.success) {
        
//       enqueueSnackbar(response.data.message, { variant: "success" });
//       setFilteredLikedBy(filteredLikedBy.filter((user) => user._id !== userId && user._id !== loggedInUserId));
//       }
//     } catch (error) {
//       console.error(error.response.data.message);
//       enqueueSnackbar(error.response.data.message, { variant: "error" });
//     }
//   };


//   const handleCancelRequest = async (userId) => {
//     try {
//       // Make a POST request to the backend API
//       const response = await axios.post("/api/username/cancel-friends", {
//         userId,
//         loggedInUserId,
//       });
//       console.log(response.data); // Logging the response for now

//       if (response.data.success) {
       
//       enqueueSnackbar(response.data.message, { variant: "success" });
//       setFilteredLikedBy(filteredLikedBy.filter((user) => user._id !== userId));
//       }
//     } catch (error) {
//       console.error(error.response.data.message);
//       enqueueSnackbar(error.response.data.message, { variant: "error" });
//     }
//   };


//   // useEffect(() => {

//   // }, [likedBy, loggedInUserId]);
  

//   // const filteredLikedBy  = likedBy.filter((user) => user._id !== loggedInUserId);

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box
//         sx={style}
//         className="rounded-md shadow-sm border-none w-[400px] md:w-[600px]"
//       >
//         <Typography variant="h6" component="h2" className="text-[12px]">
//           Users Who Liked This Post
//         </Typography>
//         <hr />
//         <div className="flex flex-wrap flex-col py-2 gap-2">
//           {filteredLikedBy.length > 0 ? (
//             filteredLikedBy.map((user) => (
//               <div className="flex justify-between" key={user._id}>
//                 <div className="flex items-center">
//                   <div className="relative w-10 h-10 mr-2">
//                     <Image
//                       src={user.profilePicture || avatar}
//                       alt="Profile Picture"
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-full"
//                     />
//                   </div>
//                   <div className="text-[12px] fw-bold">
//                     {user.firstName} {user.lastName}
//                   </div>
//                 </div>
//                 {user.currentFriends.includes(loggedInUserId) ? (
//                   <button
//                     className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
//                     onClick={() => handleMessage(user._id)}
//                   >
//                     <FiMessageCircle className="my-auto" />{" "}
//                     <span className="my-auto">Message</span>
//                   </button>
//                 ) : user.outgoingFriendRequests.includes(loggedInUserId) ? (
//                   <button
//                     className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
//                     onClick={() => handleAcceptRequest(user._id)}
//                   >
//                     <FaUserCheck className="my-auto" />{" "}
//                     <span className="my-auto">Accept Request</span>
//                   </button>
//                 ): user.incomingFriendRequests.includes(loggedInUserId) ? (
//                   <button
//                     className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
//                     onClick={() => handleCancelRequest(user._id)}
//                   >
//                     <FaUserCheck className="my-auto" />{" "}
//                     <span className="my-auto">Cancel Request</span>
//                   </button>
//                 ) : (
//                   <button
//                     className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
//                     onClick={() => handleAddFriend(user._id)}
//                   >
//                     <FaUserPlus className="my-auto" />{" "}
//                     <span className="my-auto">Add Friend</span>
//                   </button>
//                 )}
//               </div>
//             ))
//           ) : (
//             <Typography key="empty" variant="body2">
//               No users liked this post.
//             </Typography>
//           )}
//         </div>
//       </Box>
//     </Modal>
//   );
// }

// export default LikedUserModal;





import React, { useEffect, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import Image from "next/image";
import avatar from "../../../public/images/robot.png";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import { FiMessageCircle } from "react-icons/fi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LikedUserModal = ({
  open,
  handleClose,
  likedBy,
  loggedInUserId,
  postId,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [filteredLikedBy, setFilteredLikedBy] = useState([]);

  useEffect(() => {
    setFilteredLikedBy(likedBy.filter((user) => user._id !== loggedInUserId));
  }, [likedBy, loggedInUserId]);

  const handleFriendAction = async (userId, actionType) => {
    try {
      let endpoint = "";
      switch (actionType) {
        case "add":
          endpoint = "/api/username/add-friends";
          break;
        case "accept":
          endpoint = "/api/username/accept-friends";
          break;
        case "cancel":
          endpoint = "/api/username/cancel-friends";
          break;
        default:
          break;
      }

      const response = await axios.post(endpoint, {
        userId,
        loggedInUserId,
      });

      if (response.data.success) {
        // enqueueSnackbar(response.data.message, { variant: "success" });

        // Make a new request to get the updated likedBy array
        const updatedLikedByResponse = await axios.post(`/api/posts/single-post`, {postId});
        const updatedLikedBy = updatedLikedByResponse.data;

        setFilteredLikedBy(
          updatedLikedBy.filter((user) => user._id !== loggedInUserId)
        );
      } else {
        // enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        className="rounded-md shadow-sm border-none w-[400px] md:w-[600px]"
      >
        <Typography variant="h6" component="h2" className="text-[12px]">
          Users Who Liked This Post
        </Typography>
        <hr />
        <div className="flex flex-wrap flex-col py-2 gap-2">
          {filteredLikedBy.length > 0 ? (
            filteredLikedBy.map((user) => (
              <div className="flex justify-between" key={user._id}>
                <div className="flex items-center">
                  <div className="relative w-10 h-10 mr-2">
                    <Image
                      src={user.profilePicture || avatar}
                      alt="Profile Picture"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div className="text-[12px] fw-bold">
                    {user.firstName} {user.lastName}
                  </div>
                </div>
                {user.currentFriends.includes(loggedInUserId) ? (
                  <button
                    className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
                    onClick={() => handleMessage(user._id)}
                  >
                    <FiMessageCircle className="my-auto" />{" "}
                    <span className="my-auto">Message</span>
                  </button>
                ) : user.outgoingFriendRequests.includes(loggedInUserId) ? (
                  <button
                    className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
                    onClick={() => handleFriendAction(user._id, "accept")}
                  >
                    <FaUserCheck className="my-auto" />{" "}
                    <span className="my-auto">Accept Request</span>
                  </button>
                ) : user.incomingFriendRequests.includes(loggedInUserId) ? (
                  <button
                    className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
                    onClick={() => handleFriendAction(user._id, "cancel")}
                  >
                    <FaUserCheck className="my-auto" />{" "}
                    <span className="my-auto">Cancel Request</span>
                  </button>
                ) : (
                  <button
                    className="bg-gray-300 cursor-pointer hover:bg-gray-400 py-0 px-2 rounded-lg text-[14px] flex gap-1"
                    onClick={() => handleFriendAction(user._id, "add")}
                  >
                    <FaUserPlus className="my-auto" />{" "}
                    <span className="my-auto">Add Friend</span>
                  </button>
                )}
              </div>
            ))
          ) : (
            <Typography key="empty" variant="body2">
              No users liked this post.
            </Typography>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default LikedUserModal;
