import express from 'express';
import { login } from '../controllers/authController.js';
import { 
  getPortfolioData, createMessage, updateProfile,
  createSkill, updateSkill, deleteSkill,
  createProject, updateProject, deleteProject,
  createCertificate, updateCertificate, deleteCertificate,
  getMessages, deleteMessage
} from '../controllers/portfolioController.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// --- PUBLIC ROUTES ---
router.post('/auth/login', login);
router.get('/portfolio', getPortfolioData);
router.post('/messages', createMessage);

// --- PROTECTED ADMIN ROUTES ---
// Profile
router.put('/admin/profile', verifyAdmin, updateProfile);

// Skills
router.post('/admin/skills', verifyAdmin, createSkill);
router.put('/admin/skills/:id', verifyAdmin, updateSkill);
router.delete('/admin/skills/:id', verifyAdmin, deleteSkill);

// Projects
router.post('/admin/projects', verifyAdmin, createProject);
router.put('/admin/projects/:id', verifyAdmin, updateProject);
router.delete('/api/admin/projects/:id', verifyAdmin, deleteProject); // Support both paths if needed, let's keep consistency
router.delete('/admin/projects/:id', verifyAdmin, deleteProject);

// Certificates
router.post('/admin/certificates', verifyAdmin, createCertificate);
router.put('/admin/certificates/:id', verifyAdmin, updateCertificate);
router.delete('/admin/certificates/:id', verifyAdmin, deleteCertificate);

// Messages (Inbox)
router.get('/admin/messages', verifyAdmin, getMessages);
router.delete('/admin/messages/:id', verifyAdmin, deleteMessage);

export default router;
