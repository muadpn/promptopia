"use client";
import React, { useEffect, useState } from "react";
// import router from 'next/navigation'
import { useSearchParams, useParams } from "next/navigation";
import axios from "axios";
import Profile from "@components/Profile";

const UserProfile = () => {
  const params = useParams();
  //   const [userId, setUserId] = useState("");
  const userId = params.id.split("__", params.id.length)[1];
  //   setUserId();
  const [post, setPosts] = useState([]);
  useEffect(() => {
    fetchUserProfile(userId);
  }, []);
  console.log(post[0]?.creator.username);
  const fetchUserProfile = async (id) => {
    const res = await axios.get(`/api/users/${id}/posts`);
    setPosts(res.data);
  };

  return (
    <>
      <Profile name={post[0]?.creator.username}  data={post} />
    </>
  );
};

export default UserProfile;
