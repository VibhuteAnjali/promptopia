"use client";
import dynamic from "next/dynamic";
import Form from "@components/Form";
import React, { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const EditPrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(session.user.id);

    if (!promptId) return alert("Prompt not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      console.log(res);
      if (res.ok) {
        const result = await res.json();
        setPost({
          prompt: result.prompt,
          tag: result.tag,
        });
      } else {
        console.error("Failed to fetch data:", res.statusText);
      }
    };
    if (promptId) getPromptDetails();
  }, [promptId]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
        />
      </div>
    </Suspense>
  );
};

// const EditProfileWrapper = () => (
//   <Suspense fallback={<div>Loading...</div>}>
//     <EditPrompt />
//   </Suspense>
// );

export default EditPrompt;
