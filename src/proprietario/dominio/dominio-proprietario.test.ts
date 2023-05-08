import { Proprietario } from "./proprietario";

describe('Proprietario', () => {
    describe('constructor', () => {
        it('Deve construir com sucesso um Proprietario caso todos os parametros sejam validos', async () => {
            const proprietario = new Proprietario(
                1,
                'Ana',
                '123',
                'ana@gmail.com'
            )
            expect(proprietario).toEqual({
                id: 1,
                nome:'Ana',
                tel: '123',
                email: 'ana@gmail.com',

            })
        })

        it('deve disparar um erro caso o Proprietario não possua nome', () => {
            expect.assertions(1)
            try {
                new Proprietario(
                    123,
                    undefined,
                    '123',
                    'ana@gmail.com'
                )
            } catch (error) {
                expect(error).toEqual(new Error('Proprietario precisa de nome'))
            }
        })

        it('deve disparar um erro caso o Proprietario não possua tel', () => {
            expect.assertions(1)
            try {
                new Proprietario(
                    123,
                    'Ana',
                    undefined,
                    'ana@gmail.com'
                )
            } catch (error) {
                expect(error).toEqual(new Error('Proprietario precisa de tel'))
            }
        })

        it('deve disparar um erro caso o Proprietario não possua email', () => {
            expect.assertions(1)
            try {
                new Proprietario(
                    123,
                    'Ana',
                    '123',
                    undefined
                )
            } catch (error) {
                expect(error).toEqual(new Error('Proprietario precisa de email'))
            }
        })
    })
})