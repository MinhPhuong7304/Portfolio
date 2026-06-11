import React, { useState, useEffect } from 'react';
import { portfolioData } from './data/portfolioData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ProjectModal from './components/ProjectModal';
import ThreeDRobot from './components/ThreeDRobot';


// Pages
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [lang, setLang] = useState('vi'); // 'vi' or 'en'
  const [mode, setMode] = useState('frontend'); // 'frontend' or 'tester'
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark'); // 'dark' or 'light'
  
  // Custom router state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Selected project for detailed modal view
  const [selectedProject, setSelectedProject] = useState(null);

  // Dynamic state from PostgreSQL backend
  const [profile, setProfile] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  // Local static translation text
  const text = portfolioData[lang];

  // Custom Router navigation handler
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Fetch portfolio data from PostgreSQL backend
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/portfolio');
        const resData = await response.json();
        if (response.ok && resData.success) {
          const { profile, skills, projects, certificates } = resData.data;
          setProfile(profile);
          setSkills(skills);
          setProjects(projects);
          setCertificates(certificates);
        } else {
          loadFallbackLocalData();
        }
      } catch (err) {
        loadFallbackLocalData();
      }
    };

    const loadFallbackLocalData = () => {
      // Setup Fallback profiles
      setProfile({
        name: text.hero.name,
        subtitle_frontend_vi: portfolioData['vi'].hero.subtitleFrontend,
        subtitle_frontend_en: portfolioData['en'].hero.subtitleFrontend,
        subtitle_tester_vi: portfolioData['vi'].hero.subtitleTester,
        subtitle_tester_en: portfolioData['en'].hero.subtitleTester,
        about_frontend_vi: portfolioData['vi'].about.frontend.paragraphs.join('\n'),
        about_frontend_en: portfolioData['en'].about.frontend.paragraphs.join('\n'),
        about_tester_vi: portfolioData['vi'].about.tester.paragraphs.join('\n'),
        about_tester_en: portfolioData['en'].about.tester.paragraphs.join('\n'),
        location_vi: portfolioData['vi'].about.location_vi || 'TP. Hồ Chí Minh, Việt Nam',
        location_en: portfolioData['en'].about.location_en || 'Ho Chi Minh City, Vietnam',
        email: 'tmp.phuongtran@gmail.com',
        phone: '+84 90 123 4567'
      });

      // Mapped fallback skills
      const mappedSkills = [
        ...portfolioData['vi'].skills.frontend.map(s => ({ ...s, type: 'frontend' })),
        ...portfolioData['vi'].skills.tester.map(s => ({ ...s, type: 'tester' }))
      ];
      setSkills(mappedSkills);

      // Mapped fallback projects
      const mappedProjects = [
        ...portfolioData['vi'].projects.frontend.map(p => ({ ...p, title_vi: p.title, title_en: p.title, description_vi: p.description, description_en: p.description, category: 'frontend' })),
        ...portfolioData['vi'].projects.tester.map(p => ({ ...p, title_vi: p.title, title_en: p.title, description_vi: p.description, description_en: p.description, category: 'tester' }))
      ];
      setProjects(mappedProjects);

      // Mapped fallback certificates
      const mappedCerts = [
        { title_vi: 'Chứng chỉ Lập trình Frontend Meta', title_en: 'Meta Frontend Developer Certificate', issuer: 'Meta / Coursera', date: '2025' },
        { title_vi: 'Chứng chỉ ISTQB Certified Tester CTFL', title_en: 'ISTQB Certified Tester Foundation Level', issuer: 'ISTQB Board', date: '2025' }
      ];
      setCertificates(mappedCerts);
    };

    fetchPortfolioData();
  }, [lang]);

  // Update HTML class for mode-based styling
  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'tester') {
      root.classList.add('mode-tester');
    } else {
      root.classList.remove('mode-tester');
    }
  }, [mode]);

  // Update HTML class for theme-based styling
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // --- RENDERING ROUTER MATCHES ---

  if (currentPath === '/login') {
    return <Login navigate={navigate} />;
  }

  if (currentPath === '/admin') {
    return <AdminDashboard navigate={navigate} />;
  }

  // Fallback structures if API fields aren't populated yet
  const dynamicSubtitle = mode === 'frontend' 
    ? (lang === 'vi' ? profile.subtitle_frontend_vi : profile.subtitle_frontend_en)
    : (lang === 'vi' ? profile.subtitle_tester_vi : profile.subtitle_tester_en);

  const dynamicAboutParagraphs = mode === 'frontend'
    ? (lang === 'vi' ? [profile.about_frontend_vi] : [profile.about_frontend_en])
    : (lang === 'vi' ? [profile.about_tester_vi] : [profile.about_tester_en]);

  // Mapped dynamic texts back into frontend layout data
  const textProps = {
    ...text,
    hero: {
      ...text.hero,
      name: profile.name || text.hero.name,
      subtitleFrontend: profile.subtitle_frontend_vi || text.hero.subtitleFrontend,
      subtitleTester: profile.subtitle_tester_vi || text.hero.subtitleTester
    },
    about: {
      ...text.about,
      frontend: { paragraphs: dynamicAboutParagraphs[0] ? dynamicAboutParagraphs[0].split('\n') : text.about.frontend.paragraphs },
      tester: { paragraphs: dynamicAboutParagraphs[0] ? dynamicAboutParagraphs[0].split('\n') : text.about.tester.paragraphs }
    },
    skills: {
      ...text.skills,
      frontend: skills.filter(s => s.type === 'frontend'),
      tester: skills.filter(s => s.type === 'tester')
    }
  };

  return (
    <div className="portfolio-app">
      {/* Decorative Floating Glowing Blobs */}
      <div className="glow-blob blob-1"></div>
      <div className="glow-blob blob-2"></div>
      <div className="glow-blob blob-3"></div>

      {/* Global 3D Companion Robot Overlay */}
      <div className="three-companion-overlay">
        <div className="three-companion-wrap">
          <ThreeDRobot mode={mode} />
        </div>
      </div>

      <Navbar 
        currentLang={lang} 
        setLang={setLang} 
        text={textProps.nav} 
        mode={mode}
        theme={theme}
        setTheme={setTheme}
      />
      
      <main className="main-content">
        <Hero 
          mode={mode} 
          setMode={setMode} 
          text={textProps.hero} 
        />
        
        <About 
          mode={mode} 
          text={textProps} 
          lang={lang}
          projectsCount={projects.length}
          certsCount={certificates.length}
        />
        
        <Skills 
          mode={mode} 
          text={textProps} 
        />
        
        <Projects 
          mode={mode} 
          text={textProps} 
          lang={lang}
          projects={projects}
          certificates={certificates}
          onOpenProject={(proj) => setSelectedProject(proj)}
        />
        
        <Contact 
          text={textProps} 
          lang={lang}
        />
      </main>

      <footer className="footer-section">
        <div className="container footer-content">
          <p>© {new Date().getFullYear()} {profile.name || textProps.hero.name}. All rights reserved.</p>
          <p className="footer-subtext">
            {lang === 'vi' 
              ? 'Thiết kế & phát triển bởi Trần Minh Phương' 
              : 'Designed & developed by Tran Minh Phuong'}
          </p>
        </div>
      </footer>

      {/* Project detail modal popups */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        text={textProps} 
        lang={lang}
      />
    </div>
  );
}

export default App;
