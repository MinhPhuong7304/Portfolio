import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ExternalLink, FileSpreadsheet } from 'lucide-react';
import Navbar from '../components/Navbar';

function MonitorScreen({ demo, title }) {
  const [scale, setScale] = useState(0.35);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const updateScale = () => {
      const width = container.offsetWidth;
      const newScale = width / 1200;
      setScale(newScale);
    };

    updateScale();
    
    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-white">
      <iframe
        src={demo}
        title={title}
        style={{
          width: '1200px',
          height: '750px',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          border: 'none',
          position: 'absolute',
          top: 0,
          left: 0
        }}
        sandbox="allow-scripts allow-same-origin allow-popups"
        loading="lazy"
      />
    </div>
  );
}

const GithubIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="16" 
    height="16" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ marginRight: '6px' }}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function ProjectDetail({ 
  project, navigate, text, lang, setLang, theme, setTheme, cvUrl, mode, profile 
}) {
  if (!project) return null;

  const isFrontend = project.category === 'frontend';
  const title = lang === 'vi' ? project.title_vi : project.title_en;
  const description = lang === 'vi' ? project.description_vi : project.description_en;
  const detailDesc = lang === 'vi' 
    ? (project.detailDescription_vi || description) 
    : (project.detailDescription_en || description);

  const challenge = lang === 'vi' ? project.challenge_vi : project.challenge_en;
  const solution = lang === 'vi' ? project.solution_vi : project.solution_en;
  const testPlan = lang === 'vi' ? project.testPlan_vi : project.testPlan_en;
  const bugReport = lang === 'vi' ? project.bugReport_vi : project.bugReport_en;
  const automationResults = lang === 'vi' ? project.automationResults_vi : project.automationResults_en;

  return (
    <div className="portfolio-app">
      {/* Decorative Floating Glowing Blobs */}
      <div className="glow-blob blob-1"></div>
      <div className="glow-blob blob-2"></div>
      <div className="glow-blob blob-3"></div>

      <Navbar 
        currentLang={lang} 
        setLang={setLang} 
        text={text.nav} 
        mode={mode}
        theme={theme}
        setTheme={setTheme}
        cvUrl={cvUrl}
      />
      
      <main className="main-content container pb-16" style={{ paddingTop: '120px' }}>
        {/* Project detail container cards */}
        <div className="glass-card project-detail-card p-8 md:p-12">
          {/* Back and Breadcrumbs Navigation */}
          <div className="modal-breadcrumb-bar mb-8 flex justify-between items-center">
            <button onClick={() => navigate('/')} className="modal-back-btn flex items-center gap-2">
              <ArrowLeft size={16} />
              <span>{lang === 'vi' ? 'Quay lại' : 'Back'}</span>
            </button>
            <div className="modal-breadcrumbs text-xs font-semibold text-admin-muted">
              <span className="cursor-pointer hover:text-admin-accent" onClick={() => navigate('/')}>
                {lang === 'vi' ? 'Dự án' : 'Projects'}
              </span>
              <span className="mx-2">&gt;</span>
              <span className="text-admin-text">{title}</span>
            </div>
          </div>

          <div className="project-modal-grid">
            {/* Left Side: Text Details */}
            <div className="project-modal-details">
              <h1 className="project-modal-title text-3xl font-extrabold mb-4">{title}</h1>
              <div className="project-accent-indicator modal-indicator mb-6" />
              
              <div className="project-modal-desc-section">
                <p className="project-modal-summary text-lg text-admin-text-secondary leading-relaxed mb-6">{description}</p>
                
                {(project.role || project.timeline) && (
                  <div className="project-meta-info my-6 grid grid-cols-2 gap-4">
                    {project.role && (
                      <div>
                        <span className="block text-[10px] text-admin-text-muted uppercase font-bold tracking-widest mb-1">{lang === 'vi' ? 'Vai Trò' : 'Role'}</span>
                        <p className="text-admin-text text-sm font-semibold">{project.role}</p>
                      </div>
                    )}
                    {project.timeline && (
                      <div>
                        <span className="block text-[10px] text-admin-text-muted uppercase font-bold tracking-widest mb-1">{lang === 'vi' ? 'Thời Gian' : 'Timeline'}</span>
                        <p className="text-admin-text text-sm font-semibold">{project.timeline}</p>
                      </div>
                    )}
                  </div>
                )}

                <h4 className="section-subtitle font-bold text-sm text-admin-accent uppercase tracking-wider mb-3">{lang === 'vi' ? 'Chi Tiết Dự Án' : 'Project Breakdown'}</h4>
                <p className="project-modal-body text-admin-text-secondary leading-relaxed mb-6 whitespace-pre-line">{detailDesc}</p>

                {(project.keyFeatures_vi || project.keyFeatures_en) && (
                  <div className="mb-6">
                    <h4 className="section-subtitle font-bold text-sm text-admin-accent uppercase tracking-wider mb-3">{lang === 'vi' ? 'Tính Năng Nổi Bật' : 'Key Features'}</h4>
                    <ul className="list-disc pl-5 text-admin-text-secondary space-y-2 text-sm leading-relaxed">
                      {(lang === 'vi' ? (project.keyFeatures_vi || project.keyFeatures_en) : (project.keyFeatures_en || project.keyFeatures_vi))
                        .split('\n')
                        .filter(feature => feature.trim() !== '')
                        .map((feature, idx) => (
                          <li key={idx}>{feature.replace(/^- /, '')}</li>
                        ))
                      }
                    </ul>
                  </div>
                )}

                {/* Dev Case Study (Challenge & Solution) */}
                {isFrontend && (challenge || solution) && (
                  <div className="project-case-study mt-6 space-y-4 mb-6">
                    <h4 className="section-subtitle font-bold text-sm text-admin-accent uppercase tracking-wide">{lang === 'vi' ? 'Nghiên Cứu Tình Huống' : 'Technical Case Study'}</h4>
                    {challenge && (
                      <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-4">
                        <span className="block text-[9px] text-rose-400 font-bold uppercase tracking-widest mb-1.5">{lang === 'vi' ? 'Thách Thức' : 'Challenge'}</span>
                        <p className="text-xs text-admin-text-secondary leading-relaxed whitespace-pre-line">{challenge}</p>
                      </div>
                    )}
                    {solution && (
                      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
                        <span className="block text-[9px] text-emerald-400 font-bold uppercase tracking-widest mb-1.5">{lang === 'vi' ? 'Giải Pháp' : 'Solution'}</span>
                        <p className="text-xs text-admin-text-secondary leading-relaxed whitespace-pre-line">{solution}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* QA Tester Artifacts */}
                {!isFrontend && (testPlan || bugReport || automationResults) && (
                  <div className="project-test-artifacts mt-6 space-y-4 mb-6">
                    <h4 className="section-subtitle font-bold text-sm text-admin-accent uppercase tracking-wide">{lang === 'vi' ? 'Hồ Sơ Kiểm Thử (Test Artifacts)' : 'QA Test Artifacts'}</h4>
                    {testPlan && (
                      <div className="bg-sky-500/5 border border-sky-500/10 rounded-xl p-4">
                        <span className="block text-[9px] text-sky-400 font-bold uppercase tracking-widest mb-1.5">{lang === 'vi' ? 'Kế Hoạch & Kịch Bản Test' : 'Test Plan & Design'}</span>
                        <p className="text-xs text-admin-text-secondary leading-relaxed whitespace-pre-line">{testPlan}</p>
                      </div>
                    )}
                    {bugReport && (
                      <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
                        <span className="block text-[9px] text-amber-400 font-bold uppercase tracking-widest mb-1.5">{lang === 'vi' ? 'Báo Cáo Lỗi (Bug Report / Log)' : 'Bug Report / Issues Log'}</span>
                        <p className="text-xs text-admin-text-secondary leading-relaxed whitespace-pre-line">{bugReport}</p>
                      </div>
                    )}
                    {automationResults && (
                      <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-4">
                        <span className="block text-[9px] text-purple-400 font-bold uppercase tracking-widest mb-1.5">{lang === 'vi' ? 'Kiểm Thử Tự Động' : 'Automation Results'}</span>
                        <p className="text-xs text-admin-text-secondary leading-relaxed whitespace-pre-line">{automationResults}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="project-modal-tags-section mb-6">
                <h4 className="section-subtitle font-bold text-sm text-admin-accent uppercase tracking-wider mb-3">{lang === 'vi' ? 'Công Nghệ Sử Dụng' : 'Technologies Used'}</h4>
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span className="project-tag" key={idx}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-modal-actions flex flex-wrap gap-4 mt-8">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <GithubIcon />
                    <span>{text.projects.viewCode}</span>
                  </a>
                )}
                {project.demo && project.demo !== '#' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <ExternalLink size={16} />
                    <span>{text.projects.viewDemo}</span>
                  </a>
                )}
                {project.artifactLink && (
                  <a
                    href={project.artifactLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary QA-btn"
                    style={{ borderColor: '#f43f5e', color: '#f43f5e' }}
                  >
                    <FileSpreadsheet size={16} />
                    <span>{project.artifactName || text.projects.viewArtifact}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Side: High-Tech Mockup View */}
            <div className="project-modal-mockup">
              <div className="mockup-frame glass-card">
                <div className="mockup-screen">
                  {/* Simulated Web Application GUI */}
                  <div className="sim-browser">
                    <div className="sim-browser-header">
                      <div className="sim-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                      </div>
                      <div className="sim-url">{project.demo || `https://${title.toLowerCase().replace(/[^a-z0-9]/g, '')}.my.id`}</div>
                    </div>
                    <div className="sim-browser-body" style={{ padding: 0, position: 'relative', overflow: 'hidden' }}>
                      {project.demo && project.demo !== '#' && project.demo.startsWith('http') ? (
                        <MonitorScreen demo={project.demo} title={title} />
                      ) : project.imageUrl ? (
                        <div 
                          className="w-full h-full bg-cover bg-top" 
                          style={{ backgroundImage: `url(${project.imageUrl})` }} 
                        />
                      ) : (
                        <div className="sim-web-hero">
                          <span className="sim-badge">{project.category.toUpperCase()}</span>
                          <h2>{title}</h2>
                          <div className="sim-line"></div>
                          <div className="sim-grid">
                            <div className="sim-box"></div>
                            <div className="sim-box"></div>
                            <div className="sim-box"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Simulated Mobile Mockup overlaying */}
                  <div className="sim-phone">
                    <div className="sim-phone-speaker"></div>
                    <div className="sim-phone-screen">
                      <div className="sim-phone-header">
                        <span className="sim-time">09:41 AM</span>
                        <div className="sim-signal">⚡</div>
                      </div>
                      <div className="sim-phone-body">
                        <div className="sim-phone-badge">OK</div>
                        <h4>{title}</h4>
                        <p>Responsive Layout Checked</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer-section">
        <div className="container footer-content">
          <p>© {new Date().getFullYear()} {profile.name || text.hero.name}. All rights reserved.</p>
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
