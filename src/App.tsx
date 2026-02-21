import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';
import ChatInterface from './components/ChatInterface';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const skills = [
    'Python', 'Django', 'Flask', 'FastAPI', 'MySQL', 'SQLAlchemy',
    'HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub', 'REST APIs'
  ];

  const projects = [
    {
      title: 'AI Powered Email Assistant',
      problem: 'Writing professional emails is time-consuming and requires context awareness',
      solution: 'Built a Chrome extension that generates intelligent, context-aware email replies directly in Gmail',
      tech: ['Spring Boot', 'JavaScript', 'Chrome Extension API', 'AI Integration']
    },
    {
      title: 'Student Performance Tracker',
      problem: 'Educational institutions need efficient systems to manage and analyze student academic data',
      solution: 'Developed a full-stack web application with optimized database queries and comprehensive CRUD operations',
      tech: ['Django', 'MySQL', 'Python', 'REST APIs']
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-sm text-emerald-400"
            >
             
            </motion.div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight">
              Anujkumar<br />
              <span className="text-gray-400">Yadav</span>
            </h1>

            <p className="text-2xl sm:text-3xl text-gray-400 font-light max-w-2xl">
              Python Developer crafting scalable backend systems and intelligent applications
            </p>

            <div className="flex items-center gap-4 pt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Terminal size={20} />
                Talk to My AI Assistant
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/yadavanuj73"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-gray-700 hover:border-emerald-500 transition-colors"
              >
                <Github size={20} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/anujkumar-y-246569249/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-gray-700 hover:border-emerald-500 transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:yadavanuj2068@gmail.com"
                className="p-4 rounded-lg border border-gray-700 hover:border-emerald-500 transition-colors"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>
        </motion.section>

        <section className="py-32 border-t border-gray-800">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-5xl font-bold mb-8">About</h2>
              <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
                <p>
                  I'm a motivated Python developer based in Bengaluru, specializing in backend development,
                  REST APIs, and scalable database-driven applications.
                </p>
                <p>
                  Currently pursuing B.E. in Computer Science from VTU (2022-2026) with a CGPA of 7.6,
                  I focus on building robust systems that solve real-world problems.
                </p>
                <p>
                  My expertise lies in creating efficient backend architectures using Django, Flask, and FastAPI,
                  coupled with strong database management skills in MySQL and SQLAlchemy.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-emerald-400">Education</h3>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg">B.E. Computer Science</h4>
                    <span className="text-emerald-400 font-mono">7.6 CGPA</span>
                  </div>
                  <p className="text-gray-400">Visvesvaraya Technological University</p>
                  <p className="text-sm text-gray-500 mt-1">2022 - 2026</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6 text-emerald-400">Location</h3>
                <p className="text-gray-400 text-lg">Bengaluru, Karnataka</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 border-t border-gray-800">
          <h2 className="text-5xl font-bold mb-12">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-6 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-300 hover:border-emerald-500 hover:text-emerald-400 transition-all font-mono text-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </section>

        <section className="py-32 border-t border-gray-800">
          <h2 className="text-5xl font-bold mb-16">Projects</h2>
          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-1">
                  <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map(tech => (
                      <span key={tech} className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-400 mb-2 uppercase tracking-wider">Problem</h4>
                    <p className="text-gray-400 text-lg">{project.problem}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-emerald-400 mb-2 uppercase tracking-wider">Solution</h4>
                    <p className="text-gray-400 text-lg">{project.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-32 border-t border-gray-800">
          <div className="max-w-4xl">
            <h2 className="text-5xl font-bold mb-8">Want to Know More?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Ask my AI assistant anything about my experience, skills, or projects.
              It's powered by RAG technology and answers based on my resume.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsChatOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Terminal size={20} />
              Open Chat Assistant
            </motion.button>
          </div>
        </section>

        <footer className="py-16 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="font-mono text-sm text-gray-500">
              © 2024 Anujkumar Yadav
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:anujkumar@example.com" className="text-gray-500 hover:text-emerald-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </footer>
      </div>

      {isChatOpen && (
        <ChatInterface onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  );
}

export default App;
