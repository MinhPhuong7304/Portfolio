import React, { useState, useEffect } from 'react';
import { 
  LogOut, LayoutDashboard, Folder, Award, Layers, MessageSquare, Settings, X, ChevronRight, Zap, Sun, Moon, Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../config';

import ProfileTab from './tabs/ProfileTab';
import SkillsTab from './tabs/SkillsTab';
import ProjectsTab from './tabs/ProjectsTab';
import MessagesTab from './tabs/MessagesTab';
import DashboardTab from './tabs/DashboardTab';
import ExperiencesTab from './tabs/ExperiencesTab';
import CertificatesTab from './tabs/CertificatesTab';

export default function AdminDashboard({ navigate }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [profile, setProfile] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Form states
  const [newSkill, setNewSkill] = useState({ name: '', level: 'intermediate', type: 'frontend', icon: '' });
  const [newProj, setNewProj] = useState({
    title_vi: '', title_en: '', description_vi: '', description_en: '',
    tags: '', category: 'frontend', github: '', demo: '',
    artifactLink: '', artifactName: '', detailDescription_vi: '', detailDescription_en: ''
  });

  useEffect(() => {
    if (!token) navigate('/login');
    else fetchData();
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const portRes = await fetch(`${API_BASE_URL}/api/portfolio`);
      const portData = await portRes.json();
      if (portRes.ok && portData.success) {
        setProfile(portData.data.profile);
        setSkills(portData.data.skills);
        setProjects(portData.data.projects);
        setExperiences(portData.data.experiences || []);
        setCertificates(portData.data.certificates || []);
      }
      const msgRes = await fetch(`${API_BASE_URL}/api/admin/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        if (msgData.success) setMessages(msgData.data);
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleLogout = () => { localStorage.removeItem('token'); navigate('/'); };

  // Handlers (truncated for brevity, keep the same logic as before)
  const handleProfileSave = async (e) => {
    e.preventDefault();
    try { 
      const res = await fetch(`${API_BASE_URL}/api/admin/profile`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(profile) }); 
      if (res.ok) {
        alert('Lưu thông tin cá nhân thành công!');
      } else {
        alert('Lưu thông tin thất bại. Vui lòng đảm bảo backend đang chạy và đã khởi động lại sau các cập nhật gần đây.');
      }
    } catch (err) { 
      console.error(err); 
      alert('Lỗi lưu thông tin cá nhân: ' + err.message);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/skills`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(newSkill) });
      const data = await res.json();
      if (res.ok && data.success) { setSkills([...skills, data.data]); setNewSkill({ name: '', level: 'intermediate', type: 'frontend', icon: '' }); }
    } catch (err) { console.error(err); }
  };

  const handleAddExperience = async (formData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/experiences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setExperiences([...experiences, data.data]);
        alert('Thêm mục lịch sử thành công!');
      } else {
        alert('Lỗi thêm lịch sử.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateExperience = async (id, formData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/experiences/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setExperiences(experiences.map(exp => exp.id === id ? data.data : exp));
        alert('Cập nhật mục lịch sử thành công!');
      } else {
        alert('Lỗi cập nhật lịch sử.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!window.confirm('Xóa mục lịch sử này?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/experiences/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setExperiences(experiences.filter(exp => exp.id !== id));
        alert('Xóa mục lịch sử thành công!');
      } else {
        alert('Lỗi xóa lịch sử.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Xóa công nghệ này?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/skills/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) setSkills(skills.filter(s => s.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleUpdateSkill = async (id, updatedSkill) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/skills/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(updatedSkill) });
      const data = await res.json();
      if (res.ok && data.success) {
        setSkills(skills.map(s => s.id === id ? data.data : s));
        return true;
      }
      return false;
    } catch (err) { console.error(err); return false; }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProj.title_vi) return;
    const payload = { ...newProj, tags: newProj.tags ? newProj.tags.split(',').map(t => t.trim()) : [] };
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/projects`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects([...projects, data.data]);
        setNewProj({ title_vi: '', title_en: '', description_vi: '', description_en: '', tags: '', category: 'frontend', github: '', demo: '', artifactLink: '', artifactName: '', detailDescription_vi: '', detailDescription_en: '' });
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Xóa dự án này?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/projects/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) setProjects(projects.filter(p => p.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleUpdateProject = async (id, updatedProj) => {
    const payload = { ...updatedProj, tags: typeof updatedProj.tags === 'string' ? updatedProj.tags.split(',').map(t => t.trim()) : updatedProj.tags };
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/projects/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects(projects.map(p => p.id === id ? data.data : p));
        return true;
      }
      return false;
    } catch (err) { console.error(err); return false; }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Xóa tin nhắn này?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/messages/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) setMessages(messages.filter(m => m.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleAddCertificate = async (formData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCertificates([...certificates, data.data]);
        alert('Thêm chứng chỉ thành công!');
      } else {
        alert('Lỗi thêm chứng chỉ.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi thêm chứng chỉ: ' + err.message);
    }
  };

  const handleUpdateCertificate = async (id, formData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/certificates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCertificates(certificates.map(c => c.id === id ? data.data : c));
        alert('Cập nhật chứng chỉ thành công!');
      } else {
        alert('Lỗi cập nhật chứng chỉ.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi cập nhật chứng chỉ: ' + err.message);
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (!window.confirm('Xóa chứng chỉ này?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/certificates/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setCertificates(certificates.filter(c => c.id !== id));
        alert('Xóa chứng chỉ thành công!');
      } else {
        alert('Lỗi xóa chứng chỉ.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi xóa chứng chỉ: ' + err.message);
    }
  };

  return (
    <div className="flex h-screen bg-admin-bg text-admin-text overflow-hidden selection:bg-admin-accent/30 selection:text-admin-accent relative font-sans">
      {/* Background glowing orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-admin-accent/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none"></div>

      {/* Sidebar */}
      <aside className="w-[280px] bg-admin-sidebar/80 backdrop-blur-2xl flex flex-col border-r border-admin-border shrink-0 z-10 shadow-2xl shadow-black/50">
        <div className="p-6 flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-admin-accent to-orange-400 p-[1px] shadow-lg shadow-admin-accent/20">
              <div className="w-full h-full bg-admin-sidebar rounded-[11px] flex items-center justify-center">
                <Zap size={20} className="text-admin-accent" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-admin-text tracking-wide">Antigravity</h2>
              <p className="text-[10px] text-admin-muted font-medium uppercase tracking-widest">Quản trị</p>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent text-admin-muted hover:bg-admin-card-hover hover:text-admin-text transition-all">
            <X size={16} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          <NavItem icon={<LayoutDashboard size={18} />} label="Tổng quan" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Folder size={18} />} label="Dự án" isActive={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
          <NavItem icon={<Award size={18} />} label="Chứng chỉ" isActive={activeTab === 'certificates'} onClick={() => setActiveTab('certificates')} />
          <NavItem icon={<Briefcase size={18} />} label="Kinh nghiệm" isActive={activeTab === 'experiences'} onClick={() => setActiveTab('experiences')} />
          
          <div className="h-px bg-admin-border my-4"></div>
          
          <NavItem icon={<Layers size={18} />} label="Công nghệ" isActive={activeTab === 'techstack'} onClick={() => setActiveTab('techstack')} />
          <NavItem icon={<MessageSquare size={18} />} label="Bình luận" isActive={activeTab === 'messages'} onClick={() => setActiveTab('messages')} badge={messages.length} />
          <NavItem icon={<Settings size={18} />} label="Cài đặt cá nhân" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <header className="h-20 flex items-center justify-between px-10 border-b border-admin-border bg-admin-header-bg backdrop-blur-xl shrink-0 sticky top-0 z-20">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-admin-text font-sans"
          >
            {activeTab === 'techstack' && 'Quản lý Công nghệ'}
            {activeTab === 'projects' && 'Quản lý Dự án'}
            {activeTab === 'messages' && 'Bình luận & Hộp thư'}
            {activeTab === 'profile' && 'Cài đặt Cá nhân'}
            {activeTab === 'dashboard' && 'Tổng quan Hệ thống'}
            {activeTab === 'certificates' && 'Chứng chỉ'}
            {activeTab === 'experiences' && 'Kinh nghiệm & Học tập'}
          </motion.div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-admin-input-bg border border-admin-border text-admin-text hover:bg-admin-card-hover hover:scale-105 transition-all shadow-md cursor-pointer animate-none"
              title={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
            </button>
            <div className="flex items-center gap-3 px-4 py-2 bg-admin-input-bg border border-admin-border rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-medium text-admin-text-secondary">Chào mừng, {profile.name || 'Admin'}</span>
            </div>
            <button onClick={handleLogout} className="group flex items-center gap-2 px-5 py-2.5 bg-transparent border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-full transition-all duration-300 cursor-pointer">
              <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
              <span className="font-semibold text-sm">Đăng xuất</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-7xl mx-auto h-full"
            >
              {activeTab === 'dashboard' && <DashboardTab stats={{ projects: projects.length, certificates: certificates.length, messages: messages.length }} />}
              {activeTab === 'profile' && <ProfileTab profile={profile} setProfile={setProfile} handleProfileSave={handleProfileSave} />}
              {activeTab === 'techstack' && <SkillsTab skills={skills} handleAddSkill={handleAddSkill} handleDeleteSkill={handleDeleteSkill} handleUpdateSkill={handleUpdateSkill} newSkill={newSkill} setNewSkill={setNewSkill} />}
              {activeTab === 'projects' && (
                <ProjectsTab 
                  projects={projects} 
                  handleAddProject={handleAddProject} 
                  handleDeleteProject={handleDeleteProject}
                  handleUpdateProject={handleUpdateProject}
                  newProj={newProj} 
                  setNewProj={setNewProj} 
                />
              )}
              {activeTab === 'messages' && <MessagesTab messages={messages} handleDeleteMessage={handleDeleteMessage} />}
              {activeTab === 'certificates' && (
                <CertificatesTab 
                  certificates={certificates}
                  handleAddCertificate={handleAddCertificate}
                  handleUpdateCertificate={handleUpdateCertificate}
                  handleDeleteCertificate={handleDeleteCertificate}
                />
              )}
              {activeTab === 'experiences' && (
                <ExperiencesTab 
                  experiences={experiences} 
                  handleAddExperience={handleAddExperience} 
                  handleUpdateExperience={handleUpdateExperience} 
                  handleDeleteExperience={handleDeleteExperience} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--admin-border-strong); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--admin-text-muted); }
      `}} />
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`w-full group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 relative bg-transparent border ${
        isActive 
          ? 'border-admin-accent/50 shadow-[0_0_20px_rgba(249,115,22,0.15)] bg-gradient-to-r from-admin-accent/20 to-transparent' 
          : 'border-transparent hover:border-admin-border hover:bg-admin-card-hover'
      }`}
    >
      {isActive && (
        <motion.div layoutId="activeNav" className="absolute left-0 top-0 w-1 h-full bg-admin-accent rounded-r-full" />
      )}
      <div className="flex items-center gap-4">
        <div className={`${isActive ? 'text-admin-accent' : 'text-admin-muted group-hover:text-admin-text'} transition-colors`}>
          {icon}
        </div>
        <span className={`font-semibold tracking-wide text-sm ${isActive ? 'text-admin-text' : 'text-admin-muted group-hover:text-admin-text'} transition-colors`}>
          {label}
        </span>
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="px-2 py-0.5 rounded-full bg-admin-accent/20 text-admin-accent text-[10px] font-bold border border-admin-accent/30">
          {badge}
        </span>
      )}
    </button>
  );
}
