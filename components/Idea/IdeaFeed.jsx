"use client";

import {useState, useEffect} from "react";
import IdeaCard from "./IdeaCard";

const IdeaCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((idea) => (
        <IdeaCard
          key={idea._id}
          idea={idea}
          handleTagClick={handleTagClick}
          />
      ))}
    </div>
  )
}

const IdeaFeed = () => {
  const [allIdeas, setAllIdeas] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await fetch("/api/ideas");
      const data = await response.json();

      setAllIdeas(data);
    }
    fetchIdeas();
  }, []);

  const filterIdeas = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allIdeas.filter(
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
        const searchResult = filterIdeas(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterIdeas(tagName);
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
      {/* All Ideas */}
      {searchText ? (
        <IdeaCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          />
      ) : (
        <IdeaCardList
          data={allIdeas}
          handleTagClick={handleTagClick}
          />
      )}
    </section>
  )
}

export default IdeaFeed;