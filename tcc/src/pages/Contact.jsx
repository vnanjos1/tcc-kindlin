import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('candidato');

  const tabs = [
    { id: 'candidato', label: 'Sou Candidato', icon: '👤' },
    { id: 'empresa', label: 'Sou Empresa', icon: '🏢' },
    { id: 'parceiro', label: 'Quero Ser Parceiro', icon: '🤝' }
  ];

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    estado: '',
    interesse: '',
    mensagem: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cadastro realizado com sucesso! Entraremos em contato em breve.');
    // Aqui você integraria com a API
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Contato & Cadastro</h1>
            <p>Junte-se à nossa rede e transforme sua trajetória profissional</p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="tabs-section">
        <div className="container">
          <motion.div
            className="tabs-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Como Você Quer Participar?</h2>
            <p>Escolha seu perfil e preencha o formulário</p>
            
            <div className="tabs-navigation">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            className="form-section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="form-container">
              <div className="form-header">
                <h3>
                  {activeTab === 'candidato' && 'Cadastro de Candidato'}
                  {activeTab === 'empresa' && 'Cadastro de Empresa'}
                  {activeTab === 'parceiro' && 'Cadastro de Parceiro'}
                </h3>
                <p>
                  {activeTab === 'candidato' && 'Encontre as melhores oportunidades para sua carreira'}
                  {activeTab === 'empresa' && 'Encontre os talentos ideais para sua empresa'}
                  {activeTab === 'parceiro' && 'Junte-se a nós na missão de combater o desemprego'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="nome">Nome Completo *</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">E-mail *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="telefone">Telefone *</label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cidade">Cidade *</label>
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="estado">Estado *</label>
                    <select
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione seu estado</option>
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="PR">Paraná</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="BA">Bahia</option>
                      <option value="DF">Distrito Federal</option>
                      {/* Adicione todos os estados */}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="interesse">
                      {activeTab === 'candidato' && 'Área de Interesse *'}
                      {activeTab === 'empresa' && 'Setor da Empresa *'}
                      {activeTab === 'parceiro' && 'Tipo de Parceria *'}
                    </label>
                    <select
                      id="interesse"
                      name="interesse"
                      value={formData.interesse}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione uma opção</option>
                      {activeTab === 'candidato' && (
                        <>
                          <option value="tecnologia">Tecnologia</option>
                          <option value="vendas">Vendas</option>
                          <option value="administrativo">Administrativo</option>
                          <option value="saude">Saúde</option>
                          <option value="educacao">Educação</option>
                        </>
                      )}
                      {activeTab === 'empresa' && (
                        <>
                          <option value="tecnologia">Tecnologia</option>
                          <option value="comercio">Comércio</option>
                          <option value="servicos">Serviços</option>
                          <option value="industria">Indústria</option>
                          <option value="varejo">Varejo</option>
                        </>
                      )}
                      {activeTab === 'parceiro' && (
                        <>
                          <option value="capacitacao">Capacitação</option>
                          <option value="mentoria">Mentoria</option>
                          <option value="financiamento">Financiamento</option>
                          <option value="voluntariado">Voluntariado</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="mensagem">
                    {activeTab === 'candidato' && 'Conte um pouco sobre sua experiência e objetivos *'}
                    {activeTab === 'empresa' && 'Conte sobre sua empresa e necessidades *'}
                    {activeTab === 'parceiro' && 'Como você gostaria de contribuir? *'}
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows="5"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-large">
                    {activeTab === 'candidato' && 'Cadastrar Currículo'}
                    {activeTab === 'empresa' && 'Cadastrar Empresa'}
                    {activeTab === 'parceiro' && 'Enviar Proposta'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info-section">
        <div className="container">
          <motion.div
            className="contact-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>E-mail</h3>
              <p>contato@brasilempregaja.org.br</p>
              <span>Respondemos em até 24h</span>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Telefone</h3>
              <p>(11) 4004-1234</p>
              <span>Segunda a sexta, 8h às 18h</span>
            </div>

            <div className="contact-card">
              <div className="contact-icon">💬</div>
              <h3>WhatsApp</h3>
              <p>(11) 94004-1234</p>
              <span>Atendimento rápido</span>
            </div>

            <div className="contact-card">
              <div className="contact-icon">🏢</div>
              <h3>Escritório</h3>
              <p>Av. Paulista, 1000</p>
              <span>São Paulo - SP</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;