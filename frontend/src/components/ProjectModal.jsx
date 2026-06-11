import React from 'react';
import { ArrowLeft, ExternalLink, FileSpreadsheet, ShieldAlert } from 'lucide-react';

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

export default function ProjectModal({ project, onClose, text, lang }) {
  if (!project) return null;

  const isFrontend = project.category === 'frontend';
  const title = lang === 'vi' ? project.title_vi : project.title_en;
  const description = lang === 'vi' ? project.description_vi : project.description_en;
  const detailDesc = lang === 'vi' 
    ? (project.detailDescription_vi || description) 
    : (project.detailDescription_en || description);

  return (
    <div className="project-modal-overlay">
      <div className="project-modal-container glass-card animate-fade-in">
        
        {/* Modal Navigation */}
        <div className="modal-breadcrumb-bar">
          <button onClick={onClose} className="modal-back-btn">
            <ArrowLeft size={16} />
            <span>{lang === 'vi' ? 'Quay lại' : 'Back'}</span>
          </button>
          <div className="modal-breadcrumbs">
            <span>{lang === 'vi' ? 'Dự án' : 'Projects'}</span>
            <span className="separator">&gt;</span>
            <span className="current">{title}</span>
          </div>
        </div>

        <div className="project-modal-grid">
          {/* Left Side: Text Details */}
          <div className="project-modal-details">
            <h1 className="project-modal-title">{title}</h1>
            <div className="project-accent-indicator modal-indicator" />
            
            <div className="project-modal-desc-section">
              <p className="project-modal-summary">{description}</p>
              <h4 className="section-subtitle">{lang === 'vi' ? 'Chi Tiết Dự Án' : 'Project Breakdown'}</h4>
              <p className="project-modal-body">{detailDesc}</p>
            </div>

            <div className="project-modal-tags-section">
              <h4 className="section-subtitle">{lang === 'vi' ? 'Công Nghệ Sử Dụng' : 'Technologies Used'}</h4>
              <div className="project-tags">
                {project.tags.map((tag, idx) => (
                  <span className="project-tag" key={idx}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="project-modal-actions">
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
                    <div className="sim-url">https://{title.toLowerCase().replace(/[^a-z0-9]/g, '')}.my.id</div>
                  </div>
                  <div className="sim-browser-body">
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
    </div>
  );
}
