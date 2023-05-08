import { ImoveisDoProprietario } from "./imoveis-do-proprietario";

describe('ImoveisDoProprietario', () => {
    describe('constructor', () => {
        it('Deve construir com sucesso um ImoveisDoProprietario caso todos os parametros sejam validos', async () => {
            const imoveisDoProprietario = new ImoveisDoProprietario(
                1,
                3
            )
            expect(imoveisDoProprietario).toEqual({
                proprietario_id:1,
                imovel_id: 3
            })
        })

        it('deve disparar um erro caso o ImoveisDoProprietario não possua proprietario_id', () => {
            expect.assertions(1)
            try {
                new ImoveisDoProprietario(
                    undefined,
                    3
                )
            } catch (error) {
                expect(error).toEqual(new Error('Imovel do proprietario precido do id do proprietario'))
            }
        })

        it('deve disparar um erro caso o ImoveisDoProprietario não possua imovel_id', () => {
            expect.assertions(1)
            try {
                new ImoveisDoProprietario(
                    1,
                    undefined
                )
            } catch (error) {
                expect(error).toEqual(new Error('Imovel do proprietario precido do id do imovel'))
            }
        })        
    })
})