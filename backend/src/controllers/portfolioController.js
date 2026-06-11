import { Profile, Skill, Project, Certificate, Message } from '../models/db.js';

// Get all portfolio data for public page
export const getPortfolioData = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    const skills = await Skill.findAll({ order: [['id', 'ASC']] });
    const projects = await Project.findAll({ order: [['id', 'ASC']] });
    const certificates = await Certificate.findAll({ order: [['id', 'ASC']] });

    // Format data to match what the frontend expects
    const formattedData = {
      profile: profile || {},
      skills: skills || [],
      projects: projects || [],
      certificates: certificates || []
    };

    return res.status(200).json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: '✗ Failed to fetch portfolio data',
      error: error.message
    });
  }
};

// Create a new contact message (Public)
export const createMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: '✗ Name, email, and message are required'
    });
  }

  try {
    const newMessage = await Message.create({ name, email, message });
    return res.status(201).json({
      success: true,
      message: '✓ Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: '✗ Failed to send message',
      error: error.message
    });
  }
};

// --- ADMIN CONTROLLED ENDPOINTS (PROTECTED) ---

// Update Profile info
export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ success: false, message: '✗ Profile not found' });
    }
    
    await profile.update(req.body);
    return res.status(200).json({
      success: true,
      message: '✓ Profile updated successfully',
      data: profile
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: '✗ Failed to update profile', error: error.message });
  }
};

// Skills API
export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    return res.status(201).json({ success: true, data: skill });
  } catch (error) {
    return res.status(500).json({ success: false, message: '✗ Failed to create skill', error: error.message });
  }
};

export const updateSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await Skill.findByPk(id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    await skill.update(req.body);
    return res.status(200).json({ success: true, data: skill });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await Skill.findByPk(id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    await skill.destroy();
    return res.status(200).json({ success: true, message: '✓ Skill deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Projects API
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    await project.update(req.body);
    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    await project.destroy();
    return res.status(200).json({ success: true, message: '✓ Project deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Certificates API
export const createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
    return res.status(201).json({ success: true, data: certificate });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateCertificate = async (req, res) => {
  const { id } = req.params;
  try {
    const certificate = await Certificate.findByPk(id);
    if (!certificate) return res.status(404).json({ success: false, message: 'Certificate not found' });
    await certificate.update(req.body);
    return res.status(200).json({ success: true, data: certificate });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  const { id } = req.params;
  try {
    const certificate = await Certificate.findByPk(id);
    if (!certificate) return res.status(404).json({ success: false, message: 'Certificate not found' });
    await certificate.destroy();
    return res.status(200).json({ success: true, message: '✓ Certificate deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Messages API (Admin inbox viewer)
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByPk(id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
    await message.destroy();
    return res.status(200).json({ success: true, message: '✓ Message deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
