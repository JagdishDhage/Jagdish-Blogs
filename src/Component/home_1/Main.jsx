import Head from 'next/head'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import img from '../../../public/about.jpg'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Head>
        <title>Jagdish Dhage - Personal Blog</title>
        <meta name="description" content="Personal blog and portfolio website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">Jagdish Dhage</div>
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Home</a>
            <a href="/Dashboard" className="text-gray-600 hover:text-gray-900 font-medium">Blogs</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium">About</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-8 border-4 border-white shadow-lg">
              <Image src={img} alt="Jagdish Dhage" className="object-cover w-full h-full" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Hello, I'm <span className="text-blue-600">Jagdish Sopan Dhage</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              I'm a M.E.R.N Stack Developer passionate about Web Technology. 
              Welcome to my personal space where I share my thoughts and experiences.
            </p>
            <p className="text-md text-gray-600 mb-8">
              For more, visit my full portfolio website:
              <a 
                href="https://portfolio-1-go82.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 underline ml-1"
              >
                Jagdish Dhage Portfolio
              </a>
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/Dashboard" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors"
              >
                Visit To My Blog Page
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-600 mb-4">
                  I'm currently pursuing a B.Tech in Computer Engineering at Nutan College of Engineering and Research (CGPA: 7.3). 
                  I have a strong interest in full-stack development and building scalable web applications.
                </p>
                <p className="text-gray-600 mb-4">
                  I've built projects like a Crime Reporting Portal, FitEat Nutrition Tracker, and a Portfolio Website Generator using technologies such as ReactJS, Node.js, MongoDB, and REST APIs.
                </p>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">My Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">Java</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">JavaScript</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">ReactJS</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">Node.js</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">MongoDB</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">TailwindCSS</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">Firebase</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Experience</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">Full-Stack Developer (Personal Projects)</div>
                    <div className="text-gray-600">Freelance • 2023 - Present</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Built several projects using MERN stack, implemented RESTful APIs, user authentication, analytics, and modern UI/UX design practices.
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Tech Enthusiast & Learner</div>
                    <div className="text-gray-600">Nutan College • 2022 - Present</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Contributing to open-source, participating in hackathons, and continuously enhancing skills in web development and system design.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Feel free to reach out to me for collaborations or just a friendly chat.
            </p>
            <div className="flex justify-center space-x-6 mb-10">
              <a href="mailto:jagdish.dev.002@gmail.com" className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors">
                📧
              </a>
              <a href="https://x.com/DhageDev002" className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors">
                🐦
              </a>
              <a href="https://github.com/JagdishDhage" className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors">
                💻
              </a>
              <a href="https://linkedin.com/in/jagdish-dhage-37080232a/" className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors">
                🔗
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-gray-800 text-gray-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} Jagdish Dhage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
