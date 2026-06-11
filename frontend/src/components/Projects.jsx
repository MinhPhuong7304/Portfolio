import React, { useState } from 'react';
import { 
  ExternalLink, FileSpreadsheet, Code, CheckCircle, 
  Award, Briefcase, Cpu, Eye, ArrowRight 
} from 'lucide-react';

export default function Projects({ mode, text, lang, projects, certificates, onOpenProject }) {
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
            Frontend Dev
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

      {/* TAB 1: PROJECTS GRID */}
      {activeTab === 'projects' && (
        <div className="projects-grid animate-fade-in">
          {filteredProjects.length === 0 ? (
            <div className="projects-empty-state glass-card">
              <p>{lang === 'vi' ? 'Không tìm thấy dự án nào trong mục này.' : 'No projects found in this category.'}</p>
            </div>
          ) : (
            filteredProjects.map((project, idx) => (
              <div className="project-card glass-card" key={idx}>
                <div className="project-card-header">
                  <div className="project-accent-indicator" />
                  <span className="logo-badge">{project.category.toUpperCase()}</span>
                </div>
                
                <div className="project-card-content">
                  <h3 className="project-title">{lang === 'vi' ? project.title_vi : project.title_en}</h3>
                  <p className="project-description">
                    {lang === 'vi' ? project.description_vi : project.description_en}
                  </p>
                  
                  <div className="project-tags">
                    {project.tags.map((tag, tagIdx) => (
                      <span className="project-tag" key={tagIdx}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-card-hover-actions">
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
          {techStackList.map((tech, idx) => (
            <div className="tech-stack-card glass-card" key={idx}>
              <div className="tech-icon-circle">
                <Cpu size={20} />
              </div>
              <div className="tech-info">
                <h4>{tech.name}</h4>
                <p>{tech.desc}</p>
              </div>
              <span className="tech-badge-category">{tech.category}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
