'use client'
import { POST } from '@/app/api/upload/route';
import React, { useState } from 'react';

function UploadBlog() {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    content: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'blogImage') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('content', formData.content);
    data.append('file', formData.image); // this can be `null`, handle it in backend
  
    try {
      const res = await fetch('/api/userblogs', {
        method: 'POST',
        body: data, // don't set headers manually, let browser handle it
      });
  
      const result = await res.json();
      console.log('Response from API:', result);
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6">
          <h1 className="text-center text-2xl font-bold text-white">Create New Blog Post</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="py-8 px-6 space-y-6">
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Blog Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              placeholder="Enter an engaging title"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Blog Description</label>
            <input
              type="text"
              name="description"
              id="description"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              placeholder="Brief summary of your post"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Blog Content</label>
            <textarea
              name="content"
              id="content"
              rows="8"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              placeholder="Write your blog content here..."
              required
            />
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Blog Image</label>
            <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="blogImage"
                    className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="blogImage"
                      name="blogImage"
                      type="file"
                      className="sr-only"
                      onChange={handleChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadBlog;