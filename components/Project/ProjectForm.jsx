import { useState } from 'react';
import Link from 'next/link';

const ProjectForm = ({type, project, setProject, submitting, handleSubmit}) => {

  const [tag, setTag] = useState('')
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Project</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and add the project to the Project List. This is the first step to creating a Task, Mini-Project, or Project.
      </p>
      <form id='createProject'
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
            <div className='font-satoshi font-semibold text-base text-gray-700'>
              The Project
            </div>
            <label className='' htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              name='project.title'
              value={project?.title || ''}
              onChange={(e) => setProject({
                ...project,
                title: e.target.value
              })}
              placeholder='Add Project Title here.'
              required
              />
          <div>
            <label htmlFor='description'>
              <span className='font-satoshi font-semibold text-base text-gray-700'>
                Description of the project you want to share with others?
              </span>
              <textarea
                value={project?.description || ''}
                onChange={
                  (e) => setProject({
                    ...project,
                    description: e.target.value
                  })
                }
                placeholder='Write the project description'
                required
                className='form_textarea'
                />
            </label>
          </div>
          <div>
            <label htmlFor="budget">Budget $</label>
            <input
              value={project?.budget || 0}
              type='number'
              min= '0'
              id='budget'
              name='project.budget'
              onChange={
                (e) => setProject({
                  ...project,
                  budget: e.target.value
                })
              }
              placeholder='Please add a budget'
              required
              />
          </div>
          <div>
            <label htmlFor="projectStatus" className='pr-5'>Status</label>
            <select
              name='projectStatus'
              id='projectStatus'
              form='createProject'
              size={5}
              >
              <option selected value='Project'>Project</option>
              <option value='Task'>Task</option>
              <option value='Mini-Project'>Mini-Project</option>
              <option value='Project'>Project</option>
              <option value='Closed'>Closed</option>
            </select>
          </div>
          <div>
            <label htmlFor="createTags" className='pr-5'>Tag(s): (Multiple Tags May Be Chosen)</label>
            <select
              name='tags'
              id='ags'
              form='createProject'
              // size={5}
              // multiple
              >
                <option value='project'>Project</option>
                <option value='BetterBudClub'>BetterBudClub</option>
                <option value='BDI3 LLC'>BDI3 LLC</option>
                <option value='Centenarian.Fun'>Centenarian.Fun</option>
                <option value='iWriteCode'>iWriteCode</option>
                <option value='AwesomeWebStore.com'>AwesomeWebStore.com</option>
                <option value='6in602'>6in602</option>
                <option value='Better Bike'>Better Bike</option>
                <option value='Better Treat'>Better Treat</option>
                <option value='Better Vices Club'>Better Vices Club</option>
                <option value='Everythings.Forsale'>Everythings.Forsale</option>
                <option value='Free Firearms LLC'>Free Firearms LLC</option>
                <option value='Hip-Hop Axiom'>Hip-Hop Axiom</option>
                <option value='Sex With The Lights On'>Sex With The Lights On</option>
                <option value='Smile Club'>Smile Club</option>
                <option value='WitUS'>WitUS</option>
              </select>
          </div>
          <div>
            <label htmlFor='points' className='pr-5'>Points</label>
            <input
            value={project?.points || 1}
              onChange={
                (e) => setProject({
                  ...project,
                  points: parseInt(e?.target?.value || 0),
                })
              }
              type=''
              min={1}
              max={10000}
              name='points'
              id='points'
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

export default ProjectForm