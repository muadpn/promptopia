"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(`Are you sure you want to delete?`, post);
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });
        fetchPost();
      } catch (e) {
        console.log(e);
      }
    }
  };
  async function fetchPost() {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();
    setPosts(data);
  }
  useEffect(() => {
    if (session?.user.id) fetchPost();
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized Profile Page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
