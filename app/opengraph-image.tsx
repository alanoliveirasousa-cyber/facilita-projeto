
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
  // Procura primeiro a logo otimizada.
  // Se não encontrar, utiliza a logo original.

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

      logoSrc =
        `data:image/png;base64,${logoBuffer.toString('base64')}`;

      break;
    } catch {
      // Tenta o próximo arquivo da lista.
    }
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
          overflow: 'hidden',
        }}
      >
        {logoSrc ? (
          <img
            src={logoSrc}
            width={1200}
            height={1200}
            alt="Alan Oliveira Engenharia Civil"
            style={{
              width: 1200,
              height: 1200,
              objectFit: 'contain',
            }}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#132744',
            }}
          >
            <span
              style={{
                fontSize: 80,
                fontWeight: 900,
              }}
            >
              ALAN OLIVEIRA
            </span>

            <span
              style={{
                fontSize: 42,
                marginTop: 20,
              }}
            >
              ENGENHARIA CIVIL
            </span>
          </div>
        )}
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
