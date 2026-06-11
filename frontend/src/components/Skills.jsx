import React from 'react';
import { 
  Code2, Terminal, Layout, Palette, GitBranch, Globe, Cpu, 
  ClipboardCheck, FileText, PlayCircle, Database, Layers, CheckSquare
} from 'lucide-react';

export default function Skills({ mode, text }) {
  const isFrontend = mode === 'frontend';
  const skillsList = isFrontend ? text.skills.frontend : text.skills.tester;
  const levels = text.skills.levels;

  // Icon mapping helper
  const getSkillIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('react')) return <Code2 size={24} className="skill-icon-img" />;
    if (n.includes('javascript') || n.includes('js')) return <Terminal size={24} className="skill-icon-img" />;
    if (n.includes('html') || n.includes('css')) return <Layout size={24} className="skill-icon-img" />;
    if (n.includes('tailwind')) return <Palette size={24} className="skill-icon-img" />;
    if (n.includes('vite') || n.includes('webpack') || n.includes('build')) return <Cpu size={24} className="skill-icon-img" />;
    if (n.includes('git') || n.includes('github')) return <GitBranch size={24} className="skill-icon-img" />;
    if (n.includes('api') || n.includes('restful')) return <Globe size={24} className="skill-icon-img" />;
    if (n.includes('responsive')) return <Layout size={24} className="skill-icon-img" />;
    
    if (n.includes('manual')) return <ClipboardCheck size={24} className="skill-icon-img" />;
    if (n.includes('test case') || n.includes('scenario')) return <FileText size={24} className="skill-icon-img" />;
    if (n.includes('postman') || n.includes('api testing')) return <Globe size={24} className="skill-icon-img" />;
    if (n.includes('cypress') || n.includes('automation')) return <PlayCircle size={24} className="skill-icon-img" />;
    if (n.includes('jira') || n.includes('bug')) return <Layers size={24} className="skill-icon-img" />;
    if (n.includes('sql') || n.includes('database')) return <Database size={24} className="skill-icon-img" />;
    if (n.includes('stlc') || n.includes('sdlc')) return <CheckSquare size={24} className="skill-icon-img" />;
    if (n.includes('agile') || n.includes('scrum')) return <Layers size={24} className="skill-icon-img" />;

    return <Code2 size={24} className="skill-icon-img" />;
  };

  const getLevelLabel = (level) => {
    const l = level.toLowerCase();
    if (l === 'advanced') return levels.advanced;
    if (l === 'intermediate') return levels.intermediate;
    if (l === 'basic') return levels.basic;
    return level;
  };

  return (
    <section id="skills" className="skills-section container">
      <div className="section-header">
        <h2 className="section-title gradient-text">{text.skills.title}</h2>
        <div className="section-line"></div>
      </div>

      <div className="skills-grid">
        {skillsList.map((skill, index) => (
          <div className="skill-card glass-card animate-fade-in" key={index} style={{ animationDelay: `${index * 50}ms` }}>
            <div className="skill-icon-container">
              {getSkillIcon(skill.name)}
            </div>
            <h3 className="skill-name">{skill.name}</h3>
            <span className={`skill-level ${skill.level.toLowerCase()}`}>
              {getLevelLabel(skill.level)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
