import React from 'react';
import { User, MapPin, GraduationCap, Award, Compass, Folder, Calendar, Mail, Phone } from 'lucide-react';

function GithubIcon({ size = 20 }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>;
}

function LinkedinIcon({ size = 20 }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
}

export default function About({ mode, text, lang, projectsCount, certsCount, avatar, profile }) {
  const isFrontend = mode === 'frontend';
  const aboutData = isFrontend ? text.about.frontend : text.about.tester;

  const infoItems = [
    {
      icon: <User size={18} />,
      label: lang === 'vi' ? 'Họ tên' : 'Full Name',
      value: profile?.name || (lang === 'vi' ? 'Trần Minh Phương' : 'Tran Minh Phuong'),
    },
    {
      icon: <MapPin size={18} />,
      label: lang === 'vi' ? 'Nơi ở' : 'Location',
      value: lang === 'vi' ? (profile?.location_vi || 'TP. Hồ Chí Minh, Việt Nam') : (profile?.location_en || 'Ho Chi Minh City, Vietnam'),
    },
    {
      icon: <GraduationCap size={18} />,
      label: lang === 'vi' ? 'Học vấn' : 'Education',
      value: lang === 'vi' ? (profile?.education_vi || 'Đại học Công nghệ Sài Gòn (STU)') : (profile?.education_en || 'Saigon Technology University'),
    },
    {
      icon: <Award size={18} />,
      label: lang === 'vi' ? 'Chuyên ngành' : 'Major',
      value: lang === 'vi' ? (profile?.major_vi || 'Công nghệ Thông tin') : (profile?.major_en || 'Information Technology'),
    },
    {
      icon: <Mail size={18} />,
      label: 'Email',
      value: profile?.email || '...',
      link: `mailto:${profile?.email || ''}`,
    },
    {
      icon: <Phone size={18} />,
      label: lang === 'vi' ? 'Điện thoại' : 'Phone',
      value: profile?.phone || '...',
      link: `tel:${profile?.phone || ''}`,
    },
    {
      icon: <GithubIcon size={18} />,
      label: 'GitHub',
      value: profile?.github ? profile.github.replace('https://', '').replace('http://', '').replace('www.', '') : 'github.com',
      link: profile?.github || '#',
    },
    {
      icon: <LinkedinIcon size={18} />,
      label: 'LinkedIn',
      value: profile?.linkedin ? profile.linkedin.replace('https://', '').replace('http://', '').replace('www.', '') : 'linkedin.com',
      link: profile?.linkedin || '#',
    },
  ];

  return (
    <section id="about" className="about-section container">
      <div className="section-header">
        <h2 className="section-title gradient-text">{text.about.title}</h2>
        <div className="section-line"></div>
      </div>

      <div className="about-grid">
        {/* Left Side: Personal Info Card */}
        <div className="about-card glass-card">
          <div className="avatar-placeholder overflow-hidden flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="avatar-icon" />
            )}
          </div>
          <div className="about-details">
            {infoItems.map((item, idx) => (
              <div className="info-row" key={idx}>
                <span className="info-icon">{item.icon}</span>
                <div className="info-text">
                  <span className="info-label">{item.label}</span>
                  {item.link ? (
                    <a href={item.link} target={item.link.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" className="info-value hover:text-admin-accent transition-colors" style={{ textDecoration: 'none' }}>
                      {item.value}
                    </a>
                  ) : (
                    <span className="info-value">{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
        </div>

        {/* Right Side: Introduction & Biography */}
        <div className="about-bio">
          <div className="bio-objective glass-card">
            <div className="objective-header">
              <Compass size={22} className="objective-icon" />
              <h3>{lang === 'vi' ? 'Định Hướng Nghề Nghiệp' : 'Career Objective'}</h3>
            </div>
            <p className="objective-text">
              {isFrontend
                ? (lang === 'vi' 
                    ? profile?.objective_frontend_vi || 'Trở thành một Frontend Developer chuyên nghiệp, nghiên cứu và làm chủ các công nghệ mới để đem lại các sản phẩm web tối ưu về mặt trải nghiệm và kỹ thuật.'
                    : profile?.objective_frontend_en || 'To become a professional Frontend Developer, researching and mastering new web technologies to deliver technically optimized and user-friendly web products.')
                : (lang === 'vi'
                    ? profile?.objective_tester_vi || 'Trở thành một QA/Tester vững vàng, cải thiện chất lượng sản phẩm bằng cách lập quy trình test chuẩn hóa và xây dựng các hệ thống kiểm thử tự động hiệu quả.'
                    : profile?.objective_tester_en || 'To become a robust QA/Tester, enhancing product quality by establishing standardized test cycles and building efficient automated test suites.')}
            </p>
          </div>

          <div className="bio-paragraphs">
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index} className="bio-desc">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Futuristic Stats Row (matching the screenshot) */}
      <div className="about-stats-row animate-fade-in">
        <div className="stat-card glass-card">
          <div className="stat-icon-wrap">
            <Folder size={20} />
          </div>
          <div className="stat-card-content">
            <span className="stat-title">{lang === 'vi' ? 'TỔNG DỰ ÁN' : 'TOTAL PROJECTS'}</span>
            <p className="stat-desc">{lang === 'vi' ? 'Dự án đã triển khai' : 'Web, automation & design work'}</p>
          </div>
          <span className="stat-number">{projectsCount || 5}</span>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-wrap">
            <Award size={20} />
          </div>
          <div className="stat-card-content">
            <span className="stat-title">{lang === 'vi' ? 'CHỨNG CHỈ' : 'CERTIFICATES'}</span>
            <p className="stat-desc">{lang === 'vi' ? 'Năng lực chuyên môn' : 'Professional skills validated'}</p>
          </div>
          <span className="stat-number">{certsCount || 2}</span>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-wrap">
            <Calendar size={20} />
          </div>
          <div className="stat-card-content">
            <span className="stat-title">{lang === 'vi' ? 'KINH NGHIỆM' : 'YEARS OF EXP'}</span>
            <p className="stat-desc">{lang === 'vi' ? 'Thời gian tích lũy' : 'Continuous learning journey'}</p>
          </div>
          <span className="stat-number">{profile?.years_of_exp !== undefined ? profile.years_of_exp : 2}</span>
        </div>
      </div>
    </section>
  );
}
