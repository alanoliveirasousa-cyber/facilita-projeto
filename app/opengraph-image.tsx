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
  const logoBuffer = await readFile(
    join(process.cwd(), 'public', 'alan-logo.png')
  );

  const logoSrc = `data:image/png;base64,${logoBuffer.toString(
    'base64'
  )}`;

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
          padding: 50,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
          }}
        >
          <img
            src={logoSrc}
            width={1040}
            height={1040}
            alt="Alan Oliveira Engenharia Civil"
            style={{
              width: 1040,
              height: 1040,
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
