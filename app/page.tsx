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
        className="instagram"
        href="https://www.instagram.com/alanoliveirasousa/"
        target="_blank"
        rel="noreferrer"
      >
        Instagram ↗
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
