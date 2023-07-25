"use client"

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const IdeaCard = ({idea, handleTagClick, handleEdit, handleDelete}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(idea.title);
    navigator.clipboard.writeText(idea.title);
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={idea.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {idea.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {idea.creator.email}
              </p>
            </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === idea.title ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt={copied === idea.title ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
            />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700"
      onClick={handleEdit}>
        {idea.title}
      </p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(idea?.tags)}>#{idea?.tags}</p>
        {
          session?.user.id === idea.creator._id && pathName === '/profile' && (
            <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
              <p className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}>
                Edit
              </p>
              <p className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleEdit}>
                Delete
              </p>
            </div>
          )
        }
    </div>
  )

}

export default IdeaCard