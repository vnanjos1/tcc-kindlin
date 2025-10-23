import React from 'react';
import { motion } from 'framer-motion';

const SuccessStories = () => {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Histórias de Sucesso</h1>
            <p>Conheça as trajetórias inspiradoras de quem superou o desemprego</p>
          </motion.div>
        </div>
      </section>
      <div className="container">
        <p style={{textAlign: 'center', padding: '4rem 0'}}>Página em desenvolvimento...</p>
      </div>
    </div>
  );
};

export default SuccessStories;