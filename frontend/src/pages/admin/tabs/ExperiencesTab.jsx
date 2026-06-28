import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExperiencesTab({ experiences = [], handleAddExperience, handleUpdateExperience, handleDeleteExperience }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    company_vi: '', company_en: '',
    role_vi: '', role_en: '',
    duration_vi: '', duration_en: '',
    description_vi: '', description_en: '',
    type: 'frontend'
  };

  const [formData, setFormData] = useState(initialForm);

  const handleEditClick = (exp) => {
    setFormData({ ...exp });
    setEditingId(exp.id);
    setIsAdding(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await handleUpdateExperience(editingId, formData);
    } else {
      await handleAddExperience(formData);
    }
    setIsAdding(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  return (
    <div className="max-w-5xl mx-auto pb-10 font-sans">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-admin-text mb-3 tracking-tight">Kinh nghiệm & Học tập</h1>
          <p className="text-admin-muted text-sm font-medium">Quản lý lịch sử công tác và học tập của bạn trên trang chủ</p>
        </div>
        <button 
          onClick={() => { setIsAdding(!isAdding); setEditingId(null); setFormData(initialForm); }}
          className="bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-bold cursor-pointer"
        >
          <Plus size={18} />
          <span>{isAdding ? 'Hủy bỏ' : 'Thêm mới'}</span>
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="mb-8 bg-admin-card border border-admin-border rounded-3xl p-8 relative overflow-hidden"
          >
            <h3 className="text-xl font-bold text-admin-text mb-8">
              {editingId ? 'Chỉnh sửa mục lịch sử' : 'Thêm mục lịch sử mới'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Tên Đơn vị / Trường học (VI)</label>
                <input type="text" value={formData.company_vi} onChange={e => setFormData({...formData, company_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Tên Đơn vị / Trường học (EN)</label>
                <input type="text" value={formData.company_en} onChange={e => setFormData({...formData, company_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Vai trò / Bằng cấp (VI)</label>
                <input type="text" value={formData.role_vi} onChange={e => setFormData({...formData, role_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Vai trò / Bằng cấp (EN)</label>
                <input type="text" value={formData.role_en} onChange={e => setFormData({...formData, role_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Thời gian (VI)</label>
                <input type="text" value={formData.duration_vi} onChange={e => setFormData({...formData, duration_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Ví dụ: Tháng 06/2025 - Hiện tại" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Thời gian (EN)</label>
                <input type="text" value={formData.duration_en} onChange={e => setFormData({...formData, duration_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Ví dụ: June 2025 - Present" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Phân loại</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text">
                  <option value="frontend">Frontend Developer</option>
                  <option value="tester">QA / Software Tester</option>
                  <option value="education">Học tập / Giáo dục</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Mô tả chi tiết (VI)</label>
                <textarea rows="4" value={formData.description_vi} onChange={e => setFormData({...formData, description_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Ghi rõ các gạch đầu dòng nhiệm vụ (phân tách bằng phím Enter)..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Mô tả chi tiết (EN)</label>
                <textarea rows="4" value={formData.description_en} onChange={e => setFormData({...formData, description_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Detail bullet points of key tasks..." />
              </div>
            </div>

            <div className="flex justify-end gap-4 border-t border-admin-border pt-6">
              <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); setFormData(initialForm); }} className="px-6 py-2.5 bg-admin-input-bg border border-admin-border text-admin-text text-sm font-bold rounded-xl cursor-pointer">Hủy</button>
              <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-bold rounded-xl cursor-pointer">Lưu</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-6">
        {experiences.map(exp => (
          <div key={exp.id} className="bg-admin-card border border-admin-border rounded-2xl p-6 flex justify-between items-start hover:border-admin-border-strong transition-all">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                {exp.type === 'education' ? <GraduationCap size={20} /> : <Briefcase size={20} />}
              </div>
              <div>
                <h4 className="text-lg font-bold text-admin-text leading-snug">{exp.role_vi}</h4>
                <p className="text-sm font-semibold text-admin-muted mb-2">{exp.company_vi}</p>
                <div className="flex items-center gap-4 text-xs text-admin-muted font-medium mb-3">
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> {exp.duration_vi}</span>
                  <span className="px-2.5 py-0.5 rounded bg-admin-input-bg border border-admin-border text-admin-text">
                    {exp.type === 'education' ? 'Giáo dục' : exp.type === 'frontend' ? 'Frontend Dev' : 'Software Tester'}
                  </span>
                </div>
                {exp.description_vi && (
                  <ul className="list-disc pl-5 space-y-1 text-xs text-admin-muted/90">
                    {exp.description_vi.split('\n').filter(l => l.trim()).map((l, i) => (
                      <li key={i}>{l.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex gap-2 shrink-0 ml-4">
              <button onClick={() => handleEditClick(exp)} className="p-2 bg-admin-input-bg text-admin-muted hover:text-admin-accent rounded-lg border border-admin-border cursor-pointer"><Edit2 size={15} /></button>
              <button onClick={() => handleDeleteExperience(exp.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg border border-red-500/20 cursor-pointer"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
