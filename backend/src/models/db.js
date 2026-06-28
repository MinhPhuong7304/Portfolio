import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT || 5432,
  dialect: 'postgres',
  logging: false, // Turn off query logs for clean terminal output
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Define Models
export const Profile = sequelize.define('Profile', {
  name: { type: DataTypes.STRING, allowNull: false },
  avatar: { type: DataTypes.TEXT },
  cv: { type: DataTypes.TEXT },
  cv_frontend: { type: DataTypes.TEXT },
  cv_tester: { type: DataTypes.TEXT },
  years_of_exp: { type: DataTypes.STRING, defaultValue: '2' },
  greeting_vi: { type: DataTypes.STRING, defaultValue: 'Xin chào, mình là' },
  greeting_en: { type: DataTypes.STRING, defaultValue: 'Hi there, I am' },
  title_frontend_vi: { type: DataTypes.STRING, defaultValue: 'Frontend Developer' },
  title_frontend_en: { type: DataTypes.STRING, defaultValue: 'Frontend Developer' },
  title_tester_vi: { type: DataTypes.STRING, defaultValue: 'QA / QC / Software Tester' },
  title_tester_en: { type: DataTypes.STRING, defaultValue: 'QA / QC / Software Tester' },
  subtitle_frontend_vi: { type: DataTypes.TEXT },
  subtitle_frontend_en: { type: DataTypes.TEXT },
  subtitle_tester_vi: { type: DataTypes.TEXT },
  subtitle_tester_en: { type: DataTypes.TEXT },
  about_frontend_vi: { type: DataTypes.TEXT },
  about_frontend_en: { type: DataTypes.TEXT },
  about_tester_vi: { type: DataTypes.TEXT },
  about_tester_en: { type: DataTypes.TEXT },
  objective_frontend_vi: { type: DataTypes.TEXT },
  objective_frontend_en: { type: DataTypes.TEXT },
  objective_tester_vi: { type: DataTypes.TEXT },
  objective_tester_en: { type: DataTypes.TEXT },
  location_vi: { type: DataTypes.STRING, defaultValue: 'TP. Hồ Chí Minh, Việt Nam' },
  location_en: { type: DataTypes.STRING, defaultValue: 'Ho Chi Minh City, Vietnam' },
  education_vi: { type: DataTypes.STRING, defaultValue: 'Đại học Công nghệ Sài Gòn (STU)' },
  education_en: { type: DataTypes.STRING, defaultValue: 'Saigon Technology University' },
  major_vi: { type: DataTypes.STRING, defaultValue: 'Công nghệ Thông tin' },
  major_en: { type: DataTypes.STRING, defaultValue: 'Information Technology' },
  email: { type: DataTypes.STRING, defaultValue: 'tmp.phuongtran@gmail.com' },
  phone: { type: DataTypes.STRING, defaultValue: '+84 90 123 4567' },
  github: { type: DataTypes.STRING, defaultValue: 'https://github.com' },
  linkedin: { type: DataTypes.STRING, defaultValue: 'https://linkedin.com' }
});

export const Skill = sequelize.define('Skill', {
  name: { type: DataTypes.STRING, allowNull: false },
  level: { type: DataTypes.STRING, defaultValue: 'intermediate' }, // advanced, intermediate, basic
  type: { type: DataTypes.STRING, defaultValue: 'frontend' }, // frontend, tester
  icon: { type: DataTypes.STRING }
});

export const Experience = sequelize.define('Experience', {
  company_vi: { type: DataTypes.STRING, allowNull: false },
  company_en: { type: DataTypes.STRING, allowNull: false },
  role_vi: { type: DataTypes.STRING, allowNull: false },
  role_en: { type: DataTypes.STRING, allowNull: false },
  duration_vi: { type: DataTypes.STRING, allowNull: false },
  duration_en: { type: DataTypes.STRING, allowNull: false },
  description_vi: { type: DataTypes.TEXT },
  description_en: { type: DataTypes.TEXT },
  type: { type: DataTypes.STRING, defaultValue: 'frontend' } // frontend, tester, education
});

export const Project = sequelize.define('Project', {
  title_vi: { type: DataTypes.STRING, allowNull: false },
  title_en: { type: DataTypes.STRING, allowNull: false },
  description_vi: { type: DataTypes.TEXT, allowNull: false },
  description_en: { type: DataTypes.TEXT, allowNull: false },
  tags: { 
    type: DataTypes.TEXT, 
    defaultValue: '[]',
    get() {
      const raw = this.getDataValue('tags');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('tags', JSON.stringify(val));
    }
  }, // JSON array stored as text
  category: { type: DataTypes.STRING, defaultValue: 'frontend' }, // frontend, tester, design, editing
  github: { type: DataTypes.STRING },
  demo: { type: DataTypes.STRING },
  artifactLink: { type: DataTypes.STRING },
  artifactName: { type: DataTypes.STRING },
  detailDescription_vi: { type: DataTypes.TEXT },
  detailDescription_en: { type: DataTypes.TEXT },
  imageUrl: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  timeline: { type: DataTypes.STRING },
  keyFeatures_vi: { type: DataTypes.TEXT },
  keyFeatures_en: { type: DataTypes.TEXT },
  challenge_vi: { type: DataTypes.TEXT },
  challenge_en: { type: DataTypes.TEXT },
  solution_vi: { type: DataTypes.TEXT },
  solution_en: { type: DataTypes.TEXT },
  testPlan_vi: { type: DataTypes.TEXT },
  testPlan_en: { type: DataTypes.TEXT },
  bugReport_vi: { type: DataTypes.TEXT },
  bugReport_en: { type: DataTypes.TEXT },
  automationResults_vi: { type: DataTypes.TEXT },
  automationResults_en: { type: DataTypes.TEXT }
});

export const Certificate = sequelize.define('Certificate', {
  title_vi: { type: DataTypes.STRING, allowNull: false },
  title_en: { type: DataTypes.STRING, allowNull: false },
  issuer: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING },
  link: { type: DataTypes.STRING }
});

export const Message = sequelize.define('Message', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false }
});

// Sync Database Helper
export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Successfully connected to PostgreSQL.');
    
    // Use alter: true to automatically add the new avatar column without losing data
    await sequelize.sync({ alter: true });
    console.log('✓ Database tables synchronized (with alter).');

    // Seed default Profile if empty
    const count = await Profile.count();
    if (count === 0) {
      await Profile.create({
        name: 'Trần Minh Phương',
        subtitle_frontend_vi: 'Đam mê thiết kế và xây dựng những giao diện người dùng (UI/UX) đẹp mắt, tương tác mượt mà và tối ưu hóa hiệu năng sản phẩm.',
        subtitle_frontend_en: 'Passionate about designing and building beautiful, smooth user interfaces (UI/UX) with optimized web performance.',
        subtitle_tester_vi: 'Tập trung đảm bảo chất lượng và độ tin cậy của phần mềm thông qua các phương pháp kiểm thử thủ công và tự động hóa toàn diện.',
        subtitle_tester_en: 'Focused on ensuring software quality and reliability through comprehensive manual testing and test automation methodologies.',
        about_frontend_vi: 'Mình là một lập trình viên Frontend đam mê sáng tạo mã nguồn và xây dựng các sản phẩm web thực tế. Với sự hiểu biết vững vàng về JavaScript và ReactJS, mình luôn mong muốn mang lại những trang web mượt mà, dễ sử dụng cho người dùng.',
        about_frontend_en: 'I am a passionate Frontend Developer who loves writing clean code and creating real-world web applications. With solid knowledge of JavaScript and ReactJS, I aim to deliver smooth, user-friendly experiences.',
        about_tester_vi: 'Là một QA/Tester, mục tiêu của mình là tìm kiếm lỗi sớm và tối ưu quy trình phát triển sản phẩm. Mình yêu thích công việc phân tích nghiệp vụ, lập tài liệu kiểm thử chi tiết và viết các kịch bản test tự động.',
        about_tester_en: 'As a QA/Tester, my goal is to catch bugs early and optimize the development cycle. I enjoy business requirement analysis, creating detailed test documentation, and writing automated test scripts.',
        objective_frontend_vi: 'Trở thành một Frontend Developer chuyên nghiệp, nghiên cứu và làm chủ các công nghệ mới để đem lại các sản phẩm web tối ưu về mặt trải nghiệm và kỹ thuật.',
        objective_frontend_en: 'To become a professional Frontend Developer, researching and mastering new web technologies to deliver technically optimized and user-friendly web products.',
        objective_tester_vi: 'Trở thành một QA/Tester vững vàng, cải thiện chất lượng sản phẩm bằng cách lập quy trình test chuẩn hóa và xây dựng các hệ thống kiểm thử tự động hiệu quả.',
        objective_tester_en: 'To become a robust QA/Tester, enhancing product quality by establishing standardized test cycles and building efficient automated test suites.'
      });
      console.log('✓ Seeded default profile data.');

      // Seed default skills
      await Skill.bulkCreate([
        { name: 'ReactJS', level: 'intermediate', type: 'frontend' },
        { name: 'JavaScript (ES6+)', level: 'advanced', type: 'frontend' },
        { name: 'HTML5 & CSS3', level: 'advanced', type: 'frontend' },
        { name: 'Tailwind CSS', level: 'advanced', type: 'frontend' },
        { name: 'Vite / Webpack', level: 'advanced', type: 'frontend' },
        { name: 'Git & GitHub', level: 'advanced', type: 'frontend' },
        { name: 'RESTful APIs', level: 'intermediate', type: 'frontend' },
        { name: 'Responsive UI', level: 'advanced', type: 'frontend' },
        
        { name: 'Manual Testing', level: 'advanced', type: 'tester' },
        { name: 'Test Case Design', level: 'advanced', type: 'tester' },
        { name: 'API Testing (Postman)', level: 'advanced', type: 'tester' },
        { name: 'Automation (Cypress)', level: 'intermediate', type: 'tester' },
        { name: 'Jira / Redmine', level: 'advanced', type: 'tester' },
        { name: 'SQL (Database Query)', level: 'intermediate', type: 'tester' },
        { name: 'STLC & SDLC', level: 'advanced', type: 'tester' },
        { name: 'Agile / Scrum', level: 'advanced', type: 'tester' }
      ]);
      console.log('✓ Seeded default skills.');

      // Seed default projects
      await Project.bulkCreate([
        {
          title_vi: 'Hệ thống Quản lý Vé Sự kiện (BasTicket)',
          title_en: 'BasTicket - Event Ticket Management System',
          description_vi: 'Ứng dụng web đặt vé trực tuyến đầy đủ chức năng với giao diện thanh toán mượt mà, quản lý danh sách sự kiện và bảng quản trị thông minh.',
          description_en: 'A fully functional ticket booking web application with a smooth checkout flow, event listings, and a smart administrative dashboard.',
          tags: ['React', 'Vite', 'Node.js', 'Express', 'Tailwind CSS'],
          category: 'frontend',
          github: 'https://github.com/phuongtm/ticket-management',
          demo: '#',
          detailDescription_vi: 'Đây là đồ án tốt nghiệp thiết lập hệ thống đặt vé thời gian thực. Sử dụng Socket.io cho đồng bộ trạng thái ghế ngồi và Stripe thanh toán thử nghiệm.',
          detailDescription_en: 'This is a graduation project implementing a real-time ticket booking platform. Uses Socket.io for seat synchronization and Stripe test payments.'
        },
        {
          title_vi: 'Trang Web Portfolio Cá Nhân',
          title_en: 'Interactive Personal Portfolio',
          description_vi: 'Portfolio cá nhân 2-trong-1 có khả năng chuyển đổi giao diện linh hoạt theo vai trò và ngôn ngữ, đạt hiệu năng cao.',
          description_en: 'A 2-in-1 portfolio site allowing recruiters to toggle between Frontend and Tester views dynamically with language translation support.',
          tags: ['React', 'Vite', 'Glassmorphism', 'CSS3'],
          category: 'frontend',
          github: 'https://github.com/phuongtm/portfolio',
          demo: '#',
          detailDescription_vi: 'Trang Portfolio cá nhân tích hợp đốm sáng chuyển động và giao diện tối giản Futuristic phong cách Sci-Fi để phô diễn năng lực Frontend.',
          detailDescription_en: 'A personal portfolio page with animated glowing blobs and a futuristic layout to showcase front-end coding capabilities.'
        },
        {
          title_vi: 'Kế hoạch & Kịch bản kiểm thử BasTicket',
          title_en: 'BasTicket - Test Plan & Test Suite',
          description_vi: 'Thiết lập kế hoạch kiểm thử (Test Plan) chi tiết và bộ Test Cases gồm 150+ ca kiểm thử bao phủ toàn bộ các luồng chức năng quan trọng.',
          description_en: 'Designed a comprehensive Test Plan and a suite of 150+ Test Cases covering checkout flows, user authentication, and admin operations.',
          tags: ['Test Plan', 'Test Cases', 'Mindmap', 'Google Sheets'],
          category: 'tester',
          artifactLink: 'https://docs.google.com',
          artifactName: 'Google Sheets Test Cases',
          detailDescription_vi: 'Dự án phân tích và thiết lập quy trình kiểm thử hoàn chỉnh cho hệ thống BasTicket, bao gồm kiểm thử bảo mật cơ bản và kiểm thử hiệu năng với JMeter.',
          detailDescription_en: 'A project to analyze and draft a complete test execution cycle for BasTicket, covering basic security tests and JMeter performance scenarios.'
        },
        {
          title_vi: 'Kiểm thử API tự động với Postman',
          title_en: 'Automated API Test Suite with Postman',
          description_vi: 'Xây dựng Postman Collection kiểm thử tự động API cho hệ thống đặt vé, tích hợp assertion về status code, JSON response schema và response time.',
          description_en: 'Developed automated API integration tests in Postman checking status codes, JSON schemas, response times, and auth tokens.',
          tags: ['Postman', 'API Testing', 'JSON Schema', 'Integration Test'],
          category: 'tester',
          artifactLink: 'https://postman.com',
          artifactName: 'Postman Collection JSON',
          detailDescription_vi: 'Tích hợp các script kiểm thử bằng JavaScript trong Postman Runner để tự động kiểm thử hơn 30 API endpoints liên quan tới mua vé.',
          detailDescription_en: 'Wrote post-request assertion scripts in Postman to validate responses for 30+ endpoints, integrating them into Postman collections.'
        },
        {
          title_vi: 'Automation Testing cho trang E-Commerce',
          title_en: 'E-Commerce Web Automation Tests',
          description_vi: 'Viết kịch bản kiểm thử tự động End-to-End bằng Cypress giả lập quy trình đăng nhập, mua hàng và thanh toán trên trang web thương mại điện tử.',
          description_en: 'Wrote Cypress End-to-End test suites simulating the complete user journey of logging in, shopping, and successful checkout.',
          tags: ['Cypress', 'JavaScript', 'End-to-End Testing'],
          category: 'tester',
          github: 'https://github.com/phuongtm/cypress-automation-ecommerce',
          detailDescription_vi: 'Sử dụng Cypress Framework viết mã kiểm thử E2E tự động, áp dụng Page Object Pattern (POM) để tăng khả năng bảo trì mã nguồn kiểm thử.',
          detailDescription_en: 'Created end-to-end regression testing suites in Cypress using Page Object Model (POM) pattern to maximize maintainability.'
        }
      ]);
      console.log('✓ Seeded default projects.');

      // Seed default certificates
      await Certificate.bulkCreate([
        {
          title_vi: 'Chứng chỉ Lập trình Frontend chuyên nghiệp',
          title_en: 'Professional Frontend Developer Certification',
          issuer: 'Coursera / Meta',
          date: '2025',
          link: '#'
        },
        {
          title_vi: 'Chứng chỉ ISTQB Certified Tester Foundation Level (CTFL)',
          title_en: 'ISTQB Certified Tester Foundation Level (CTFL)',
          issuer: 'ISTQB Board',
          date: '2025',
          link: '#'
        }
      ]);
      console.log('✓ Seeded default certificates.');
    }
    
    // Automatically update existing skills with icons if they are null
    const defaultIcons = [
      { name: 'ReactJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'JavaScript (ES6+)', icon: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/javascript.svg' },
      { name: 'HTML5 & CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Vite / Webpack', icon: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/vite.svg' },
      { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'API Testing (Postman)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
      { name: 'Automation (Cypress)', icon: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/cypress.svg' },
      { name: 'Jira / Redmine', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg' },
      { name: 'SQL (Database Query)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' }
    ];
    for (const item of defaultIcons) {
      await Skill.update({ icon: item.icon }, { where: { name: item.name, icon: null } });
    }

    // Seed default Experiences if empty
    const expCount = await Experience.count();
    if (expCount === 0) {
      await Experience.bulkCreate([
        {
          company_vi: 'Đại học Công nghệ Sài Gòn (STU)',
          company_en: 'Saigon Technology University',
          role_vi: 'Sinh viên ngành Công nghệ Thông tin',
          role_en: 'Student in Information Technology',
          duration_vi: 'Tháng 09/2021 - Tháng 05/2025',
          duration_en: 'September 2021 - May 2025',
          description_vi: 'Tích lũy nền tảng vững chắc về lập trình, giải thuật, cơ sở dữ liệu, mạng máy tính.\nHoàn thành tốt nghiệp với đề tài liên quan đến phát triển hệ thống web thời gian thực.',
          description_en: 'Acquired solid foundation in programming, algorithms, databases, computer networks.\nGraduated with graduation project focused on real-time web application development.',
          type: 'education'
        },
        {
          company_vi: 'Công ty Công nghệ XYZ (XYZ Tech)',
          company_en: 'XYZ Tech Company',
          role_vi: 'Thực tập sinh Lập trình Frontend',
          role_en: 'Frontend Developer Intern',
          duration_vi: 'Tháng 06/2025 - Tháng 08/2025',
          duration_en: 'June 2025 - August 2025',
          description_vi: 'Tham gia xây dựng giao diện ứng dụng quản lý doanh nghiệp.\nLàm quen quy trình làm việc Agile/Scrum với Git và các thư viện UI React.',
          description_en: 'Participated in developing dashboard user interfaces for enterprise management systems.\nExperienced Agile/Scrum workflows using Git and various React UI libraries.',
          type: 'frontend'
        },
        {
          company_vi: 'Công ty Giải pháp Phần mềm ABC (ABC Solutions)',
          company_en: 'ABC Software Solutions',
          role_vi: 'Thực tập sinh Kiểm thử Phần mềm (QA/QC)',
          role_en: 'Software Tester Intern (QA/QC)',
          duration_vi: 'Tháng 09/2025 - Tháng 11/2025',
          duration_en: 'September 2025 - November 2025',
          description_vi: 'Phân tích yêu cầu và viết hơn 150+ ca kiểm thử chức năng.\nThực hiện kiểm thử thủ công và học viết automation kịch bản Cypress/Postman.',
          description_en: 'Analyzed user requirements and drafted over 150+ functional test cases.\nPerformed manual testing cycles and learned test automation using Cypress and Postman.',
          type: 'tester'
        }
      ]);
      console.log('✓ Seeded default experiences.');
    }

    // Migrate single CV column to double CV columns if empty
    const profiles = await Profile.findAll();
    for (const p of profiles) {
      if (p.cv && (!p.cv_frontend || !p.cv_tester)) {
        await p.update({
          cv_frontend: p.cv_frontend || p.cv,
          cv_tester: p.cv_tester || p.cv
        });
      }
    }
  } catch (error) {
    console.error('✗ Failed to initialize PostgreSQL Database:', error);
  }
};

export default sequelize;
