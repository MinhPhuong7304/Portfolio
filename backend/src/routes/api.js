import express from 'express';
import { login } from '../controllers/authController.js';
import { 
  getPortfolioData, createMessage, updateProfile,
  createSkill, updateSkill, deleteSkill,
  createProject, updateProject, deleteProject,
  createCertificate, updateCertificate, deleteCertificate,
  getMessages, deleteMessage,
  createExperience, updateExperience, deleteExperience
} from '../controllers/portfolioController.js';
import { verifyAdmin } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

const router = express.Router();

// --- PUBLIC ROUTES ---
router.post('/auth/login', login);
router.get('/portfolio', getPortfolioData);
router.post('/messages', createMessage);

// --- PROTECTED ADMIN ROUTES ---
// File Upload
router.post('/admin/upload', verifyAdmin, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  return res.status(200).json({
    success: true,
    fileUrl,
    fileName: req.file.originalname
  });
});

// Profile
router.put('/admin/profile', verifyAdmin, updateProfile);

// Skills
router.post('/admin/skills', verifyAdmin, createSkill);
router.put('/admin/skills/:id', verifyAdmin, updateSkill);
router.delete('/admin/skills/:id', verifyAdmin, deleteSkill);

// Experiences
router.post('/admin/experiences', verifyAdmin, createExperience);
router.put('/admin/experiences/:id', verifyAdmin, updateExperience);
router.delete('/admin/experiences/:id', verifyAdmin, deleteExperience);

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
