import React from 'react';
import { motion } from 'framer-motion';

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Maria Silva",
      age: 32,
      city: "São Paulo, SP",
      position: "Desenvolvedora Front-end",
      company: "Tech Solutions",
      image: "👩‍💻",
      story: "Após 2 anos desempregada, consegui minha primeira vaga na área de tecnologia através do programa de capacitação.",
      duration: "6 meses de capacitação",
      salary: "R$ 4.200,00",
      tags: ["Mulheres na Tech", "Transição de Carreira"]
    },
    {
      id: 2,
      name: "João Santos",
      age: 45,
      city: "Belo Horizonte, MG",
      position: "Consultor de Vendas",
      company: "Comércio Ativo",
      image: "👨‍💼",
      story: "Perdi meu emprego durante a pandemia e pensei que não conseguiria recolocação. Hoje sou líder de equipe!",
      duration: "3 meses de busca",
      salary: "R$ 3.800,00",
      tags: ["+45 Empregos", "Liderança"]
    },
    {
      id: 3,
      name: "Ana Costa",
      age: 28,
      city: "Porto Alegre, RS",
      position: "Empreendedora",
      company: "Doces da Ana",
      image: "👩‍🍳",
      story: "Com o microcrédito do programa, abri minha própria confeitaria e hoje emprego 3 pessoas.",
      duration: "1 ano de negócio",
      salary: "R$ 5.000,00",
      tags: ["Empreendedorismo", "Microcrédito"]
    },
    {
      id: 4,
      name: "Carlos Lima",
      age: 22,
      city: "Rio de Janeiro, RJ",
      position: "Jovem Aprendiz",
      company: "Banco Nacional",
      image: "👨‍🎓",
      story: "Consegui meu primeiro emprego através do programa Jovem Aprendiz enquanto concluía o ensino médio.",
      duration: "2 anos como aprendiz",
      salary: "R$ 1.800,00",
      tags: ["Primeiro Emprego", "Jovem Aprendiz"]
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="success-stories-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Histórias de Sucesso</h1>
            <p>Inspire-se com brasileiros que transformaram suas vidas através do trabalho</p>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="stats-overview">
        <div className="container">
          <motion.div 
            className="stats-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="stat-card">
              <div className="stat-number">15.247</div>
              <div className="stat-label">Pessoas Empregadas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">94%</div>
              <div className="stat-label">Taxa de Sucesso</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">R$ 3.200</div>
              <div className="stat-label">Salário Médio</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">42</div>
              <div className="stat-label">Dias até a Colocação</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="stories-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Conheça Nossas Histórias
          </motion.h2>
          
          <div className="stories-grid">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                className="story-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="story-header">
                  <div className="story-avatar">
                    <span className="avatar-icon">{story.image}</span>
                  </div>
                  <div className="story-person">
                    <h3>{story.name}</h3>
                    <p>{story.age} anos • {story.city}</p>
                  </div>
                </div>
                
                <div className="story-content">
                  <p>"{story.story}"</p>
                </div>
                
                <div className="story-details">
                  <div className="detail-item">
                    <strong>Cargo:</strong>
                    <span>{story.position}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Empresa:</strong>
                    <span>{story.company}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Salário:</strong>
                    <span className="salary">{story.salary}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Duração:</strong>
                    <span>{story.duration}</span>
                  </div>
                </div>
                
                <div className="story-tags">
                  {story.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Sua História Pode Ser a Próxima!</h2>
            <p>Junte-se a milhares de brasileiros que transformaram suas vidas através do trabalho</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-large">Quero Fazer Parte</button>
              <button className="btn btn-outline btn-large">Ver Vagas Disponíveis</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;