
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
  // Carrega a versão otimizada da sua logo,
  // que já está na pasta public do GitHub.
  const logoBuffer = await readFile(
    join(
      process.cwd(),
      'public',
      'alan-logo.png.png'
    )
  );

  const logoSrc =
    `data:image/png;base64,${logoBuffer.toString('base64')}`;

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
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
