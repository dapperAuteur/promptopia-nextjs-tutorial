'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import IdeaForm from '@components/Idea/IdeaForm'

const CreateIdea = () => {

  const router = useRouter();
  const {data: session} = useSession();

  const [submitting, setIsSubmitting] = useState(false);

  const [idea, setIdea] = useState({title: "", description: "", budget: 1, ideaStatus: "Idea", tags: [], privateObj: true, assignedDate: ""})

  const createIdea = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('page createIdea() idea :>> ', idea);

    try {
      console.log('idea.tags :>> ', idea.tags);
      const response = await fetch("/api/ideas/new", {
        method: "POST",
        body: JSON.stringify({
          title: idea.title,
          description: idea.description,
          tags: idea.tags,
          privateObj: idea.privateObj,
          assignedDate: idea.assignedDate,
          creator: session?.user.id
        }),
      })
      if (response.ok) {
        router.push("/create-idea");
      }
    } catch (err) {
      console.log('createIdea() err :>> ', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
      <IdeaForm
        type='Create'
        idea={idea}
        setIdea={setIdea}
        submitting={submitting}
        handleSubmit={createIdea}
        />
  )
}

export default CreateIdea