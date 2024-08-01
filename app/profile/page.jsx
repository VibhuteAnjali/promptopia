// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Profile from "@components/Profile";

// const MyProfile = () => {
//   const router = useRouter();
//   const { data: session } = useSession();

//   const [myPosts, setMyPosts] = useState([]);
//   const [profileName, setProfileName] = useState("My");
//   const searchParams = useSearchParams();
//   const profileId = searchParams.get("id");
//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await fetch(`/api/users/${session?.user.id}/posts`);
//       const data = await response.json();

//       setMyPosts(data);
//     };
//     const fetchProfilePosts = async () => {
//       const response = await fetch(`/api/users/${profileId}/posts`);
//       const data = await response.json();
//       console.log(data, "profile");
//       setMyPosts(data);
//       setProfileName(data[0].creator.username + "'s");
//     };

//     if (session?.user.id) fetchPosts();
//     if (profileId) fetchProfilePosts();
//   }, [session?.user.id, profileId]);

//   const handleEdit = (post) => {
//     router.push(`/update-prompt?id=${post._id}`);
//   };

//   const handleDelete = async (post) => {
//     const hasConfirmed = confirm(
//       "Are you sure you want to delete this prompt?"
//     );

//     if (hasConfirmed) {
//       try {
//         const res = await fetch(`/api/prompt/${post._id.toString()}`, {
//           method: "DELETE",
//         });
//         console.log(res);
//         if (!res.ok) {
//           const errorText = await res.text();
//           console.error(`Failed to delete prompt: ${errorText}`);

//           return;
//         }
//         const filteredPosts = myPosts.filter((item) => item._id !== post._id);

//         setMyPosts(filteredPosts);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Profile
//         name={profileName}
//         desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
//         data={myPosts}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//       />
//     </Suspense>
//   );
// };

// export default MyProfile;
"use client";

import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);
  const [profileName, setProfileName] = useState("My");
  const searchParams = useSearchParams();
  const profileId = searchParams.get("id");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    const fetchProfilePosts = async () => {
      const response = await fetch(`/api/users/${profileId}/posts`);
      const data = await response.json();
      console.log(data, "profile");
      setMyPosts(data);
      setProfileName(data[0].creator.username + "'s");
    };

    if (session?.user.id) fetchPosts();
    if (profileId) fetchProfilePosts();
  }, [session?.user.id, profileId]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        console.log(res);
        if (!res.ok) {
          const errorText = await res.text();
          console.error(`Failed to delete prompt: ${errorText}`);
          return;
        }
        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Suspense>
      <Profile
        name={profileName}
        desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Suspense>
  );
};

// const MyProfileWrapper = () => (
//   <Suspense fallback={<div>Loading...</div>}>
//     <MyProfile />
//   </Suspense>
// );

// export default dynamic(() => Promise.resolve(MyProfileWrapper), { ssr: false });
export default MyProfile;
