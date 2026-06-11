import React, { useState, useEffect } from 'react';
import { 
  LogOut, Save, Plus, Trash, Edit, Mail, Clipboard, Folder, 
  User, CheckCircle, ArrowLeft, RefreshCw 
} from 'lucide-react';

export default function AdminDashboard({ navigate }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' }); // success or error
  const token = localStorage.getItem('token');

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [token]);

  const showMsg = (text, type = 'success') => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: '', type: '' }), 4000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch portfolio data
      const portRes = await fetch('http://localhost:5000/api/portfolio');
      const portData = await portRes.json();
      if (portRes.ok && portData.success) {
        setProfile(portData.data.profile);
        setSkills(portData.data.skills);
        setProjects(portData.data.projects);
      }

      // Fetch messages (Protected API)
      const msgRes = await fetch('http://localhost:5000/api/admin/messages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        if (msgData.success) {
          setMessages(msgData.data);
        }
      }
    } catch (err) {
      showMsg('Failed to load backend data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Profile Save
  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showMsg('✓ Profile updated successfully.');
      } else {
        showMsg(data.message || '✗ Failed to update profile.', 'error');
      }
    } catch (err) {
      showMsg('✗ Failed to update profile.', 'error');
    }
  };

  // Skill CRUD
  const [newSkill, setNewSkill] = useState({ name: '', level: 'intermediate', type: 'frontend' });
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name) return;

    try {
      const res = await fetch('http://localhost:5000/api/admin/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSkill)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSkills([...skills, data.data]);
        setNewSkill({ name: '', level: 'intermediate', type: 'frontend' });
        showMsg('✓ Skill added successfully.');
      }
    } catch (err) {
      showMsg('✗ Failed to add skill.', 'error');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/skills/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSkills(skills.filter(s => s.id !== id));
        showMsg('✓ Skill deleted.');
      }
    } catch (err) {
      showMsg('✗ Failed to delete skill.', 'error');
    }
  };

  // Project CRUD
  const [newProj, setNewProj] = useState({
    title_vi: '', title_en: '',
    description_vi: '', description_en: '',
    tags: '', category: 'frontend',
    github: '', demo: '',
    artifactLink: '', artifactName: '',
    detailDescription_vi: '', detailDescription_en: ''
  });

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProj.title_vi || !newProj.title_en) return;

    const formattedTags = newProj.tags ? newProj.tags.split(',').map(t => t.trim()) : [];
    const payload = { ...newProj, tags: formattedTags };

    try {
      const res = await fetch('http://localhost:5000/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects([...projects, data.data]);
        setNewProj({
          title_vi: '', title_en: '',
          description_vi: '', description_en: '',
          tags: '', category: 'frontend',
          github: '', demo: '',
          artifactLink: '', artifactName: '',
          detailDescription_vi: '', detailDescription_en: ''
        });
        showMsg('✓ Project added successfully.');
      }
    } catch (err) {
      showMsg('✗ Failed to add project.', 'error');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
        showMsg('✓ Project deleted.');
      }
    } catch (err) {
      showMsg('✗ Failed to delete project.', 'error');
    }
  };

  // Message Delete
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMessages(messages.filter(m => m.id !== id));
        showMsg('✓ Message deleted.');
      }
    } catch (err) {
      showMsg('✗ Failed to delete message.', 'error');
    }
  };

  return (
    <div className="admin-dashboard container animate-fade-in">
      <header className="admin-header glass-card">
        <div className="admin-logo">
          <button onClick={() => navigate('/')} className="admin-back-home" title="Go to website">
            <ArrowLeft size={18} />
          </button>
          <h2>Console Admin Dashboard</h2>
        </div>
        <div className="admin-actions">
          <button onClick={fetchData} className="btn-lang" title="Refresh Data">
            <RefreshCw size={14} className={loading ? 'spin-anim' : ''} />
          </button>
          <button onClick={handleLogout} className="btn-primary logout-btn">
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {msg.text && (
        <div className={`admin-alert ${msg.type === 'error' ? 'error' : 'success'}`}>
          <CheckCircle size={16} />
          <span>{msg.text}</span>
        </div>
      )}

      <div className="admin-grid">
        {/* Sidebar Nav */}
        <aside className="admin-sidebar glass-card">
          <button 
            className={`admin-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={16} />
            <span>Thông tin (Profile)</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <Clipboard size={16} />
            <span>Kỹ năng (Skills)</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <Folder size={16} />
            <span>Dự án (Projects)</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <Mail size={16} />
            <span>Tin nhắn ({messages.length})</span>
          </button>
        </aside>

        {/* Tab Content Panel */}
        <main className="admin-content-panel glass-card">
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="admin-form">
              <h3>Chỉnh sửa Thông tin cá nhân</h3>
              
              <div className="admin-form-row">
                <div className="form-group">
                  <label>Họ và Tên</label>
                  <input 
                    type="text" 
                    value={profile.name || ''} 
                    onChange={e => setProfile({...profile, name: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={profile.email || ''} 
                    onChange={e => setProfile({...profile, email: e.target.value})} 
                  />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="form-group">
                  <label>Điện thoại</label>
                  <input 
                    type="text" 
                    value={profile.phone || ''} 
                    onChange={e => setProfile({...profile, phone: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>GitHub Link</label>
                  <input 
                    type="text" 
                    value={profile.github || ''} 
                    onChange={e => setProfile({...profile, github: e.target.value})} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Lời giới thiệu ngắn (Frontend Dev - Tiếng Việt)</label>
                <textarea 
                  rows="2"
                  value={profile.subtitle_frontend_vi || ''} 
                  onChange={e => setProfile({...profile, subtitle_frontend_vi: e.target.value})} 
                />
              </div>

              <div className="form-group">
                <label>Lời giới thiệu ngắn (QA / Tester - Tiếng Việt)</label>
                <textarea 
                  rows="2"
                  value={profile.subtitle_tester_vi || ''} 
                  onChange={e => setProfile({...profile, subtitle_tester_vi: e.target.value})} 
                />
              </div>

              <button type="submit" className="btn-primary submit-btn">
                <Save size={16} />
                <span>Lưu thông tin</span>
              </button>
            </form>
          )}

          {/* TAB 2: SKILLS */}
          {activeTab === 'skills' && (
            <div>
              <h3>Quản lý kỹ năng</h3>
              <form onSubmit={handleAddSkill} className="admin-inline-form glass-card">
                <div className="form-group">
                  <label>Tên kỹ năng</label>
                  <input 
                    type="text" 
                    value={newSkill.name} 
                    placeholder="E.g., Node.js"
                    onChange={e => setNewSkill({...newSkill, name: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label>Cấp độ</label>
                  <select 
                    value={newSkill.level} 
                    onChange={e => setNewSkill({...newSkill, level: e.target.value})}
                  >
                    <option value="advanced">Advanced (Thành thạo)</option>
                    <option value="intermediate">Intermediate (Trung cấp)</option>
                    <option value="basic">Basic (Cơ bản)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Phân loại</label>
                  <select 
                    value={newSkill.type} 
                    onChange={e => setNewSkill({...newSkill, type: e.target.value})}
                  >
                    <option value="frontend">Frontend Dev</option>
                    <option value="tester">QA / Tester</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary skill-add-btn">
                  <Plus size={16} />
                </button>
              </form>

              <div className="admin-list-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tên</th>
                      <th>Cấp độ</th>
                      <th>Phân loại</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map(skill => (
                      <tr key={skill.id}>
                        <td><strong>{skill.name}</strong></td>
                        <td><span className={`skill-level ${skill.level.toLowerCase()}`}>{skill.level}</span></td>
                        <td>{skill.type === 'frontend' ? 'Frontend Dev' : 'QA / Tester'}</td>
                        <td>
                          <button onClick={() => handleDeleteSkill(skill.id)} className="btn-table-action delete" title="Delete">
                            <Trash size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <h3>Quản lý dự án</h3>
              <form onSubmit={handleAddProject} className="admin-form glass-card project-admin-form">
                <h4>Thêm dự án mới</h4>
                
                <div className="admin-form-row">
                  <div className="form-group">
                    <label>Tên dự án (Tiếng Việt)</label>
                    <input 
                      type="text" 
                      value={newProj.title_vi} 
                      onChange={e => setNewProj({...newProj, title_vi: e.target.value})} 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Tên dự án (Tiếng Anh)</label>
                    <input 
                      type="text" 
                      value={newProj.title_en} 
                      onChange={e => setNewProj({...newProj, title_en: e.target.value})} 
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Mô tả ngắn (Tiếng Việt)</label>
                  <textarea 
                    rows="2"
                    value={newProj.description_vi} 
                    onChange={e => setNewProj({...newProj, description_vi: e.target.value})} 
                  />
                </div>

                <div className="admin-form-row">
                  <div className="form-group">
                    <label>Tags (Phân cách bởi dấu phẩy)</label>
                    <input 
                      type="text" 
                      value={newProj.tags} 
                      placeholder="React, CSS, Git"
                      onChange={e => setNewProj({...newProj, tags: e.target.value})} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Phân loại (Category)</label>
                    <select 
                      value={newProj.category} 
                      onChange={e => setNewProj({...newProj, category: e.target.value})}
                    >
                      <option value="frontend">Frontend Dev</option>
                      <option value="tester">QA / Tester</option>
                      <option value="design">Design</option>
                      <option value="editing">Editing</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="form-group">
                    <label>GitHub Link</label>
                    <input 
                      type="text" 
                      value={newProj.github} 
                      onChange={e => setNewProj({...newProj, github: e.target.value})} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Demo Link</label>
                    <input 
                      type="text" 
                      value={newProj.demo} 
                      onChange={e => setNewProj({...newProj, demo: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="form-group">
                    <label>Tài liệu QA Link (Nếu có)</label>
                    <input 
                      type="text" 
                      value={newProj.artifactLink} 
                      onChange={e => setNewProj({...newProj, artifactLink: e.target.value})} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Tên tài liệu QA</label>
                    <input 
                      type="text" 
                      value={newProj.artifactName} 
                      placeholder="E.g., Test Suite Sheets"
                      onChange={e => setNewProj({...newProj, artifactName: e.target.value})} 
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary submit-btn">
                  <Plus size={16} />
                  <span>Thêm dự án</span>
                </button>
              </form>

              <div className="admin-list-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tiêu đề (VI)</th>
                      <th>Category</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(proj => (
                      <tr key={proj.id}>
                        <td><strong>{proj.title_vi}</strong></td>
                        <td><span className="logo-badge">{proj.category.toUpperCase()}</span></td>
                        <td>
                          <button onClick={() => handleDeleteProject(proj.id)} className="btn-table-action delete" title="Delete">
                            <Trash size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MESSAGES */}
          {activeTab === 'messages' && (
            <div>
              <h3>Tin nhắn từ nhà tuyển dụng</h3>
              {messages.length === 0 ? (
                <div className="admin-no-messages">Hòm thư trống. Chưa có tin nhắn nào.</div>
              ) : (
                <div className="admin-messages-list">
                  {messages.map(m => (
                    <div key={m.id} className="admin-message-card glass-card">
                      <div className="message-header">
                        <div>
                          <strong>{m.name}</strong>
                          <span className="message-email">&lt;{m.email}&gt;</span>
                        </div>
                        <button onClick={() => handleDeleteMessage(m.id)} className="btn-table-action delete" title="Delete message">
                          <Trash size={14} />
                        </button>
                      </div>
                      <p className="message-body">{m.message}</p>
                      <span className="message-date">{new Date(m.createdAt).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
