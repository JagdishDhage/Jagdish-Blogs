"use client";
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, AlertTriangle, Loader2 } from 'lucide-react'

function Footer() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState('idle') // idle, loading, success, error
  const [message, setMessage] = React.useState('')
  const [isEmailValid, setIsEmailValid] = React.useState(true)

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setEmail(value)
    
    if (value && !validateEmail(value)) {
      setIsEmailValid(false)
    } else {
      setIsEmailValid(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !validateEmail(email)) {
      setIsEmailValid(false)
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('https://portfolio-server-production-afaf.up.railway.app/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          subject: 'Newsletter Subscription',
          message: `New subscription from ${email}`
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Successfully subscribed to our newsletter!')
        setEmail('')
        
        // Reset after 5 seconds
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      } else {
        throw new Error(data.message || 'Failed to subscribe')
      }
    } catch (error) {
      setStatus('error')
      setMessage(error.message || 'Something went wrong. Please try again.')
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

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
  }

  const statusVariants = {
    hidden: { opacity: 0, y: 10, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      height: 0,
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.footer 
      className="bg-gradient-to-br from-gray-800 to-gray-900 text-gray-300 mt-16 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-white">Jagdish</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Dhage</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Providing exceptional products and services since 2025.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition"
                whileHover={{ scale: 1.1, color: "#1DA1F2" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition"
                whileHover={{ scale: 1.1, color: "#E4405F" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition"
                whileHover={{ scale: 1.1, color: "#0A66C2" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Blog", "Contact Us"].map((item, index) => (
                <motion.li key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition flex items-center group"
                  >
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 w-0 h-0.5 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {["Web Design", "Development", "Marketing", "Consulting", "Support"].map((item, index) => (
                <motion.li key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition flex items-center group"
                  >
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 w-0 h-0.5 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-4">
              Newsletter
            </h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to receive updates and offers.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className={`px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 ${isEmailValid ? 'focus:ring-blue-500' : 'focus:ring-red-500 ring-2 ring-red-500'} w-full pr-10`}
                  value={email}
                  onChange={handleInputChange}
                  disabled={status === 'loading'}
                />
                {!isEmailValid && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
                  >
                    <AlertTriangle size={16} />
                  </motion.div>
                )}
              </div>
              
              {!isEmailValid && (
                <motion.p 
                  className="text-red-500 text-xs"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Please enter a valid email address
                </motion.p>
              )}
              
              <AnimatePresence>
                {message && (
                  <motion.div 
                    className={`text-sm rounded-md p-2 ${status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}
                    variants={statusVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="flex items-center">
                      {status === 'success' ? (
                        <Check size={16} className="mr-2 flex-shrink-0" />
                      ) : (
                        <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
                      )}
                      <p>{message}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 size={18} className="mr-2" />
                  </motion.div>
                ) : (
                  <Send size={18} className="mr-2" />
                )}
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} BrandName. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer