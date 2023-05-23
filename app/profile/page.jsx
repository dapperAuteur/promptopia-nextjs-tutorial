"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [profilePrompts, setProfilePrompts] = useState([])

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();
  
      setProfilePrompts(data);
    }
    if(session?.user.id) fetchPrompts();
  
  }, []);
  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  }
  
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        })
        const filteredPrompts = profilePrompts.filter((p) => p._id !== prompt._id);
        setProfilePrompts(filteredPrompts);
      } catch (err) {
        console.log('handleDelete from MyProfile err :>> ', err);
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page."
      data={profilePrompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
  )
}

export default MyProfile