import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Smartphone, 
  Palette, 
  Zap, 
  Globe,
  Layers,
  GitBranch,
  Terminal,
  Users,
  MessageCircle,
  Clock,
  Lightbulb,
  Server,
  FileCode,
  Cpu,
  Monitor,
  Workflow
} from 'lucide-react';
import '../styles/skills.css';

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: 'Frontend Development',
      skills: [
        { name: 'React', level: 85, icon: Layers },
        { name: 'JavaScript', level: 80, icon: FileCode },
        { name: 'HTML/CSS', level: 90, icon: Monitor },
        { name: 'Responsive Design', level: 85, icon: Smartphone },
      ],
    },
    {
      icon: Database,
      title: 'Backend Development',
      skills: [
        { name: 'Python', level: 85, icon: Code },
        { name: 'Flask', level: 80, icon: Server },
        { name: 'SQLite3', level: 75, icon: Database },
        { name: 'PostgreSQL', level: 70, icon: Database },
      ],
    },
    {
      icon: Cpu,
      title: 'Programming Concepts',
      skills: [
        { name: 'Object-Oriented Programming', level: 80, icon: Layers },
        { name: 'Data Structures', level: 75, icon: Workflow },
        { name: 'Algorithms', level: 70, icon: Cpu },
        { name: 'Command Line Interface', level: 85, icon: Terminal },
      ],
    },
    {
      icon: Zap,
      title: 'Tools & Workflow',
      skills: [
        { name: 'Git/GitHub', level: 85, icon: GitBranch },
        { name: 'Version Control', level: 80, icon: GitBranch },
        { name: 'Vercel Deployment', level: 75, icon: Globe },
        { name: 'Render Deployment', level: 75, icon: Server },
      ],
    },
    {
      icon: Database,
      title: 'Database & APIs',
      skills: [
        { name: 'Database Design', level: 75, icon: Database },
        { name: 'API Development', level: 70, icon: Server },
        { name: 'CRUD Operations', level: 80, icon: Workflow },
        { name: 'JSON', level: 85, icon: FileCode },
      ],
    },
    {
      icon: Palette,
      title: 'Soft Skills',
      skills: [
        { name: 'Team Collaboration', level: 90, icon: Users },
        { name: 'Communication', level: 85, icon: MessageCircle },
        { name: 'Problem Solving', level: 85, icon: Lightbulb },
        { name: 'Time Management', level: 80, icon: Clock },
      ],
    },
  ];

  return (
    <section className="skills-page">
      <div className="container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My <span className="gradient-text">Skills</span>
        </motion.h1>

        <motion.p 
          className="skills-intro"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Here are the technologies and tools I work with to bring ideas to life
        </motion.p>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="skill-category"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="skill-header">
                <motion.div
                  className="skill-icon"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <category.icon size={32} />
                </motion.div>
                <h3>{category.title}</h3>
              </div>
              
              <div className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1 + skillIndex * 0.05,
                      duration: 0.5 
                    }}
                  >
                    <div className="skill-info">
                      <div className="skill-name-container">
                        <skill.icon className="skill-item-icon" size={16} />
                      <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1.5,
                          delay: index * 0.1 + skillIndex * 0.05,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;