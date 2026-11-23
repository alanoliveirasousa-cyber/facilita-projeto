
'use client';

import { useState } from 'react';
import Calculator from '@/components/Calculator';

const colors = {
  navy: '#1D335B',
  dark: '#132744',
  yellow: '#F4BE00',
  white: '#FFFFFF',
  text: '#E8EEF7',
  muted: '#D7E3EF',
  light: '#F4F6FA',
};

const questions = [
  {
    question: 'A simulação é gratuita?',
    answer:
      'Sim! Você pode utilizar o Facilita Projeto gratuitamente para obter uma estimativa inicial do investimento no seu projeto, sem compromisso de contratação.',
  },
  {
    question: 'O valor apresentado é definitivo?',
    answer:
      'Não. O valor é uma estimativa preliminar. O orçamento definitivo depende das características da construção, do escopo solicitado e de uma avaliação técnica personalizada.',
  },
  {
    question: 'A calculadora mostra o custo total da obra?',
    answer:
      'Não. A calculadora apresenta uma estimativa para o desenvolvimento do projeto arquitetônico. Os custos de materiais, mão de obra e execução da construção não estão incluídos.',
  },
  {
    question: 'Posso simular uma casa, comércio ou galpão?',
    answer:
      'Sim. O Facilita Projeto permite simulações para construções residenciais, comerciais e industriais. Basta selecionar o tipo de construção e informar as características solicitadas.',
  },
  {
    question: 'Preciso já ter comprado um terreno?',
    answer:
      'Não. Você pode fazer uma simulação com a metragem aproximada da construção que pretende realizar, mesmo que ainda esteja planejando a compra do terreno.',
  },
  {
    question: 'O valor inclui os projetos complementares?',
    answer:
      'Não. Projetos complementares, itens especiais, taxas, emolumentos e despesas relacionadas aos processos de aprovação são avaliados separadamente, conforme a necessidade de cada construção.',
  },
  {
    question: 'Como solicito um orçamento personalizado?',
    answer:
      'Após concluir a simulação, você poderá entrar em contato diretamente pelo WhatsApp, enviando os dados da sua construção e a estimativa apresentada pela ferramenta.',
  },
];

export default function Home() {
  const [flowStarted, setFlowStarted] = useState(false);

  function goToCalculator() {
    const element = document.getElementById('calculadora');

    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <>
      {/* APRESENTAÇÃO PRINCIPAL */}
      <section className="hero">
        <div className="shell">
          <div className="topbar">
            <div className="brand">
              FACILITA PROJETO
              <span className="badge">
                por Alan Oliveira
              </span>
            </div>

            <div className="badge">
              Engenheiro Civil
            </div>
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

              <h1>
                Vai construir? Descubra quanto pode
                custar o seu projeto.
              </h1>

              <p>
                <b>
                  Planeje sua construção com mais
                  segurança e transparência.
                </b>
              </p>

              <p>
                Faça uma simulação gratuita e descubra
                uma estimativa inicial do investimento
                nos projetos de engenharia da sua
                futura construção.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 10,
                  marginTop: 18,
                  marginBottom: 24,
                }}
              >
                {[
                  '✓ Simulação gratuita',
                  '✓ Resultado rápido',
                  '✓ Sem compromisso',
                ].map((beneficio) => (
                  <span
                    key={beneficio}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '9px 13px',
                      borderRadius: 999,
                      background:
                        'rgba(255,255,255,0.55)',
                      border:
                        '1px solid rgba(29,51,91,0.12)',
                      color: colors.navy,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {beneficio}
                  </span>
                ))}
              </div>

              <div
                id="calculadora"
                style={{ scrollMarginTop: 25 }}
              >
                <Calculator
                  onStartChange={setFlowStarted}
                />
              </div>

              <p
                style={{
                  fontSize: 12,
                  color: '#56647A',
                  marginTop: 16,
                  lineHeight: 1.7,
                }}
              >
                A simulação apresenta uma estimativa
                preliminar dos projetos selecionados.
                O valor final depende de análise técnica
                e das características da construção.
                A estimativa não representa o custo
                total da obra.
              </p>
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

      {/* SEÇÕES INFORMATIVAS */}
      {!flowStarted && (
        <>
          {/* COMO FUNCIONA */}
          <section
            style={{
              background: colors.white,
              padding: '65px 20px',
            }}
          >
            <div
              className="shell"
              style={{
                maxWidth: 1120,
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: 36,
                }}
              >
                <div
                  style={{
                    color: '#A67D00',
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    marginBottom: 12,
                  }}
                >
                  SIMPLES E GRATUITO
                </div>

                <h2
                  style={{
                    color: colors.navy,
                    fontSize: 'clamp(28px, 4vw, 38px)',
                    lineHeight: 1.2,
                    marginBottom: 14,
                  }}
                >
                  Como funciona o Facilita Projeto?
                </h2>

                <p
                  style={{
                    color: '#475569',
                    fontSize: 16,
                    lineHeight: 1.7,
                    maxWidth: 650,
                    margin: '0 auto',
                  }}
                >
                  Em poucos passos, você tem uma
                  estimativa inicial para planejar
                  o projeto da sua construção.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                  gap: 20,
                }}
              >
                {[
                  {
                    number: '01',
                    title: 'Escolha sua construção',
                    description:
                      'Selecione se pretende construir uma casa, um espaço comercial ou um galpão.',
                  },
                  {
                    number: '02',
                    title: 'Informe os detalhes',
                    description:
                      'Escolha a metragem, o estilo e as principais características do seu projeto.',
                  },
                  {
                    number: '03',
                    title: 'Receba sua estimativa',
                    description:
                      'Confira uma faixa de valores e, se desejar, solicite um orçamento personalizado.',
                  },
                ].map((item) => (
                  <div
                    key={item.number}
                    style={{
                      background: colors.light,
                      padding: 26,
                      borderRadius: 16,
                      border:
                        '1px solid #E0E6EE',
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        background: colors.yellow,
                        borderRadius: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        fontWeight: 900,
                        color: colors.dark,
                        marginBottom: 20,
                      }}
                    >
                      {item.number}
                    </div>

                    <h3
                      style={{
                        color: colors.navy,
                        fontSize: 20,
                        marginBottom: 12,
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        color: '#475569',
                        lineHeight: 1.8,
                        fontSize: 15,
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  textAlign: 'center',
                  marginTop: 32,
                }}
              >
                <button
                  type="button"
                  onClick={goToCalculator}
                  style={{
                    background: colors.yellow,
                    color: colors.dark,
                    padding: '16px 26px',
                    border: 'none',
                    borderRadius: 12,
                    fontWeight: 900,
                    fontSize: 15,
                    cursor: 'pointer',
                    maxWidth: '100%',
                  }}
                >
                  FAZER MINHA SIMULAÇÃO GRATUITA
                </button>
              </div>
            </div>
          </section>

          {/* APRESENTAÇÃO PROFISSIONAL */}
          <section
            style={{
              background: colors.navy,
              padding: '65px 20px',
              color: colors.white,
            }}
          >
            <div
              className="shell"
              style={{
                maxWidth: 1120,
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
                  alignItems: 'center',
                  gap: 38,
                }}
              >
                <div>
                  <img
                    src="/alan-profile.jpg"
                    alt="Alan Oliveira, engenheiro civil responsável pelo Facilita Projeto"
                    style={{
                      width: '100%',
                      maxWidth: 400,
                      display: 'block',
                      margin: '0 auto',
                      borderRadius: 20,
                      objectFit: 'cover',
                      boxShadow:
                        '0 18px 35px rgba(0,0,0,0.16)',
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      color: colors.yellow,
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: 1.3,
                      marginBottom: 14,
                    }}
                  >
                    CONHEÇA O PROFISSIONAL
                  </div>

                  <h2
                    style={{
                      color: colors.white,
                      fontSize:
                        'clamp(28px, 4vw, 38px)',
                      lineHeight: 1.2,
                      marginBottom: 18,
                    }}
                  >
                    Quem está por trás do
                    Facilita Projeto?
                  </h2>

                  <p
                    style={{
                      color: colors.text,
                      lineHeight: 1.9,
                      fontSize: 16,
                      marginBottom: 18,
                    }}
                  >
                    Sou Alan Oliveira, engenheiro civil,
                    e desenvolvi o Facilita Projeto
                    com o objetivo de tornar mais
                    simples o primeiro passo de quem
                    pretende construir.
                  </p>

                  <p
                    style={{
                      color: colors.text,
                      lineHeight: 1.9,
                      fontSize: 16,
                      marginBottom: 22,
                    }}
                  >
                    A ferramenta permite obter uma
                    estimativa inicial dos honorários
                    de projeto arquitetônico e
                    compreender melhor o investimento
                    necessário para iniciar o
                    planejamento da construção.
                  </p>

                  <div
                    style={{
                      background:
                        'rgba(255,255,255,0.09)',
                      border:
                        '1px solid rgba(255,255,255,0.18)',
                      borderRadius: 12,
                      padding: '16px 18px',
                      marginBottom: 24,
                    }}
                  >
                    <strong
                      style={{
                        display: 'block',
                        color: colors.white,
                        fontSize: 17,
                        marginBottom: 6,
                      }}
                    >
                      Alan Oliveira
                    </strong>

                    <span
                      style={{
                        display: 'block',
                        color: colors.muted,
                        lineHeight: 1.7,
                        fontSize: 14,
                      }}
                    >
                      Engenheiro Civil
                    </span>

                    <span
                      style={{
                        display: 'block',
                        color: colors.muted,
                        lineHeight: 1.7,
                        fontSize: 14,
                      }}
                    >
                      CREA/PR 187022/D
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={goToCalculator}
                    style={{
                      background: colors.yellow,
                      color: colors.dark,
                      padding: '15px 22px',
                      border: 'none',
                      borderRadius: 12,
                      fontWeight: 900,
                      fontSize: 14,
                      cursor: 'pointer',
                      maxWidth: '100%',
                    }}
                  >
                    CALCULAR MEU PROJETO
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* PERGUNTAS FREQUENTES */}
          <section
            style={{
              background: colors.light,
              padding: '65px 20px',
            }}
          >
            <div
              className="shell"
              style={{
                maxWidth: 900,
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: 34,
                }}
              >
                <div
                  style={{
                    color: '#A67D00',
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 1.3,
                    marginBottom: 12,
                  }}
                >
                  TIRE SUAS DÚVIDAS
                </div>

                <h2
                  style={{
                    color: colors.navy,
                    fontSize:
                      'clamp(28px, 4vw, 36px)',
                    lineHeight: 1.2,
                    marginBottom: 12,
                  }}
                >
                  Perguntas frequentes
                </h2>

                <p
                  style={{
                    color: '#475569',
                    fontSize: 16,
                    lineHeight: 1.7,
                  }}
                >
                  Saiba como funciona a simulação
                  antes de começar.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gap: 12,
                }}
              >
                {questions.map((item) => (
                  <details
                    key={item.question}
                    style={{
                      background: colors.white,
                      border:
                        '1px solid #DDE4ED',
                      borderRadius: 12,
                      padding: '18px 20px',
                      color: colors.navy,
                    }}
                  >
                    <summary
                      style={{
                        fontWeight: 800,
                        fontSize: 16,
                        lineHeight: 1.5,
                        cursor: 'pointer',
                        color: colors.navy,
                      }}
                    >
                      {item.question}
                    </summary>

                    <p
                      style={{
                        color: '#475569',
                        fontSize: 15,
                        lineHeight: 1.9,
                        marginTop: 14,
                        marginBottom: 0,
                      }}
                    >
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* CHAMADA FINAL */}
          <section
            style={{
              background: colors.dark,
              color: colors.white,
              padding: '65px 20px',
              textAlign: 'center',
            }}
          >
            <div
              className="shell"
              style={{
                maxWidth: 800,
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  color: colors.yellow,
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  marginBottom: 16,
                }}
              >
                DÊ O PRIMEIRO PASSO
              </div>

              <h2
                style={{
                  color: colors.white,
                  fontSize:
                    'clamp(30px, 4vw, 42px)',
                  lineHeight: 1.2,
                  marginBottom: 20,
                }}
              >
                Sua construção começa com
                um bom planejamento.
              </h2>

              <p
                style={{
                  color: colors.text,
                  fontSize: 17,
                  lineHeight: 1.8,
                  maxWidth: 650,
                  margin: '0 auto 28px',
                }}
              >
                Descubra uma estimativa inicial
                do valor do seu projeto e dê
                o primeiro passo para tirar
                sua construção do papel.
              </p>

              <button
                type="button"
                onClick={goToCalculator}
                style={{
                  background: colors.yellow,
                  color: colors.dark,
                  border: 'none',
                  borderRadius: 12,
                  padding: '18px 28px',
                  fontSize: 16,
                  fontWeight: 900,
                  cursor: 'pointer',
                  maxWidth: '100%',
                  lineHeight: 1.5,
                }}
              >
                CALCULAR MEU PROJETO GRATUITAMENTE
              </button>

              <p
                style={{
                  color: colors.muted,
                  fontSize: 13,
                  marginTop: 18,
                  lineHeight: 1.7,
                }}
              >
                Simulação online, gratuita e
                sem compromisso.
              </p>
            </div>
          </section>
        </>
      )}

      {/* INSTAGRAM FIXO */}
      <a
        href="https://www.instagram.com/alanoliveirasousa/"
        target="_blank"
        rel="noopener noreferrer"
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
          boxShadow:
            '0 10px 30px rgba(13,47,82,.20)',
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
            d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7Zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10Zm.5 1.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
          />
        </svg>

        <span>Siga no Instagram</span>
      </a>

      {/* RODAPÉ */}
      <footer
        style={{
          background: '#F4F6FA',
          padding: '30px 20px 85px',
          textAlign: 'center',
          fontSize: 13,
          color: '#56647A',
          lineHeight: 1.8,
        }}
      >
        Facilita Projeto • Alan Oliveira —
        Engenheiro Civil • CREA/PR 187022/D
        <div style={{ marginTop: 6 }}>
          Simulações preliminares.
          Orçamentos sujeitos à avaliação técnica.
        </div>
      </footer>
    </>
  );
}
