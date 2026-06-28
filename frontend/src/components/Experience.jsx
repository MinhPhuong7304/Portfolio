import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Experience({ mode, lang, experiences = [] }) {
  // Filter experiences based on active role (mode)
  // Dev mode shows frontend + education
  // Tester mode shows tester + education
  const filteredExperiences = experiences.filter(exp => 
    exp.type === 'education' || exp.type === mode
  ).sort((a, b) => b.id - a.id); // Show latest first (assuming higher id = newer)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section id="experience" className="experience-section container font-sans py-20">
      <div className="section-header mb-16">
        <h2 className="section-title gradient-text text-center text-3xl font-extrabold tracking-tight">
          {lang === 'vi' ? 'Lịch Sử Làm Việc & Học Tập' : 'Work & Education History'}
        </h2>
        <div className="section-line mx-auto mt-4 w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"></div>
      </div>

      {filteredExperiences.length === 0 ? (
        <div className="text-center text-admin-muted text-sm py-12">
          {lang === 'vi' ? 'Không tìm thấy dữ liệu kinh nghiệm phù hợp.' : 'No matching experience entries found.'}
        </div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-4xl mx-auto pl-8 md:pl-0"
        >
          {/* Vertical Timeline Center Line (Desktop) */}
          <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-500 via-pink-600 to-transparent transform md:-translate-x-1/2"></div>

          {filteredExperiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const isEdu = exp.type === 'education';
            
            const companyName = lang === 'vi' ? exp.company_vi : exp.company_en;
            const roleName = lang === 'vi' ? exp.role_vi : exp.role_en;
            const duration = lang === 'vi' ? exp.duration_vi : exp.duration_en;
            const descriptionLines = (lang === 'vi' ? exp.description_vi : exp.description_en)
              ?.split('\n')
              .filter(line => line.trim()) || [];

            return (
              <motion.div 
                key={exp.id} 
                variants={item}
                className={`relative mb-12 md:flex justify-between items-center w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Empty column to offset content on desktop */}
                <div className="hidden md:block w-5/12"></div>

                {/* Timeline Icon Badge */}
                <div className="absolute left-[-21px] md:left-1/2 w-11 h-11 rounded-full bg-admin-card border-2 border-rose-500 flex items-center justify-center text-rose-500 transform md:-translate-x-1/2 z-10 shadow-lg shadow-rose-500/10">
                  {isEdu ? <GraduationCap size={20} /> : <Briefcase size={20} />}
                </div>

                {/* Timeline Card */}
                <div className="w-full md:w-5/12 bg-admin-card/40 backdrop-blur-md border border-admin-border hover:border-admin-border-strong transition-all rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                  <div className={`absolute top-0 bottom-0 w-1 ${isEdu ? 'bg-indigo-500' : 'bg-rose-500'} ${isLeft ? 'left-0' : 'left-0 md:left-auto md:right-0'}`}></div>
                  
                  <div className="flex items-center gap-2 text-xs font-bold text-admin-accent mb-2.5 uppercase tracking-wider">
                    <Calendar size={13} />
                    <span>{duration}</span>
                  </div>

                  <h3 className="text-lg font-bold text-admin-text mb-1 leading-snug group-hover:text-admin-accent transition-colors">
                    {roleName}
                  </h3>
                  
                  <h4 className="text-sm font-semibold text-admin-muted mb-4 flex items-center gap-1.5">
                    <span>{companyName}</span>
                    <span className="w-1 h-1 rounded-full bg-admin-muted/40"></span>
                    <span className="text-xs px-2 py-0.5 rounded bg-admin-input-bg border border-admin-border font-medium">
                      {isEdu ? (lang === 'vi' ? 'Học tập' : 'Education') : (lang === 'vi' ? 'Công việc' : 'Experience')}
                    </span>
                  </h4>

                  {descriptionLines.length > 0 && (
                    <ul className="space-y-2 relative z-10">
                      {descriptionLines.map((line, lIdx) => (
                        <li key={lIdx} className="text-xs text-admin-muted leading-relaxed flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80 mt-1.5 shrink-0"></span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
