import TaskFeed from "./../../components/Task/TaskFeed";

const TaskHome = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Need an Task?
        <br className="max-md:hidden"/>
        <span className="blue_gradient text-center">No Need to Procrastinate</span>
      </h1>
      <p className="desc text-center">
        This tool gamifies being effective and efficient. Stop getting things done. Start being effective.
      </p>
      <TaskFeed/>
    </section>
  )
}

export default TaskHome;