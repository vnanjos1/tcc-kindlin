import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/authService.js';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [status, setStatus] = useState({ loading: false, error: null, success: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: null });

    try {
      const response = await loginUser({
        email: loginData.email.trim(),
        password: loginData.password
      });

      setStatus({
        loading: false,
        error: null,
        success: response?.message || 'Login realizado com sucesso!'
      });
      setLoginData({ email: '', password: '' });
    } catch (error) {
      setStatus({
        loading: false,
        error: error instanceof Error ? error.message : 'Falha ao realizar login.',
        success: null
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="login-header">
            <Link to="/" className="logo">
              <h2>Brasil Emprego Já</h2>
            </Link>
            <h1>Bem-vindo de Volta</h1>
            <p>Entre em sua conta para acessar oportunidades</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {status.error && <div className="form-feedback error">{status.error}</div>}
            {status.success && <div className="form-feedback success">{status.success}</div>}

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                placeholder="Sua senha"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Lembrar de mim</span>
              </label>
              <Link to="/recuperar-senha" className="forgot-password">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large btn-full"
              disabled={status.loading}
            >
              {status.loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="login-divider">
            <span>ou</span>
          </div>

          <div className="social-login">
            <button className="btn btn-outline btn-full btn-social">
              <span className="social-icon">📱</span>
              Entrar com Google
            </button>
            <button className="btn btn-outline btn-full btn-social">
              <span className="social-icon">🔒</span>
              Entrar com LinkedIn
            </button>
          </div>

          <div className="login-footer">
            <p>
              Não tem uma conta? <Link to="/cadastro">Cadastre-se agora</Link>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="login-hero"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="hero-content">
            <h2>Junte-se a Mais de 50.000 Profissionais</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">💼</span>
                <span>Acesso a vagas exclusivas</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <span>Match com oportunidades ideais</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📈</span>
                <span>Acompanhamento de carreira</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🤝</span>
                <span>Networking com empresas</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;