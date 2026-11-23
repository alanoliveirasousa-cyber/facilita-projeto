
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
          fontFamily: 'Arial, sans-serif',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 600,
          }}
        >
          {/* SOMENTE O SÍMBOLO ORIGINAL */}
          <div
            style={{
              display: 'flex',
              position: 'relative',
              width: 510,
              height: 380,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={logoSrc}
              width={1250}
              height={1250}
              alt="Símbolo Alan Oliveira"
              style={{
                position: 'absolute',
                width: 1250,
                height: 1250,
                left: -370,
                top: -334,
                maxWidth: 'none',
              }}
            />
          </div>

          {/* NOME CENTRALIZADO */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                color: '#071334',
                fontSize: 55,
                fontWeight: 900,
                letterSpacing: -1.5,
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
              }}
            >
              ALAN OLIVEIRA
            </div>

            <div
              style={{
                display: 'flex',
                color: '#071334',
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: 0.5,
                lineHeight: 1.2,
                marginTop: 8,
                whiteSpace: 'nowrap',
              }}
            >
              ENGENHARIA CIVIL
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
