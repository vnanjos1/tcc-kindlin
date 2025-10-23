import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Brasil Emprego Já</h4>
            <p>Trabalhando juntos por um futuro com oportunidades</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <Link to="/">Início</Link>
            <Link to="/solucoes">Soluções</Link>
            <Link to="/historias">Histórias</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contato">Contato</Link>
          </div>
          
          <div className="footer-section">
            <h4>Recursos</h4>
            <Link to="/cadastro">Cadastrar Currículo</Link>
            <Link to="/contato">Oferecer Vagas</Link>
            <Link to="/solucoes">Capacitação</Link>
            <Link to="/contato">Parcerias</Link>
            <Link to="/login">Área do Candidato</Link>
          </div>
          
          <div className="footer-section">
            <h4>Contato</h4>
            <p>📧 contato@brasilempregaja.org.br</p>
            <p>📞 (11) 4004-1234</p>
            <p>💬 (11) 94004-1234</p>
            <p>🏢 Av. Paulista, 1000 - São Paulo/SP</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Brasil Emprego Já. Todos os direitos reservados.</p>
          <div className="footer-links">
            <Link to="/politica-privacidade">Política de Privacidade</Link>
            <Link to="/termos-uso">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;