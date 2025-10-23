import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/authService.js';

const initialFormState = {
  // Dados pessoais
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  dataNascimento: '',

  // Endereço
  cep: '',
  endereco: '',
  numero: '',
  complemento: '',
  cidade: '',
  estado: '',

  // Profissional
  areaInteresse: '',
  experiencia: '',
  escolaridade: '',
  habilidades: '',

  // Conta
  password: '',
  confirmPassword: ''
};

const Cadastro = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({ loading: false, error: null, success: null });

  const userTypes = [
    {
      id: 'candidato',
      title: 'Busco Oportunidades',
      description: 'Encontre vagas, cursos e desenvolva sua carreira',
      icon: '👤',
      features: ['Vagas exclusivas', 'Capacitação gratuita', 'Mentoria profissional']
    },
    {
      id: 'empresa',
      title: 'Contrato Talentos',
      description: 'Encontre os profissionais ideais para sua empresa',
      icon: '🏢',
      features: ['Banco de talentos', 'Match inteligente', 'Processo simplificado']
    },
    {
      id: 'parceiro',
      title: 'Quero Apoiar',
      description: 'Junte-se a nós na missão de combater o desemprego',
      icon: '🤝',
      features: ['Voluntariado', 'Parcerias', 'Projetos sociais']
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setStatus({ loading: false, error: null, success: null });
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: null });

    if (!userType) {
      setStatus({ loading: false, error: 'Selecione como deseja participar antes de continuar.', success: null });
      setStep(1);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatus({ loading: false, error: 'As senhas informadas não são iguais.', success: null });
      return;
    }

    try {
      const response = await registerUser({
        userType,
        ...formData,
        email: formData.email.trim()
      });

      setStatus({
        loading: false,
        error: null,
        success: response?.message || 'Cadastro realizado com sucesso! Agora você já pode fazer login.'
      });
      setFormData(initialFormState);
      setUserType('');
      setStep(1);
    } catch (error) {
      setStatus({
        loading: false,
        error: error instanceof Error ? error.message : 'Falha ao realizar cadastro.',
        success: null
      });
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <motion.div
          className="cadastro-card"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="cadastro-header">
            <Link to="/" className="logo">
              <h2>Brasil Emprego Já</h2>
            </Link>

            <div className="progress-steps">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <span>1</span>
                <span>Perfil</span>
              </div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <span>2</span>
                <span>Dados</span>
              </div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <span>3</span>
                <span>Conta</span>
              </div>
            </div>
          </div>

          {status.error && <div className="form-feedback error">{status.error}</div>}
          {status.success && <div className="form-feedback success">{status.success}</div>}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="step-header">
                <h1>Como Você Quer Participar?</h1>
                <p>Escolha o tipo de perfil que melhor se encaixa com você</p>
              </div>

              <div className="user-types-grid">
                {userTypes.map((type) => (
                  <motion.div
                    key={type.id}
                    className={`user-type-card ${userType === type.id ? 'selected' : ''}`}
                    onClick={() => handleUserTypeSelect(type.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="type-icon">{type.icon}</div>
                    <h3>{type.title}</h3>
                    <p>{type.description}</p>
                    <ul className="type-features">
                      {type.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <div className="select-indicator">
                      {userType === type.id ? '✓ Selecionado' : 'Selecionar'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="step-header">
                <h1>Seus Dados Pessoais</h1>
                <p>Preencha suas informações básicas</p>
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setStatus((prev) => ({ ...prev, error: null, success: null }));
                  setStep(3);
                }}
                className="cadastro-form"
              >
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
                    <label htmlFor="cpf">CPF *</label>
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dataNascimento">Data de Nascimento *</label>
                    <input
                      type="date"
                      id="dataNascimento"
                      name="dataNascimento"
                      value={formData.dataNascimento}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {userType === 'candidato' && (
                    <div className="form-group">
                      <label htmlFor="areaInteresse">Área de Interesse *</label>
                      <select
                        id="areaInteresse"
                        name="areaInteresse"
                        value={formData.areaInteresse}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Selecione uma área</option>
                        <option value="tecnologia">Tecnologia</option>
                        <option value="vendas">Vendas</option>
                        <option value="administrativo">Administrativo</option>
                        <option value="saude">Saúde</option>
                        <option value="educacao">Educação</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setStatus((prev) => ({ ...prev, error: null, success: null }));
                      setStep(1);
                    }}
                  >
                    Voltar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Continuar
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="step-header">
                <h1>Criar Sua Conta</h1>
                <p>Defina sua senha de acesso</p>
              </div>

              <form onSubmit={handleSubmit} className="cadastro-form">
                <div className="form-group">
                  <label htmlFor="password">Senha *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <small>Mínimo 8 caracteres com letras e números</small>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Senha *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="terms-agreement">
                  <label className="checkbox-label">
                    <input type="checkbox" required />
                    <span>
                      Concordo com os <Link to="/termos">Termos de Uso</Link> e 
                      <Link to="/privacidade"> Política de Privacidade</Link>
                    </span>
                  </label>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setStatus((prev) => ({ ...prev, error: null, success: null }));
                      setStep(2);
                    }}
                  >
                    Voltar
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={status.loading}>
                    {status.loading ? 'Enviando...' : 'Criar Conta'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="cadastro-footer">
            <p>
              Já tem uma conta? <Link to="/login">Faça login</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cadastro;