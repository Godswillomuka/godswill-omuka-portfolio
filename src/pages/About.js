import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, MapPin, Heart, Code, Coffee, Lightbulb, Award, Target, Zap } from 'lucide-react';
import '../styles/about.css';

const About = () => {
  const achievements = [
    { icon: Award, title: "Software Engineering Program", year: "2024-2025" },
    { icon: Target, title: "Project Success Rate", value: "98%" },
    { icon: Zap, title: "Graduation", value: "July 2025" },
  ];

  return (
    <section className="about-page">
      <div className="container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About <span className="gradient-text">Me</span>
        </motion.h1>

        <div className="about-content">
          <motion.div 
            className="about-intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>Hello! I'm a passionate software engineer</h2>
            <p>
              A passionate and results-oriented Fullstack Developer with a robust foundation in modern web
              technologies, acquired through an intensive 6-month Software Engineering program at Moringa
              School. Proficient in building dynamic and responsive applications using React, HTML, CSS,
              Python, Flask, SQLite3 and PostgreSQL. Eager to apply strong problem-solving skills and practical experience
              to contribute to innovative projects and grow within a challenging software development environment.
            </p>
          </motion.div>

          <div className="about-grid">
            <motion.div 
              className="about-details"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="detail-cards">
                <div className="detail-card">
                  <Calendar className="card-icon" />
                  <div>
                    <h3>Experience</h3><meta name="theme-color" content="#000000" />
                    <p>6 Months Intensive Training at Moringa School</p>
                  </div>
                </div>
                
                <div className="detail-card">
                  <MapPin className="card-icon" />
                  <div>
                    <h3>Location</h3>
                    <p>Nairobi, Kenya</p>
                  </div>
                </div>
                
                <div className="detail-card">
                  <Heart className="card-icon" />
                  <div>
                    <h3>Passion</h3>
                    <p>Building Amazing Digital Experiences</p>
                  </div>
                </div>
              </div>

              <div className="achievements">
                <h3>Achievements</h3>
                <div className="achievement-list">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      className="achievement-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <achievement.icon className="achievement-icon" />
                      <div>
                        <h4>{achievement.title}</h4>
                        <p>{achievement.year || achievement.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="about-story"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3>My Story</h3>
              <div className="story-content">
                <p>
                  My journey into software development began with curiosity and has evolved into a passion 
                  focused on innovation and problem-solving. Currently completing an intensive 6-month 
                  Software Engineering program at Moringa School, graduated on July 2025.
                </p>
                <p>
                  I specialize in fullstack web development with practical application of modern frameworks 
                  and libraries for both frontend and backend, database design and management, API development, 
                  version control, and collaborative project work.
                </p>
                <p>
                  I believe in writing clean, maintainable code and creating user experiences that 
                  not only look great but also solve real problems. Every project is an opportunity 
                  to learn something new and push the boundaries of what's possible.
                </p>
              </div>

              <div className="interests">
                <h4>What I Love</h4>
                <div className="interest-tags">
                  <span className="interest-tag">
                    <Code size={16} />
                    Clean Code
                  </span>
                  <span className="interest-tag">
                    <Coffee size={16} />
                    Coffee & Code
                  </span>
                  <span className="interest-tag">
                    <Lightbulb size={16} />
                    Innovation
                  </span>
                  <span className="interest-tag">
                    <User size={16} />
                    User Experience
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;