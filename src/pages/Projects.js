import React from 'react';
import { motion } from 'framer-motion';
import { Github, Folder, Star, Eye, Globe } from 'lucide-react';
import '../styles/projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'SwiftDeal - Online Marketplace',
      description: 'A dynamic online classified ads platform that allows users to buy and sell new or used items locally with secure authentication, product filtering, and CRUD operations.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
      tech: ['React', 'Flask', 'SQLite3', 'HTML', 'CSS'],
      github: 'https://github.com/Godswillomuka/swiftdeal',
      demo: 'https://swiftdeal-frontend.vercel.app',
      stats: { stars: 12, views: 450 },
      featured: true
    },
    {
      title: 'SendIT - Parcel Delivery System',
      description: 'A comprehensive parcel delivery platform with role-based dashboards, real-time tracking, email notifications, and admin management features.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
      tech: ['React', 'Flask', 'PostgreSQL', 'HTML', 'CSS'],
      github: 'https://github.com/DTS4/sendit',
      demo: 'https://sendit-delivery.vercel.app',
      stats: { stars: 8, views: 320 },
      featured: true
    },
    {
      title: 'Quick Trade Hub - Crypto CLI',
      description: 'A command-line interface crypto trading simulator with virtual wallet management, buy/sell orders, and transaction logging.',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400',
      tech: ['Python', 'SQLite', 'CLI', 'Git'],
      github: 'https://github.com/Godswillomuka/quick_trade_hub',
      demo: 'https://github.com/Godswillomuka/quick_trade_hub#readme',
      stats: { stars: 6, views: 180 }
    },
    {
      title: 'Task Manager Pro',
      description: 'A modern task management application with user authentication, priority levels, due dates, and progress tracking.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/Godswillomuka/task-manager',
      demo: 'https://taskmanager-pro.vercel.app',
      stats: { stars: 15, views: 680 }
    },
    {
      title: 'Weather Dashboard',
      description: 'A beautiful weather application with detailed forecasts, interactive charts, location search, and weather alerts.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400',
      tech: ['React', 'OpenWeather API', 'Chart.js', 'CSS3'],
      github: 'https://github.com/Godswillomuka/weather-app',
      demo: 'https://weather-dashboard-pro.vercel.app',
      stats: { stars: 22, views: 890 }
    },
    {
      title: 'E-Learning Platform',
      description: 'An interactive e-learning platform with course management, video streaming, quizzes, and progress tracking.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      tech: ['React', 'Flask', 'PostgreSQL', 'Video.js'],
      github: 'https://github.com/Godswillomuka/elearning-platform',
      demo: 'https://elearning-hub.vercel.app',
      stats: { stars: 18, views: 750 }
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with data visualization, post scheduling, and engagement metrics.',
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400',
      tech: ['React', 'D3.js', 'Firebase', 'Chart.js'],
      github: 'https://github.com/Godswillomuka/social-dashboard',
      demo: 'https://social-analytics-pro.vercel.app',
      stats: { stars: 14, views: 520 }
    },
    {
      title: 'Recipe Finder App',
      description: 'Mobile-first recipe application with ingredient-based search, meal planning, shopping lists, and nutritional info.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      tech: ['React Native', 'Expo', 'Recipe API', 'AsyncStorage'],
      github: 'https://github.com/Godswillomuka/recipe-finder',
      demo: 'https://recipe-finder-mobile.vercel.app',
      stats: { stars: 11, views: 380 }
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website with modern design, smooth animations, contact forms, and responsive layout.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      tech: ['React', 'Framer Motion', 'CSS3', 'Vite'],
      github: 'https://github.com/Godswillomuka/portfolio',
      demo: 'https://godswill-portfolio.vercel.app',
      stats: { stars: 25, views: 1200 }
    }
  ];

  return (
    <section className="projects-page">
      <div className="container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My <span className="gradient-text">Projects</span>
        </motion.h1>

        <motion.p 
          className="projects-intro"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
        </motion.p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title="View Code"
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link demo-link"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title="Live Demo"
                  >
                    <Globe size={20} />
                  </motion.a>
                </div>
                {project.featured && (
                  <div className="featured-badge">
                    <Star size={14} />
                    Featured
                  </div>
                )}
              </div>

              <div className="project-content">
                <div className="project-header">
                  <Folder className="project-icon" />
                  <h3>{project.title}</h3>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-stats">
                  <div className="stat">
                    <Star size={14} />
                    <span>{project.stats.stars}</span>
                  </div>
                  <div className="stat">
                    <Eye size={14} />
                    <span>{project.stats.views}</span>
                  </div>
                </div>
                
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github size={16} />
                    Code
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="demo-link">
                    <Globe size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;