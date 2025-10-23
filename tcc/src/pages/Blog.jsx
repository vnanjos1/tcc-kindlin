import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos os Artigos' },
    { id: 'mercado', name: 'Mercado de Trabalho' },
    { id: 'capacitacao', name: 'Capacitação' },
    { id: 'empreendedorismo', name: 'Empreendedorismo' },
    { id: 'entrevistas', name: 'Entrevistas' }
  ];

  const articles = [
    {
      id: 1,
      title: "As 10 Profissões Mais Promissoras para 2024",
      excerpt: "Descubra quais carreiras estão em alta e como se preparar para as oportunidades do futuro.",
      category: "mercado",
      author: "Carlos Eduardo",
      date: "15 Jan 2024",
      readTime: "5 min de leitura",
      image: "📈",
      featured: true
    },
    {
      id: 2,
      title: "Como se Preparar para uma Entrevista de Emprego",
      excerpt: "Dicas práticas para se destacar no processo seletivo e conquistar a vaga dos sonhos.",
      category: "capacitacao",
      author: "Ana Paula",
      date: "12 Jan 2024",
      readTime: "4 min de leitura",
      image: "💼",
      featured: false
    },
    {
      id: 3,
      title: "Microcrédito: O Caminho para o Seu Próprio Negócio",
      excerpt: "Conheça os programas de financiamento disponíveis para empreendedores.",
      category: "empreendedorismo",
      author: "Roberto Alves",
      date: "10 Jan 2024",
      readTime: "6 min de leitura",
      image: "💰",
      featured: true
    },
    {
      id: 4,
      title: "Entrevista: Da Desistência ao Sucesso Profissional",
      excerpt: "História inspiradora de quem quase desistiu, mas encontrou a oportunidade certa.",
      category: "entrevistas",
      author: "Mariana Costa",
      date: "8 Jan 2024",
      readTime: "8 min de leitura",
      image: "🎤",
      featured: false
    },
    {
      id: 5,
      title: "Cursos Gratuitos com Certificação Reconhecida",
      excerpt: "Lista atualizada de capacitações gratuitas para impulsionar sua carreira.",
      category: "capacitacao",
      author: "Tech Educ",
      date: "5 Jan 2024",
      readTime: "3 min de leitura",
      image: "🎓",
      featured: false
    },
    {
      id: 6,
      title: "Trabalho Remoto: Como se Adaptar ao Novo Normal",
      excerpt: "Estratégias para manter a produtividade e equilíbrio no home office.",
      category: "mercado",
      author: "Digital Works",
      date: "3 Jan 2024",
      readTime: "7 min de leitura",
      image: "🏠",
      featured: false
    }
  ];

  const filteredArticles = activeCategory === 'todos' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Blog & Notícias</h1>
            <p>Fique por dentro das novidades, dicas e oportunidades do mercado de trabalho</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="featured-articles">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Destaques
          </motion.h2>
          
          <div className="featured-grid">
            {articles.filter(article => article.featured).map((article, index) => (
              <motion.article
                key={article.id}
                className="featured-article-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="article-image">
                  <span className="image-icon">{article.image}</span>
                </div>
                <div className="article-content">
                  <span className="article-category">{categories.find(cat => cat.id === article.category)?.name}</span>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="article-meta">
                    <span>Por {article.author}</span>
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <button className="btn btn-primary">Ler Artigo</button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories and Articles Grid */}
      <section className="articles-section">
        <div className="container">
          <div className="categories-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="articles-grid">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                className="article-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="article-header">
                  <span className="article-icon">{article.image}</span>
                  <span className="article-category">{categories.find(cat => cat.id === article.category)?.name}</span>
                </div>
                <div className="article-body">
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                </div>
                <div className="article-footer">
                  <div className="article-meta">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <button className="btn btn-outline">Ler Mais</button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <motion.div
            className="newsletter-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Receba Novidades no Seu E-mail</h2>
            <p>Fique por dentro das melhores oportunidades e conteúdos exclusivos</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail"
                className="newsletter-input"
              />
              <button className="btn btn-primary">Assinar Newsletter</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;