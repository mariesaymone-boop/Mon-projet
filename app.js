// ==================== DONNÉES STATIQUES ====================
const projects = [
    {
        title: "Carte du trafic routier de quelques carrefours de la ville de Thiès",
        description: "Visualisation du niveau de trafic routier dans la ville de Thiès.",
        technologies: ["QGIS", "EXCEL", "KOBOTOOLBOX"],
        iconClass: "fa-solid fa-map-location-dot",
        link: "Rapport Sur le trafic routier de la ville de Thiès Groupe 4.pdf",
        category: "Rapport"
    },
    {
        title: "Qualité de l’air, bruit et microclimat à Thiès (2025)",
        description: "Prévisions météo et impacts sur l'imagerie satellite. Données en temps réel.",
        technologies: ["React", "API", "Chart.js"],
        iconClass: "fa-solid fa-cloud-sun-rain",
        link: "rapport-analyse-3.pdf",
        category: "Projet"
    },
    {
        title: "Mon Curriculum Vitae(CV)",
        description: "Ce portfolio que vous visitez actuellement, conçu en pur HTML/CSS.",
        technologies: ["HTML", "CSS"],
        iconClass: "fa-solid fa-laptop-code",
        link: "CV.html",
        category: "web"
    },
    {
        title: "Outil de conversion de coordonnées",
        description: "Convertisseur entre différents systèmes de coordonnées (WGS84, UTM, Lambert).",
        technologies: ["JavaScript", "Python", "Flask"],
        iconClass: "fa-solid fa-calculator",
        link: "carte.html",
        category: "app"
    }
];

const skills = [
    { name: "HTML / CSS", level: 90 },
    { name: "JavaScript", level: 75 },
    { name: "Python", level: 65 },
    { name: "SIG (QGIS, ArcGIS)", level: 80 },
    { name: "Leaflet / Mapbox", level: 70 },
    { name: "Gestion de projet", level: 60 }
];

// ==================== RENDU DYNAMIQUE ====================
document.addEventListener("DOMContentLoaded", () => {
    const projectsGrid = document.getElementById("projects-grid");
    const skillsContainer = document.getElementById("skills-container");

    // Afficher les compétences
    function renderSkills() {
        skillsContainer.innerHTML = skills.map(skill => `
            <div class="skill-item">
                <div class="skill-info">
                    <span>${skill.name}</span>
                    <span>${skill.level}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${skill.level}%;"></div>
                </div>
            </div>
        `).join('');
    }

    // Afficher les projets (filtrés ou non)
    function renderProjects(filter = "all") {
        const filtered = filter === "all" 
            ? projects 
            : projects.filter(p => p.category === filter);
        
        projectsGrid.innerHTML = filtered.map(project => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-icon">
                    <i class="${project.iconClass}"></i>
                </div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="project-link" target="_blank" rel="noopener">
                    Voir le projet <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        `).join('');
    }

    // Initialisation
    renderSkills();
    renderProjects();

    // ==================== FILTRAGE PROJETS ====================
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Mise à jour classe active
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");
            renderProjects(filterValue);
        });
    });

    // ==================== FORMULAIRE DE CONTACT ====================
    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validation
        if (!name || !email || !message) {
            showFormMessage("Tous les champs sont obligatoires.", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage("Veuillez entrer une adresse email valide.", "error");
            return;
        }

        // Simulation d'envoi réussi
        showFormMessage("Merci de m'avoir contacté ! Je vous répondrai dans les plus brefs délais.", "success");
        contactForm.reset(); // Efface les champs
    });

    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        // Disparaît après 5 secondes
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }

    // ==================== THÈME CLAIR/SOMBRE ====================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        // Changer l'icône
        if (body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });

    // ==================== PETITE ANIMATION SUPPLEMENTAIRE (optionnelle) ====================
    // Animation des barres de compétences au défilement (pour le plaisir)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.progress-fill').forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => fill.style.width = width, 100);
                });
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) observer.observe(skillsSection);
});