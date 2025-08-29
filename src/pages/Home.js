import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.png';


import { 
  Github, 
  Linkedin, 
  Instagram, 
  Facebook, 
  Mail, 
  Download, 
  ArrowDown,  
  Youtube 
} from 'lucide-react';
import { FaTiktok } from 'react-icons/fa'; // TikTok icon
import '../styles/home.css';

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = useMemo(() => [
    'Fullstack Software Engineer',
    'React Developer',
    'Problem Solver',
    'Code Enthusiast'
  ], []);

  useEffect(() => {
    const currentTitle = titles[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentTitle.length) {
          setTypedText(currentTitle.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(typedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typedText, currentIndex, isDeleting, titles]);

  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Godswillomuka', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/god-swil-omuka-275708381/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/_kidzilla/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/dripkid.zilla/', label: 'Facebook' },
    { icon: Youtube, href: 'https://www.youtube.com/@dripkid_zilla', label: 'YouTube' },
    { icon: FaTiktok, href: 'https://www.tiktok.com/@_kidzilla', label: 'TikTok' },
  ];

  return (
    <section className="home-page">
      <div className="container">
        <div className="home-content">
          <motion.div 
            className="home-left"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hi, I'm{' '}
              <span className="gradient-text">God'swill Omuka</span>
            </motion.h1>

            <motion.div 
              className="typing-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="typing-text">
                {typedText}
              </span>
            </motion.div>

            <motion.p 
              className="home-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              A passionate and results-oriented Fullstack Developer with a robust foundation in modern web
              technologies. Proficient in building dynamic and responsive applications using React, HTML, CSS,
              Python, Flask, and SQLite3. Let's create something amazing together! 
            </motion.p>

            <motion.div 
              className="home-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              
              <motion.a
                href="/contact"
                className="btn btn-primary"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Let's Talk
              </motion.a>
              <motion.a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                download="Godswill_Omuka_CV.pdf"
              >
                <Download size={20} />
                My CV
              </motion.a>
            </motion.div>

            
            <motion.div 
              className="social-links"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="home-right"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="profile-section">
              <motion.div
                className="profile-image-container"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="profile-image">
                  <img 
                    src={profileImg} 
                    alt="God'swill Omuka - Software Engineer"
                  />
                  <div className="image-glow"></div>
                </div>
              </motion.div>

              <motion.div
  className="profile-stats"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1.5 }}
>
  <div className="stat">
    <span className="stat-number">4.5/5</span>
    <span className="stat-label">User Rating</span>
  </div>
  <div className="stat">
    <span className="stat-number">20+</span>
    <span className="stat-label">Projects Built</span>
  </div>
  <div className="stat">
    <span className="stat-number">100%</span>
    <span className="stat-label">My Dedication</span>
  </div>
  
</motion.div>

            </div>
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;