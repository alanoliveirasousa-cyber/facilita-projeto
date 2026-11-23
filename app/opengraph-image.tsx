
import { ImageResponse } from 'next/og';

export const alt =
  'Facilita Projeto - Simule gratuitamente o valor do seu projeto de engenharia';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '62px 72px',
          backgroundColor: '#192F53',
          color: '#FFFFFF',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ELEMENTOS DECORATIVOS */}
        <div
          style={{
            position: 'absolute',
            width: 390,
            height: 390,
            borderRadius: '50%',
            backgroundColor: '#253F68',
            right: -110,
            top: 85,
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: 230,
            height: 230,
            borderRadius: '50%',
            border: '3px solid #496285',
            right: 115,
            top: 260,
            display: 'flex',
          }}
        />

        {/* CABEÇALHO */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: 30,
                fontWeight: 900,
                letterSpacing: 1,
                color: '#F4BE00',
              }}
            >
              FACILITA PROJETO
            </div>

            <div
              style={{
                fontSize: 16,
                color: '#D7E3EF',
                marginTop: 7,
              }}
            >
              por Alan Oliveira
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              borderRadius: 30,
              padding: '12px 20px',
              border: '1px solid #5D7496',
              backgroundColor: '#253F68',
              fontSize: 17,
              color: '#FFFFFF',
            }}
          >
            ENGENHARIA CIVIL
          </div>
        </div>

        {/* TEXTO PRINCIPAL */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2,
            maxWidth: 950,
            marginTop: 24,
          }}
        >
          <div
            style={{
              fontSize: 66,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: -2,
              lineHeight: 1.1,
              display: 'flex',
            }}
          >
            Vai construir?
          </div>

          <div
            style={{
              fontSize: 47,
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#F4BE00',
              marginTop: 16,
              maxWidth: 950,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Descubra quanto pode custar</span>
            <span>o seu projeto.</span>
          </div>

          <div
            style={{
              fontSize: 23,
              color: '#E8EEF7',
              marginTop: 25,
              display: 'flex',
            }}
          >
            Simulação online, gratuita e sem compromisso.
          </div>
        </div>

        {/* RODAPÉ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: '100%',
              height: 2,
              backgroundColor: '#496285',
              marginBottom: 23,
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
                  fontSize: 19,
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
                  marginTop: 5,
                }}
              >
                Engenheiro Civil
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                padding: '16px 24px',
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
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
