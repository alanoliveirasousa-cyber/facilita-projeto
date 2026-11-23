import { ImageResponse } from 'next/og';

export const alt =
  'Facilita Projeto - Simule gratuitamente o valor do seu projeto de engenharia';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const siteUrl = 'https://facilita-projeto.vercel.app';

export default function OpenGraphImage() {
  const logoUrl = new URL(
    '/alan-logo.png',
    siteUrl
  ).toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          padding: '52px 58px',
          backgroundColor: '#1D335B',
          color: '#FFFFFF',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
        }}
      >
        {/* FUNDO DECORATIVO */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: -120,
              top: 90,
              width: 380,
              height: 380,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.06)',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 120,
              top: 260,
              width: 210,
              height: 210,
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.18)',
              display: 'flex',
            }}
          />
        </div>

        {/* COLUNA ESQUERDA */}
        <div
          style={{
            width: '62%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 2,
            paddingRight: 20,
          }}
        >
          {/* CABEÇALHO */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: '#F4BE00',
                    letterSpacing: 1,
                  }}
                >
                  FACILITA PROJETO
                </span>

                <span
                  style={{
                    fontSize: 16,
                    color: '#D7E3EF',
                    marginTop: 8,
                  }}
                >
                  por Alan Oliveira
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  padding: '10px 18px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.20)',
                  backgroundColor:
                    'rgba(255,255,255,0.05)',
                  fontSize: 16,
                  color: '#FFFFFF',
                }}
              >
                ENGENHARIA CIVIL
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 58,
              }}
            >
              <span
                style={{
                  fontSize: 64,
                  lineHeight: 1.08,
                  fontWeight: 900,
                  letterSpacing: -2,
                  color: '#FFFFFF',
                }}
              >
                Vai construir?
              </span>

              <span
                style={{
                  fontSize: 48,
                  lineHeight: 1.15,
                  fontWeight: 800,
                  color: '#F4BE00',
                  marginTop: 18,
                  maxWidth: 600,
                }}
              >
                Descubra quanto pode custar
                o seu projeto.
              </span>

              <span
                style={{
                  fontSize: 23,
                  lineHeight: 1.5,
                  color: '#E8EEF7',
                  marginTop: 26,
                }}
              >
                Simulação online, gratuita e sem compromisso.
              </span>
            </div>
          </div>

          {/* RODAPÉ */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '100%',
                height: 2,
                backgroundColor: 'rgba(255,255,255,0.18)',
                marginBottom: 22,
                display: 'flex',
              }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Alan Oliveira
                </span>

                <span
                  style={{
                    fontSize: 15,
                    color: '#D7E3EF',
                    marginTop: 4,
                  }}
                >
                  Engenheiro Civil
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  padding: '15px 24px',
                  backgroundColor: '#F4BE00',
                  borderRadius: 12,
                  color: '#132744',
                  fontWeight: 900,
                  fontSize: 18,
                }}
              >
                SIMULE GRATUITAMENTE
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA COM A LOGO */}
        <div
          style={{
            width: '34%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 470,
              borderRadius: 26,
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '34px',
              boxShadow:
                '0 18px 40px rgba(0,0,0,0.18)',
            }}
          >
            <img
              src={logoUrl}
              alt="Logo Alan Oliveira Engenharia Civil"
              style={{
                width: '100%',
                maxWidth: 360,
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
