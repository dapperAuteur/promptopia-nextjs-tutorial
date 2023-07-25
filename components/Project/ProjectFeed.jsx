"use client";

import {useState, useEffect} from "react";
import ProjectCard from "./ProjectCard";

const ProjectCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          handleTagClick={handleTagClick}
          />
      ))}
    </div>
  )
}

const ProjectFeed = () => {
  const [allProjects, setAllProjects] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/projects");
      const data = await response.json();

      setAllProjects(data);
    }
    fetchProjects();
  }, []);

  const filterProjects = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allProjects.filter(
      (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.title)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debouce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterProjects(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterProjects(tagName);
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
      {/* All Projects */}
      {searchText ? (
        <ProjectCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          />
      ) : (
        <ProjectCardList
          data={allProjects}
          handleTagClick={handleTagClick}
          />
      )}
    </section>
  )
}

export default ProjectFeed;