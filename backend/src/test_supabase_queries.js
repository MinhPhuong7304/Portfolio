import { initDB, Profile, Skill, Project, Certificate, Experience } from './models/db.js';

async function testQueries() {
  try {
    console.log('Khởi chạy database...');
    await initDB();
    console.log('Thử query Profile...');
    const profile = await Profile.findOne();
    console.log('✓ Profile:', profile ? profile.id : 'null');

    console.log('Thử query Skill...');
    const skills = await Skill.findAll({ order: [['id', 'ASC']] });
    console.log('✓ Skills:', skills.length);

    console.log('Thử query Project...');
    const projects = await Project.findAll({ order: [['id', 'ASC']] });
    console.log('✓ Projects:', projects.length);

    console.log('Thử query Certificate...');
    const certificates = await Certificate.findAll({ order: [['id', 'ASC']] });
    console.log('✓ Certificates:', certificates.length);

    console.log('Thử query Experience...');
    const experiences = await Experience.findAll({ order: [['id', 'ASC']] });
    console.log('✓ Experiences:', experiences.length);

    console.log('Tất cả queries chạy thành công!');
  } catch (error) {
    console.error('✗ LỖI QUERY:', error);
  }
}

testQueries();
