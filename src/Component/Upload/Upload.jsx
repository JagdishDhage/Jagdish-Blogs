"use client";
import React, { useState } from "react";
import axios from "axios";

function Upload() {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    file: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setBlog({ ...blog, file: e.target.files[0] });
    } else {
      setBlog({ ...blog, [e.target.name]: e.target.value });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!blog.title || !blog.content || !blog.file) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("file", blog.file);
    formData.append("title", blog.title);
    formData.append("content", blog.content);

    try {
      const response = await axios.post("/api/userblogs", formData);
      console.log(response.data);
      alert("Blog uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input
          name="title"
          placeholder="Title"
          value={blog.title}
          onChange={handleChange}
        />
        <input
          name="content"
          placeholder="Content"
          value={blog.content}
          onChange={handleChange}
        />
        <input type="file" name="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
