import IdeaFeed from "./../../components/Idea/IdeaFeed";

const IdeaHome = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Need an Idea?
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center">Create Goals by Killing Your Dreams!</span>
      </h1>
      <p className="desc text-center">
        This tool gamifies making dreams come true. The first step is to convert your dreams to goals. To do that you must KILL YOUR DREAMs.
      </p>
      <IdeaFeed/>
    </section>
  )
}

export default IdeaHome;