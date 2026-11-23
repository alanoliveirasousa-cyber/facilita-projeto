
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

      logoSrc =
        `data:image/png;base64,${logoBuffer.toString('base64')}`;

      break;
    } catch {
      // Tenta o próximo arquivo.
    }
  }

  if (!logoSrc) {
    throw new Error(
      'Logo não encontrada na pasta public.'
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        <img
          src={logoSrc}
          width={960}
          height={960}
          alt="Alan Oliveira Engenharia Civil"
          style={{
            width: 960,
            height: 960,
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
