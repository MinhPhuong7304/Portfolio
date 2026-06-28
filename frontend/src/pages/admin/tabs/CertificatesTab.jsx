import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, Award, ExternalLink, FileUp, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../../config';

export default function CertificatesTab({ 
  certificates = [], 
  handleAddCertificate, 
  handleUpdateCertificate, 
  handleDeleteCertificate 
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingField, setUploadingField] = useState(null);

  const initialForm = {
    title_vi: '',
    title_en: '',
    issuer: '',
    date: '',
    link: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const token = localStorage.getItem('token');

  const handleEditClick = (cert) => {
    setFormData({ ...cert });
    setEditingId(cert.id);
    setIsAdding(true);
  };

  const handleUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 100 * 1024 * 1024) {
      alert('Kích thước file quá lớn (tối đa 100MB).');
      return;
    }
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    setUploadingField(fieldName);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataUpload
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setFormData(prev => ({ ...prev, [fieldName]: data.fileUrl }));
        alert('Tải tài liệu lên thành công!');
      } else {
        alert('Tải tài liệu lên thất bại.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi tải tài liệu.');
    }
    setUploadingField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title_vi || !formData.title_en || !formData.issuer) {
      alert('Vui lòng nhập đầy đủ thông tin bắt buộc (Tiêu đề, Tổ chức cấp).');
      return;
    }

    if (editingId) {
      await handleUpdateCertificate(editingId, formData);
    } else {
      await handleAddCertificate(formData);
    }
    setIsAdding(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  return (
    <div className="max-w-5xl mx-auto pb-10 font-sans">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-admin-text mb-3 tracking-tight font-sans">Chứng chỉ</h1>
          <p className="text-admin-muted text-sm font-medium">Quản lý và cập nhật chứng chỉ, giải thưởng của bạn trên trang chủ</p>
        </div>
        <button 
          onClick={() => { setIsAdding(!isAdding); setEditingId(null); setFormData(initialForm); }}
          className="bg-gradient-to-r from-admin-accent to-orange-500 shadow-lg shadow-admin-accent/30 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-bold cursor-pointer transition-all hover:scale-105 hover:shadow-admin-accent/40 border-0 text-sm"
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
              {editingId ? 'Chỉnh sửa chứng chỉ' : 'Thêm chứng chỉ mới'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-wider">Tên chứng chỉ (VI) <span className="text-admin-accent">*</span></label>
                <input 
                  type="text" 
                  value={formData.title_vi} 
                  onChange={e => setFormData({...formData, title_vi: e.target.value})} 
                  className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
                  placeholder="Ví dụ: Chứng nhận Hoàn thành Dự án"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-wider">Tên chứng chỉ (EN) <span className="text-admin-accent">*</span></label>
                <input 
                  type="text" 
                  value={formData.title_en} 
                  onChange={e => setFormData({...formData, title_en: e.target.value})} 
                  className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
                  placeholder="Ví dụ: Certificate of Project Completion"
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-wider">Tổ chức cấp <span className="text-admin-accent">*</span></label>
                <input 
                  type="text" 
                  value={formData.issuer} 
                  onChange={e => setFormData({...formData, issuer: e.target.value})} 
                  className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
                  placeholder="Ví dụ: Google, Coursera, Udemy..."
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-wider">Thời gian cấp</label>
                <input 
                  type="text" 
                  value={formData.date} 
                  onChange={e => setFormData({...formData, date: e.target.value})} 
                  className="w-full bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
                  placeholder="Ví dụ: 12/2025 hoặc 2025" 
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold text-admin-muted mb-3 uppercase tracking-wider">Đường dẫn tài liệu / Ảnh minh chứng</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={formData.link} 
                  onChange={e => setFormData({...formData, link: e.target.value})} 
                  className="flex-1 bg-admin-input-bg border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
                  placeholder="Nhập link tài liệu hoặc chọn file tải lên bên cạnh..." 
                />
                <label className="bg-admin-input-bg border border-admin-border hover:bg-admin-card-hover text-admin-text p-3 rounded-xl flex items-center justify-center cursor-pointer transition-all shrink-0 hover:border-admin-accent group/btn" title="Tải tài liệu lên">
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => handleUpload(e, 'link')} 
                    accept="image/*,application/pdf"
                  />
                  {uploadingField === 'link' ? (
                    <Loader2 size={18} className="animate-spin text-admin-accent" />
                  ) : (
                    <FileUp size={18} className="group-hover/btn:text-admin-accent transition-colors" />
                  )}
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-4 border-t border-admin-border pt-6">
              <button 
                type="button" 
                onClick={() => { setIsAdding(false); setEditingId(null); setFormData(initialForm); }} 
                className="px-6 py-2.5 bg-admin-input-bg border border-admin-border text-admin-text text-sm font-bold rounded-xl cursor-pointer hover:bg-admin-card-hover transition-colors"
              >
                Hủy
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-gradient-to-r from-admin-accent to-orange-500 text-white text-sm font-bold rounded-xl cursor-pointer hover:opacity-95 transition-all border-0"
              >
                Lưu chứng chỉ
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {certificates.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 bg-admin-card border border-admin-border rounded-3xl opacity-60">
          <Award size={48} className="text-admin-muted mb-4" />
          <p className="text-sm font-medium text-admin-muted">Chưa có chứng chỉ nào được tạo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map(cert => (
            <div 
              key={cert.id} 
              className={`bg-admin-card border rounded-2xl p-6 flex flex-col justify-between hover:border-admin-border-strong transition-all relative group ${cert.isHidden ? 'border-amber-500/30 opacity-75' : 'border-admin-border'}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-admin-accent/10 border border-admin-accent/20 flex items-center justify-center text-admin-accent shrink-0 shadow-inner relative">
                  <Award size={24} />
                  {cert.isHidden && (
                    <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-0.5 rounded-md shadow-md">
                      <EyeOff size={10} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-admin-text leading-snug truncate" title={cert.title_vi}>
                    {cert.title_vi}
                  </h4>
                  <p className="text-xs text-admin-muted font-semibold truncate mb-2">{cert.title_en}</p>
                  
                  <div className="space-y-1.5 mt-2">
                    <p className="text-xs text-admin-text-secondary font-medium">
                      <span className="text-admin-muted">Đơn vị cấp:</span> {cert.issuer}
                    </p>
                    {cert.date && (
                      <p className="text-xs text-admin-muted font-medium flex items-center gap-1.5">
                        <Calendar size={13} /> {cert.date}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-admin-border pt-4 mt-auto">
                <div>
                  {cert.link ? (
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-bold text-admin-accent hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <ExternalLink size={13} />
                      <span>Xem tài liệu</span>
                    </a>
                  ) : (
                    <span className="text-xs text-admin-muted font-medium italic">Không có tài liệu</span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleUpdateCertificate(cert.id, { ...cert, isHidden: !cert.isHidden })} 
                    className={`p-2 rounded-lg border cursor-pointer transition-all ${cert.isHidden ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500 hover:text-white' : 'bg-admin-input-bg text-admin-muted hover:text-admin-accent border-admin-border hover:bg-admin-card-hover'}`}
                    title={cert.isHidden ? "Hiện chứng chỉ" : "Ẩn chứng chỉ"}
                  >
                    {cert.isHidden ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button 
                    onClick={() => handleEditClick(cert)} 
                    className="p-2 bg-admin-input-bg text-admin-muted hover:text-admin-accent rounded-lg border border-admin-border cursor-pointer hover:bg-admin-card-hover transition-all"
                    title="Chỉnh sửa"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleDeleteCertificate(cert.id)} 
                    className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg border border-red-500/20 cursor-pointer transition-all"
                    title="Xóa"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
