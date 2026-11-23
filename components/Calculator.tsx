
'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  calculateResidential,
  calculateCommercial,
  calculateIndustrial,
  rangeFor,
  money,
} from '@/lib/pricing';
import type { ProjectType } from '@/lib/pricing';

const states = [
  ['AC', 'Acre'], ['AL', 'Alagoas'],
  ['AP', 'Amapá'], ['AM', 'Amazonas'],
  ['BA', 'Bahia'], ['CE', 'Ceará'],
  ['DF', 'Distrito Federal'], ['ES', 'Espírito Santo'],
  ['GO', 'Goiás'], ['MA', 'Maranhão'],
  ['MT', 'Mato Grosso'], ['MS', 'Mato Grosso do Sul'],
  ['MG', 'Minas Gerais'], ['PA', 'Pará'],
  ['PB', 'Paraíba'], ['PR', 'Paraná'],
  ['PE', 'Pernambuco'], ['PI', 'Piauí'],
  ['RJ', 'Rio de Janeiro'], ['RN', 'Rio Grande do Norte'],
  ['RS', 'Rio Grande do Sul'], ['RO', 'Rondônia'],
  ['RR', 'Roraima'], ['SC', 'Santa Catarina'],
  ['SP', 'São Paulo'], ['SE', 'Sergipe'],
  ['TO', 'Tocantins'],
];

const areaMidpoints: Record<string, number> = {
  '0-50': 25,
  '51-100': 75,
  '101-150': 125,
  '151-200': 175,
  '200+': 225,
};

function mid(value: string) {
  return areaMidpoints[value] || 0;
}

function residentialFacade(
  floors: 'terrea' | 'sobrado',
  style: string
) {
  const model = floors === 'terrea' ? 'terrea' : 'sobrado';
  const suffix =
    style === 'Moderna'
      ? 'moderna'
      : style === 'Colonial'
      ? 'colonial'
      : 'padrao';

  return `/residencial-${model}-${suffix}.png`;
}

function commercialFacade(style: string) {
  if (style === 'Moderna') return '/comercial-moderna.png';
  if (style === 'Sofisticada') {
    return '/comercial-sofisticada.png';
  }
  return '/comercial-padrao.png';
}

function industrialFacade(style: string) {
  if (style === 'Logístico') {
    return '/industrial-logistico.png';
  }
  if (style === 'Corporativo') {
    return '/industrial-corporativo.png';
  }
  return '/industrial-padrao.png';
}

function formatWhatsapp(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 2) return digits;

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

type ChoiceItem = {
  value: string;
  label: string;
  image?: string;
};

function ChoiceGroup({
  items,
  value,
  onChange,
  columns = 'choices',
}: {
  items: ChoiceItem[];
  value: string;
  onChange: (value: string) => void;
  columns?: string;
}) {
  return (
    <div className={columns}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          className={`choice ${
            value === item.value ? 'active' : ''
          }`}
          onClick={() => onChange(item.value)}
          aria-pressed={value === item.value}
        >
          {item.image && (
            <img src={item.image} alt={item.label} />
          )}
          <b>{item.label}</b>
        </button>
      ))}
    </div>
  );
}

const areaOptions = [
  ['0-50', 'Até 50 m²'],
  ['51-100', '51 a 100 m²'],
  ['101-150', '101 a 150 m²'],
  ['151-200', '151 a 200 m²'],
  ['200+', 'Acima de 200 m²'],
];

function AreaBandSelect({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {areaOptions.map(([code, label]) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}

type SimulationResult = {
  value: number;
  range: {
    min: number;
    max: number;
  };
};

// CORES DA TELA DE RESULTADO
const resultColors = {
  white: '#FFFFFF',
  text: '#E8EEF7',
  secondary: '#D7E3EF',
  green: '#72D9AB',
  yellow: '#FFD46D',
};

const summaryStyle: CSSProperties = {
  padding: '14px 16px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.15)',
  minWidth: 0,
  color: resultColors.white,
};

const summaryLabel: CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: resultColors.secondary,
  marginBottom: 6,
};

const summaryValue: CSSProperties = {
  display: 'block',
  fontSize: 16,
  fontWeight: 700,
  color: resultColors.white,
  overflowWrap: 'anywhere',
};

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div style={summaryStyle}>
      <span style={summaryLabel}>
        {label}
      </span>
      <strong style={summaryValue}>
        {value}
      </strong>
    </div>
  );
}

function ResultInformation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 11,
        marginBottom: 15,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          color: resultColors.green,
          fontSize: 19,
          fontWeight: 800,
          lineHeight: 1.4,
          flexShrink: 0,
        }}
      >
        ✓
      </span>

      <p
        style={{
          color: resultColors.text,
          fontSize: 14,
          lineHeight: 1.8,
          margin: 0,
          opacity: 1,
        }}
      >
        {children}
      </p>
    </div>
  );
}

export default function Calculator({
  onStartChange,
}: {
  onStartChange?: (value: boolean) => void;
}) {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [type, setType] = useState<ProjectType | null>(null);

  const [floors, setFloors] =
    useState<'terrea' | 'sobrado'>('terrea');

  const [area, setArea] = useState(100);
  const [rooms, setRooms] = useState(2);
  const [baths, setBaths] = useState(1);
  const [suites, setSuites] = useState(0);
  const [facadeStyle, setFacadeStyle] = useState('Padrão');

  const [garage, setGarage] = useState('sim');
  const [edicula, setEdicula] = useState('nao');
  const [ediculaBand, setEdiculaBand] = useState('0-50');
  const [pool, setPool] = useState('nao');

  const [mezz, setMezz] = useState('nao');
  const [mezzBand, setMezzBand] = useState('0-50');

  const [name, setName] = useState('');
  const [uf, setUf] = useState('PR');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);

  const [whatsapp, setWhatsapp] = useState('');
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] =
    useState<SimulationResult | null>(null);

  const totalArea = useMemo(
    () =>
      area +
      (type !== 'residential' && mezz === 'sim'
        ? mid(mezzBand)
        : 0),
    [area, type, mezz, mezzBand]
  );

  const maxes =
    area <= 100
      ? [3, 3, 2]
      : area <= 150
      ? [4, 4, 3]
      : area <= 200
      ? [5, 5, 4]
      : area <= 300
      ? [6, 6, 5]
      : [8, 8, 6];

  useEffect(() => {
    let active = true;

    async function initialCities() {
      setCitiesLoading(true);

      try {
        const response = await fetch(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados/PR/municipios?orderBy=nome'
        );

        if (!response.ok) {
          throw new Error('Erro ao carregar municípios');
        }

        const data: { nome: string }[] =
          await response.json();

        if (active) {
          setCities(data.map((item) => item.nome));
        }
      } catch {
        if (active) setCities([]);
      } finally {
        if (active) setCitiesLoading(false);
      }
    }

    initialCities();

    return () => {
      active = false;
    };
  }, []);

  async function loadCities(newUf: string) {
    setUf(newUf);
    setCity('');
    setCities([]);
    setCitiesLoading(true);

    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${newUf}/municipios?orderBy=nome`
      );

      if (!response.ok) {
        throw new Error('Erro ao carregar municípios');
      }

      const data: { nome: string }[] =
        await response.json();

      setCities(data.map((item) => item.nome));
    } catch {
      setCities([]);
    } finally {
      setCitiesLoading(false);
    }
  }

  // FÓRMULAS ORIGINAIS PRESERVADAS
  function calc() {
    if (!type) return 0;

    if (type === 'residential') {
      return calculateResidential({
        area,
        floors,
        rooms,
        baths,
        suites,
        ediculaArea:
          edicula === 'sim'
            ? mid(ediculaBand)
            : undefined,
      });
    }

    if (type === 'commercial') {
      return calculateCommercial(totalArea);
    }

    return calculateIndustrial(totalArea);
  }

  function finish() {
    if (
      !name.trim() ||
      !city ||
      whatsapp.replace(/\D/g, '').length < 10 ||
      !consent
    ) {
      alert(
        'Preencha nome, cidade, WhatsApp com DDD e aceite o consentimento.'
      );
      return;
    }

    if (!type) return;

    setLoading(true);

    const value = calc();
    const range = rangeFor(value, type);

    setTimeout(() => {
      setResult({ value, range });
      setLoading(false);
      setStep(99);
    }, 2400);
  }

  const projectTypeName =
    type === 'residential'
      ? 'Residencial'
      : type === 'commercial'
      ? 'Comercial'
      : 'Industrial';

  function goWhats() {
    if (!result) return;

    const number = (
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
    ).replace(/\D/g, '');

    if (!/^55\d{10,11}$/.test(number)) {
      alert(
        'O WhatsApp comercial ainda não está configurado. Entre em contato pelo Instagram.'
      );
      return;
    }

    const details =
      type === 'residential'
        ? [
            `Modelo: ${
              floors === 'terrea'
                ? 'Casa térrea'
                : 'Sobrado'
            }`,
            `Quartos: ${rooms}`,
            `Banheiros: ${baths}`,
            `Suítes: ${suites}`,
            `Garagem incluída na metragem: ${
              garage === 'sim' ? 'Sim' : 'Não'
            }`,
            `Edícula: ${
              edicula === 'sim' ? 'Sim' : 'Não'
            }`,
            ...(edicula === 'sim'
              ? [`Faixa da edícula: ${ediculaBand} m²`]
              : []),
            `Piscina: ${
              pool === 'sim'
                ? 'Sim, orçamento à parte'
                : 'Não'
            }`,
          ]
        : [
            `Mezanino: ${
              mezz === 'sim' ? 'Sim' : 'Não'
            }`,
            ...(mezz === 'sim'
              ? [`Faixa do mezanino: ${mezzBand} m²`]
              : []),
          ];

    const message = [
      'Olá, Alan! Fiz uma simulação no Facilita Projeto e gostaria de receber um orçamento personalizado.',
      '',
      '*DADOS DO CLIENTE*',
      `Nome: ${name}`,
      `Cidade: ${city}/${uf}`,
      `WhatsApp: ${whatsapp}`,
      '',
      '*DADOS DA CONSTRUÇÃO*',
      `Tipo: ${projectTypeName}`,
      `Área principal: ${area} m²`,
      `Área considerada: ${totalArea} m²`,
      `Estilo: ${facadeStyle}`,
      ...details,
      '',
      '*ESTIMATIVA GERADA*',
      `${money(result.range.min)} a ${money(result.range.max)}`,
      '',
      'Entendo que este é um valor preliminar para o projeto arquitetônico, sujeito à análise técnica.',
      '',
      'Gostaria de conversar sobre os próximos passos e receber uma proposta personalizada.',
    ].join('\n');

    const url = `https://wa.me/${number}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function restart(keep: boolean) {
    setType(null);
    setStep(0);
    setResult(null);
    setStarted(true);
    setFacadeStyle('Padrão');

    if (!keep) {
      setName('');
      setCity('');
      setWhatsapp('');
      setConsent(false);
    }
  }

  const areaBands =
    type === 'industrial'
      ? [500, 600, 700, 800, 900, 1000]
      : [100, 150, 200, 250, 300];

  const styles: ChoiceItem[] =
    type === 'residential'
      ? ['Padrão', 'Moderna', 'Colonial'].map(
          (style) => ({
            value: style,
            label: style,
            image: residentialFacade(floors, style),
          })
        )
      : type === 'commercial'
      ? [
          'Comercial padrão',
          'Moderna',
          'Sofisticada',
        ].map((style) => ({
          value: style,
          label: style,
          image: commercialFacade(style),
        }))
      : [
          'Industrial padrão',
          'Logístico',
          'Corporativo',
        ].map((style) => ({
          value: style,
          label: style,
          image: industrialFacade(style),
        }));

  // BOTÃO INICIAL
  if (!started) {
    return (
      <button
        type="button"
        className="cta"
        onClick={() => {
          setStarted(true);
          onStartChange?.(true);
        }}
      >
        CALCULAR MEU PROJETO GRATUITAMENTE
      </button>
    );
  }

  // CARREGAMENTO
  if (loading) {
    return (
      <div className="card loader">
        <h2>Calculando sua estimativa...</h2>

        <p className="muted">
          Analisando as informações do seu projeto.
        </p>

        <div className="loaderbar">
          <span />
        </div>
      </div>
    );
  }

  // TELA DE RESULTADO COM CONTRASTE CORRIGIDO
  if (step === 99 && result) {
    return (
      <div
        className="result result-layout"
        style={{ color: resultColors.white }}
      >
        <div
          className="result-content"
          style={{ color: resultColors.white }}
        >
          <div
            className="eyebrow"
            style={{ color: resultColors.yellow }}
          >
            FACILITA PROJETO
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              marginTop: 12,
              marginBottom: 16,
              fontSize: 13,
              fontWeight: 700,
              color: resultColors.white,
            }}
          >
            ✓ Simulação concluída
          </div>

          <h2 style={{ color: resultColors.white }}>
            Sua estimativa está pronta!
          </h2>

          <p
            style={{
              color: resultColors.text,
              fontSize: 16,
              lineHeight: 1.7,
              marginBottom: 20,
              opacity: 1,
            }}
          >
            {name}, agora você já tem uma estimativa
            inicial do investimento para desenvolver
            o projeto da sua construção.
          </p>

          <div
            style={{
              padding: '22px 18px',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.2)',
              marginBottom: 24,
              color: resultColors.white,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 12,
                color: resultColors.secondary,
              }}
            >
              ESTIMATIVA DO PROJETO ARQUITETÔNICO
            </div>

            <div
              className="price"
              style={{
                margin: '8px 0 16px',
                overflowWrap: 'anywhere',
                color: resultColors.white,
              }}
            >
              {money(result.range.min)}
              {' a '}
              {money(result.range.max)}
            </div>

            <p
              style={{
                color: resultColors.text,
                fontSize: 13,
                lineHeight: 1.6,
                margin: 0,
                opacity: 1,
              }}
            >
              Faixa estimada de honorários para o
              desenvolvimento do projeto arquitetônico.
              O orçamento definitivo será apresentado
              após avaliação técnica.
            </p>
          </div>

          <h3
            style={{
              color: resultColors.white,
              marginBottom: 14,
              fontSize: 20,
            }}
          >
            Confira os dados da sua construção
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 165px), 1fr))',
              gap: 10,
              marginBottom: 24,
            }}
          >
            <SummaryCard
              label="Tipo de construção"
              value={projectTypeName}
            />

            <SummaryCard
              label="Área considerada"
              value={`${totalArea} m²`}
            />

            <SummaryCard
              label="Localização"
              value={`${city}/${uf}`}
            />

            <SummaryCard
              label="Estilo"
              value={facadeStyle}
            />

            {type === 'residential' ? (
              <>
                <SummaryCard
                  label="Modelo"
                  value={
                    floors === 'terrea'
                      ? 'Casa térrea'
                      : 'Sobrado'
                  }
                />

                <SummaryCard
                  label="Quartos"
                  value={rooms}
                />

                <SummaryCard
                  label="Banheiros"
                  value={baths}
                />

                <SummaryCard
                  label="Suítes"
                  value={suites}
                />

                {edicula === 'sim' && (
                  <SummaryCard
                    label="Edícula"
                    value={`${ediculaBand} m²`}
                  />
                )}

                <SummaryCard
                  label="Piscina"
                  value={
                    pool === 'sim'
                      ? 'Sim, orçamento separado'
                      : 'Não'
                  }
                />
              </>
            ) : (
              <>
                <SummaryCard
                  label="Área principal"
                  value={`${area} m²`}
                />

                <SummaryCard
                  label="Mezanino"
                  value={
                    mezz === 'sim'
                      ? `Sim — ${mezzBand} m²`
                      : 'Não'
                  }
                />
              </>
            )}
          </div>

          <div
            style={{
              padding: 18,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.18)',
              marginBottom: 20,
              color: resultColors.white,
            }}
          >
            <h3
              style={{
                color: resultColors.white,
                fontSize: 18,
                marginTop: 0,
                marginBottom: 18,
              }}
            >
              O que você precisa saber sobre esta estimativa
            </h3>

            <ResultInformation>
              O valor apresentado é uma estimativa
              inicial para o desenvolvimento do
              projeto arquitetônico.
            </ResultInformation>

            <ResultInformation>
              Os detalhes e as necessidades
              específicas da sua construção serão
              analisados antes do orçamento definitivo.
            </ResultInformation>

            <ResultInformation>
              Projetos complementares, itens
              especiais, taxas, emolumentos,
              despesas administrativas e custos
              relacionados às aprovações não estão
              incluídos nesta estimativa e serão
              avaliados separadamente.
            </ResultInformation>

            {type === 'residential' &&
              pool === 'sim' && (
                <ResultInformation>
                  O projeto da piscina será
                  avaliado e orçado separadamente.
                </ResultInformation>
              )}

            <ResultInformation>
              Esta estimativa não representa o
              custo total de execução da obra.
            </ResultInformation>
          </div>

          <div
            style={{
              padding: '24px 18px',
              borderRadius: 16,
              background: 'rgba(255,193,7,0.10)',
              border: '1px solid rgba(255,212,109,0.35)',
              marginBottom: 22,
              color: resultColors.white,
            }}
          >
            <h3
              style={{
                color: resultColors.white,
                fontSize: 23,
                lineHeight: 1.3,
                marginTop: 0,
                marginBottom: 12,
              }}
            >
              Vamos transformar seu planejamento
              em um projeto real?
            </h3>

            <p
              style={{
                color: resultColors.text,
                fontSize: 15,
                lineHeight: 1.7,
                marginBottom: 18,
                opacity: 1,
              }}
            >
              Envie sua simulação para o engenheiro
              Alan Oliveira e solicite um orçamento
              personalizado para sua construção.
            </p>

            <button
              type="button"
              className="cta"
              onClick={goWhats}
              style={{
                width: '100%',
                minHeight: 56,
                whiteSpace: 'normal',
                textAlign: 'center',
                lineHeight: 1.4,
                padding: '14px 18px',
              }}
            >
              SOLICITAR MEU ORÇAMENTO
              PERSONALIZADO NO WHATSAPP
            </button>

            <p
              style={{
                color: resultColors.secondary,
                fontSize: 12,
                marginTop: 13,
                marginBottom: 0,
                lineHeight: 1.6,
                opacity: 1,
              }}
            >
              Seus dados da simulação serão
              preenchidos automaticamente na
              mensagem. Você poderá revisar
              antes de enviar.
            </p>
          </div>

          <div className="actions">
            <button
              type="button"
              className="cta secondary"
              onClick={() => {
                const keep = window.confirm(
                  'Deseja manter seus dados pessoais para realizar uma nova simulação?'
                );
                restart(keep);
              }}
            >
              Refazer simulação
            </button>
          </div>

          <p
            style={{
              color: resultColors.secondary,
              fontSize: 12,
              opacity: 1,
              marginTop: 18,
              lineHeight: 1.7,
            }}
          >
            As condições de pagamento,
            parcelamento e possíveis descontos
            à vista poderão ser definidos
            posteriormente na proposta comercial.
          </p>
        </div>

        <div className="result-figure">
          <img
            src="/alan-result-cartoon.png"
            alt="Alan Oliveira, engenheiro civil"
          />
        </div>
      </div>
    );
  }

  // ETAPAS DA CALCULADORA
  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          gap: 12,
        }}
      >
        <b>FACILITA PROJETO</b>

        <span
          className="muted"
          style={{ fontSize: 13 }}
        >
          Etapa {step + 1} de 6
        </span>
      </div>

      <div className="progress">
        <span
          style={{
            width: `${Math.min(
              100,
              ((step + 1) / 6) * 100
            )}%`,
          }}
        />
      </div>

      {step === 0 && (
        <>
          <h2>O que você pretende construir?</h2>

          <p className="muted">
            Escolha a opção que mais combina com
            a construção que você está planejando.
          </p>

          <ChoiceGroup
            value={type || ''}
            onChange={(value) => {
              const chosen = value as ProjectType;
              setType(chosen);

              setFacadeStyle(
                chosen === 'residential'
                  ? 'Padrão'
                  : chosen === 'commercial'
                  ? 'Comercial padrão'
                  : 'Industrial padrão'
              );

              setArea(
                chosen === 'industrial' ? 500 : 100
              );
            }}
            items={[
              {
                value: 'residential',
                label: 'Casa ou sobrado',
                image: '/residencial-terrea-moderna.png',
              },
              {
                value: 'commercial',
                label: 'Loja ou espaço comercial',
                image: '/comercial-moderna.png',
              },
              {
                value: 'industrial',
                label: 'Galpão ou construção industrial',
                image: '/industrial-corporativo.png',
              },
            ]}
          />
        </>
      )}

      {step === 1 && (
        <>
          <h2>
            Qual será o tamanho da sua construção?
          </h2>

          <p className="muted">
            Informe uma metragem aproximada.
            Você poderá ajustar esses detalhes
            posteriormente com o engenheiro.
          </p>

          {type === 'residential' && (
            <>
              <h3>Modelo da construção</h3>

              <ChoiceGroup
                columns="grid2"
                value={floors}
                onChange={(value) => {
                  setFloors(
                    value as 'terrea' | 'sobrado'
                  );
                  setFacadeStyle('Padrão');
                }}
                items={[
                  {
                    value: 'terrea',
                    label: 'Casa térrea',
                    image: '/residencial-terrea-padrao.png',
                  },
                  {
                    value: 'sobrado',
                    label: 'Sobrado',
                    image: '/residencial-sobrado-padrao.png',
                  },
                ]}
              />
            </>
          )}

          <h3>Área construída aproximada</h3>

          <div className="grid3">
            {areaBands.map((value) => (
              <button
                key={value}
                type="button"
                className={`choice ${
                  area === value ? 'active' : ''
                }`}
                onClick={() => setArea(value)}
              >
                Até {value} m²
              </button>
            ))}

            <button
              type="button"
              className={`choice ${
                !areaBands.includes(area) ? 'active' : ''
              }`}
              onClick={() => {
                const minimum =
                  type === 'industrial' ? 1000 : 300;

                const answer = window.prompt(
                  `Digite a metragem acima de ${minimum} m²:`
                );

                if (answer === null) return;

                const value = Number(
                  answer.replace(',', '.')
                );

                if (
                  Number.isFinite(value) &&
                  value > minimum
                ) {
                  setArea(value);
                } else {
                  alert(
                    `Informe uma metragem maior que ${minimum} m².`
                  );
                }
              }}
            >
              Acima de{' '}
              {type === 'industrial'
                ? 1000
                : 300}{' '}
              m²
            </button>
          </div>

          <p className="muted">
            Metragem selecionada:{' '}
            <b>{area} m²</b>
          </p>

          <p className="muted">
            A metragem é uma referência inicial
            e poderá ser refinada durante o
            desenvolvimento do projeto personalizado.
          </p>
        </>
      )}

      {step === 2 && type === 'residential' && (
        <>
          <h2>Vamos conhecer melhor sua casa?</h2>

          <p className="muted">
            Informe a quantidade de ambientes
            que você imagina para a construção.
          </p>

          <div className="grid3">
            <div className="field">
              <label htmlFor="rooms">
                Quartos
              </label>

              <select
                id="rooms"
                value={rooms}
                onChange={(e) =>
                  setRooms(Number(e.target.value))
                }
              >
                {Array.from(
                  { length: maxes[0] },
                  (_, i) => i + 1
                ).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="baths">
                Banheiros
              </label>

              <select
                id="baths"
                value={baths}
                onChange={(e) =>
                  setBaths(Number(e.target.value))
                }
              >
                {Array.from(
                  { length: maxes[1] },
                  (_, i) => i + 1
                ).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="suites">
                Suítes
              </label>

              <select
                id="suites"
                value={suites}
                onChange={(e) =>
                  setSuites(Number(e.target.value))
                }
              >
                {Array.from(
                  { length: maxes[2] + 1 },
                  (_, i) => i
                ).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="muted">
            Para essa metragem, limitamos
            combinações pouco usuais.
            Configurações diferentes podem
            ser estudadas no projeto personalizado.
          </p>
        </>
      )}

      {step === 2 && type !== 'residential' && (
        <>
          <h2>
            Sua construção terá mezanino?
          </h2>

          <p className="muted">
            O mezanino é uma área intermediária,
            geralmente utilizada para escritórios,
            depósitos ou outros ambientes.
          </p>

          <ChoiceGroup
            columns="grid2"
            value={mezz}
            onChange={setMezz}
            items={[
              {
                value: 'nao',
                label: 'Sem mezanino',
              },
              {
                value: 'sim',
                label: 'Com mezanino',
              },
            ]}
          />

          {mezz === 'sim' && (
            <div
              className="field"
              style={{ marginTop: 16 }}
            >
              <label htmlFor="mezzBand">
                Qual será a área aproximada do mezanino?
              </label>

              <AreaBandSelect
                id="mezzBand"
                value={mezzBand}
                onChange={setMezzBand}
              />
            </div>
          )}
        </>
      )}

      {step === 3 && (
        <>
          <h2>
            Qual estilo mais combina com seu projeto?
          </h2>

          <p className="muted">
            Escolha a opção que mais se aproxima
            do visual que você imagina.
          </p>

          <ChoiceGroup
            value={facadeStyle}
            onChange={setFacadeStyle}
            items={styles}
          />

          <p className="muted">
            A escolha é apenas uma referência de
            estilo. A fachada final será desenvolvida
            de forma personalizada.
          </p>
        </>
      )}

      {step === 4 && type === 'residential' && (
        <>
          <h2>
            Sua construção terá algum adicional?
          </h2>

          <div className="grid2">
            <div className="field">
              <label htmlFor="garage">
                A garagem já está incluída
                na metragem total?
              </label>

              <select
                id="garage"
                value={garage}
                onChange={(e) =>
                  setGarage(e.target.value)
                }
              >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="edicula">
                Deseja incluir edícula?
              </label>

              <select
                id="edicula"
                value={edicula}
                onChange={(e) =>
                  setEdicula(e.target.value)
                }
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>
            </div>

            {edicula === 'sim' && (
              <div className="field">
                <label htmlFor="ediculaBand">
                  Qual será a área aproximada
                  da edícula?
                </label>

                <AreaBandSelect
                  id="ediculaBand"
                  value={ediculaBand}
                  onChange={setEdiculaBand}
                />
              </div>
            )}

            <div className="field">
              <label htmlFor="pool">
                Deseja piscina?
              </label>

              <select
                id="pool"
                value={pool}
                onChange={(e) =>
                  setPool(e.target.value)
                }
              >
                <option value="nao">Não</option>
                <option value="sim">
                  Sim — orçamento à parte
                </option>
              </select>
            </div>
          </div>
        </>
      )}

      {step === 4 && type !== 'residential' && (
        <>
          <h2>
            Resumo inicial da sua construção
          </h2>

          <p>
            Tipo de projeto:{' '}
            <b>{projectTypeName}</b>
          </p>

          <p>
            Área principal:{' '}
            <b>{area} m²</b>
          </p>

          <p>
            Área considerada com mezanino:{' '}
            <b>{totalArea} m²</b>
          </p>

          <p>
            Estilo selecionado:{' '}
            <b>{facadeStyle}</b>
          </p>

          <p className="muted">
            Demais ambientes, exigências locais e
            itens especiais serão definidos na
            reunião personalizada.
          </p>
        </>
      )}

      {step === 5 && (
        <>
          <h2>
            Está quase pronto!
          </h2>

          <p className="muted">
            Preencha seus dados para liberar
            sua estimativa gratuita.
          </p>

          <div className="grid2">
            <div className="field">
              <label htmlFor="clientName">
                Seu nome
              </label>

              <input
                id="clientName"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Digite seu nome"
                autoComplete="name"
              />
            </div>

            <div className="field">
              <label htmlFor="clientUf">
                Estado
              </label>

              <select
                id="clientUf"
                value={uf}
                onChange={(e) =>
                  loadCities(e.target.value)
                }
              >
                {states.map(([code, stateName]) => (
                  <option value={code} key={code}>
                    {code} — {stateName}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="clientCity">
                Cidade
              </label>

              <select
                id="clientCity"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                disabled={citiesLoading}
              >
                <option value="">
                  {citiesLoading
                    ? 'Carregando cidades...'
                    : 'Selecione sua cidade'}
                </option>

                {cities.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="clientWhatsapp">
                Seu WhatsApp com DDD
              </label>

              <input
                id="clientWhatsapp"
                value={whatsapp}
                onChange={(e) =>
                  setWhatsapp(
                    formatWhatsapp(e.target.value)
                  )
                }
                placeholder="(44) 99999-9999"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={15}
              />
            </div>
          </div>

          <label
            style={{
              display: 'flex',
              gap: 10,
              marginTop: 18,
              alignItems: 'flex-start',
            }}
          >
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) =>
                setConsent(e.target.checked)
              }
            />

            <span className="muted">
              Autorizo o uso dos meus dados apenas
              para gerar esta estimativa e, caso eu
              escolha iniciar uma conversa, para
              encaminhar as informações preenchidas
              ao WhatsApp.
            </span>
          </label>
        </>
      )}

      <div className="actions">
        <button
          type="button"
          className="cta secondary"
          disabled={step === 0}
          onClick={() =>
            setStep(Math.max(0, step - 1))
          }
        >
          Voltar
        </button>

        {step < 5 ? (
          <button
            type="button"
            className="cta"
            disabled={step === 0 && !type}
            onClick={() => {
              if (
                step === 2 &&
                type === 'residential' &&
                suites > rooms
              ) {
                alert(
                  'A quantidade de suítes não pode ser maior que a de quartos.'
                );
                return;
              }

              setStep(step + 1);
            }}
          >
            Continuar
          </button>
        ) : (
          <button
            type="button"
            className="cta"
            onClick={finish}
          >
            Gerar estimativa gratuita
          </button>
        )}
      </div>
    </div>
  );
}
