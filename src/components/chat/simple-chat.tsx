'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, User, Code, Briefcase, Mail, Trophy, FileText, ArrowUp, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';
import FluidCursor from '@/components/FluidCursor';
import { ThemeToggle } from '@/components/theme-toggle';

interface SectionData {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
  bgGradient: string;
  direction: 'left' | 'right' | 'top' | 'bottom';
}

const sectionData: SectionData[] = [
  {
    id: 'presentation',
    title: 'About Me',
    icon: <User className="w-8 h-8 text-white" />,
    bgGradient: 'from-blue-500/20 to-purple-500/20',
    direction: 'left',
    content: `🙏 Namaste! I'm Arya, a passionate full-stack developer and tech enthusiast.

🎓 **Background:** Computer Science graduate with a focus on modern web technologies and software architecture.

💻 **Current Focus:** Building scalable web applications, exploring new frameworks, and contributing to open-source projects.

🚀 **Passion:** I love creating user-centric solutions that solve real-world problems. Whether it's a sleek frontend interface or a robust backend system, I enjoy the entire development process.

🌟 **Philosophy:** Continuous learning and adaptation in the ever-evolving tech landscape. I believe in writing clean, maintainable code and collaborating effectively with teams.

When I'm not coding, you'll find me exploring new technologies, reading tech blogs, or working on personal projects to expand my skill set.`
  },
  {
    id: 'skills',
    title: 'Skills & Expertise',
    icon: <Code className="w-8 h-8 text-white" />,
    bgGradient: 'from-emerald-500/20 to-teal-500/20',
    direction: 'right',
    content: `Here are my technical skills and expertise:

**Frontend Development:**
• HTML & CSS
• JavaScript & TypeScript
• React & Next.js
• Tailwind CSS & Bootstrap
• Responsive Web Design
• Clean & Modern UI Design

**Backend & Systems:**
• Python (Flask, Django)
• REST API Development
• User Authentication & JWT Token Management
• Data Handling & Processing
• Git & GitHub
• API Security
• Postman
• VS Code & Cursor
• Deployment
• Debugging & Problem-Solving
• Using AI Tools

**Design & Creative Tools:**
• Figma
• DaVinci Resolve
• Illustrator
• Canva
• Keynote`
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: <Briefcase className="w-8 h-8 text-white" />,
    bgGradient: 'from-orange-500/20 to-red-500/20',
    direction: 'left',
    content: `Here are my key projects:

🚀 **E-Commerce Platform** 
Full-stack e-commerce solution built with Next.js, TypeScript, and PostgreSQL. Features include user authentication, payment integration, and real-time inventory management.

💡 **AI-Powered Task Manager**
Smart productivity app using machine learning to prioritize tasks and predict completion times. Built with React Native and Python backend.

🎮 **Gaming Social Network**
Social platform for gamers with real-time chat, tournament brackets, and performance analytics. Tech stack: Node.js, Socket.io, MongoDB.

📊 **Data Visualization Dashboard**
Interactive analytics dashboard for business intelligence with charts, reports, and real-time data updates. Created using D3.js and React.

🔐 **Blockchain Voting System**
Decentralized voting application ensuring transparency and security using Ethereum smart contracts and Web3.`
  },
  {
    id: 'contact',
    title: 'Contact Me',
    icon: <Mail className="w-8 h-8 text-white" />,
    bgGradient: 'from-pink-500/20 to-rose-500/20',
    direction: 'right',
    content: `📧 **Contact Information:**

**Email:** aryashah4406@gmail.com
**LinkedIn:** https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3BP3%2FYvQ1uS8qot7WBWz%2FQwA%3D%3D
**GitHub:** github.com/arya-developer
**Twitter:** @AryaDeveloper

📍 **Location:** Available for remote work or on-site opportunities

💼 **Professional Inquiries:** 
Feel free to reach out for:
• Collaboration opportunities
• Freelance projects  
• Full-time positions
• Technical discussions
• Open source contributions

I'm always excited to connect with fellow developers and discuss interesting projects! 

Drop me a message and I'll get back to you soon 😊`
  },
  {
    id: 'sport',
    title: 'Sports & Hobbies',
    icon: <Trophy className="w-8 h-8 text-white" />,
    bgGradient: 'from-yellow-500/20 to-amber-500/20',
    direction: 'left',
    content: `⚽ **Sports & Activities:**

I'm passionate about staying active and maintaining a healthy work-life balance:

🏃‍♂️ **Running:** Regular morning runs to start the day with energy
🚴‍♂️ **Cycling:** Weekend cycling adventures exploring new trails
🏊‍♂️ **Swimming:** Weekly swimming sessions for full-body fitness
🏋️‍♂️ **Fitness:** Strength training and functional fitness workouts

🎯 **Other Interests:**
• Photography and videography
• Technology podcasts and conferences
• Open source contributions
• Reading tech blogs and books
• Chess and strategy games

These activities help me stay focused and bring fresh perspectives to my coding projects!`
  },
  {
    id: 'resume',
    title: 'Resume',
    icon: <FileText className="w-8 h-8 text-white" />,
    bgGradient: 'from-indigo-500/20 to-violet-500/20',
    direction: 'right',
    content: `📄 **Professional Resume:**

My resume contains detailed information about:

✨ **Professional Experience**
• Full-stack development roles
• Project leadership and collaboration
• Technical achievements and contributions

🎓 **Education & Certifications**
• Computer Science degree
• Relevant technical certifications
• Continuous learning initiatives

🛠️ **Technical Proficiencies**
• Programming languages and frameworks
• Development tools and methodologies
• Cloud platforms and deployment

📈 **Key Achievements**
• Successful project deliveries
• Performance improvements
• Team collaborations and mentoring

You can download my complete resume from the main portfolio page for detailed information about my professional journey.`
  }
];

// Motion-based Section Component with dramatic side entrances
const MotionSection = ({ section, index }: { section: SectionData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" }); // Trigger when 20% in view for better scroll detection
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setHasAnimated(true), 100); // Short delay for hydration
    return () => clearTimeout(timer);
  }, []);

  // Remove side effects during scroll as requested
  const getInitialTransform = () => {
    // Always return zero transform to remove side effects
    return { x: 0, y: 0 };
  };

  const initialTransform = getInitialTransform();

  // Simplified animation variants - just fade in, no side effects
  const sectionVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.1,
      }
    }
  };

  // Simplified icon animation - just fade in, no rotation
  const iconVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      }
    }
  };

  // Simplified content animation - just fade in
  const contentVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
      }
    }
  };

  // Side accent variants - simplified fade in
  const leftAccentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.6,
      transition: {
        duration: 0.5,
        delay: 0.4,
      }
    }
  };

  const rightAccentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.6,
      transition: {
        duration: 0.5,
        delay: 0.4,
      }
    }
  };

  return (
    <>
      {isClient ? (
        <motion.section
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={"visible"} /* Always visible, no scroll-based animation */
          className={`relative min-h-screen flex items-center justify-center p-8 bg-gradient-to-br ${section.bgGradient}`}
        >
          {/* Side accent elements */}
          <motion.div
            variants={leftAccentVariants}
            initial="hidden"
            animate={"visible"}
            className="absolute left-0 top-1/2 w-3 h-40 bg-gradient-to-b from-white/30 via-blue-400/40 to-transparent rounded-r-full transform -translate-y-1/2"
          />
          <motion.div
            variants={rightAccentVariants}
            initial="hidden"
            animate={"visible"}
            className="absolute right-0 top-1/2 w-3 h-40 bg-gradient-to-b from-white/30 via-purple-400/40 to-transparent rounded-l-full transform -translate-y-1/2"
          />

          <div className="max-w-4xl w-full mx-auto relative">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/50 shadow-2xl p-8">
              
              {/* Header with icon */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  variants={iconVariants}
                  initial="hidden"
                  animate={"visible"}
                  className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white shadow-lg flex items-center justify-center"
                >
                {section.icon}
              </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h2>
          </div>

          {/* Content with simple fade in animation */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={"visible"}
            className="content-section"
          >
            <div className="prose prose-lg max-w-none leading-relaxed">
              <div className="whitespace-pre-wrap text-lg font-medium text-gray-800 dark:text-gray-200 space-y-4">
                {section.content.split('\n\n').map((paragraph, i) => (
                  <div key={i} className="mb-4" dangerouslySetInnerHTML={{
                    __html: paragraph
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-600 dark:text-blue-400 font-bold">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em class="text-purple-600 dark:text-purple-400">$1</em>')
                      .replace(/•/g, '<span class="text-blue-500 font-bold mr-2 inline-block">•</span>')
                      .replace(/🚀|💡|🎮|📊|🔐|💻|🌟|🎓|⚽|🏃‍♂️|🚴‍♂️|🏊‍♂️|🏋️‍♂️|🎯|📧|📍|💼|✨|🎓|🛠️|📈|📄/g, '<span class="text-xl mr-2 inline-block">$&</span>')
                      .split('\n').join('<br />')
                  }} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Decorative bottom accent line */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={"visible"}
            className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full origin-left"
          />
        </div>
      </div>
    </motion.section>
      ) : (
        <section className={`relative min-h-screen flex items-center justify-center p-8 bg-gradient-to-br ${section.bgGradient} overflow-hidden`}>
          <div className="max-w-4xl w-full mx-auto relative">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/50 shadow-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white shadow-lg flex items-center justify-center">
                  <div className="w-8 h-8 flex items-center justify-center">
                    {section.icon}
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {section.title}
                </h2>
              </div>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {section.content.split('\n\n').map((paragraph, i) => (
                  <div key={i} className="mb-4" dangerouslySetInnerHTML={{
                    __html: paragraph
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-600 dark:text-blue-400 font-bold">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em class="text-purple-600 dark:text-purple-400">$1</em>')
                      .replace(/•/g, '<span class="text-blue-500 font-bold mr-2 inline-block">•</span>')
                      .replace(/🚀|💡|🎮|📊|🔐|💻|🌟|🎓|⚽|🏃‍♂️|🚴‍♂️|🏊‍♂️|🏋️‍♂️|🎯|📧|📍|💼|✨|🎓|🛠️|📈|📄/g, '<span class="text-xl mr-2 inline-block">$&</span>')
                      .split('\n').join('<br />')
                  }} />
                ))}
              </div>
              <div className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full origin-left" />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

// Floating Navigation Component
const FloatingNav = ({ scrollY }: { scrollY: any }) => {
  const router = useRouter();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest: number) => {
      setShowScrollTop(latest > 100);
    });
    return unsubscribe;
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Add a smooth scroll with offset for header
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="group flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-gray-100/60 dark:hover:bg-gray-800/60 transition-all duration-200"
            >
              <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <Image
                  src="/landing-memojis2.png"
                  alt="Arya's memoji"
                  width={40}
                  height={40}
                  className="object-cover scale-150 translate-y-2"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Home className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
                <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors font-medium">
                  Home
                </span>
              </div>
            </button>

            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Portfolio Dashboard
            </h1>

            <div className="flex items-center space-x-2">
              <ThemeToggle />
              {showScrollTop && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={scrollToTop}
                  className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  <ArrowUp className="w-5 h-5 text-white" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Floating Quick Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 space-y-3"
      >
        {sectionData.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-center group"
          >
            {/* Title always visible */}
            <div
              className="mr-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap"
            >
              {section.title}
            </div>
            
            {/* Icon button */}
            <button
              onClick={() => scrollToSection(section.id)}
              className="block p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-full shadow-lg border border-white/20 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-200 flex items-center justify-center"
              title={section.title}
            >
              <div className="w-8 h-8 flex items-center justify-center text-gray-700 dark:text-gray-200">
                {section.icon}
              </div>
            </button>
          </motion.div>
        ))}
      </motion.nav>
    </>
  );
};

// Add custom styles for scrollbar and section highlighting
const customStyles = `
  /* Fix for smooth scrolling with header offset */
  html {
    scroll-padding-top: 80px; /* Height of your fixed header */
  }
`;

export default function SimpleChat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effect for background
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <>
      {/* Add custom styles */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      <FluidCursor />
      
      {/* Floating Navigation */}
      <FloatingNav scrollY={scrollY} />

      {/* Hero Section - standard section without motion */}
      <section
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10"
      >
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />

        <div className="text-center z-10 px-8 max-w-4xl">
          <div
            className="relative w-32 h-32 mx-auto mb-8 overflow-hidden rounded-full shadow-2xl"
          >
            <Image
              src="/landing-memojis2.png"
              alt="Arya's memoji"
              width={128}
              height={128}
              className="object-cover scale-150 translate-y-4"
            />
          </div>
          
          <h1
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent"
          >
            Welcome to My Portfolio
          </h1>
          
          <p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
          >
            Discover my journey as a full-stack developer through interactive sections below
          </p>
          
          <div
            className="flex items-center justify-center"
          >
            <div
              className="flex flex-col items-center space-y-2 text-gray-500 dark:text-gray-400"
            >
              <span className="text-sm">Scroll to explore</span>
              <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Sections - removed snap scrolling */}
      <div ref={containerRef} className="relative">
        {sectionData.map((section, index) => (
          <div key={section.id} id={section.id}>
            <MotionSection section={section} index={index} />
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-gray-900 to-black text-white py-16"
      >
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-3xl font-bold mb-4">Let's Build Something Amazing Together</h3>
            <p className="text-gray-300 text-lg">
              Ready to start your next project? Let's connect and make it happen!
            </p>
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="mailto:aryashah4406@gmail.com"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get In Touch
            </a>
            <a
              href="/resume_giraud.pdf"
              target="_blank"
              className="px-8 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-all duration-200 font-medium"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
}


