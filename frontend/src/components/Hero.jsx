import React from 'react';
import { Terminal, ShieldCheck, Code2, Cpu, CheckCircle2, Play, Bug, FileSpreadsheet } from 'lucide-react';

export default function Hero({ mode, setMode, text }) {
  const isFrontend = mode === 'frontend';

  return (
    <section className="hero-section container">
      <div className="hero-content animate-fade-in">
        <span className="hero-greeting">{text.greeting}</span>
        <h1 className="hero-name gradient-text">{text.name}</h1>
        <h2 className="hero-title">
          {isFrontend ? text.titleFrontend : text.titleTester}
        </h2>
        <p className="hero-subtitle">
          {isFrontend ? text.subtitleFrontend : text.subtitleTester}
        </p>

        {/* Mode Switcher Toggle */}
        <div className="mode-toggle-wrapper">
          <div className="mode-toggle-container">
            <button
              onClick={() => setMode('frontend')}
              className={`mode-toggle-btn ${isFrontend ? 'active' : ''}`}
            >
              <Code2 size={16} />
              <span>{text.toggleFrontend}</span>
            </button>
            <button
              onClick={() => setMode('tester')}
              className={`mode-toggle-btn ${!isFrontend ? 'active' : ''}`}
            >
              <ShieldCheck size={16} />
              <span>{text.toggleTester}</span>
            </button>
            <div
              className="mode-toggle-slider"
              style={{
                left: isFrontend ? '4px' : 'calc(50% - 2px)',
                width: 'calc(50% - 2px)',
              }}
            />
          </div>
        </div>

        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            {isFrontend ? 'Liên hệ với mình' : 'Get in touch'}
          </a>
          <a href="#projects" className="btn-secondary">
            {isFrontend ? 'Xem sản phẩm' : 'View test suites'}
          </a>
        </div>
      </div>

      {/* Dynamic Visual Mockup (Code Editor vs QA Dashboard) */}
      <div className="hero-visual animate-fade-in">
        <div className="mockup-container glass-card">
          {isFrontend ? (
            /* Frontend Mock: Code Editor */
            <div className="code-editor-mock">
              <div className="mock-window-header">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
                <span className="window-title">App.jsx - React</span>
              </div>
              <div className="mock-code-body">
                <pre>
                  <code>
                    <span className="keyword">import</span> React, &#123; useState &#125; <span className="keyword">from</span> <span className="string">'react'</span>;<br />
                    <span className="keyword">import</span> &#123; Button &#125; <span className="keyword">from</span> <span className="string">'./components/ui'</span>;<br /><br />
                    <span className="keyword">function</span> <span className="function">PortfolioApp</span>() &#123;<br />
                    &nbsp;&nbsp;<span className="keyword">const</span> [role, setRole] = <span className="function">useState</span>(<span className="string">'Frontend'</span>);<br /><br />
                    &nbsp;&nbsp;<span className="keyword">return</span> (<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">div</span> <span className="attr">className</span>=<span className="string">"portfolio-container"</span>&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">HeroSection</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="attr">title</span>=<span className="string">"Tran Minh Phuong"</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="attr">skills</span>=&#123;['React', 'JS', 'CSS']&#125;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">Button</span> <span className="attr">onClick</span>=&#123;() =&gt; <span className="function">console</span>.<span className="function">log</span>(<span className="string">'Hi!'</span>)&#125;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hire Me<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="tag">Button</span>&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="tag">div</span>&gt;<br />
                    &nbsp;&nbsp;);<br />
                    &#125;<br /><br />
                    <span className="keyword">export default</span> <span className="function">PortfolioApp</span>;
                  </code>
                </pre>
              </div>
            </div>
          ) : (
            /* Tester Mock: QA / Test Execution Dashboard */
            <div className="qa-dashboard-mock">
              <div className="mock-window-header">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
                <span className="window-title">Cypress Test Runner</span>
              </div>
              <div className="mock-qa-body">
                <div className="qa-stats">
                  <div className="qa-stat-item">
                    <span className="stat-label">Passed</span>
                    <span className="stat-val text-green">148</span>
                  </div>
                  <div className="qa-stat-item">
                    <span className="stat-label">Failed</span>
                    <span className="stat-val text-red">2</span>
                  </div>
                  <div className="qa-stat-item">
                    <span className="stat-label">Duration</span>
                    <span className="stat-val">48.2s</span>
                  </div>
                </div>

                <div className="qa-progress-circle-wrap">
                  <div className="qa-circle-progress">
                    <div className="qa-circle-inner">
                      <span className="success-percentage">98.6%</span>
                      <span className="success-sub">Passed</span>
                    </div>
                  </div>
                </div>

                <div className="qa-terminal-logs">
                  <div className="log-line success">
                    <CheckCircle2 size={12} className="log-icon" />
                    <span>✓ Integration: Login functionality (4.2s)</span>
                  </div>
                  <div className="log-line success">
                    <CheckCircle2 size={12} className="log-icon" />
                    <span>✓ UI: Responsive Navbar & Drawer toggles (12.8s)</span>
                  </div>
                  <div className="log-line success">
                    <CheckCircle2 size={12} className="log-icon" />
                    <span>✓ API: GET /api/v1/events - Validate Response Scheme (3.5s)</span>
                  </div>
                  <div className="log-line fail">
                    <Bug size={12} className="log-icon" />
                    <span>✗ API: POST /api/v1/booking/ticket - Ticket stock race-condition (0.8s)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
