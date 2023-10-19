import { useState, useEffect } from 'react';
import Link from 'next/link';

const IdeaForm = ({type, idea, setIdea, submitting, handleSubmit}) => {

  // console.log('idea :>> ', idea);
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const handleTagChange = e => {
    const selectedTag = e.target.value;
    setIdea((prevState) => {
      const newTags = [...prevState.tags];
      console.log('b4 newTags :>> ', newTags);
      const index = newTags.indexOf(selectedTag);
      if (index !== -1) {
        newTags.splice(index, 1);
      } else {
        newTags.push(selectedTag)
      }
      console.log('after newTags :>> ', newTags);
      return {...prevState, tags: newTags}
    })
  }

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch('/api/tags');
      const data = await response.json();

      setAllTags(data);
    }
    fetchTags();
  
  }, []);

  // console.log('allTags :>> ', allTags);
  
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Idea</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and add the idea to the Idea List. This is the first step to creating a Task, Mini-Project, or Project.
      </p>
      <form id='createIdea'
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
            <div className='font-satoshi font-semibold text-base text-gray-700'>
              The Idea
            </div>
            <label className='' htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              name='idea.title'
              value={idea?.title || ''}
              onChange={(e) => setIdea({
                ...idea,
                title: e.target.value
              })}
              placeholder='Add Idea Title here.'
              required
              />
          <div>
            <label htmlFor='description'>
              <span className='font-satoshi font-semibold text-base text-gray-700'>
                Description of the idea you want to share with others?
              </span>
              <textarea
                value={idea?.description || ''}
                onChange={
                  (e) => setIdea({
                    ...idea,
                    description: e.target.value
                  })
                }
                placeholder='Write the idea description'
                required
                className='form_textarea'
                />
            </label>
          </div>
          <div>
            <label htmlFor="budget">Budget $</label>
            <input
              value={idea?.budget || 0}
              type='number'
              min= '0'
              id='budget'
              name='idea.budget'
              onChange={
                (e) => setIdea({
                  ...idea,
                  budget: e.target.value
                })
              }
              placeholder='Please add a budget'
              required
              />
          </div>
          <div>
            <label htmlFor="ideaStatus" className='pr-5'>Status</label>
            <select
              name='ideaStatus'
              id='ideaStatus'
              form='createIdea'
              size={5}
              value={idea.ideaStatus}
              onChange={
                (e) => setIdea({
                  ...idea,
                  ideaStatus: e.target.value
                })
              }
              >
              <option value='Idea'>Idea</option>
              <option value='Task'>Task</option>
              <option value='Mini-Project'>Mini-Project</option>
              <option value='Project'>Project</option>
              <option value='Closed'>Closed</option>
            </select>
          </div>
          <div>
            <label htmlFor="createTags" className='pr-5'>Tag(s): (Multiple Tags May Be Chosen)</label>
            {allTags.map(t => (
              <div key={t._id}>
                <input
                  type='checkbox'
                  id='tags'
                  name='tags'
                  value={t._id}
                  onChange={handleTagChange}
                  />
                  <label htmlFor={t._id}>
                    {t.title}
                  </label>
                </div>
            ))}
          </div>
          <div>
            <label htmlFor='privateObj' className='pr-5'>Private</label>
            <input
            value={idea?.privateObj || true}
              onChange={
                (e) => setIdea({
                  ...idea,
                  privateObj: e?.target?.value || true,
                })
              }
              type='boolean'
              name='privateObj'
              id='privateObj'
              required
              />
          </div>
          <div>
            <label htmlFor='assignedDate' className='pr-5'>Assigned Date</label>
            <input
              type='date'
              id='assignedDate'
              defaultValue={(new Date()).toISOString().split('T')[0]}
              min={(new Date()).toISOString().split('T')[0]}
              />
          </div>
          <div className='flex-end mx-3 mb-5 gap-4'>
            <Link
              href='/'
              className='text-gray-500 text-sm'>
                Cancel
              </Link>
              <button
                type='submit'
                disabled={submitting}
                className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
                  {submitting ? `${type}ing...` : type}
                </button>
          </div>
        </form>
    </section>
  )
}

export default IdeaForm