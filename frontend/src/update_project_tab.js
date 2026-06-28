const fs = require('fs');

const code = import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, ExternalLink, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsTab({ projects, handleAddProject, handleDeleteProject, handleUpdateProject }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialForm = {
    title_vi: '', title_en: '',
    description_vi: '', description_en: '',
    tags: '', category: 'frontend',
    github: '', demo: '', artifactLink: '', artifactName: '',
    detailDescription_vi: '', detailDescription_en: ''
  };
  
  const [formData, setFormData] = useState(initialForm);

  const handleEditClick = (proj) => {
    setFormData({
      ...proj,
      tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : proj.tags
    });
    setEditingId(proj.id);
    setIsAdding(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await handleUpdateProject(editingId, formData);
    } else {
      await handleAddProject({ preventDefault: () => {}, ...formData }); // Mock event
    }
    setIsAdding(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Project Management</h1>
          <p className="text-admin-muted text-sm font-medium">Add, edit, or remove portfolio projects</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => { setIsAdding(!isAdding); setEditingId(null); setFormData(initialForm); }}
          className="bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all"
        >
          <Plus size={18} /> <span>{isAdding ? 'Cancel' : 'Add Project'}</span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, height: 0, mb: 0 }} animate={{ opacity: 1, height: 'auto', mb: 32 }} exit={{ opacity: 0, height: 0, mb: 0 }}
            className="overflow-hidden" onSubmit={handleSubmit}
          >
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-8 relative z-10">{editingId ? 'Edit Project' : 'New Project Details'}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Title (VI)</label><input type="text" value={formData.title_vi || ''} onChange={e => setFormData({...formData, title_vi: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" required /></div>
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Title (EN)</label><input type="text" value={formData.title_en || ''} onChange={e => setFormData({...formData, title_en: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" required /></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Short Desc (VI)</label><textarea rows="2" value={formData.description_vi || ''} onChange={e => setFormData({...formData, description_vi: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" /></div>
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Short Desc (EN)</label><textarea rows="2" value={formData.description_en || ''} onChange={e => setFormData({...formData, description_en: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Detail Desc (VI)</label><textarea rows="3" value={formData.detailDescription_vi || ''} onChange={e => setFormData({...formData, detailDescription_vi: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" /></div>
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Detail Desc (EN)</label><textarea rows="3" value={formData.detailDescription_en || ''} onChange={e => setFormData({...formData, detailDescription_en: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Tags (comma separated)</label><input type="text" value={formData.tags || ''} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" /></div>
                <div>
                  <label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white">
                    <option value="frontend">Frontend Dev</option>
                    <option value="tester">QA / Tester</option>
                    <option value="design">Design</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">GitHub Link</label><input type="text" value={formData.github || ''} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" /></div>
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Demo Link</label><input type="text" value={formData.demo || ''} onChange={e => setFormData({...formData, demo: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Artifact Link (PDF/Excel)</label><input type="text" value={formData.artifactLink || ''} onChange={e => setFormData({...formData, artifactLink: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" /></div>
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Artifact Name</label><input type="text" value={formData.artifactName || ''} onChange={e => setFormData({...formData, artifactName: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" /></div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-white/10 relative z-10">
                <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); setFormData(initialForm); }} className="px-8 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all font-bold">Cancel</button>
                <button type="submit" className="px-8 py-3 bg-gradient-to-r from-admin-accent to-orange-500 shadow-lg shadow-admin-accent/20 hover:shadow-admin-accent/40 text-white rounded-xl font-bold transition-all hover:scale-[1.02]">Save Project</button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence>
          {projects.map((proj) => (
            <motion.div variants={item} layout key={proj.id} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -8 }} className="bg-white/[0.02] rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all flex flex-col group shadow-xl shadow-black/50">
              <div className="h-56 bg-black/40 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-admin-accent/20 to-transparent group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
                   <span className="text-white/20 font-black text-4xl tracking-widest uppercase rotate-[-5deg]">{proj.category}</span>
                </div>
                <div className="absolute top-5 right-5 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                  {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-admin-accent hover:scale-110 transition-all"><Code2 size={16} /></a>}
                  {proj.demo && <a href={proj.demo} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-admin-accent hover:scale-110 transition-all"><ExternalLink size={16} /></a>}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1 relative bg-gradient-to-b from-white/[0.02] to-transparent">
                <h3 className="text-white font-black text-2xl mb-3">{proj.title_vi}</h3>
                <p className="text-admin-muted text-sm line-clamp-2 mb-6 leading-relaxed font-medium">{proj.description_vi}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1.5 rounded-lg bg-admin-accent/20 text-admin-accent text-xs font-bold border border-admin-accent/30">{proj.category}</span>
                  {proj.tags && Array.isArray(proj.tags) && proj.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 text-white/70 text-xs font-bold border border-white/10">{tag}</span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <button onClick={() => handleEditClick(proj)} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all text-sm font-bold"><Edit2 size={16} /> Edit</button>
                  <button onClick={() => handleDeleteProject(proj.id)} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all text-sm font-bold border border-red-500/20"><Trash2 size={16} /> Delete</button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
\;

fs.writeFileSync('d:/Portfolio/frontend/src/pages/admin/tabs/ProjectsTab.jsx', code);
console.log('ProjectsTab updated.');