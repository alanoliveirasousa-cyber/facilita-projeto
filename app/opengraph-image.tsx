
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
  // Logo original da pasta public.
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* SÍMBOLO ORIGINAL SEM A PARTE DO NOME */}
        <div
          style={{
            display: 'flex',
            width: 650,
            height: 330,
            position: 'relative',
            overflow: 'hidden',
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          <img
            src={logoSrc}
            width={650}
            height={650}
            alt="Símbolo Alan Oliveira"
            style={{
              position: 'absolute',
              top: -65,
              left: 0,
              width: 650,
              height: 650,
              objectFit: 'contain',
            }}
          />
        </div>

        {/* NOME ÚNICO COM TAMANHO CONTROLADO */}
        <div
          style={{
            display: 'flex',
            width: 590,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 58,
              fontWeight: 900,
              letterSpacing: -1,
              color: '#071334',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            ALAN OLIVEIRA
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#071334',
              marginTop: 12,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            ENGENHARIA CIVIL
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
