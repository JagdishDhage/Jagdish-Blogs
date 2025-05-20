"use client"
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Footer from '../Footer/Footer';
import News from '../News/News';
import Comment from '../Comment/Comment';
import { Share2, Bookmark, BookmarkCheck, Clock, Tag, ChevronLeft, Eye } from 'lucide-react';
import { useEffect } from 'react';
export default function BlogPost({ blog }) {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [readingTime, setReadingTime] = React.useState('');
  const [scrollProgress, setScrollProgress] = React.useState(0);

  // Calculate reading time on component mount
  React.useEffect(() => {
    if (blog?.content) {
      const wordsPerMinute = 200;
      const wordCount = blog.content.split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      setReadingTime(`${minutes} min read`);
    }
  }, [blog]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setScrollProgress(scrollPercent * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle loading state
  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse flex flex-col w-full max-w-4xl p-6">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      </div>
    </div>
  );

  // Format the date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Calculate time since post
  const getTimeAgo = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return '';
    }
  };

  // Format content by breaking it into paragraphs
  const formatContent = (content) => {
    // Split the content into paragraphs
    return content.split('\n\n').map((paragraph, index) => {
      // If the paragraph starts with a heading marker
      if (paragraph.startsWith('Conclusion')) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-12 mb-6 text-gray-800">
            {paragraph}
          </h2>
        );
      }

      // If the paragraph appears to be a list item (starts with a number or bullet)
      if (paragraph.match(/^\d+\.|^\-|\•/)) {
        return (
          <ul key={index} className="list-disc pl-6 my-6 space-y-2 text-gray-700">
            {paragraph.split('\n').map((item, idx) => (
              <li key={idx} className="mb-2">{item}</li>
            ))}
          </ul>
        );
      }

      // First paragraph (lead paragraph)
      if (index === 0) {
        return (
          <p key={index} className="text-xl leading-relaxed text-gray-700 mb-8 font-light">
            {paragraph}
          </p>
        );
      }

      // Regular paragraph
      return (
        <p key={index} className="mb-6 leading-relaxed text-gray-700">
          {paragraph}
        </p>
      );
    });
  };

  // Blog category display
  const BlogCategory = ({ name }) => (
    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
      {name}
    </span>
  );

  // Article tag display
  const ArticleTag = ({ name }) => (
    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer">
      {name}
    </span>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-indigo-600" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Back to articles button */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <a href="/blog" className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">Back to Articles</span>
        </a>
      </div>

      {/* Hero section with image */}
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden mt-6">
        <img 
          src={blog.imageUrl || "/api/placeholder/1200/600"} 
          alt={blog.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <BlogCategory name="" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold my-4 leading-tight">
              {blog.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-light">
              {blog.description}
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  O
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Jagdish Sopan Dhage</p>
                  <div className="flex items-center text-xs text-gray-300">
                    <span>{formatDate(blog.createdAt)}</span>
                    <span className="mx-2">•</span>
                    <span>{getTimeAgo(blog.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-300 text-sm">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>1.2k views</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar for larger screens */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              <div className="flex flex-col items-center space-y-6">
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="p-3 rounded-full border border-gray-200 hover:border-indigo-600 transition-colors group"
                >
                  {isBookmarked ? 
                    <BookmarkCheck className="w-5 h-5 text-indigo-600" /> :
                    <Bookmark className="w-5 h-5 text-gray-500 group-hover:text-indigo-600" />
                  }
                </button>
                <button className="p-3 rounded-full border border-gray-200 hover:border-indigo-600 transition-colors group">
                  <Share2 className="w-5 h-5 text-gray-500 group-hover:text-indigo-600" />
                </button>
                <div className="h-px w-6 bg-gray-200 my-2"></div>
                <div className="flex flex-col items-center">
                  <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors mb-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors mb-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Article content */}
          <div className="lg:col-span-8">
            <article className="bg-white rounded-xl shadow-sm p-6 md:p-10">
              <div className="prose prose-lg max-w-none">
                {formatContent(blog.content)}
              </div>

              {/* Tags section */}
              <div className="mt-12 pt-6 border-t border-gray-100">
                <div className="flex items-center mb-4">
                  <Tag className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ArticleTag name="Healthcare" />
                  <ArticleTag name="Security" />
                  <ArticleTag name="Oracle" />
                  <ArticleTag name="EHR" />
                  <ArticleTag name="Data Protection" />
                </div>
              </div>

              {/* Mobile share options - only visible on smaller screens */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100 lg:hidden">
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  {isBookmarked ? 
                    <BookmarkCheck className="w-5 h-5 mr-2 text-indigo-600" /> :
                    <Bookmark className="w-5 h-5 mr-2" />
                  }
                  <span className="text-sm font-medium">{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>
                
                <div className="flex items-center space-x-4">
                  <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                    </svg>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* Author card and comments */}
            <div className="mt-8">
              <Comment id={blog.id} />
            </div>
          </div>
          
          {/* Right sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-20">
              {/* Author info card */}
              {/* <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                    O
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Oracle Healthcare</h3>
                    <p className="text-sm text-gray-500">Healthcare Technology</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Oracle Healthcare provides innovative solutions for healthcare providers, improving patient care through secure and efficient technology.
                </p>
                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                  Follow
                </button>
              </div> */}
              
              {/* Table of contents card */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="font-semibold mb-4">Table of Contents</h3>
                <nav className="space-y-2 text-sm">
                  <a href="#" className="block text-indigo-600 font-medium">Introduction</a>
                  <a href="#" className="block text-gray-700 hover:text-indigo-600 transition-colors">Key Security Challenges</a>
                  <a href="#" className="block text-gray-700 hover:text-indigo-600 transition-colors">Best Practices</a>
                  <a href="#" className="block text-gray-700 hover:text-indigo-600 transition-colors">Implementation Guide</a>
                  <a href="#" className="block text-gray-700 hover:text-indigo-600 transition-colors">Conclusion</a>
                </nav>
              </div>
              
             
            </div>
          </div>
        </div>

        {/* Related articles section */}
       
      </div>

 

      {/* Footer */}
      <Footer />
    </div>
  );
}