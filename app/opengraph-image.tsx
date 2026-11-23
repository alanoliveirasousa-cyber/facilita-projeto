
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';

export const alt =
  'Facilita Projeto - Simule o valor do seu projeto com Alan Oliveira Engenharia Civil';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function OpenGraphImage() {
  // Lê a logo diretamente da pasta public.
  const logoBuffer = await readFile(
    join(process.cwd(), 'public', 'alan-logo.png')
  );

  // Converte a imagem para uma fonte incorporada.
  // Não utiliza o domínio público durante o build.
  const logoSrc =
    `data:image/png;base64,${logoBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#1D335B',
          padding: '55px 60px',
          fontFamily: 'Arial, sans-serif',
          color: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* CONTEÚDO ESQUERDO */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: 660,
            height: '100%',
          }}
        >
          {/* IDENTIDADE */}
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
                fontSize: 17,
                color: '#E8EEF7',
                marginTop: 7,
              }}
            >
              por Alan Oliveira
            </span>
          </div>

          {/* CHAMADA PRINCIPAL */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.1,
              }}
            >
              Vai construir?
            </span>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 47,
                fontWeight: 800,
                lineHeight: 1.17,
                color: '#F4BE00',
                marginTop: 20,
              }}
            >
              <span>Descubra quanto</span>
              <span>pode custar o seu</span>
              <span>projeto.</span>
            </div>

            <span
              style={{
                fontSize: 21,
                color: '#E8EEF7',
                marginTop: 24,
              }}
            >
              Simulação online, gratuita e sem compromisso.
            </span>
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
                display: 'flex',
                height: 2,
                width: '100%',
                backgroundColor: '#496285',
                marginBottom: 18,
              }}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Alan Oliveira
                </span>

                <span
                  style={{
                    fontSize: 15,
                    marginTop: 5,
                    color: '#D7E3EF',
                  }}
                >
                  Engenheiro Civil
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#F4BE00',
                  padding: '14px 20px',
                  borderRadius: 12,
                  color: '#132744',
                  fontSize: 17,
                  fontWeight: 900,
                }}
              >
                SIMULE GRATUITAMENTE
              </div>
            </div>
          </div>
        </div>

        {/* LOGO NA LATERAL DIREITA */}
        <div
          style={{
            display: 'flex',
            width: 340,
            height: 390,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            padding: 22,
          }}
        >
          <img
            src={logoSrc}
            width={296}
            height={296}
            alt="Alan Oliveira Engenharia Civil"
            style={{
              width: 296,
              height: 296,
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
