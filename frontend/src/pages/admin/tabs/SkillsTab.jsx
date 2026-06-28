import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AVAILABLE_LOGOS = [
  { name: 'React', slug: 'react', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'JavaScript', slug: 'javascript', icon: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/javascript.svg' },
  { name: 'TypeScript', slug: 'typescript', icon: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/typescript-icon.svg' },
  { name: 'HTML5', slug: 'html5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3', slug: 'css3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', slug: 'nodejs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Express', slug: 'express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
  { name: 'MongoDB', slug: 'mongodb', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', slug: 'postgresql', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', slug: 'mysql', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'Cypress', slug: 'cypress', icon: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/cypress.svg' },
  { name: 'Postman', slug: 'postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
  { name: 'Selenium', slug: 'selenium', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg' },
  { name: 'Playwright', slug: 'playwright', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg' },
  { name: 'Jira', slug: 'jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg' },
  { name: 'Trello', slug: 'trello', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-original.svg' },
  { name: 'Git', slug: 'git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'GitHub', slug: 'github', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
  { name: 'Vite', slug: 'vite', icon: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/vite.svg' },
  { name: 'Webpack', slug: 'webpack', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg' },
  { name: 'Figma', slug: 'figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  { name: 'Docker', slug: 'docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', slug: 'kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg' },
  { name: 'Python', slug: 'python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Java', slug: 'java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Next.js', slug: 'nextjs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'Svelte', slug: 'svelte', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg' },
  { name: 'Vue.js', slug: 'vuejs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' }
];

export default function SkillsTab({ skills, handleAddSkill, handleDeleteSkill, handleUpdateSkill, newSkill, setNewSkill }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', level: 'intermediate', type: 'frontend', icon: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'frontend', 'tester'

  // Auto detect logo on name typing
  const autoDetectLogo = (name) => {
    if (!name) return '';
    const cleanName = name.toLowerCase().replace(/\s+/g, '');
    const found = AVAILABLE_LOGOS.find(logo => 
      cleanName.includes(logo.slug.toLowerCase()) || 
      logo.name.toLowerCase().replace(/\s+/g, '').includes(cleanName)
    );
    return found ? found.icon : '';
  };

  // Filter skills based on search query and category
  const filteredSkills = skills.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || s.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter logos for Add Form
  const matchedAddLogos = AVAILABLE_LOGOS.filter(logo => 
    newSkill.name && (
      logo.name.toLowerCase().includes(newSkill.name.toLowerCase()) ||
      logo.slug.toLowerCase().includes(newSkill.name.toLowerCase())
    )
  );

  // Filter logos for Edit Form
  const matchedEditLogos = AVAILABLE_LOGOS.filter(logo => 
    editFormData.name && (
      logo.name.toLowerCase().includes(editFormData.name.toLowerCase()) ||
      logo.slug.toLowerCase().includes(editFormData.name.toLowerCase())
    )
  );

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto">
      {/* Header Area */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-admin-text mb-3 tracking-tight">Quản lý Công nghệ</h1>
          <p className="text-admin-muted text-sm font-medium">Thêm, sửa và sắp xếp các kỹ năng chuyên môn của bạn</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setIsAdding(!isAdding); setEditingId(null); }}
          className="bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all cursor-pointer border-0"
        >
          <Plus size={18} />
          <span>Thêm công nghệ</span>
        </motion.button>
      </motion.div>

      {/* Search & Filter Controls */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search size={18} className="text-admin-muted" />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm công nghệ..." 
            className="w-full bg-admin-input-bg border border-admin-border rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-admin-accent focus:bg-admin-card-hover transition-all text-admin-text shadow-inner"
          />
        </div>

        {/* Category Pills */}
        <div className="flex bg-admin-input-bg border border-admin-border rounded-2xl p-1.5 self-start md:self-auto shadow-inner">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border-0 ${
              activeCategory === 'all'
                ? 'bg-admin-card text-admin-accent shadow-md ring-1 ring-admin-border'
                : 'text-admin-muted hover:text-admin-text'
            }`}
          >
            Tất cả ({skills.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('frontend')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border-0 ${
              activeCategory === 'frontend'
                ? 'bg-admin-card text-admin-accent shadow-md ring-1 ring-admin-border'
                : 'text-admin-muted hover:text-admin-text'
            }`}
          >
            Developer ({skills.filter(s => s.type === 'frontend').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('tester')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border-0 ${
              activeCategory === 'tester'
                ? 'bg-admin-card text-admin-accent shadow-md ring-1 ring-admin-border'
                : 'text-admin-muted hover:text-admin-text'
            }`}
          >
            QA / Tester ({skills.filter(s => s.type === 'tester').length})
          </button>
        </div>
      </motion.div>

      {/* Add Skill Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 font-sans"
            onSubmit={(e) => { handleAddSkill(e); setIsAdding(false); }}
          >
            <div className="bg-admin-card border border-admin-border rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-admin-accent/10 rounded-full blur-3xl"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end relative z-10">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Tên công nghệ</label>
                  <input 
                    type="text" 
                    value={newSkill.name} 
                    onChange={(e) => {
                      const name = e.target.value;
                      setNewSkill({...newSkill, name, icon: autoDetectLogo(name)});
                    }} 
                    placeholder="Ví dụ: React, JavaScript, postman..." 
                    className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-admin-accent transition-colors text-admin-text" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Cấp độ</label>
                  <select value={newSkill.level} onChange={e => setNewSkill({...newSkill, level: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-admin-accent transition-colors text-admin-text appearance-none cursor-pointer">
                    <option value="advanced" className="bg-admin-sidebar text-admin-text">Nâng cao</option>
                    <option value="intermediate" className="bg-admin-sidebar text-admin-text">Trung cấp</option>
                    <option value="basic" className="bg-admin-sidebar text-admin-text">Cơ bản</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest">Danh mục</label>
                  <select value={newSkill.type} onChange={e => setNewSkill({...newSkill, type: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-admin-accent transition-colors text-admin-text appearance-none cursor-pointer">
                    <option value="frontend" className="bg-admin-sidebar text-admin-text">Lập trình Developer (Full Stack)</option>
                    <option value="tester" className="bg-admin-sidebar text-admin-text">Kiểm thử (QA / Tester)</option>
                  </select>
                </div>
              </div>

              {/* Logo Select Grid */}
              <div className="relative z-10 border-t border-admin-border/50 pt-4">
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-widest flex items-center gap-2">
                  Chọn Logo Công nghệ 
                  {newSkill.icon && <img src={newSkill.icon} alt="Preview" className="w-5 h-5 object-contain bg-white rounded-md p-0.5 ml-1" />}
                </label>
                <div className="flex flex-wrap gap-2.5 p-4 rounded-xl bg-admin-input-bg/50 border border-admin-border max-h-[140px] overflow-y-auto custom-scrollbar">
                  <button 
                    type="button"
                    onClick={() => setNewSkill({ ...newSkill, icon: '' })}
                    className={`h-10 px-3 rounded-lg flex items-center justify-center border text-xs font-bold transition-all cursor-pointer ${
                      !newSkill.icon 
                        ? 'bg-admin-accent/20 border-admin-accent text-admin-accent' 
                        : 'bg-admin-sidebar/50 border-admin-border text-admin-muted hover:border-admin-border-strong hover:text-admin-text'
                    }`}
                  >
                    Không sử dụng logo
                  </button>
                  
                  {(matchedAddLogos.length > 0 ? matchedAddLogos : AVAILABLE_LOGOS).map((logo) => {
                    const isSelected = newSkill.icon === logo.icon;
                    return (
                      <button
                        key={logo.slug}
                        type="button"
                        onClick={() => {
                          setNewSkill({ ...newSkill, icon: logo.icon, name: logo.name });
                        }}
                        className={`w-10 h-10 p-2 rounded-lg flex items-center justify-center border transition-all cursor-pointer bg-white ${
                          isSelected 
                            ? 'border-admin-accent ring-2 ring-admin-accent/30 scale-105' 
                            : 'border-admin-border hover:scale-105 hover:border-admin-border-strong'
                        }`}
                        title={logo.name}
                      >
                        <img src={logo.icon} alt={logo.name} className="w-full h-full object-contain" />
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-admin-muted mt-2">
                  💡 Gợi ý: Gõ tên công nghệ để lọc logo nhanh hơn, hoặc click thẳng vào logo để điền tự động!
                </p>
              </div>

              <div className="flex justify-end gap-3 border-t border-admin-border/50 pt-4 relative z-10">
                <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2.5 bg-admin-input-bg border border-admin-border text-admin-text rounded-xl hover:bg-admin-card-hover transition-all font-bold cursor-pointer text-sm">Hủy</button>
                <button type="submit" className="px-8 py-2.5 bg-gradient-to-r from-admin-accent to-orange-500 shadow-lg shadow-admin-accent/20 text-white rounded-xl font-bold transition-all hover:scale-[1.02] cursor-pointer border-0 text-sm">Lưu công nghệ</button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Tech Stack Grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredSkills.map((skill) => (
            editingId === skill.id ? (
              <motion.form 
                variants={item}
                layout
                key={`edit-${skill.id}`}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const success = await handleUpdateSkill(skill.id, editFormData);
                  if (success) setEditingId(null);
                }}
                className="bg-admin-card rounded-2xl p-6 flex flex-col justify-between border border-admin-accent/50 hover:border-admin-accent transition-all group relative overflow-hidden shadow-lg shadow-admin-accent/5 font-sans"
              >
                <div className="space-y-4 mb-6 relative z-10">
                  <h4 className="text-xs uppercase font-bold tracking-widest text-admin-accent flex items-center justify-between">
                    <span>Sửa công nghệ</span>
                    {editFormData.icon && <img src={editFormData.icon} alt="Preview" className="w-5 h-5 object-contain bg-white rounded-md p-0.5" />}
                  </h4>
                  <div>
                    <label className="block text-[10px] font-bold text-admin-muted mb-1.5 uppercase">Tên công nghệ</label>
                    <input 
                      type="text" 
                      value={editFormData.name} 
                      onChange={(e) => {
                        const name = e.target.value;
                        setEditFormData({...editFormData, name, icon: autoDetectLogo(name)});
                      }} 
                      className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-admin-accent transition-colors text-admin-text" 
                      required 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-admin-muted mb-1.5 uppercase">Cấp độ</label>
                      <select value={editFormData.level} onChange={e => setEditFormData({...editFormData, level: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-admin-accent transition-colors text-admin-text appearance-none cursor-pointer">
                        <option value="advanced" className="bg-admin-sidebar text-admin-text">Nâng cao</option>
                        <option value="intermediate" className="bg-admin-sidebar text-admin-text">Trung cấp</option>
                        <option value="basic" className="bg-admin-sidebar text-admin-text">Cơ bản</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-admin-muted mb-1.5 uppercase">Danh mục</label>
                      <select value={editFormData.type} onChange={e => setEditFormData({...editFormData, type: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-admin-accent transition-colors text-admin-text appearance-none cursor-pointer">
                        <option value="frontend" className="bg-admin-sidebar text-admin-text">Developer (Full Stack)</option>
                        <option value="tester" className="bg-admin-sidebar text-admin-text">QA / Tester</option>
                      </select>
                    </div>
                  </div>

                  {/* Logo Picker inside Edit card */}
                  <div className="border-t border-admin-border/50 pt-3">
                    <label className="block text-[9px] font-bold text-admin-muted mb-2 uppercase tracking-wider">Chọn Logo nhanh</label>
                    <div className="flex flex-wrap gap-1.5 p-2 rounded-lg bg-admin-input-bg/50 border border-admin-border max-h-[85px] overflow-y-auto custom-scrollbar">
                      <button 
                        type="button"
                        onClick={() => setEditFormData({ ...editFormData, icon: '' })}
                        className={`h-7 px-2 rounded-md flex items-center justify-center border text-[9px] font-bold transition-all cursor-pointer ${
                          !editFormData.icon 
                            ? 'bg-admin-accent/20 border-admin-accent text-admin-accent' 
                            : 'bg-admin-sidebar/50 border-admin-border text-admin-muted'
                        }`}
                      >
                        K/O
                      </button>
                      {(matchedEditLogos.length > 0 ? matchedEditLogos : AVAILABLE_LOGOS).map((logo) => {
                        const isSelected = editFormData.icon === logo.icon;
                        return (
                          <button
                            key={logo.slug}
                            type="button"
                            onClick={() => {
                              setEditFormData({ ...editFormData, icon: logo.icon, name: logo.name });
                            }}
                            className={`w-7 h-7 p-1 rounded-md flex items-center justify-center border transition-all cursor-pointer bg-white ${
                              isSelected 
                                ? 'border-admin-accent ring-1 ring-admin-accent/30 scale-105' 
                                : 'border-admin-border hover:scale-105'
                            }`}
                            title={logo.name}
                          >
                            <img src={logo.icon} alt={logo.name} className="w-full h-full object-contain" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-auto relative z-10 pt-2 border-t border-admin-border/30">
                  <button type="submit" className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gradient-to-r from-admin-accent to-orange-500 text-white hover:scale-[1.02] transition-all text-xs font-bold cursor-pointer border-0">Lưu</button>
                  <button type="button" onClick={() => setEditingId(null)} className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-admin-input-bg hover:bg-admin-card-hover text-admin-text border border-admin-border transition-colors text-xs font-bold cursor-pointer">Hủy</button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                variants={item}
                layout
                key={skill.id} 
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="bg-admin-card rounded-2xl p-6 flex flex-col justify-between border border-admin-border hover:border-admin-border-strong transition-colors group relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-admin-accent/10 rounded-full blur-2xl group-hover:bg-admin-accent/20 transition-colors"></div>
                
                <div className="flex items-center gap-5 mb-8 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-admin-input-bg to-admin-card-hover flex items-center justify-center text-admin-accent font-black text-2xl uppercase border border-admin-border shadow-inner group-hover:border-admin-accent/50 transition-all overflow-hidden p-2.5 bg-white">
                    {skill.icon ? (
                      <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      skill.name.substring(0, 2)
                    )}
                  </div>
                  <div>
                    <h3 className="text-admin-text font-bold text-xl mb-1">{skill.name}</h3>
                    <p className="text-admin-muted text-xs font-medium uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {skill.level === 'advanced' ? 'Nâng cao' : skill.level === 'intermediate' ? 'Trung cấp' : skill.level === 'basic' ? 'Cơ bản' : skill.level}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-auto relative z-10">
                  <button 
                    onClick={() => { setEditingId(skill.id); setEditFormData({ name: skill.name, level: skill.level, type: skill.type, icon: skill.icon || '' }); setIsAdding(false); }}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-admin-input-bg hover:bg-admin-card-hover text-admin-text transition-colors text-sm font-bold border border-admin-border cursor-pointer"
                  >
                    <Edit2 size={16} /> Sửa
                  </button>
                  <button onClick={() => handleDeleteSkill(skill.id)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors text-sm font-bold border border-red-500/20 cursor-pointer">
                    <Trash2 size={16} /> Xóa
                  </button>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
