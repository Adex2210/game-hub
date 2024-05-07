// // /app/post/[postId]/page.tsx

// 'use client' 

// import React, { useEffect, useState } from 'react';
// import { useRouter } from "next/navigation";
// import Navbar from '../../components/navbar/Navbar';
// import Post from '../../components/userPage/PostComponent';
// import LoadingSkeleton from '../../components/userPage/LoadingSkeleton';
// import axios from 'axios';


// interface PostPageProps {
//   params: {
//     postId: string;
//   };
//   user: User;
// } 

// interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   userName: string;
//   email: string;
//   profilePicture: string;
//   bio: string;
//   currentFriends?: string[];
// }

// interface Post {
//   _id: string;
//   content: string;
//   timestamp: string;
//   userId: User;
//   likes: number;
//   dislikes: number;
//   likedBy: string[]; // Add the likedBy property here
//   comments: Comment[];
//   image: string;
// }

// interface Comment {
//   _id: string;
//   content: string;
//   postId: string;
// }

// const PostPage: React.FC<PostPageProps> = ({ params, user }) => {
//   const router = useRouter();
//   //const { postId } = router.query;
//   const { postId } =  params 
//   //const [post, setPost] = useState<any>(null);
//   const [post, setPost] = useState<Post[]>([]); 
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.post(`/api/posts/single-post`, { postId } );
//         setPost(response.data); // Assuming your API returns the post data
//       } catch (error) {
//         console.error('Error fetching post:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (postId) {
//       fetchPost();
//     }
//   }, [postId]);

//   if (loading) {
//     return <LoadingSkeleton />;
//   }

//   console.log("post id", postId)
//   console.log("user", user)
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
//         <div>Post Page</div>
//         {/* Render PostComponent with the specific post */}
//         {/* {post && (
//           <Post
//             user={user}
//             // posts={[post]} // Pass the post as an array to match the expected prop in PostComponent
//             posts={post} 
//             likedPosts={[]} // Assuming likedPosts is handled separately
//             handleReaction={(postId: string) => {}} // Implement handleReaction function
//             handleShare={(postId: string, userId: string) => {}} // Implement handleShare function
//             // setPosts={(updatedPosts: Post[]) => {}} // Implement setPosts function if needed
//             openCreatePostModal={false}
//             setOpenCreatePostModal={(open: boolean) => {}} // Implement setOpenCreatePostModal function if needed
//             editSelectedPost=""
//             setEditSelectedPost={(postId: string) => {}} // Implement setEditSelectedPost function if needed
//             // selectedPost={post}
//             // setSelectedPost={(post: Post | null) => {}} // Implement setSelectedPost function if needed
//             loggedInUserId={user._id} // Assuming logged-in user ID is handled separately
//           />
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default PostPage;











import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/navbar/Navbar';
import PostComponent from '../../components/userPage/PostComponent';
import LoadingSkeleton from '../../components/userPage/LoadingSkeleton';
import axios from 'axios';



interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePicture: string;
  bio: string;
  currentFriends?: string[];
}

interface Post {
  _id: string;
  content: string;
  timestamp: string;
  userId: User;
  likes: number;
  dislikes: number;
  likedBy: string[]; // Add the likedBy property here
  comments: Comment[];
  image: string;
}

interface Comment {
  _id: string;
  content: string;
  postId: string;
}


interface PostPageProps {
  params: {
    postId: string;
  };
  user: User;
}

const PostPage: React.FC<PostPageProps> = ({ params, user }) => {
  const router = useRouter();
  const { postId } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.post(`/api/posts/single-post`, { postId });
        setPost(response.data); // Assuming your API returns the post data
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
        <div>Post Page</div>
        {/* {post && (
          <PostComponent
            user={user}
            posts={[post]}
            likedPosts={[]} // Assuming likedPosts is handled separately
            handleReaction={(postId: string) => {}} // Implement handleReaction function
            handleShare={(postId: string, userId: string) => {}} // Implement handleShare function
            openCreatePostModal={false}
            setOpenCreatePostModal={(open: boolean) => {}} // Implement setOpenCreatePostModal function if needed
            editSelectedPost=""
            setEditSelectedPost={(postId: string) => {}} // Implement setEditSelectedPost function if needed
            loggedInUserId={user._id} // Assuming logged-in user ID is handled separately
          />
        )} */}
      </div>
    </div>
  );
};

export default PostPage;
