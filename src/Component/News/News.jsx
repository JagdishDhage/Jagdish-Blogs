import React from 'react'

function News() {
  return (
    <>
    <div className="bg-blue-600 text-white py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated on Healthcare Security</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest insights on healthcare data security, 
              regulatory compliance, and technology innovations.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded-lg text-gray-900 focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-white text-blue-600 font-medium px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div></>
  )
}

export default News