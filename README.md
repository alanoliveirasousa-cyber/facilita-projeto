# Facilita Projeto — V1

Aplicação Next.js responsiva para estimativa inicial de projeto arquitetônico de Alan Oliveira.

## Funcionalidades
- Fluxos Residencial, Comercial e Industrial
- Regras de preço centralizadas em `lib/pricing.ts`
- Resultado com faixa de +10% e pisos definidos
- Captura Nome, UF, Cidade e WhatsApp + consentimento
- Cidades via API pública do IBGE
- Salvamento de simulações no Supabase
- Painel `/admin` com senha, estatísticas e listagem
- Rastreamento de clique no WhatsApp
- Mensagem do WhatsApp sem expor o valor estimado
- Layout mobile-first

## Rodar localmente
1. `npm install`
2. copie `.env.example` para `.env.local`
3. configure as variáveis
4. `npm run dev`

Sem Supabase configurado, a calculadora continua funcionando em modo demo, porém não salva as simulações.

## Supabase
1. Crie um projeto.
2. Execute `supabase/schema.sql` no SQL Editor.
3. Preencha `NEXT_PUBLIC_SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` em `.env.local`.
4. Nunca exponha a service role key no navegador.

## Admin
- Acesse `/admin`
- Defina `ADMIN_PASSWORD` com uma senha forte.
- Defina `ADMIN_SESSION_SECRET` com uma string aleatória longa (32+ caracteres).

## WhatsApp
Configure `NEXT_PUBLIC_WHATSAPP_NUMBER` apenas com números, incluindo 55 + DDD + telefone.

## Imagens
`public/alan-profile.jpg` foi extraída provisoriamente do print do Instagram enviado no briefing. Recomenda-se substituir por uma foto original em alta resolução.
`public/facade-reference.jpg` é a referência semirrealista aprovada. A V1 usa a mesma imagem como placeholder em alguns cards. Para lançamento final, substitua por 12 renders específicos mantendo os mesmos nomes/estrutura visual.

## Deploy na Vercel
1. Suba o projeto no GitHub.
2. Importe na Vercel.
3. Cadastre todas as variáveis de ambiente.
4. Configure o domínio `alanoliveiraengenharia.com.br`.

## Observações
A estimativa é comercial e não constitui proposta definitiva. Taxas, emolumentos, projetos complementares e itens especiais não estão incluídos.
