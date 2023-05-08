import { Cliente } from "./cliente";

describe('Cliente', () => {
    describe('constructor', () => {
        it('Deve construir com sucesso um Cliente caso todos os parametros sejam validos', async () => {
            const cliente = new Cliente(
                1,
                'Ana',
                '123',
                'ana@gmail.com'
            )
            expect(cliente).toEqual({
                id: 1,
                nome:'Ana',
                tel: '123',
                email: 'ana@gmail.com',

            })
        })

        it('deve disparar um erro caso o Cliente não possua nome', () => {
            expect.assertions(1)
            try {
                new Cliente(
                    123,
                    undefined,
                    '123',
                    'ana@gmail.com'
                )
            } catch (error) {
                expect(error).toEqual(new Error('Cliente precisa de nome'))
            }
        })

        it('deve disparar um erro caso o Cliente não possua tel', () => {
            expect.assertions(1)
            try {
                new Cliente(
                    123,
                    'Ana',
                    undefined,
                    'ana@gmail.com'
                )
            } catch (error) {
                expect(error).toEqual(new Error('Cliente precisa de tel'))
            }
        })

        it('deve disparar um erro caso o Cliente não possua email', () => {
            expect.assertions(1)
            try {
                new Cliente(
                    123,
                    'Ana',
                    '123',
                    undefined
                )
            } catch (error) {
                expect(error).toEqual(new Error('Cliente precisa de email'))
            }
        })
    })
})