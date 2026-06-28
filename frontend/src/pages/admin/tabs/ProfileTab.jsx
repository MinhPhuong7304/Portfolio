import React from 'react';
import { Save, User, Mail, Phone, Type, MapPin, GraduationCap, Award, FileText, Calendar, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfileTab({ profile, setProfile, handleProfileSave }) {
  const fileInputRef = React.useRef(null);
  const [cvFileName, setCvFileName] = React.useState('');
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const cvFrontendInputRef = React.useRef(null);
  const cvTesterInputRef = React.useRef(null);
  const [cvFrontendFileName, setCvFrontendFileName] = React.useState('');
  const [cvTesterFileName, setCvTesterFileName] = React.useState('');
  
  const handleCvFrontendChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Vui lòng chọn file PDF.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File quá lớn. Vui lòng chọn file dưới 5MB.');
        return;
      }
      setCvFrontendFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, cv_frontend: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvTesterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Vui lòng chọn file PDF.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File quá lớn. Vui lòng chọn file dưới 5MB.');
        return;
      }
      setCvTesterFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, cv_tester: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto pb-10">
      <motion.div variants={item} className="mb-10">
        <h1 className="text-4xl font-extrabold text-admin-text mb-3 tracking-tight">Cài đặt Cá nhân</h1>
        <p className="text-admin-muted text-sm font-medium">Quản lý thông tin cá nhân và chi tiết danh mục của bạn</p>
      </motion.div>

      {/* Avatar Section */}
      <motion.div variants={item} className="bg-admin-card border border-admin-border rounded-3xl p-8 mb-8 flex items-center gap-8 relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-64 h-64 bg-admin-accent/5 rounded-full blur-3xl group-hover:bg-admin-accent/10 transition-colors"></div>
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-admin-accent to-orange-500 p-[2px] shadow-xl shadow-admin-accent/20">
            <div className="w-full h-full bg-admin-sidebar rounded-full flex items-center justify-center overflow-hidden">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={48} className="text-admin-accent" />
              )}
            </div>
          </div>
          <div 
            className="absolute bottom-0 right-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center border-4 border-admin-sidebar cursor-pointer hover:scale-110 transition-transform"
            onClick={() => fileInputRef.current?.click()}
          >
            <Edit2Icon size={14} />
          </div>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-admin-text mb-1">{profile.name || 'Quản trị viên'}</h2>
          <p className="text-admin-muted font-medium mb-4 flex items-center gap-2"><Mail size={14} /> {profile.email || 'admin@example.com'}</p>
          <div className="flex gap-3">
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2 bg-admin-input-bg border border-admin-border text-admin-text text-sm font-bold rounded-xl hover:bg-admin-card-hover transition-all cursor-pointer"
            >
              Thay ảnh đại diện
            </button>
            <button 
              type="button"
              onClick={() => setProfile({ ...profile, avatar: '' })}
              className="px-5 py-2 bg-red-500/10 text-red-400 text-sm font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20 cursor-pointer"
            >
              Xóa ảnh
            </button>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleProfileSave} className="space-y-8">
        {/* Basic Info Section */}
        <motion.div variants={item} className="bg-admin-card border border-admin-border rounded-3xl p-8 relative overflow-hidden">
          <h3 className="text-xl font-bold text-admin-text mb-8 flex items-center gap-3 border-b border-admin-border pb-6">
            <div className="w-10 h-10 rounded-xl bg-admin-accent/20 flex items-center justify-center"><User size={20} className="text-admin-accent" /></div>
            Thông tin Cơ bản
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><User size={12}/> Họ và tên</label>
              <input type="text" value={profile.name || ''} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text focus:ring-1 focus:ring-admin-accent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><Mail size={12}/> Địa chỉ Email</label>
              <input type="email" value={profile.email || ''} onChange={e => setProfile({...profile, email: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text focus:ring-1 focus:ring-admin-accent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><Phone size={12}/> Số điện thoại</label>
              <input type="text" value={profile.phone || ''} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text focus:ring-1 focus:ring-admin-accent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><Award size={12}/> Đường dẫn GitHub</label>
              <input type="text" value={profile.github || ''} onChange={e => setProfile({...profile, github: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text focus:ring-1 focus:ring-admin-accent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><Award size={12}/> Đường dẫn LinkedIn</label>
              <input type="text" value={profile.linkedin || ''} onChange={e => setProfile({...profile, linkedin: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text focus:ring-1 focus:ring-admin-accent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><MapPin size={12}/> Địa chỉ (VI)</label>
              <input type="text" value={profile.location_vi || ''} onChange={e => setProfile({...profile, location_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text focus:ring-1 focus:ring-admin-accent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><MapPin size={12}/> Địa chỉ (EN)</label>
              <input type="text" value={profile.location_en || ''} onChange={e => setProfile({...profile, location_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text focus:ring-1 focus:ring-admin-accent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><GraduationCap size={12}/> Học vấn (VI)</label>
              <input type="text" value={profile.education_vi || ''} onChange={e => setProfile({...profile, education_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text focus:ring-1 focus:ring-admin-accent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><GraduationCap size={12}/> Học vấn (EN)</label>
              <input type="text" value={profile.education_en || ''} onChange={e => setProfile({...profile, education_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text focus:ring-1 focus:ring-admin-accent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><Award size={12}/> Chuyên ngành (VI)</label>
              <input type="text" value={profile.major_vi || ''} onChange={e => setProfile({...profile, major_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text focus:ring-1 focus:ring-admin-accent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><Award size={12}/> Chuyên ngành (EN)</label>
              <input type="text" value={profile.major_en || ''} onChange={e => setProfile({...profile, major_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text focus:ring-1 focus:ring-admin-accent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><Calendar size={12}/> Số năm kinh nghiệm</label>
              <input type="text" value={profile.years_of_exp || ''} onChange={e => setProfile({...profile, years_of_exp: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text focus:ring-1 focus:ring-admin-accent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><FileText size={12}/> CV Developer (Full Stack) (PDF)</label>
              <input type="file" accept="application/pdf" ref={cvFrontendInputRef} className="hidden" onChange={handleCvFrontendChange} />
              <button 
                type="button" 
                onClick={() => cvFrontendInputRef.current?.click()} 
                className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text hover:bg-admin-accent/10 flex items-center justify-between cursor-pointer"
              >
                <span>
                  {cvFrontendFileName 
                    ? `✓ Đã chọn file: ${cvFrontendFileName}` 
                    : profile.cv_frontend 
                      ? '✓ CV Developer đã có trên hệ thống (Click để thay đổi...)' 
                      : 'Click để chọn file PDF...'}
                </span>
                <Edit2 size={16} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2"><FileText size={12}/> CV Software Tester (PDF)</label>
              <input type="file" accept="application/pdf" ref={cvTesterInputRef} className="hidden" onChange={handleCvTesterChange} />
              <button 
                type="button" 
                onClick={() => cvTesterInputRef.current?.click()} 
                className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text hover:bg-admin-accent/10 flex items-center justify-between cursor-pointer"
              >
                <span>
                  {cvTesterFileName 
                    ? `✓ Đã chọn file: ${cvTesterFileName}` 
                    : profile.cv_tester 
                      ? '✓ CV Tester đã có trên hệ thống (Click để thay đổi...)' 
                      : 'Click để chọn file PDF...'}
                </span>
                <Edit2 size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div variants={item} className="bg-admin-card border border-admin-border rounded-3xl p-8 relative overflow-hidden">
          <h3 className="text-xl font-bold text-admin-text mb-8 flex items-center gap-3 border-b border-admin-border pb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center"><Type size={20} className="text-orange-500" /></div>
            Nội dung Phần Hero (Mở đầu)
          </h3>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Mô tả phụ (Developer - VI)</label>
                <textarea rows="3" value={profile.subtitle_frontend_vi || ''} onChange={e => setProfile({...profile, subtitle_frontend_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text resize-y focus:ring-1 focus:ring-admin-accent leading-relaxed" />
              </div>
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Mô tả phụ (Developer - EN)</label>
                <textarea rows="3" value={profile.subtitle_frontend_en || ''} onChange={e => setProfile({...profile, subtitle_frontend_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text resize-y focus:ring-1 focus:ring-admin-accent leading-relaxed" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Mô tả phụ (QA / Tester - VI)</label>
                <textarea rows="3" value={profile.subtitle_tester_vi || ''} onChange={e => setProfile({...profile, subtitle_tester_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text resize-y focus:ring-1 focus:ring-admin-accent leading-relaxed" />
              </div>
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Mô tả phụ (QA / Tester - EN)</label>
                <textarea rows="3" value={profile.subtitle_tester_en || ''} onChange={e => setProfile({...profile, subtitle_tester_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text resize-y focus:ring-1 focus:ring-admin-accent leading-relaxed" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* About Me Section Text */}
        <motion.div variants={item} className="bg-admin-card border border-admin-border rounded-3xl p-8 relative overflow-hidden">
          <h3 className="text-xl font-bold text-admin-text mb-8 flex items-center gap-3 border-b border-admin-border pb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center"><Type size={20} className="text-orange-500" /></div>
            Nội dung Phần Giới thiệu bản thân
          </h3>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Mục tiêu nghề nghiệp (Developer - VI)</label>
                <textarea rows="3" value={profile.objective_frontend_vi || ''} onChange={e => setProfile({...profile, objective_frontend_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text resize-y focus:ring-1 focus:ring-admin-accent leading-relaxed" />
              </div>
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Mục tiêu nghề nghiệp (Developer - EN)</label>
                <textarea rows="3" value={profile.objective_frontend_en || ''} onChange={e => setProfile({...profile, objective_frontend_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text resize-y focus:ring-1 focus:ring-admin-accent leading-relaxed" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Giới thiệu bản thân (Developer - VI)</label>
                <textarea rows="4" value={profile.about_frontend_vi || ''} onChange={e => setProfile({...profile, about_frontend_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text resize-y focus:ring-1 focus:ring-admin-accent leading-relaxed" />
              </div>
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Giới thiệu bản thân (Developer - EN)</label>
                <textarea rows="4" value={profile.about_frontend_en || ''} onChange={e => setProfile({...profile, about_frontend_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text resize-y focus:ring-1 focus:ring-admin-accent leading-relaxed" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Mục tiêu nghề nghiệp (Tester - VI)</label>
                <textarea rows="3" value={profile.objective_tester_vi || ''} onChange={e => setProfile({...profile, objective_tester_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text resize-y focus:ring-1 focus:ring-admin-accent leading-relaxed" />
              </div>
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Mục tiêu nghề nghiệp (Tester - EN)</label>
                <textarea rows="3" value={profile.objective_tester_en || ''} onChange={e => setProfile({...profile, objective_tester_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text resize-y focus:ring-1 focus:ring-admin-accent leading-relaxed" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Giới thiệu bản thân (Tester - VI)</label>
                <textarea rows="4" value={profile.about_tester_vi || ''} onChange={e => setProfile({...profile, about_tester_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text resize-y focus:ring-1 focus:ring-admin-accent leading-relaxed" />
              </div>
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Giới thiệu bản thân (Tester - EN)</label>
                <textarea rows="4" value={profile.about_tester_en || ''} onChange={e => setProfile({...profile, about_tester_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-5 py-4 text-sm focus:border-admin-accent transition-colors text-admin-text resize-y focus:ring-1 focus:ring-admin-accent leading-relaxed" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex justify-end pt-4 sticky bottom-10 z-50">
          <button type="submit" className="bg-gradient-to-r from-admin-accent to-orange-500 hover:shadow-admin-accent/40 text-white px-10 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all shadow-xl shadow-admin-accent/20 hover:scale-[1.02] cursor-pointer">
            <Save size={20} />
            <span className="text-lg">Lưu thay đổi</span>
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}

function Edit2Icon({ size }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>;
}

function GithubIcon({ size }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>;
}
