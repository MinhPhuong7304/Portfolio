export const portfolioData = {
  vi: {
    nav: {
      about: "Giới thiệu",
      skills: "Kỹ năng",
      projects: "Dự án",
      contact: "Liên hệ",
      downloadCv: "Tải CV"
    },
    hero: {
      greeting: "Xin chào, mình là",
      name: "Trần Minh Phương",
      titleFrontend: "Full Stack Developer",
      titleTester: "QA / QC / Software Tester",
      subtitleFrontend: "Đam mê thiết kế, xây dựng và tối ưu hóa các ứng dụng web toàn diện (Full Stack), giao diện người dùng mượt mà cùng hệ thống backend tối ưu.",
      subtitleTester: "Tập trung đảm bảo chất lượng và độ tin cậy của phần mềm thông qua các phương pháp kiểm thử thủ công và tự động hóa toàn diện.",
      toggleFrontend: "Góc nhìn Dev",
      toggleTester: "Góc nhìn Tester",
      contactBtn: "Liên hệ với mình",
      projectsBtnFrontend: "Xem sản phẩm",
      projectsBtnTester: "Xem test suites"
    },
    about: {
      title: "Về Mình",
      frontend: {
        paragraphs: [
          "Mình là một lập trình viên Full Stack đam mê sáng tạo mã nguồn và xây dựng các sản phẩm web thực tế. Với sự hiểu biết vững vàng về cả Frontend và Backend, mình luôn mong muốn mang lại những hệ thống toàn diện, mượt mà và tối ưu.",
          "Mỗi dự án đối với mình là một cơ hội để kết hợp giữa tư duy thiết kế thẩm mỹ và logic lập trình, đảm bảo giao diện luôn tương thích tốt nhất trên mọi loại thiết bị."
        ]
      },
      tester: {
        paragraphs: [
          "Là một QA/Tester, mục tiêu của mình là tìm kiếm lỗi sớm và tối ưu quy trình phát triển sản phẩm. Mình yêu thích công việc phân tích nghiệp vụ, lập tài liệu kiểm thử chi tiết và viết các kịch bản test tự động.",
          "Mình có kỹ năng cao trong việc giả lập các kịch bản của người dùng để kiểm tra tính toàn vẹn hệ thống, cũng như phối hợp chặt chẽ với đội ngũ lập trình để sửa lỗi nhanh chóng."
        ]
      }
    },
    skills: {
      title: "Kỹ Năng Kỹ Thuật",
      levels: {
        advanced: "Thành thạo",
        intermediate: "Trung cấp",
        basic: "Cơ bản"
      },
      frontend: [
        { name: "ReactJS", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "JavaScript (ES6+)", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/javascript.svg" },
        { name: "HTML5 & CSS3", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
        { name: "Tailwind CSS", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Vite / Webpack", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/vite.svg" },
        { name: "Git & GitHub", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name: "RESTful APIs", level: "Intermediate" },
        { name: "Responsive UI", level: "Advanced" }
      ],
      tester: [
        { name: "Manual Testing", level: "Advanced" },
        { name: "Test Case Design", level: "Advanced" },
        { name: "API Testing (Postman)", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
        { name: "Automation (Cypress)", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/cypress.svg" },
        { name: "Jira / Redmine", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg" },
        { name: "SQL (Database Query)", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
        { name: "STLC & SDLC", level: "Advanced" },
        { name: "Agile / Scrum", level: "Advanced" }
      ]
    },
    projects: {
      title: "Dự Án Tiêu Biểu",
      viewCode: "Xem Code",
      viewDemo: "Xem Demo",
      viewArtifact: "Xem Tài Liệu Test",
      frontend: [
        {
          title: "Hệ thống Quản lý Vé Sự kiện (BasTicket)",
          description: "Ứng dụng web đặt vé trực tuyến đầy đủ chức năng với giao diện thanh toán mượt mà, quản lý danh sách sự kiện và bảng quản trị thông minh.",
          tags: ["React", "Vite", "Node.js", "Express", "Tailwind CSS"],
          github: "https://github.com/phuongtm/ticket-management",
          demo: "#"
        },
        {
          title: "Trang Web Portfolio Cá Nhân",
          description: "Portfolio cá nhân 2-trong-1 có khả năng chuyển đổi giao diện linh hoạt theo vai trò và ngôn ngữ, đạt hiệu năng cao.",
          tags: ["React", "Vite", "Glassmorphism", "CSS3"],
          github: "https://github.com/phuongtm/portfolio",
          demo: "#"
        }
      ],
      tester: [
        {
          title: "Kế hoạch & Kịch bản kiểm thử BasTicket",
          description: "Thiết lập kế hoạch kiểm thử (Test Plan) chi tiết và bộ Test Cases gồm 150+ ca kiểm thử bao phủ toàn bộ các luồng chức năng quan trọng.",
          tags: ["Test Plan", "Test Cases", "Mindmap", "Google Sheets"],
          artifactLink: "#",
          artifactName: "Google Sheets Test Cases"
        },
        {
          title: "Kiểm thử API tự động với Postman",
          description: "Xây dựng Postman Collection kiểm thử tự động API cho hệ thống đặt vé, tích hợp assertion về status code, JSON response schema và response time.",
          tags: ["Postman", "API Testing", "JSON Schema", "Integration Test"],
          artifactLink: "#",
          artifactName: "Postman Collection JSON"
        },
        {
          title: "Automation Testing cho trang E-Commerce",
          description: "Viết kịch bản kiểm thử tự động End-to-End bằng Cypress giả lập quy trình đăng nhập, mua hàng và thanh toán trên trang web thương mại điện tử.",
          tags: ["Cypress", "JavaScript", "End-to-End Testing"],
          github: "https://github.com/phuongtm/cypress-automation-ecommerce"
        }
      ]
    },
    contact: {
      title: "Liên Hệ Với Mình",
      nameLabel: "Họ và Tên",
      emailLabel: "Địa chỉ Email",
      messageLabel: "Lời nhắn của bạn",
      submitButton: "Gửi Lời Nhắn",
      sending: "Đang gửi...",
      successMsg: "Cảm ơn bạn! Lời nhắn của bạn đã được gửi thành công.",
      cvText: "Bạn cần xem CV đầy đủ? Hãy tải bản CV PDF tại đây:",
      downloadBtn: "Tải CV (PDF)"
    }
  },
  en: {
    nav: {
      about: "About Me",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      downloadCv: "Download CV"
    },
    hero: {
      greeting: "Hi there, I am",
      name: "Tran Minh Phuong",
      titleFrontend: "Full Stack Developer",
      titleTester: "QA / QC / Software Tester",
      subtitleFrontend: "Passionate about building comprehensive web applications (Full Stack), developing smooth user interfaces (UI/UX) combined with robust backend services.",
      subtitleTester: "Focused on ensuring software quality and reliability through comprehensive manual testing and test automation methodologies.",
      toggleFrontend: "Developer View",
      toggleTester: "Tester View",
      contactBtn: "Get in touch",
      projectsBtnFrontend: "View Projects",
      projectsBtnTester: "View test suites"
    },
    about: {
      title: "About Me",
      frontend: {
        paragraphs: [
          "I am a passionate Full Stack Developer who loves writing clean code and creating real-world web applications. With solid knowledge of both Frontend and Backend, I aim to deliver comprehensive, high-performing web solutions.",
          "Every project is an opportunity for me to merge creative design with programming logic, ensuring responsive designs that function flawlessly across all devices."
        ]
      },
      tester: {
        paragraphs: [
          "As a QA/Tester, my goal is to catch bugs early and optimize the development cycle. I enjoy business requirement analysis, creating detailed test documentation, and writing automated test scripts.",
          "I excel at simulating realistic user scenarios to verify system integrity and working closely with developers to ensure fast, high-quality bug resolution."
        ]
      }
    },
    skills: {
      title: "Technical Skills",
      levels: {
        advanced: "Advanced",
        intermediate: "Intermediate",
        basic: "Basic"
      },
      frontend: [
        { name: "ReactJS", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "JavaScript (ES6+)", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/javascript.svg" },
        { name: "HTML5 & CSS3", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
        { name: "Tailwind CSS", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Vite / Webpack", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/vite.svg" },
        { name: "Git & GitHub", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name: "RESTful APIs", level: "Intermediate" },
        { name: "Responsive UI", level: "Advanced" }
      ],
      tester: [
        { name: "Manual Testing", level: "Advanced" },
        { name: "Test Case Design", level: "Advanced" },
        { name: "API Testing (Postman)", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
        { name: "Automation (Cypress)", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/cypress.svg" },
        { name: "Jira / Redmine", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg" },
        { name: "SQL (Database Query)", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
        { name: "STLC & SDLC", level: "Advanced" },
        { name: "Agile / Scrum", level: "Advanced" }
      ]
    },
    projects: {
      title: "Featured Projects",
      viewCode: "View Code",
      viewDemo: "View Demo",
      viewArtifact: "View Test Artifacts",
      frontend: [
        {
          title: "BasTicket - Event Ticket Management System",
          description: "A fully functional ticket booking web application with a smooth checkout flow, event listings, and a smart administrative dashboard.",
          tags: ["React", "Vite", "Node.js", "Express", "Tailwind CSS"],
          github: "https://github.com/phuongtm/ticket-management",
          demo: "#"
        },
        {
          title: "Interactive Personal Portfolio",
          description: "A 2-in-1 portfolio site allowing recruiters to toggle between Frontend and Tester views dynamically with language translation support.",
          tags: ["React", "Vite", "Glassmorphism", "CSS3"],
          github: "https://github.com/phuongtm/portfolio",
          demo: "#"
        }
      ],
      tester: [
        {
          title: "BasTicket - Test Plan & Test Suite",
          description: "Designed a comprehensive Test Plan and a suite of 150+ Test Cases covering checkout flows, user authentication, and admin operations.",
          tags: ["Test Plan", "Test Cases", "Mindmap", "Google Sheets"],
          artifactLink: "#",
          artifactName: "Google Sheets Test Cases"
        },
        {
          title: "Automated API Test Suite with Postman",
          description: "Developed automated API integration tests in Postman checking status codes, JSON schemas, response times, and auth tokens.",
          tags: ["Postman", "API Testing", "JSON Schema", "Integration Test"],
          artifactLink: "#",
          artifactName: "Postman Collection JSON"
        },
        {
          title: "E-Commerce Web Automation Tests",
          description: "Wrote Cypress End-to-End test suites simulating the complete user journey of logging in, shopping, and successful checkout.",
          tags: ["Cypress", "JavaScript", "End-to-End Testing"],
          github: "https://github.com/phuongtm/cypress-automation-ecommerce"
        }
      ]
    },
    contact: {
      title: "Get In Touch",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      messageLabel: "Your Message",
      submitButton: "Send Message",
      sending: "Sending...",
      successMsg: "Thank you! Your message has been sent successfully.",
      cvText: "Need a copy of my detailed resume? Download the PDF version here:",
      downloadBtn: "Download CV (PDF)"
    }
  }
};
