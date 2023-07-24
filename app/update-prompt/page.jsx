"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setIsSubmitting] = useState(false);
  const [prompt, setPrompt] = useState({
    prompt: "",
    tag: ""
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompts/${promptId}`);
      const data = await res.json();
      setPrompt({
        userId: session?.user.id,
        prompt: data.prompt,
        tag: data.tag
      });
    }
  
    
    if(promptId) getPromptDetails();
  }, [promptId])
  

  const editPrompt = async (e) => {
    e.preventDefault();
    if(!promptId) return alert("PROMPT ID NOT Found!");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/prompts/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: prompt.prompt,
          tag: prompt.tag,
        }),
      })
      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log('editPrompt err :>> ', err);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form
      type='Create'
      prompt={prompt}
      setPrompt={setPrompt}
      submitting={submitting}
      handleSubmit={editPrompt}
      />
  );
}

export default UpdatePrompt;