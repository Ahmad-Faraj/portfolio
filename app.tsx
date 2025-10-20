import React, { useState } from 'react'

export default function Portfolio() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        element?.scrollIntoView({ behavior: 'smooth' })
        setMobileMenuOpen(false)
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fafafa' }}>
            {/* Navigation */}
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: '#1a1a1a',
                color: 'white',
                padding: '16px 24px',
                zIndex: 100,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.5px' }}>
                    Ahmed Faraj
                </div>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    {['about', 'projects', 'achievements', 'volunteer', 'cv'].map(item => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                textTransform: 'capitalize',
                                padding: '8px 0',
                                transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.opacity = '0.7' }}
                            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.opacity = '1' }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Main Content */}
            <main style={{ flex: 1, paddingTop: '72px' }}>
                {/* About Section */}
                <section id="about" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
                        <img
                            src="/pfp.jpg"
                            alt="Ahmed Faraj"
                            style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '12px',
                                objectFit: 'cover',
                                flexShrink: 0,
                                border: '1px solid rgb(0, 0, 0)'
                            }}
                        />

                        <div>
                            <h1 style={{ fontSize: '36px', margin: '0 0 12px 0', fontWeight: 700 }}>
                                Ahmed Faraj
                            </h1>
                            <p style={{ fontSize: '18px', color: '#666', margin: '0 0 20px 0' }}>
                                Software Engineer | Backend & DevOps | Open Source Contributor
                            </p>
                            <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.6', marginBottom: '20px' }}>
                                Third-year Computer Science student at Suez Canal University with expertise in backend development, DevOps, and competitive programming. ACPC finalist with 3000+ algorithmic problems solved.
                            </p>
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <a
                                    href="https://linkedin.com/in/ahmed-faraj-cs"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#1a1a1a',
                                        color: 'white',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#333' }}
                                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#1a1a1a' }}
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href="https://github.com/Ahmad-Faraj"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#1a1a1a',
                                        color: 'white',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#333' }}
                                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#1a1a1a' }}
                                >
                                    GitHub
                                </a>
                                <a
                                    href="https://gitlab.com/Ahmad-Faraj"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#1a1a1a',
                                        color: 'white',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#333' }}
                                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#1a1a1a' }}
                                >
                                    GitLab
                                </a>
                                <a
                                    href="https://codeforces.com/profile/Ahmed_Faraj"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#1a1a1a',
                                        color: 'white',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#333' }}
                                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#1a1a1a' }}
                                >
                                    Codeforces
                                </a>
                                <a
                                    href="https://leetcode.com/u/Ahmed_Faraj/"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#1a1a1a',
                                        color: 'white',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#333' }}
                                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#1a1a1a' }}
                                >
                                    LeetCode
                                </a>
                                <a
                                    href="https://www.kaggle.com/ahmadfrag"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#1a1a1a',
                                        color: 'white',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#333' }}
                                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#1a1a1a' }}
                                >
                                    Kaggle
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" style={{ padding: '80px 24px', backgroundColor: 'white' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '40px' }}>Projects</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                            {[
                                {
                                    title: 'Microservices',
                                    description: 'Developing a scalable distributed backend system with clean architecture and microservices design',
                                    tech: ['GO', 'Kubernetes'],
                                    repo: 'https://github.com/Ahmad-Faraj/microservices',
                                    image: '/micro.png'
                                },
                                {
                                    title: 'Mini Agent',
                                    description: 'AI agent with FastAPI backend and Next.js frontend for LLM-based chat and log analysis',
                                    tech: ['Next.js', 'FastAPI', 'Postgres', 'Docker'],
                                    repo: 'https://github.com/Ahmad-Faraj/mini-agent',
                                    image: '/ai.png'
                                },
                                {
                                    title: 'Student Management System',
                                    description: 'RESTful API to manage student records with MVC architecture and MongoDB',
                                    tech: ['Node.js', 'Express', 'MongoDB'],
                                    repo: 'https://github.com/Ahmad-Faraj/student-doctor-api',
                                    image: '/std.jpg'
                                },
                                {
                                    title: 'ML Code Analyzer',
                                    description: 'Static analysis tool for ML code quality and performance optimization detection',
                                    tech: ['Python', 'AST', 'Machine Learning'],
                                    repo: 'https://github.com/Ahmad-Faraj/ml-code-analyzer',
                                    image: '/ml.png'
                                },
                                {
                                    title: 'Jack OS',
                                    description: 'Operating system for a 16-bit Hack CPU with file I/O and system calls',
                                    tech: ['HDL', 'Jack', 'VM'],
                                    repo: 'https://github.com/Ahmad-Faraj/jack-os',
                                    image: '/nand2tetris.png'
                                },
                                {
                                    title: 'Lox Interpreter',
                                    description: 'Recursive-descent interpreter on the JVM with lexical scoping and closures',
                                    tech: ['Java', 'JVM', 'Make'],
                                    repo: 'https://github.com/Ahmad-Faraj/jlox',
                                    image: '/lox.png'
                                }
                            ].map((project, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        padding: '24px',
                                        backgroundColor: '#fafafa',
                                        transition: 'all 0.3s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#000'
                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = '#e0e0e0'
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                >
                                    <div style={{ width: '100%', height: '160px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white', marginBottom: '12px', border: '1px solid #eaeaea' }}>
                                        <img src={project.image} alt={`${project.title} cover`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                    </div>
                                    <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 600 }}>
                                        {project.title}
                                    </h3>
                                    <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                                        {project.description}
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                                        {project.tech.map(t => (
                                            <span
                                                key={t}
                                                style={{
                                                    fontSize: '12px',
                                                    backgroundColor: '#e8e8e8',
                                                    padding: '4px 12px',
                                                    borderRadius: '12px',
                                                    color: '#333'
                                                }}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <a
                                        href={project.repo}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ color: '#0066cc', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}
                                    >
                                        View Repository →
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Achievements Section */}
                <section id="achievements" style={{ padding: '80px 24px' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '40px' }}>Achievements</h2>

                        {/* Competitive Programming */}
                        <div style={{ marginBottom: '60px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: '#333' }}>
                                Competitive Programming
                            </h3>
                            <div style={{ display: 'grid', gap: '16px' }}>
                                {[
                                    { title: 'ACPC Finalist', desc: 'Ranked 59th in ECPC and 1st in university', date: 'Aug 2025', link: 'https://icpc.global/ICPCID/XRR2FB1ZXTL5' },
                                    { title: 'IOPC', desc: 'Ranked 77th out of 435 participants', date: 'May 2025', link: 'https://drive.google.com/file/d/1CiBir-tP2x3pdtl4VqHxg-ABw2l8cR-P/view?usp=drive_link' },
                                    { title: 'Meta Hacker Cup', desc: 'Advanced to Round 2 (Top 4,732/22,494)', date: 'Oct 2024', link: 'https://www.facebook.com/codingcompetitions/hacker-cup/2024/certificate/3769267336631460' },
                                    { title: 'IEEEXtreme', desc: '524th rank out of 8,385 teams worldwide', date: 'Oct 2025' },
                                    { title: 'Hacktoberfest', desc: 'Ranked in top 10,000 and earned Super Contributor', date: 'Oct 2025', link: 'https://www.holopin.io/@ahmadfaraj' },
                                    { title: 'Codeforces & LeetCode', desc: 'Codeforces 1600+ (Egypt Top 1%), LeetCode 1900+ (Global Top 3%), 3000+ problems solved', date: '' }
                                ].map((ach, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            padding: '16px',
                                            backgroundColor: 'white',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600 }}>
                                                    {ach.title}
                                                </h4>
                                                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                                                    {ach.desc}
                                                </p>
                                                {ach.link && (
                                                    <a href={ach.link} target="_blank" rel="noreferrer" style={{ color: '#0066cc', textDecoration: 'none', fontSize: '13px', marginTop: '8px', display: 'inline-block' }}>
                                                        View Certificate →
                                                    </a>
                                                )}
                                            </div>
                                            {ach.date && <span style={{ color: '#999', fontSize: '13px', whiteSpace: 'nowrap', marginLeft: '16px' }}>{ach.date}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Open Source Contributions */}
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: '#333' }}>
                                Open Source Contributions
                            </h3>
                            <div style={{ display: 'grid', gap: '16px' }}>
                                {[
                                    { title: 'GitLab Development Kit', desc: 'Eliminated false port conflicts from Nginx/Zoekt processes', mr: '#5345' },
                                    { title: 'GitLab Development Kit', desc: 'Added TTY prompt to protect backups and logs in CI workflows', mr: '#5291' },
                                    { title: 'GitLab Development Kit', desc: 'Fixed TTY tests to prevent CI/CD blocking', mr: '#5298' },
                                    { title: 'GitLab', desc: 'Refactored cURL commands to multi-line REST API format', mr: '#207789' },
                                    { title: 'GitLab', desc: 'Updated ChatOps deployment image alt text for accessibility', mr: '#207557' }
                                ].map((contrib, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            padding: '16px',
                                            backgroundColor: 'white',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600 }}>
                                            {contrib.title}
                                        </h4>
                                        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
                                            {contrib.desc}
                                        </p>
                                        <a href={`https://gitlab.com/gitlab-org/${contrib.title.includes('Development') ? 'gitlab-development-kit' : 'gitlab'}/-/merge_requests/${contrib.mr.replace('#', '')}`} target="_blank" rel="noreferrer" style={{ color: '#0066cc', textDecoration: 'none', fontSize: '13px' }}>
                                            Merge Request {contrib.mr} →
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Volunteer Section */}
                <section id="volunteer" style={{ padding: '80px 24px', backgroundColor: 'white' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '40px' }}></h2>
                        <div style={{ display: 'grid', gap: '16px' }}>
                            {[
                                {
                                    title: 'ICPC SCU',
                                    role: 'Vice Head of IT / Problem Setter',
                                    period: 'Jun 2024 - Present',
                                    desc: 'Mentored 500+ trainees in DSA & problem-solving. Created and tested 150+ problems for ECPC/internal contests.'
                                },
                                {
                                    title: 'Google Developer Group',
                                    role: 'IT Specialist',
                                    period: 'Feb 2025 - Aug 2025',
                                    desc: 'Instructed 100+ students in CS concepts applying critical thinking, leadership, communication, and teamwork.'
                                }
                            ].map((org, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '20px',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '17px', fontWeight: 600 }}>
                                        {org.title}
                                    </h3>
                                    <p style={{ margin: '4px 0 8px 0', color: '#666', fontSize: '14px' }}>
                                        {org.role} • {org.period}
                                    </p>
                                    <p style={{ margin: 0, color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
                                        {org.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CV Section */}
                <section id="cv" style={{ padding: '80px 24px' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '20px' }}>Curriculum Vitae</h2>
                        <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                            Experienced software engineer with expertise in backend development, DevOps, competitive programming, and open-source contributions.
                            Strong foundation in data structures, algorithms, and system design with proven ability to deliver scalable solutions.
                        </p>
                        <a
                            href="/cv.pdf"
                            style={{
                                display: 'inline-block',
                                padding: '12px 28px',
                                backgroundColor: '#000',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '6px',
                                fontWeight: 500,
                                fontSize: '14px',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#333' }}
                            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = '#000' }}
                        >
                            Download CV (PDF)
                        </a>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer style={{
                backgroundColor: '#1a1a1a',
                color: 'white',
                padding: '40px 24px',
                marginTop: '80px'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', marginBottom: '32px' }}>
                        <div>
                            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Quote</h4>
                            <p style={{ margin: 0, color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>
                                'What I cannot build. I do not understand.' — Richard Feynman
                            </p>
                        </div>
                        <div>
                            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Links</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <a href="mailto:ahmed.faraj.cs@gmail.com" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = '#fff' }} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = '#aaa' }}>
                                    Email
                                </a>
                                <a href="https://x.com/ahmed__faraj" target="_blank" rel="noreferrer" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = '#fff' }} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = '#aaa' }}>
                                    X (Twitter)
                                </a>
                                <a href="https://discord.com/users/ahmed_faraj" target="_blank" rel="noreferrer" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = '#fff' }} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = '#aaa' }}>
                                    Discord
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Location</h4>
                            <p style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>
                                <a href="https://www.google.com/maps/place/Faculty+of+Computers+and+Information+-+Suez+Canal+University/@30.6215224,32.2682716,18.5z/data=!4m5!3m4!1s0x0:0x271d4ffdf2fb0795!8m2!3d30.6211514!4d32.2684014?shorturl=1" target="_blank" rel="noreferrer" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = '#fff' }} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = '#aaa' }}>
                                    Ismailia, Egypt
                                </a>
                            </p>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid #333', paddingTop: '24px', textAlign: 'center', color: '#666', fontSize: '13px' }}>
                        <p style={{ margin: 0 }}>© 2025 Ahmed Faraj. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}