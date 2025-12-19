import React, { useState, useEffect, useRef } from 'react';
import { FaLinkedin, FaGithub, FaWhatsapp, FaPython, FaJs, FaHtml5, FaCss3, FaDatabase, FaReact } from 'react-icons/fa';
import { SiDjango } from 'react-icons/si';

let introRan = false;

const Terminal = ({ onThemeToggle, onOpenProjects, theme }) => {
  const [history, setHistory] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(!introRan); // Inicializar basado en si ya se ejecutó
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Secuencia inicial
  useEffect(() => {
    const introLines = [
      { 
        output: [
          'Bienvenido a mi portafolio terminal!',
          'Explora mis comandos para conocer más sobre mí.'
        ]
      },
      { 
        cmd: 'Quien soy?', 
        output: [
          'Juan Diego Lopez (DevJuan)',
          'Full-stack Junior developer en formación.',
        ]
      },
      { 
        cmd: 'init --interactive', 
        output: [
          'Iniciando sesión interactiva...',
          'Escriba "ayuda" para obtener los comandos disponibles.'
        ]
      }
    ];

    if (introRan) {
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    let mounted = true;

    const runIntro = async () => {
      for (const line of introLines) {
        if (!mounted) return;

        await new Promise(r => setTimeout(r, 500));
        if (!mounted) return;

        // Si hay cmd, lo añadimos
        if (line.cmd) {
          setHistory(prev => [...prev, { type: 'cmd', content: line.cmd }]);
        }

        await new Promise(r => setTimeout(r, 300));
        if (!mounted) return;
        
        for (const outputLine of line.output) {
          setHistory(prev => [...prev, { type: 'output', content: outputLine }]);
        }
      }
      introRan = true;
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    runIntro();
    return () => { mounted = false; };
  }, []);

  // Auto-scroll al final
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd) => {
    let response = [];
    const cleanCmd = cmd.trim().toLowerCase();

    switch(cleanCmd) {
      case 'ayuda':
        response = [
          'Comandos disponibles:',
          '  about     - Información detallada',
          '  projects  - Ver proyectos recientes',
          '  skills    - Ver mis habilidades',
          '  social    - Información de contacto',
          '  clear     - Limpiar terminal',
        ];
        break;
      case 'about':
        response = ['Desarrollador en formación con experiencia práctica en aplicaciones web y bases de datos, utilizando Python con Django, MySQL y tecnologías front-end como HTML, CSS, JavaScript y React. Gestiono proyectos con Git y GitHub, aplico buenas prácticas de desarrollo y estoy preparado para asumir retos reales en mis prácticas empresariales, aportando responsabilidad, aprendizaje rápido y soluciones funcionales para el equipo.'];
        break;
      case 'projects':
        // Abrir el modal de proyectos
        onOpenProjects();
        break;
      case 'skills':
        response = [<span className={`skills-icons ${theme || 'default'}`}><FaPython /> Python | <FaJs /> JavaScript | <FaHtml5 /> HTML | <FaCss3 /> CSS | <FaDatabase /> MySQL | <SiDjango /> Django | <FaReact /> React</span>];
        break;
      case 'social':
        response = [
          <a href="https://www.linkedin.com/in/juan-diego-lopez-carvajal-5079462bb/" target="_blank" rel="noopener noreferrer" key="linkedin" className={`social-link ${theme || 'default'}`}>
            <FaLinkedin /> LinkedIn
          </a>,
          <a href="https://github.com/Juan-Diego22" target="_blank" rel="noopener noreferrer" key="github" className={`social-link ${theme || 'default'}`}>
            <FaGithub /> GitHub
          </a>,
          <a href="https://wa.me/573165441337?text=Hola,%20estoy%20interesado%20en%20tu%20trabajo." target="_blank" rel="noopener noreferrer" key="whatsapp" className={`social-link ${theme || 'default'}`}>
            <FaWhatsapp /> WhatsApp
          </a>
        ];
        break;
      case 'theme':
        onThemeToggle();
        response = ['Theme toggled.'];
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        response = [];
        break;
      default:
        response = [`Comando no encontrado: ${cleanCmd}. Escriba "ayuda" para obtener la lista.`];
    }

    // Agregar comando al historial
    setHistory(prev => [...prev, { type: 'cmd', content: cmd }]);
    
    // Agregar cada línea de respuesta
    if (response.length > 0) {
      response.forEach(line => {
        setHistory(prev => [...prev, { type: 'output', content: line }]);
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    }
  };

  return (
    <>
      <div className="terminal" onClick={() => !isTyping && inputRef.current?.focus()}>
        <div className="terminal-header">
          <div className="terminal-dots">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          <div className="terminal-title">JuanDev@portafolio:~$</div>
        </div>
        
        <div className="terminal-body" ref={scrollRef}>
          {history.map((item, idx) => (
            <div key={idx} className={item.type === 'cmd' ? 'line' : 'output'}>
              {item.type === 'cmd' ? (
                <>
                  <span className="prompt">$</span>
                  <span className="cmd">{item.content}</span>
                </>
              ) : (
                item.content
              )}
            </div>
          ))}

          {!isTyping && (
            <div className="line input-line">
              <span className="prompt">JuanDev@portafolio:~$</span>
              <input 
                ref={inputRef}
                type="text" 
                className="user-input" 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Terminal;