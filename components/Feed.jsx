"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
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
  const [filteredPosts, setFilteredPosts] = useState([]);
  // console.log(posts);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };
    fetchPost();
  }, []);
  // console.log(posts[0]);
  const handleSearchChange = (e) => {
    setSearchText(e.target ? e.target.value : e);
    setFilteredPosts((prev) =>
      posts?.filter((filtered) => {
        console.log(filtered.creator.username);
        console.log(e);
        return (
          filtered.prompt
            .toLowerCase()
            .includes(e?.target?.value.toLowerCase()) |
          filtered.tag.toLowerCase().includes(e?.target?.value.toLowerCase()) |
          filtered.tag.toLowerCase().includes(e) |
          filtered.prompt.toLowerCase().includes(e) |
          filtered?.creator?.username
            .toLowerCase()
            .includes(e?.target?.value.toLowerCase())
        );
      })
    );
  };
  const handleTagClick = (tag) => {
    //  setSearchText(tag);
    handleSearchChange(tag);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          name="search"
          placeholder="Search for a tag or a Username"
          value={searchText}
          // onChange={e => setSearchText(e.target.value)}
          onChange={(e) => handleSearchChange(e)}
          id=""
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
