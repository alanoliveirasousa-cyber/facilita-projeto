import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';

export const alt =
  'Alan Oliveira Engenharia Civil - Facilita Projeto';

export const size = {
  width: 1200,
  height: 1200,
};

export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const arquivos = [
    'alan-logo-otimizada.png',
    'alan-logo.png.png',
    'alan-logo.png',
  ];

  let logoSrc: string | null = null;

  for (const arquivo of arquivos) {
    try {
      const logoBuffer = await readFile(
        join(process.cwd(), 'public', arquivo)
      );

      logoSrc = `data:image/png;base64,${logoBuffer.toString(
        'base64'
      )}`;

      break;
    } catch {
      // tenta o próximo arquivo
    }
  }

  if (!logoSrc) {
    throw new Error('Logo não encontrada na pasta public.');
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* SÍMBOLO DA LOGO */}
          <div
            style={{
              display: 'flex',
              width: 520,
              height: 360,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              marginBottom: 30,
            }}
          >
            <img
              src={logoSrc}
              width={520}
              height={520}
              alt="Símbolo Alan Oliveira Engenharia Civil"
              style={{
                width: 520,
                height: 520,
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
          </div>

          {/* NOME */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                display: 'flex',
                fontSize: 78,
                lineHeight: 1,
                fontWeight: 900,
                color: '#030B3D',
                letterSpacing: -1,
                textAlign: 'center',
              }}
            >
              ALAN OLIVEIRA
            </span>

            <span
              style={{
                display: 'flex',
                fontSize: 34,
                lineHeight: 1.1,
                fontWeight: 700,
                color: '#030B3D',
                marginTop: 14,
                letterSpacing: 1.5,
                textAlign: 'center',
              }}
            >
              ENGENHARIA CIVIL
            </span>
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
