import ProjectFeed from "@components/Project/ProjectFeed";

const ProjectHome = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Projects Make the World Go 'Round
        <br className="max-md:hidden"/>
        <span className="blue_gradient text-center">Focus On Your Projects!</span>
      </h1>
      <p className="desc text-center">
        This tool gamifies being effective with your time. Stop being busy. Start living.
      </p>
      <ProjectFeed/>
    </section>
  )
}

export default ProjectHome;