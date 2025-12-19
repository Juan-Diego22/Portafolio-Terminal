import React, { useState, useEffect } from 'react';
import './index.css'; // Asegúrate de importar el CSS
import MatrixBackground from './components/MatrixBackground';
import Terminal from './components/Terminal';
import ProjectsModal from './components/Project';
import './Project.css';

function App() {
  const [theme, setTheme] = useState('gold'); // 'gold' or 'matrix'

  const toggleTheme = () => {
    setTheme(prev => prev === 'gold' ? 'matrix' : 'gold');
  };

  const [showProjectsModal, setShowProjectsModal] = useState(false); 

  const handleOpenProjects = () => {
    setShowProjectsModal(true);
  };

  // Efecto para aplicar el tema al body (para que el CSS global funcione)
  useEffect(() => {
    if (theme === 'matrix') {
      document.body.setAttribute('data-theme', 'matrix');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [theme]);

  return (
    <>
      <MatrixBackground />
      
      <div className="container">
        <button className="theme-toggle" onClick={toggleTheme}>
         CAMBIAR TEMA {theme === 'gold' ? 'MATRIX' : 'GOLD'}
        </button>

        <header className="header">
          <div className="header-content">
            <img src="/matrix.png" alt="Juan Diego Lopez" className="profile-photo" />
            <div className="header-text">
              <h1>Juan Diego Lopez</h1>
              <p>Full Stack Junior Developer</p>
            </div>
          </div>
        </header>

        <Terminal theme={theme} onThemeToggle={toggleTheme} onOpenProjects={handleOpenProjects}/>

        <div className="social-links">
          <a href="https://discord.gg/zencode" className="social-link" target="_blank" rel="noreferrer">Discord</a>
          <a href="#" className="social-link">GitHub</a>
          <a href="#" className="social-link">Email</a>
        </div>
      </div>
      
      {/* Modal de proyectos */}
      <ProjectsModal 
        isOpen={showProjectsModal} 
        onClose={() => setShowProjectsModal(false)} 
      />
    </>
  );
}

export default App;