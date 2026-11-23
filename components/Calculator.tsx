                    <option value="151-200">
                      151 a 200 m²
                    </option>

                    <option value="200+">
                      Acima de 200 m²
                    </option>
                  </select>
                </div>
              )}

              <div className="field">
                <label>Deseja piscina?</label>

                <select
                  value={pool}
                  onChange={e =>
                    setPool(e.target.value)
                  }
                >
                  <option value="nao">
                    Não
                  </option>

                  <option value="sim">
                    Sim — orçamento à parte
                  </option>
                </select>
              </div>
            </div>
          </>
        )}

      {step === 4 &&
        type !== 'residential' && (
          <>
            <h2>Resumo técnico inicial</h2>

            <p>
              Área principal:{' '}
              <b>{area} m²</b>
            </p>

            <p>
              Área considerada com mezanino:{' '}
              <b>{totalArea} m²</b>
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
          <h2>Quase pronto</h2>

          <p className="muted">
            Preencha seus dados para liberar a
            estimativa.
          </p>

          <div className="grid2">
            <div className="field">
              <label>Nome</label>

              <input
                value={name}
                onChange={e =>
                  setName(e.target.value)
                }
                placeholder="Digite seu nome"
              />
            </div>

            <div className="field">
              <label>Estado</label>

              <select
                value={uf}
                onChange={e =>
                  loadCities(e.target.value)
                }
              >
                {states.map(([s, n]) => (
                  <option
                    value={s}
                    key={s}
                  >
                    {s} — {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Cidade</label>

              <select
                value={city}
                onChange={e =>
                  setCity(e.target.value)
                }
                disabled={citiesLoading}
              >
                <option value="">
                  {citiesLoading
                    ? 'Carregando cidades...'
                    : 'Selecione sua cidade'}
                </option>

                {cities.map(c => (
                  <option
                    value={c}
                    key={c}
                  >
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>WhatsApp com DDD</label>

              <input
                value={whatsapp}
                onChange={e =>
                  setWhatsapp(
                    formatWhatsapp(e.target.value)
                  )
                }
                placeholder="(44) 99999-9999"
                inputMode="numeric"
                maxLength={15}
              />
            </div>
          </div>

          <label
            style={{
              display: 'flex',
              gap: 10,
              marginTop: 18,
              alignItems: 'flex-start'
            }}
          >
            <input
              type="checkbox"
              checked={consent}
              onChange={e =>
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
            className="cta"
            disabled={step === 0 && !type}
            onClick={() =>
              setStep(step + 1)
            }
          >
            Continuar
          </button>
        ) : (
          <button
