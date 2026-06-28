import React, { useState, useEffect } from 'react';
import { portfolioData } from './data/portfolioData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ThreeDRobot from './components/ThreeDRobot';
import Experience from './components/Experience';
import { API_BASE_URL } from './config';


// Pages
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  const [lang, setLang] = useState('en'); // 'vi' or 'en'
  const [mode, setMode] = useState('frontend'); // 'frontend' or 'tester'
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark'); // 'dark' or 'light'
  
  // Custom router state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);



  // Dynamic state from PostgreSQL backend
  const [profile, setProfile] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [experiences, setExperiences] = useState([]);

  // Local static translation text
  const text = portfolioData[lang];

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
      subtitleFrontend: (lang === 'vi' ? profile.subtitle_frontend_vi : profile.subtitle_frontend_en) || text.hero.subtitleFrontend,
      subtitleTester: (lang === 'vi' ? profile.subtitle_tester_vi : profile.subtitle_tester_en) || text.hero.subtitleTester
    },
    about: {
      ...text.about,
      frontend: { paragraphs: (lang === 'vi' ? profile.about_frontend_vi : profile.about_frontend_en) ? (lang === 'vi' ? profile.about_frontend_vi : profile.about_frontend_en).split('\n') : text.about.frontend.paragraphs },
      tester: { paragraphs: (lang === 'vi' ? profile.about_tester_vi : profile.about_tester_en) ? (lang === 'vi' ? profile.about_tester_vi : profile.about_tester_en).split('\n') : text.about.tester.paragraphs }
    },
    skills: {
      ...text.skills,
      frontend: skills.filter(s => s.type === 'frontend'),
      tester: skills.filter(s => s.type === 'tester')
    }
  };
  
  // Select CV URL based on active view mode
  const activeCvUrl = mode === 'frontend' ? (profile.cv_frontend || profile.cv) : (profile.cv_tester || profile.cv);

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
        const response = await fetch(`${API_BASE_URL}/api/portfolio`);
        const resData = await response.json();
        if (response.ok && resData.success) {
          const { profile, skills, projects, certificates, experiences } = resData.data;
          setProfile(profile);
          setSkills(skills);
          setProjects(projects);
          setCertificates(certificates);
          setExperiences(experiences || []);
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

      // Setup Fallback experiences
      const fallbackExperiences = [
        {
          company_vi: 'Đại học Công nghệ Sài Gòn (STU)',
          company_en: 'Saigon Technology University',
          role_vi: 'Sinh viên ngành Công nghệ Thông tin',
          role_en: 'Student in Information Technology',
          duration_vi: 'Tháng 09/2021 - Tháng 05/2025',
          duration_en: 'September 2021 - May 2025',
          description_vi: 'Tích lũy nền tảng vững chắc về lập trình, giải thuật, cơ sở dữ liệu, mạng máy tính.\nHoàn thành tốt nghiệp với đề tài liên quan đến phát triển hệ thống web thời gian thực.',
          description_en: 'Acquired solid foundation in programming, algorithms, databases, computer networks.\nGraduated with graduation project focused on real-time web application development.',
          type: 'education'
        },
        {
          company_vi: 'Công ty Công nghệ XYZ (XYZ Tech)',
          company_en: 'XYZ Tech Company',
          role_vi: 'Thực tập sinh Lập trình Frontend',
          role_en: 'Frontend Developer Intern',
          duration_vi: 'Tháng 06/2025 - Tháng 08/2025',
          duration_en: 'June 2025 - August 2025',
          description_vi: 'Tham gia xây dựng giao diện ứng dụng quản lý doanh nghiệp.\nLàm quen quy trình làm việc Agile/Scrum với Git và các thư viện UI React.',
          description_en: 'Participated in developing dashboard user interfaces for enterprise management systems.\nExperienced Agile/Scrum workflows using Git and various React UI libraries.',
          type: 'frontend'
        },
        {
          company_vi: 'Công ty Giải pháp Phần mềm ABC (ABC Solutions)',
          company_en: 'ABC Software Solutions',
          role_vi: 'Thực tập sinh Kiểm thử Phần mềm (QA/QC)',
          role_en: 'Software Tester Intern (QA/QC)',
          duration_vi: 'Tháng 09/2025 - Tháng 11/2025',
          duration_en: 'September 2025 - November 2025',
          description_vi: 'Phân tích yêu cầu và viết hơn 150+ ca kiểm thử chức năng.\nThực hiện kiểm thử thủ công và học viết automation kịch bản Cypress/Postman.',
          description_en: 'Analyzed user requirements and drafted over 150+ functional test cases.\nPerformed manual testing cycles and learned test automation using Cypress and Postman.',
          type: 'tester'
        }
      ];
      setExperiences(fallbackExperiences);

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

  const projectPathMatch = currentPath.match(/^\/project\/(\d+)/);
  if (projectPathMatch) {
    const projectId = parseInt(projectPathMatch[1], 10);
    const project = projects.find(p => p.id === projectId);
    if (project) {
      return (
        <ProjectDetail 
          project={project} 
          navigate={navigate} 
          text={textProps} 
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          cvUrl={activeCvUrl}
          mode={mode}
          profile={profile}
        />
      );
    }
  }

  if (currentPath === '/login') {
    return <Login navigate={navigate} />;
  }

  if (currentPath === '/admin') {
    return <AdminDashboard navigate={navigate} />;
  }

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

      {currentPath === '/login' ? (
        <Login navigate={navigate} />
      ) : currentPath === '/admin' ? (
        <AdminDashboard navigate={navigate} />
      ) : (
        <>
          <Navbar 
            currentLang={lang} 
            setLang={setLang} 
            text={textProps.nav} 
            mode={mode}
            theme={theme}
            setTheme={setTheme}
            cvUrl={activeCvUrl}
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
              avatar={profile.avatar}
              profile={profile}
            />
            
            <Experience
              mode={mode}
              lang={lang}
              experiences={experiences}
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
              skills={skills}
              onOpenProject={(proj) => navigate('/project/' + proj.id)}
            />
            
            <Contact 
              text={textProps} 
              lang={lang}
              profile={profile}
              cvUrl={activeCvUrl}
            />
          </main>
        </>
      )}

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
    </div>
  );
}

export default App;
