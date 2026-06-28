import React, { useState, useEffect, useRef } from 'react';
import { 
  ExternalLink, FileSpreadsheet, Code, CheckCircle, 
  Award, Briefcase, Cpu, Eye, ArrowRight 
} from 'lucide-react';

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

export default function Projects({ mode, text, lang, projects, certificates, skills = [], onOpenProject }) {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'certificates', 'techstack'
  const [subFilter, setSubFilter] = useState('all'); // 'all', 'frontend', 'tester', 'design', 'editing'

  // Filter projects based on main mode and active subfilter
  const filteredProjects = projects.filter(project => {
    // If subFilter is all, default to showing projects matching current role (mode)
    if (subFilter === 'all') {
      return project.category === mode;
    }
    return project.category === subFilter;
  });

  // Hardcoded Tech Stack icons & descriptions to make it look exactly like the images
  const techStackList = [
    { name: 'React', desc: 'Frontend Framework', category: 'Dev' },
    { name: 'JavaScript', desc: 'Core Language', category: 'Dev' },
    { name: 'Node.js', desc: 'Backend runtime', category: 'Dev' },
    { name: 'PostgreSQL', desc: 'Relational Database', category: 'Database' },
    { name: 'Bootstrap', desc: 'UI CSS framework', category: 'Dev' },
    { name: 'Firebase', desc: 'Cloud backend service', category: 'Database' },
    { name: 'Vite', desc: 'Build tool & packager', category: 'Dev' },
    { name: 'Postman', desc: 'API testing suite', category: 'QA' },
    { name: 'Cypress', desc: 'E2E automation tool', category: 'QA' },
    { name: 'Jira', desc: 'Project management & bugs', category: 'QA' },
    { name: 'Figma', desc: 'Vector design & prototype', category: 'Design' },
    { name: 'Photoshop', desc: 'Graphic design tool', category: 'Design' },
    { name: 'Canva', desc: 'Quick templates builder', category: 'Design' },
    { name: 'Capcut', desc: 'Video editing suite', category: 'Editing' }
  ];

  return (
    <section id="projects" className="projects-section container">
      <div className="section-header">
        <h2 className="section-title gradient-text">{lang === 'vi' ? 'Hồ Sơ Năng Lực' : 'Portfolio Showcase'}</h2>
        <div className="section-line"></div>
      </div>

      {/* Main Tab Controls */}
      <div className="projects-tabs-container">
        <div className="projects-tabs glass-card">
          <button 
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => { setActiveTab('projects'); setSubFilter('all'); }}
          >
            <Briefcase size={16} />
            <span>{lang === 'vi' ? 'Dự Án' : 'Projects'}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
            onClick={() => setActiveTab('certificates')}
          >
            <Award size={16} />
            <span>{lang === 'vi' ? 'Chứng Chỉ' : 'Certificates'}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'techstack' ? 'active' : ''}`}
            onClick={() => setActiveTab('techstack')}
          >
            <Cpu size={16} />
            <span>{lang === 'vi' ? 'Công Nghệ' : 'Tech Stack'}</span>
          </button>
        </div>
      </div>

      {/* Sub Filters for Projects Tab */}
      {activeTab === 'projects' && (
        <div className="projects-subfilters animate-fade-in">
          <button 
            className={`subfilter-btn ${subFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSubFilter('all')}
          >
            {lang === 'vi' ? 'Mặc định' : 'Default'}
          </button>
          <button 
            className={`subfilter-btn ${subFilter === 'frontend' ? 'active' : ''}`}
            onClick={() => setSubFilter('frontend')}
          >
            Developer
          </button>
          <button 
            className={`subfilter-btn ${subFilter === 'tester' ? 'active' : ''}`}
            onClick={() => setSubFilter('tester')}
          >
            QA / Tester
          </button>
          <button 
            className={`subfilter-btn ${subFilter === 'design' ? 'active' : ''}`}
            onClick={() => setSubFilter('design')}
          >
            Design
          </button>
          <button 
            className={`subfilter-btn ${subFilter === 'editing' ? 'active' : ''}`}
            onClick={() => setSubFilter('editing')}
          >
            Editing
          </button>
        </div>
      )}

      {/* TAB 1: PROJECTS LIST (1 project per row) */}
      {activeTab === 'projects' && (
        <div className="project-rows-list animate-fade-in">
          {filteredProjects.length === 0 ? (
            <div className="projects-empty-state glass-card">
              <p>{lang === 'vi' ? 'Không tìm thấy dự án nào trong mục này.' : 'No projects found in this category.'}</p>
            </div>
          ) : (
            filteredProjects.map((project, idx) => (
              <div className="project-row-item glass-card" key={idx}>
                {/* Left Side: Details */}
                <div className="project-card-content" style={{ marginBottom: 0 }}>
                  <div className="project-card-header">
                    <div className="project-accent-indicator" />
                    <span className="logo-badge">{project.category === 'frontend' ? 'DEVELOPER' : project.category.toUpperCase()}</span>
                  </div>
                  
                  <h3 className="project-title" style={{ fontSize: '24px', marginBottom: '12px' }}>
                    {lang === 'vi' ? project.title_vi : project.title_en}
                  </h3>
                  <p className="project-description" style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                    {lang === 'vi' ? project.description_vi : project.description_en}
                  </p>
                  
                  <div className="project-tags" style={{ marginBottom: '28px' }}>
                    {project.tags.map((tag, tagIdx) => (
                      <span className="project-tag" key={tagIdx}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-card-hover-actions" style={{ marginTop: 'auto' }}>
                    <button 
                      onClick={() => onOpenProject(project)}
                      className="btn-secondary hover-action-btn"
                    >
                      <Eye size={14} />
                      <span>{lang === 'vi' ? 'Chi tiết' : 'Details'}</span>
                      <ArrowRight size={12} />
                    </button>
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-primary hover-action-btn"
                      >
                        <Code size={14} />
                        <span>{lang === 'vi' ? 'Xem Code' : 'View Code'}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Side: Interactive Laptop/Monitor Mockup */}
                <div className="project-visual-side">
                  <div className="pc-monitor-mockup">
                    <div className="pc-screen">
                      <div className="browser-bar">
                        <div className="browser-dots">
                          <span className="dot red"></span>
                          <span className="dot yellow"></span>
                          <span className="dot green"></span>
                        </div>
                        <div className="browser-url-bar">{project.demo || 'https://demo-showcase.local'}</div>
                        {project.demo && project.demo !== '#' && (
                          <a 
                            href={project.demo} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-admin-muted hover:text-admin-accent transition-colors ml-2"
                            title={lang === 'vi' ? 'Mở trong tab mới' : 'Open in new tab'}
                          >
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      
                      <div className={`screen-content ${project.demo && project.demo !== '#' && project.demo.startsWith('http') ? 'bg-white' : (project.imageUrl ? '' : 'default-bg')}`}>
                        {project.demo && project.demo !== '#' && project.demo.startsWith('http') ? (
                          <MonitorScreen demo={project.demo} title={lang === 'vi' ? project.title_vi : project.title_en} />
                        ) : project.imageUrl ? (
                          <div 
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${project.imageUrl})` }}
                          />
                        ) : (
                          <div className="screen-overlay">
                            <div className="no-demo-badge">
                              <span>{lang === 'vi' ? 'KHÔNG CÓ DEMO LIVE' : 'NO LIVE DEMO'}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="monitor-stand">
                      <div className="stand-neck"></div>
                      <div className="stand-base"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: CERTIFICATES LIST */}
      {activeTab === 'certificates' && (
        <div className="certificates-grid animate-fade-in">
          {certificates.map((cert, idx) => (
            <div className="certificate-card glass-card" key={idx}>
              <div className="cert-icon-container">
                <Award size={32} />
              </div>
              <div className="cert-info">
                <h3>{lang === 'vi' ? cert.title_vi : cert.title_en}</h3>
                <span className="cert-issuer">{cert.issuer}</span>
                <span className="cert-date">{cert.date}</span>
              </div>
              {cert.link && cert.link !== '#' && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link-btn" title="View credential">
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: TECH STACK GRID */}
      {activeTab === 'techstack' && (
        <div className="tech-stack-grid animate-fade-in">
          {(skills.length > 0 ? skills : techStackList).map((tech, idx) => {
            const hasIcon = !!tech.icon;
            const levelLabel = tech.level 
              ? (tech.level.toLowerCase() === 'advanced' ? (lang === 'vi' ? 'Thành thạo' : 'Advanced') :
                 tech.level.toLowerCase() === 'intermediate' ? (lang === 'vi' ? 'Trung cấp' : 'Intermediate') :
                 (lang === 'vi' ? 'Cơ bản' : 'Basic'))
              : (tech.desc || '');
              
            const categoryLabel = tech.type 
              ? (tech.type === 'frontend' ? 'DEV' : tech.type === 'tester' ? 'QA' : tech.type.toUpperCase())
              : (tech.category || 'DEV');

            return (
              <div className="tech-stack-card glass-card" key={idx}>
                <div className="tech-icon-circle overflow-hidden bg-white p-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {hasIcon ? (
                    <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" style={{ maxWidth: '24px', maxHeight: '24px' }} />
                  ) : (
                    <Cpu size={20} className="text-accent" />
                  )}
                </div>
                <div className="tech-info">
                  <h4>{tech.name}</h4>
                  <p>{levelLabel}</p>
                </div>
                <span className="tech-badge-category">{categoryLabel}</span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
