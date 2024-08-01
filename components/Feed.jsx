"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  console.log(data, "from promptcard");
  return (
    <div className="mt-16 prompt_layout">
      {data &&
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  async function handleSearchChange(e) {
    e.preventDefault();
    setSearchText(e.target.value);
    const text = e.target.value;
    if (text.length > 0) {
      const filtered = filterPrompts(searchText);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts); // Reset to all posts when search is cleared
    }
  }
  function handleTagClick(tag) {
    setSearchText(tag);
    const filtered = filterPrompts(tag);
    setFilteredPosts(filtered);
  }
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      if (response.ok) {
        const result = await response.json();
        setPosts(result); // Ensure result is an array
        setFilteredPosts(result);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    };
    fetchPost();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
