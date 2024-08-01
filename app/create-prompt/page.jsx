"use client";
import Form from "@components/Form";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("session", session);
    try {
      if (post.prompt && session.user && post.tag) {
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            userId: session.user.id,
            prompt: post.prompt,
            tag: post.tag,
          }),
        });
        if (response.ok) {
          router.push("/");
        } else {
          console.log("data is undefined", {
            prompt: post.prompt,
            userId: session.user.id,
            tag: post.tag,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  );
};

export default CreatePrompt;
