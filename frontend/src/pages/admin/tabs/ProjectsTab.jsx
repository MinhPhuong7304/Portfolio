import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, ExternalLink, Code2, FileUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../../config';

export default function ProjectsTab({ projects, handleAddProject, handleDeleteProject, handleUpdateProject }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialForm = {
    title_vi: '', title_en: '',
    description_vi: '', description_en: '',
    tags: '', category: 'frontend',
    github: '', demo: '', artifactLink: '', artifactName: '',
    detailDescription_vi: '', detailDescription_en: '',
    imageUrl: '', role: '', timeline: '',
    keyFeatures_vi: '', keyFeatures_en: ''
  };
  
  const [formData, setFormData] = useState(initialForm);
  const [uploadingField, setUploadingField] = useState(null);

  const handleUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      alert('Kích thước file quá lớn (tối đa 100MB).');
      return;
    }

    const token = localStorage.getItem('token');
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    setUploadingField(fieldName);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      });
      const data = await response.json();
      if (response.ok && data.success) {
        if (fieldName === 'artifactLink') {
          setFormData(prev => ({
            ...prev,
            [fieldName]: data.fileUrl,
            artifactName: prev.artifactName || data.fileName
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            [fieldName]: data.fileUrl
          }));
        }
      } else {
        alert(data.message || 'Tải file lên thất bại.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối khi tải file lên.');
    } finally {
      setUploadingField(null);
    }
  };

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
      await handleAddProject({ preventDefault: () => {}, ...formData });
    }
    setIsAdding(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto projects-tab-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-admin-text mb-3 tracking-tight">Quản lý Dự án</h1>
          <p className="text-admin-muted text-sm font-medium">Thêm, sửa hoặc xóa các dự án trong danh mục của bạn</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => { setIsAdding(!isAdding); setEditingId(null); setFormData(initialForm); }}
          className="bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all cursor-pointer"
        >
          <Plus size={18} /> <span>{isAdding ? 'Hủy' : 'Thêm dự án'}</span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="mb-8" onSubmit={handleSubmit}
          >
            <div className="bg-admin-card border border-admin-border rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
              <h3 className="text-xl font-bold text-admin-text mb-8 relative z-10">{editingId ? 'Sửa thông tin dự án' : 'Thông tin dự án mới'}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Tiêu đề (VI)</label><input type="text" value={formData.title_vi || ''} onChange={e => setFormData({...formData, title_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" required /></div>
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Tiêu đề (EN)</label><input type="text" value={formData.title_en || ''} onChange={e => setFormData({...formData, title_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" required /></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Mô tả ngắn (VI)</label><textarea rows="2" value={formData.description_vi || ''} onChange={e => setFormData({...formData, description_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" /></div>
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Mô tả ngắn (EN)</label><textarea rows="2" value={formData.description_en || ''} onChange={e => setFormData({...formData, description_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" /></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Mô tả chi tiết (VI)</label><textarea rows="3" value={formData.detailDescription_vi || ''} onChange={e => setFormData({...formData, detailDescription_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" /></div>
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Mô tả chi tiết (EN)</label><textarea rows="3" value={formData.detailDescription_en || ''} onChange={e => setFormData({...formData, detailDescription_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Nhãn / Tags (phân cách bằng dấu phẩy)</label><input type="text" value={formData.tags || ''} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" /></div>
                <div>
                  <label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Danh mục</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text">
                    <option value="frontend" className="bg-admin-sidebar text-admin-text">Lập trình Developer (Full Stack)</option>
                    <option value="tester" className="bg-admin-sidebar text-admin-text">Kiểm thử (QA / Tester)</option>
                    <option value="design" className="bg-admin-sidebar text-admin-text">Thiết kế</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-6">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Đường dẫn ảnh đại diện (Thumbnail)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={formData.imageUrl || ''} 
                      onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                      className="flex-1 min-w-0 bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" 
                      placeholder="https://..." 
                    />
                    <label className="bg-admin-input-bg border border-admin-border hover:bg-admin-card-hover text-admin-text p-3 rounded-xl flex items-center justify-center cursor-pointer transition-all shrink-0 hover:border-admin-accent group/btn" title="Tải ảnh lên">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleUpload(e, 'imageUrl')} 
                      />
                      {uploadingField === 'imageUrl' ? (
                        <div className="w-5 h-5 border-2 border-admin-accent border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <FileUp size={18} className="group-hover/btn:text-admin-accent transition-colors" />
                      )}
                    </label>
                  </div>
                </div>
                <div className="md:col-span-1"><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Vai trò</label><input type="text" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Ví dụ: Lead Frontend" /></div>
                <div className="md:col-span-1"><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Thời gian thực hiện</label><input type="text" value={formData.timeline || ''} onChange={e => setFormData({...formData, timeline: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Ví dụ: Jan 2023 - Present" /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Tính năng nổi bật (VI)</label><textarea rows="3" value={formData.keyFeatures_vi || ''} onChange={e => setFormData({...formData, keyFeatures_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="- Tính năng 1\n- Tính năng 2..." /></div>
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Tính năng nổi bật (EN)</label><textarea rows="3" value={formData.keyFeatures_en || ''} onChange={e => setFormData({...formData, keyFeatures_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="- Feature 1\n- Feature 2..." /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Đường dẫn GitHub</label><input type="text" value={formData.github || ''} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" /></div>
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Đường dẫn Demo</label><input type="text" value={formData.demo || ''} onChange={e => setFormData({...formData, demo: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
                <div>
                  <label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Tài liệu đính kèm (PDF/Excel)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={formData.artifactLink || ''} 
                      onChange={e => setFormData({...formData, artifactLink: e.target.value})} 
                      className="flex-1 min-w-0 bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" 
                      placeholder="Nhập link hoặc chọn file..."
                    />
                    <label className="bg-admin-input-bg border border-admin-border hover:bg-admin-card-hover text-admin-text p-3 rounded-xl flex items-center justify-center cursor-pointer transition-all shrink-0 hover:border-admin-accent group/btn" title="Tải tài liệu lên">
                      <input 
                        type="file" 
                        accept=".pdf,.xls,.xlsx,.doc,.docx" 
                        className="hidden" 
                        onChange={(e) => handleUpload(e, 'artifactLink')} 
                      />
                      {uploadingField === 'artifactLink' ? (
                        <div className="w-5 h-5 border-2 border-admin-accent border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <FileUp size={18} className="group-hover/btn:text-admin-accent transition-colors" />
                      )}
                    </label>
                  </div>
                </div>
                <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Tên tài liệu</label><input type="text" value={formData.artifactName || ''} onChange={e => setFormData({...formData, artifactName: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Tên hiển thị..." /></div>
              </div>

              {/* Dev Case Study Fields */}
              {formData.category === 'frontend' && (
                <div className="border-t border-admin-border/50 pt-6 relative z-10 space-y-6 mb-6">
                  <h4 className="text-sm font-bold text-admin-accent uppercase tracking-wider">Nghiên Cứu Tình Huống (Developer Case Study)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Thách Thức (VI)</label><textarea rows="3" value={formData.challenge_vi || ''} onChange={e => setFormData({...formData, challenge_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Những thách thức gặp phải..." /></div>
                    <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Thách Thức (EN)</label><textarea rows="3" value={formData.challenge_en || ''} onChange={e => setFormData({...formData, challenge_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Technical challenges faced..." /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Giải Pháp (VI)</label><textarea rows="3" value={formData.solution_vi || ''} onChange={e => setFormData({...formData, solution_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Giải pháp bạn đưa ra..." /></div>
                    <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Giải Pháp (EN)</label><textarea rows="3" value={formData.solution_en || ''} onChange={e => setFormData({...formData, solution_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Solutions implemented..." /></div>
                  </div>
                </div>
              )}

              {/* QA Tester Artifacts Fields */}
              {formData.category === 'tester' && (
                <div className="border-t border-admin-border/50 pt-6 relative z-10 space-y-6 mb-6">
                  <h4 className="text-sm font-bold text-admin-accent uppercase tracking-wider">Hồ Sơ Kiểm Thử (QA Tester Artifacts)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Kế Hoạch & Kịch Bản Test (VI)</label><textarea rows="3" value={formData.testPlan_vi || ''} onChange={e => setFormData({...formData, testPlan_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Kịch bản/Kế hoạch test..." /></div>
                    <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Kế Hoạch & Kịch Bản Test (EN)</label><textarea rows="3" value={formData.testPlan_en || ''} onChange={e => setFormData({...formData, testPlan_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Test plan and designs..." /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Báo Cáo Lỗi / Issues Log (VI)</label><textarea rows="3" value={formData.bugReport_vi || ''} onChange={e => setFormData({...formData, bugReport_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Thống kê hoặc báo cáo lỗi..." /></div>
                    <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Báo Cáo Lỗi / Issues Log (EN)</label><textarea rows="3" value={formData.bugReport_en || ''} onChange={e => setFormData({...formData, bugReport_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Bug report / issues list..." /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Kiểm Thử Tự Động (VI)</label><textarea rows="3" value={formData.automationResults_vi || ''} onChange={e => setFormData({...formData, automationResults_vi: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Kết quả kịch bản Cypress/Postman..." /></div>
                    <div><label className="block text-xs font-bold text-admin-muted mb-3 uppercase">Kiểm Thử Tự Động (EN)</label><textarea rows="3" value={formData.automationResults_en || ''} onChange={e => setFormData({...formData, automationResults_en: e.target.value})} className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text" placeholder="Automated testing scripts / results..." /></div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4 pt-6 border-t border-admin-border relative z-10">
                <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); setFormData(initialForm); }} className="px-8 py-3 bg-admin-input-bg border border-admin-border text-admin-text rounded-xl hover:bg-admin-card-hover transition-all font-bold cursor-pointer">Hủy</button>
                <button type="submit" className="px-8 py-3 bg-gradient-to-r from-admin-accent to-orange-500 shadow-lg shadow-admin-accent/20 hover:shadow-admin-accent/40 text-white rounded-xl font-bold transition-all hover:scale-[1.02] cursor-pointer">{editingId ? 'Lưu thay đổi' : 'Lưu dự án'}</button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence>
          {projects.map((proj) => (
            <motion.div variants={item} layout key={proj.id} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -8 }} className="bg-admin-card rounded-3xl overflow-hidden border border-admin-border hover:border-admin-border-strong transition-all flex flex-col group shadow-xl shadow-black/50">
              <div className="h-56 bg-admin-input-bg w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-admin-accent/20 to-transparent group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
                   <span className="text-admin-text/20 font-black text-4xl tracking-widest uppercase rotate-[-5deg]">{proj.category}</span>
                </div>
                <div className="absolute top-5 right-5 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                  {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-admin-accent hover:scale-110 transition-all"><Code2 size={16} /></a>}
                  {proj.demo && <a href={proj.demo} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-admin-accent hover:scale-110 transition-all"><ExternalLink size={16} /></a>}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1 relative bg-gradient-to-b from-admin-card-bg to-transparent">
                <h3 className="text-admin-text font-black text-2xl mb-3">{proj.title_vi}</h3>
                <p className="text-admin-muted text-sm line-clamp-2 mb-6 leading-relaxed font-medium">{proj.description_vi}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1.5 rounded-lg bg-admin-accent/20 text-admin-accent text-xs font-bold border border-admin-accent/30">{proj.category}</span>
                  {proj.tags && Array.isArray(proj.tags) && proj.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-admin-input-bg text-admin-text-secondary text-xs font-bold border border-admin-border">{tag}</span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <button onClick={() => handleEditClick(proj)} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-admin-input-bg hover:bg-admin-card-hover text-admin-text border border-admin-border transition-all text-sm font-bold cursor-pointer"><Edit2 size={16} /> Sửa</button>
                  <button onClick={() => handleDeleteProject(proj.id)} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all text-sm font-bold border border-red-500/20 cursor-pointer"><Trash2 size={16} /> Xóa</button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
