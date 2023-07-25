"use client";

import {useState, useEffect} from "react";
import TaskCard from "./TaskCard";

const TaskCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          handleTagClick={handleTagClick}
          />
      ))}
    </div>
  )
}

const TaskFeed = () => {
  const [allTasks, setAllTasks] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const data = await response.json();

      setAllTasks(data);
    }
    fetchTasks();
  }, []);

  const filterTasks = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allTasks.filter(
      (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.title) ||
      regex.test(item.description) ||
      regex.test(item.taskStatus) ||
      regex.test(item.budget)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debouce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterTasks(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterTasks(tagName);
    setSearchedResults(searchResult);
  }

  return (
    <section>
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for title, description, tag, and username."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          />
      </form>
      {/* All Tasks */}
      {searchText ? (
        <TaskCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          />
      ) : (
        <TaskCardList
          data={allTasks}
          handleTagClick={handleTagClick}
          />
      )}
    </section>
  )
}

export default TaskFeed;