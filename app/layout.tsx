
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

const siteUrl = 'https://facilita-projeto.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    'Facilita Projeto | Calcule o Valor do Seu Projeto de Engenharia',

  description:
    'Vai construir? Simule gratuitamente uma estimativa do valor do seu projeto arquitetônico residencial, comercial ou industrial. Rápido, online e sem compromisso.',

  applicationName: 'Facilita Projeto',

  keywords: [
    'Facilita Projeto',
    'calculadora de projeto de engenharia',
    'quanto custa um projeto arquitetônico',
    'valor de projeto arquitetônico',
    'orçamento de projeto residencial',
    'projeto de engenharia civil',
    'projeto arquitetônico residencial',
    'projeto arquitetônico comercial',
    'projeto de galpão industrial',
    'engenheiro civil em Paranavaí',
    'Alan Oliveira engenheiro civil',
  ],

  authors: [
    {
      name: 'Alan Oliveira',
    },
  ],

  creator: 'Alan Oliveira',

  publisher: 'Facilita Projeto',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'pt_BR',

    url: siteUrl,

    siteName: 'Facilita Projeto',

    title:
      'Vai construir? Simule o valor do seu projeto gratuitamente',

    description:
      'Descubra uma estimativa inicial do investimento no projeto arquitetônico da sua construção. Simule gratuitamente e solicite um orçamento personalizado.',
  },

  twitter: {
    card: 'summary',

    title:
      'Facilita Projeto | Simule o valor do seu projeto',

    description:
      'Faça uma simulação gratuita para sua construção residencial, comercial ou industrial.',
  },

  category: 'engenharia civil',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
