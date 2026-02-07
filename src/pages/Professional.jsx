import React, { useState, useEffect } from "react";
import '../styles/Professional.css';
// import { roadmapData } from "../data/roadmapData.js";

const roadmapData = [
        {
        id: 1,
        period: "Nov 2025 – jan 2026",
        year: "2025",
        title: " full stack intern",
        subtitle: "Xcentic",
        type: "work",
        description:
            "Working with React, and Next.js to build scalable frontend and backend features integrated with MongoDB.",
        highlights: [
            "Design login pages for doctors,admin and labs ",
            "Implemented automated email notifications with Resend API",
            "All designed pages were responsive in multiple diffrent screens",
            "Optimized component rendering and API response efficiency",
        ],
    },

    {
        id: 2,
        period: "2023 – Present",
        year: "2023",
        title: "B.TECH in Computer Science Engineering",
        subtitle: "TCET, SGPA 7.5",
        type: "education",
        description: "Currently pursuing Bachelor's degree with strong academic performance and diverse extracurricular involvement.",
        highlights: [
            "Smart India Hackathon (Top Team)",
            "Research Projects: Deep fake  Detection(Audio,link)",
            "Sports: Swimming & shot-put ",
            "Technical Skills: MERN Stacks, ML, APIs",
            "Leadership: SIH Team Lead, Event management lead(Alumni meet),Hosted republic day in my college",
            "Social Impact: Teaching underprivileged children"
        ]
    },
    {
        id: 3,
        period: "2020 – 2022",
        year: "2020",
        title: "Senior Secondary(12th)",
        type: "education",
        description: "Higher Secondary Certificate, preparing for engineering studies with focus on science and mathematics.",
        highlights: []
    },
    {
        id: 4,
        period: "2010 – 2020",
        year: "2010",
        title: "Schooling (CBSE Board)",
        type: "education",
        description: "Completed foundational education under CBSE curriculum, building strong academic fundamentals.",
        highlights: []
    }
    ];

const Professional = () => {
    const [visibleItems, setVisibleItems] = useState(new Set());
    const [activeFilter, setActiveFilter] = useState('all');

    

    const filteredData = activeFilter === 'all' 
        ? roadmapData 
        : roadmapData.filter(item => item.type === activeFilter);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = parseInt(entry.target.dataset.id);
                        setVisibleItems(prev => new Set([...prev, id]));
                    }
                });
            },
            { threshold: 0.2 }
        );

        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => observer.observe(item));

        return () => observer.disconnect();
    }, [filteredData]);

    const getTypeData = (type) => {
        switch (type) {
            case 'education':
                return {
                    icon: '◆',
                    color: '#ffffff',
                    bgColor: '#2a2a2a'
                };
            case 'work':
                return {
                    icon: '●',
                    color: '#ff4444',
                    bgColor: '#1a1a1a'
                };
            case 'Volunteering':
                return {
                    icon: '▲',
                    color: '#ffaa00',
                    bgColor: '#2a2a2a'
                };
            default:
                return {
                    icon: '◆',
                    color: '#ffffff',
                    bgColor: '#2a2a2a'
                };
        }
    };

    return (
        <div className="professional-container">
            {/* Header Section */}
            <header className="header">
                <div className="header-content">
                    <div className="title-section">
                        <h1 className="main-title">
                            My
                            <span className="title-accent">Experience</span>
                        </h1>
                        <div className="title-line"></div>
                    </div>
                    
                    <div className="subtitle-section">
                        <p className="subtitle">The Journey so far</p>
                        <span className="subtitle-accent">Latest first</span>
                    </div>
                </div>

                {/* Filter Navigation */}
                <nav className="filter-nav">
                    <button 
                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        ALL
                    </button>
                    <button 
                        className={`filter-btn ${activeFilter === 'work' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('work')}
                    >
                        WORK
                    </button>
                    <button 
                        className={`filter-btn ${activeFilter === 'education' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('education')}
                    >
                        EDUCATION
                    </button>
                    <button 
                        className={`filter-btn ${activeFilter === 'Volunteering' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('Volunteering')}
                    >
                        VOLUNTEERING
                    </button>
                </nav>
            </header>

            {/* Timeline Section */}
            <main className="timeline-section">
                <div className="timeline-container">
                    {filteredData.map((item, index) => {
                        const typeData = getTypeData(item.type);
                        const isVisible = visibleItems.has(item.id);
                        
                        return (
                            <article
                                key={item.id}
                                className={`timeline-item ${isVisible ? 'visible' : ''}`}
                                data-id={item.id}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Year Marker */}
                                <div className="year-marker">
                                    <span className="year-text">{item.year}</span>
                                    <div 
                                        className="year-dot"
                                        style={{ 
                                            color: typeData.color,
                                            backgroundColor: typeData.bgColor 
                                        }}
                                    >
                                        {typeData.icon}
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="content-card">
                                    <header className="card-header">
                                        <div className="period-badge">
                                            {item.period}
                                        </div>
                                        <div 
                                            className="type-badge"
                                            style={{ color: typeData.color }}
                                        >
                                            {item.type.toUpperCase()}
                                        </div>
                                    </header>

                                    <div className="card-content">
                                        <h2 className="card-title">{item.title}</h2>
                                        {item.subtitle && (
                                            <h3 
                                                className="card-subtitle"
                                                style={{ color: typeData.color }}
                                            >
                                                {item.subtitle}
                                            </h3>
                                        )}

                                        <p className="card-description">
                                            {item.description}
                                        </p>

                                        {item.highlights.length > 0 && (
                                            <div className="highlights">
                                                <h4 className="highlights-title">Key Achievements</h4>
                                                <ul className="highlights-list">
                                                    {item.highlights.map((highlight, idx) => (
                                                        <li key={idx} className="highlight-item">
                                                            <span 
                                                                className="highlight-marker"
                                                                style={{ backgroundColor: typeData.color }}
                                                            ></span>
                                                            {highlight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Connection Line */}
                                {index < filteredData.length - 1 && (
                                    <div className="connection-line"></div>
                                )}
                            </article>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default Professional;