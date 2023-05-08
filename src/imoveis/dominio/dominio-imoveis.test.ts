import { Imovel } from "./imoveis";

describe('Imovel', () => {
    describe('constructor', () => {
        it('Deve construir com sucesso um Imovel caso todos os parametros sejam validos', async () => {
            const imovel = new Imovel(
                1,
                'Rio de Janeiro',
                'Botafogo',
                'Rua 1, n. 5',
                2500.00,
                4000000,
                true
            )
            expect(imovel).toEqual({
                id:1,
                cidade: 'Rio de Janeiro',
                bairro:'Botafogo',
                endereco: 'Rua 1, n. 5',
                valor_aluguel: 2500.00,
                valor_venda: 4000000,
                ativo: true

            })
        })

        it('deve disparar um erro caso o Imovel não possua cidade', () => {
            expect.assertions(1)
            try {
                new Imovel(
                    1,
                    undefined,
                    'Botafogo',
                    'Rua 1, n. 5',
                    2500.00,
                    4000000,
                    true
                )
            } catch (error) {
                expect(error).toEqual(new Error('Imovel precisa de cidade'))
            }
        })

        it('deve disparar um erro caso o Imovel não possua bairro', () => {
            expect.assertions(1)
            try {
                new Imovel(
                    1,
                    'Rio de Janeiro',
                    undefined,
                    'Rua 1, n. 5',
                    2500.00,
                    4000000,
                    true
                )
            } catch (error) {
                expect(error).toEqual(new Error('Imovel precisa de bairro'))
            }
        })

        it('deve disparar um erro caso o Imovel não possua endereço', () => {
            expect.assertions(1)
            try {
                new Imovel(
                    1,
                    'Rio de Janeiro',
                    'Botafogo',
                    undefined,
                    2500.00,
                    4000000,
                    true
                )
            } catch (error) {
                expect(error).toEqual(new Error('Imovel precisa de endereco'))
            }
        })
    })
})