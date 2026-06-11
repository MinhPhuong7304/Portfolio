import React from 'react';
import { User, MapPin, GraduationCap, Award, Compass, Folder, Calendar } from 'lucide-react';

export default function About({ mode, text, lang, projectsCount, certsCount }) {
  const isFrontend = mode === 'frontend';
  const aboutData = isFrontend ? text.about.frontend : text.about.tester;

  const infoItems = [
    {
      icon: <User size={18} />,
      label: lang === 'vi' ? 'Họ tên' : 'Full Name',
      value: lang === 'vi' ? 'Trần Minh Phương' : 'Tran Minh Phuong',
    },
    {
      icon: <MapPin size={18} />,
      label: lang === 'vi' ? 'Nơi ở' : 'Location',
      value: lang === 'vi' ? 'TP. Hồ Chí Minh, Việt Nam' : 'Ho Chi Minh City, Vietnam',
    },
    {
      icon: <GraduationCap size={18} />,
      label: lang === 'vi' ? 'Học vấn' : 'Education',
      value: lang === 'vi' ? 'Đại học Công nghệ Sài Gòn (STU)' : 'Saigon Technology University',
    },
    {
      icon: <Award size={18} />,
      label: lang === 'vi' ? 'Chuyên ngành' : 'Major',
      value: lang === 'vi' ? 'Công nghệ Thông tin' : 'Information Technology',
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
          <div className="avatar-placeholder">
            <User size={48} className="avatar-icon" />
          </div>
          <div className="about-details">
            {infoItems.map((item, idx) => (
              <div className="info-row" key={idx}>
                <span className="info-icon">{item.icon}</span>
                <div className="info-text">
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
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
                    ? 'Trở thành một Frontend Developer chuyên nghiệp, nghiên cứu và làm chủ các công nghệ mới để đem lại các sản phẩm web tối ưu về mặt trải nghiệm và kỹ thuật.'
                    : 'To become a professional Frontend Developer, researching and mastering new web technologies to deliver technically optimized and user-friendly web products.')
                : (lang === 'vi'
                    ? 'Trở thành một QA/Tester vững vàng, cải thiện chất lượng sản phẩm bằng cách lập quy trình test chuẩn hóa và xây dựng các hệ thống kiểm thử tự động hiệu quả.'
                    : 'To become a robust QA/Tester, enhancing product quality by establishing standardized test cycles and building efficient automated test suites.')}
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
          <span className="stat-number">2</span>
        </div>
      </div>
    </section>
  );
}
