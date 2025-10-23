import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.h1 variants={fadeInUp}>
              Unidos pelo <span className="highlight">Emprego</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="hero-subtitle">
              Conectamos talentos a oportunidades, capacitamos profissionais e 
              construímos pontes para um futuro com mais empregos no Brasil.
            </motion.p>
            <motion.div variants={fadeInUp} className="hero-actions">
              <Link to="/contato" className="btn btn-primary btn-large">
                Quero me Capacitar
              </Link>
              <Link to="/contato" className="btn btn-secondary btn-large">
                Oferecer Vagas
              </Link>
              <Link to="/contato" className="btn btn-outline btn-large">
                Apoiar o Projeto
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div 
            className="stats-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="stat-item">
              <h3>50.000+</h3>
              <p>Pessoas capacitadas</p>
            </div>
            <div className="stat-item">
              <h3>15.000+</h3>
              <p>Empregos gerados</p>
            </div>
            <div className="stat-item">
              <h3>2.000+</h3>
              <p>Empresas parceiras</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Cidades atendidas</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <motion.div 
            className="mission-content"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Nossa Missão</h2>
            <p>
              O Brasil Emprego Já nasceu da necessidade urgente de combater o desemprego 
              estrutural no país. Atuamos em múltiplas frentes para criar um ecossistema 
              de oportunidades que beneficia trabalhadores, empresas e a sociedade como um todo.
            </p>
            <div className="mission-pillars">
              <div className="pillar">
                <div className="pillar-icon">🎯</div>
                <h4>Capacitação</h4>
                <p>Preparação profissional alinhada às demandas do mercado</p>
              </div>
              <div className="pillar">
                <div className="pillar-icon">🤝</div>
                <h4>Conexão</h4>
                <p>Ligação direta entre talentos e oportunidades</p>
              </div>
              <div className="pillar">
                <div className="pillar-icon">💼</div>
                <h4>Oportunidade</h4>
                <p>Criação de novas vagas e incentivo ao empreendedorismo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Como Podemos Ajudar Você?
          </motion.h2>
          <div className="actions-grid">
            <motion.div 
              className="action-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="action-icon">📚</div>
              <h3>Buscar Capacitação</h3>
              <p>Cursos gratuitos e programas de qualificação profissional</p>
              <Link to="/solucoes" className="btn btn-primary">Explorar</Link>
            </motion.div>

            <motion.div 
              className="action-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="action-icon">💼</div>
              <h3>Encontrar Vagas</h3>
              <p>Acesso a oportunidades de emprego em todo o Brasil</p>
              <Link to="/contato" className="btn btn-primary">Buscar Vagas</Link>
            </motion.div>

            <motion.div 
              className="action-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="action-icon">🏢</div>
              <h3>Para Empresas</h3>
              <p>Cadastre vagas e encontre os melhores talentos</p>
              <Link to="/contato" className="btn btn-primary">Oferecer Vagas</Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;