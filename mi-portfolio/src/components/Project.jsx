import React from 'react';

const ProjectsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const projects = [
    {
      id: 1,
      title: 'Desarrollo Web Responsive: Hotel Eterna Primavera',
      description: 'Diseño y desarrollo completo de una web estática, moderna y totalmente responsive para un hotel ficticio. Enfoque en la usabilidad móvil y la velocidad de carga.',
      tags: ['HTMLS', 'CSS', 'JavaScript'],
      image: '/sitioweb-hotel.png',
      links: {
        code: 'https://github.com/Juan-Diego22/SitioWeb-hotel',
        preview: 'https://juan-diego22.github.io/SitioWeb-hotel/'
      }
    },
    {
      id: 2,
      title: 'Clon de Netflix',
      description: 'Un clon completo de Netflix creado con Django, con autenticación de usuarios, integración de API de películas externas, panel de administración para gestión de contenido y funcionalidad personalizada de "Mi lista".',
      tags: ['Python Django', 'MySQL', 'APIs', 'HTML', 'CSS', 'JavaScript'],
      image: '/ClonNetflix.png',
      links: {
        code: 'https://github.com/Juan-Diego22/NetflixDjango.git',
        preview: null
      }
    },
    {
      id: 3,
      title: 'Dreamer Translator',
      description: 'Dreamer Translator es una aplicación web moderna de traducción de idiomas construida con React y Vite . Diseñada con un enfoque en la experiencia de usuario (UX) y el rendimiento, la aplicación ofrece traducciones instantáneas utilizando la API de MyMemory.',
      tags: ['React', 'API', 'Vite', 'CSS'],
      image: '/DreamerTranslator.png',
      links: {
        code: 'https://github.com/Juan-Diego22/Dreamer.git',
        preview: 'https://dreamer-seven.vercel.app/'
      }
    },
    {
      id: 4,
      title: 'Portafolio Web Personal',
      description: 'Portafolio web personalizado con diseños modernos y animaciones fluidas. Presenta proyectos, habilidades y experiencia de manera atractiva y profesional.',
      tags: ['HTMLS', 'CSS', 'JavaScript'],
      image: '/portafolio.png',
      links: {
        code: 'https://github.com/Juan-Diego22/Portafolio-JuanDiego.git',
        preview: 'https://juan-diego22.github.io/Portafolio-JuanDiego/'
      }
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Header de la ventana */}
        <div className="modal-header">
          <div className="modal-dots">
            <div className="dot red" onClick={onClose}></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          <div className="modal-title">JuanDev@portfolio:~/projects</div>
        </div>

        {/* Cuerpo del modal */}
        <div className="modal-body">
          <div className="projects-header">
            <h2 className="projects-title">
              <span className="icon">{'</>'}</span> Proyectos
            </h2>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                {/* Imagen del proyecto */}
                <div className="project-image">
                  <img src={project.image} alt={project.title} className="project-img" />
                </div>

                {/* Contenido del proyecto */}
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  
                  {/* Tags */}
                  <div className="project-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Descripción */}
                  <p className="project-description">{project.description}</p>

                  {/* Botones */}
                  <div className="project-links">
                    {project.links.code && (
                      <a 
                        href={project.links.code} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-btn btn-code"
                      >
                        <span>{'<>'}</span> Code
                      </a>
                    )}
                    {project.links.preview && (
                      <a 
                        href={project.links.preview} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-btn btn-preview"
                      >
                        <span>🔗</span> Preview
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsModal;