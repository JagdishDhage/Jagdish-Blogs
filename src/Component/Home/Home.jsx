"use client";

import React, { useEffect, useState } from "react";
import { Search, Filter, ArrowUpDown, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { setBlog } from "@/redux/slices/Blogs";

const Root = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const filterOptions = ["All", "Latest", "Popular", "Featured", "Trending"];
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.Blogs);

  useEffect(() => {
    const getBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/GetBlog");
        const data = await response.json();
        dispatch(setBlog(data));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBlogs();
  }, [dispatch]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/30">
      
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-300/20 dark:bg-blue-500/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-300/20 dark:bg-purple-500/10 blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, -70, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-pink-300/20 dark:bg-pink-500/10 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <Navbar />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <motion.div 
          className="mb-12 text-center"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            Discover Amazing Content
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Browse through our curated collection of high-quality blogs designed to inspire and inform.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div 
            className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {filterOptions.map((option, index) => (
              <motion.button
                key={option}
                onClick={() => setActiveFilter(option)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
                  activeFilter === option
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-700/70"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {option}
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            className="flex space-x-3 mt-4 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/70 transition shadow-sm"
                whileHover={{ boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)" }}
              >
                <Search className="h-5 w-5" />
              </motion.button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-64 shadow-lg rounded-lg overflow-hidden z-10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                      <Search className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-2" />
                      <input
                        type="text"
                        placeholder="Search blogs..."
                        className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-700 dark:text-gray-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/70 transition shadow-sm">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </motion.div>

            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/70 transition shadow-sm">
                <ArrowUpDown className="h-4 w-4" />
                <span>Sort</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <motion.div 
                key={item}
                className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl h-64 animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {blogs.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  layout
                >
                  <Link href={`/viewBlog/${item.id}`} className="block h-full">
                    <div className="h-full transform-gpu transition-all duration-300 hover:shadow-xl">
                      <Card item={item} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button 
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-full transition-all shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(66, 153, 225, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Load More
          </motion.button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Root;