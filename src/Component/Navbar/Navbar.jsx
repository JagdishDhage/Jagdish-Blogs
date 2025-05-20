"use client";

import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Bell, User, Moon, Sun, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check for dark mode preference
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkState = !isDark;
    setIsDark(newDarkState);
    
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', newDarkState);
      localStorage.setItem('darkMode', newDarkState ? 'dark' : 'light');
    }
  };

  const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/Dashboard' },
  { name: 'Blog', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: 'https://portfolio-1-go82.vercel.app/' }
];

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' 
          : 'bg-white dark:bg-gray-900'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.h1 
              className="text-xl md:text-2xl font-bold cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-gray-800 dark:text-white">Jagdish</span>
              <motion.span 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
                animate={{ 
                  backgroundPosition: ['0% center', '100% center', '0% center'],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                Dhage
              </motion.span>
            </motion.h1>
          </Link>
          
          {/* Desktop Search */}
          <motion.div 
            className="relative hidden md:block w-1/3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className={`absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-lg -z-10 ${
                isSearchFocused ? 'opacity-100' : 'opacity-0'
              }`}
              animate={{ 
                scale: isSearchFocused ? 1.03 : 1,
                opacity: isSearchFocused ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
            />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-100 transition-all"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {navItems.map((item, index) => (
                <motion.li key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link href={item.href}>
                    <motion.span
                      className="relative px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium flex items-center transition-colors"
                      whileHover={{ 
                        backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 246, 255, 0.8)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                      {item.name === 'Explore' && (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                      <motion.span 
                        className="absolute bottom-0 left-1/2 h-0.5 bg-blue-500 rounded-full"
                        initial={{ width: 0, x: "-50%" }}
                        whileHover={{ width: "60%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isDark ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            
            {/* Notifications */}
            <motion.div className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, delay: 0.5 }}
              >
                2
              </motion.div>
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <Bell size={18} />
              </button>
            </motion.div>
            
            {/* User Menu */}
            <motion.div className="relative">
              <motion.button 
                className="flex items-center space-x-2 p-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center"
                  whileHover={{ backgroundColor: "#93C5FD" }}
                >
                  <User size={16} className="text-blue-600 dark:text-blue-400" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <div className="py-2">
                      {['Profile', 'Settings', 'My Blogs', 'Logout'].map((item, index) => (
                        <motion.a
                          key={item}
                          href="#"
                          className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          whileHover={{ x: 5, backgroundColor: isDark ? 'rgba(55, 65, 81, 0.7)' : 'rgba(243, 244, 246, 0.7)' }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {item}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-800"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="container mx-auto px-4 py-3">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="mb-4">
                <ul className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Link href={item.href}>
                        <motion.div
                          className="flex items-center justify-between px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>{item.name}</span>
                          {item.name === 'Explore' && (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </motion.div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              {/* Mobile Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <motion.button 
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <User size={16} />
                  <span>Profile</span>
                </motion.button>
                <motion.button 
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Bell size={16} />
                  <span className="relative">
                    Notifications
                    <span className="absolute -top-1 -right-4 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                      2
                    </span>
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;