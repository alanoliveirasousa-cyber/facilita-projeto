'use client';

import { useState } from 'react';
import Calculator from '@/components/Calculator';

export default function Home() {
  const [flowStarted, setFlowStarted] = useState(false);

  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="topbar">
            <div className="brand">
              FACILITA PROJETO
              <span className="badge">por Alan Oliveira</span>
            </div>

            <div className="badge">Engenheiro Civil</div>
          </div>

          <div
            className="hero-grid"
            style={
              flowStarted
                ? { gridTemplateColumns: '1fr' }
                : undefined
            }
          >
            <div>
              <div className="eyebrow">
                Alan Oliveira — Engenheiro Civil
              </div>

              <h1>Seu projeto começa aqui.</h1>

              <p>
                <b>
                  Especialista em projetos residenciais,
                  comerciais e industriais.
                </b>
                <br />
                Atendimento personalizado, do estudo inicial à
                aprovação do seu projeto.
              </p>

              <p>
                Tenha uma estimativa inicial para desenvolver e
                aprovar seu projeto arquitetônico de forma rápida
                e simples.
              </p>

              <Calculator onStartChange={setFlowStarted} />
            </div>

            {!flowStarted && (
              <div className="hero-photo">
                <img
                  src="/alan-profile.jpg"
                  alt="Alan Oliveira, engenheiro civil"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <a
        href="https://www.instagram.com/alanoliveirasousa/"
        target="_blank"
        rel="noreferrer"
        aria-label="Siga Alan Oliveira no Instagram"
        style={{
          position: 'fixed',
          right: 18,
          bottom: 18,
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          padding: '12px 17px',
          minHeight: 48,
          borderRadius: 999,
          background: '#ffffff',
          color: '#0d2f52',
          fontSize: 14,
          fontWeight: 800,
          textDecoration: 'none',
          boxShadow: '0 10px 30px rgba(13,47,82,.20)'
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7Zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10Zm.5 1.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
          />
        </svg>

        <span>Siga no Instagram</span>
      </a>

      <footer
        className="shell"
        style={{
          padding: '26px 22px',
          fontSize: 12,
          color: '#6d7786'
        }}
      >
        Facilita Projeto • Alan Oliveira — Engenheiro Civil •
        CREA/PR 187022/D
      </footer>
    </>
  );
}
