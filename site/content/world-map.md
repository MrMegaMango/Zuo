---
title: "World Map"
url: "/world-map"
summary: "Interactive globe showing places where I've lived and worked around the world"
ShowToc: false
ShowBreadCrumbs: false
ShowPostNavLinks: false
ShowReadingTime: false
ShowShareButtons: false
ShowWordCount: false
---

<div class="world-map-embed">
    <iframe 
        src="/app/world-map" 
        width="100%" 
        height="800px" 
        frameborder="0"
        title="Interactive World Map"
        style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);">
    </iframe>
</div>

<div class="world-map-description">

## 🌍 My Global Journey

This interactive globe showcases the places that have shaped my career and life. From studying at Johns Hopkins and University of Rochester, to building cutting-edge technology at Tesla's Gigafactories in Shanghai and Austin, to developing AI infrastructure in London at Samaya AI.

### Key Locations:

- **🎓 Baltimore, MD** - Johns Hopkins University (MS Information Security)
- **🎓 Rochester, NY** - University of Rochester (BS Electrical & Computer Engineering)  
- **💻 Mountain View, CA** - Atlassian (Software Engineer, Cloud Security)
- **🚗 Shanghai, China** - Tesla Gigafactory (Senior Software Engineer, HV Manufacturing)
- **🚗 Austin, TX** - Tesla Gigafactory (Senior Software Engineer & Team Lead)
- **🤖 London, UK** - Samaya AI (Member of Technical Staff, AI Infrastructure)

Each location represents a chapter in my journey of building scalable systems, leading teams, and delivering technology that impacts millions of users worldwide.

**Pro tip**: Click and drag to rotate the globe, and click on any location marker to learn more about my experience there!

</div>

<style>
.world-map-embed {
    margin: 2rem 0;
    background: var(--entry);
    padding: 20px;
    border-radius: 25px;
    border: 1px solid var(--border);
}

.world-map-description {
    max-width: 800px;
    margin: 3rem auto;
    padding: 2rem;
    background: linear-gradient(145deg, #ffffff, #f8fafc);
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    line-height: 1.7;
}

.world-map-description h2 {
    color: var(--primary);
    margin-bottom: 1.5rem;
}

.world-map-description h3 {
    color: #34495e;
    margin: 2rem 0 1rem 0;
}

.world-map-description ul {
    list-style: none;
    padding-left: 0;
}

.world-map-description li {
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 12px;
    border-left: 4px solid var(--border);
}

.world-map-description strong {
    color: #2c3e50;
}

/* Dark mode styles */
[data-theme="dark"] .world-map-description {
    background: linear-gradient(145deg, #1f2937, #111827);
    color: #e5e7eb;
}

[data-theme="dark"] .world-map-description h2 {
    color: #f9fafb;
}

[data-theme="dark"] .world-map-description h3 {
    color: #f3f4f6;
}

[data-theme="dark"] .world-map-description li {
    background: rgba(255, 255, 255, 0.05);
    color: #e5e7eb;
    border-left-color: rgba(255, 255, 255, 0.2);
}

[data-theme="dark"] .world-map-description strong {
    color: #f9fafb;
}

@media (max-width: 768px) {
    .world-map-embed iframe {
        height: 600px;
    }
    
    .world-map-description {
        margin: 2rem 1rem;
        padding: 1.5rem;
    }
}
</style>