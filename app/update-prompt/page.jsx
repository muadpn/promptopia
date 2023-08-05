"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const {data:session} = useSession();
  console.log(session);
  const searchParams = useSearchParams();
  const promptID = searchParams.get("id");
  // console.log(promptID);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [submitting, setSubmitting] = useState(false);
  console.log(post);
  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptID}`);
      const data = await res.json();
      setPost({ prompt: data.prompt, tag: data.tag });
    };
    if (promptID) getPromptDetails();
  }, [promptID]);

  const UpdatePrompts = async (e) => {
    console.log("UpdatePrompts")
    e.preventDefault();
    setSubmitting(true);
    if (!promptID) return alert("PROMPT ID is required");
    try {
      const response = await fetch(`/api/prompt/${promptID}`, {
        method: "PUT",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
      if (response.status === 400) {
        signIn();
      }
    } catch (error) {
      console.log("this is error ", error);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={UpdatePrompts}
    />
  );
};

export default UpdatePrompt;
