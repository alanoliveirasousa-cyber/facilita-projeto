
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';

export const alt =
  'Alan Oliveira Engenharia Civil - Facilita Projeto';

export const size = {
  width: 800,
  height: 800,
};

export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const logoBuffer = await readFile(
    join(process.cwd(), 'public', 'alan-logo.png')
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
          padding: 20,
        }}
      >
        <img
          src={logoSrc}
          width={760}
          height={760}
          alt="Alan Oliveira Engenharia Civil"
          style={{
            width: 760,
            height: 760,
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
