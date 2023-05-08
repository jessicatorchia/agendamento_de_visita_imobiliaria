import { Corretor } from "./corretor";

describe('Corretor', () => {
    describe('constructor', () => {
        it('Deve construir com sucesso um Corretor caso todos os parametros sejam validos', async () => {
            const corretor = new Corretor(
                1,
                'Ana',
                '123',
                'ana@gmail.com',
                true
            )
            expect(corretor).toEqual({
                id: 1,
                nome:'Ana',
                tel: '123',
                email: 'ana@gmail.com',
                ativo: true

            })
        })

        it('deve disparar um erro caso o Corretor não possua nome', () => {
            expect.assertions(1)
            try {
                new Corretor(
                    123,
                    undefined,
                    '123',
                    'ana@gmail.com',
                    true
                )
            } catch (error) {
                expect(error).toEqual(new Error('Corretor precisa de nome'))
            }
        })

        it('deve disparar um erro caso o Corretor não possua tel', () => {
            expect.assertions(1)
            try {
                new Corretor(
                    123,
                    'Ana',
                    undefined,
                    'ana@gmail.com',
                    true
                )
            } catch (error) {
                expect(error).toEqual(new Error('Corretor precisa de tel'))
            }
        })

        it('deve disparar um erro caso o Corretor não possua email', () => {
            expect.assertions(1)
            try {
                new Corretor(
                    123,
                    'Ana',
                    '123',
                    undefined,
                    true
                )
            } catch (error) {
                expect(error).toEqual(new Error('Corretor precisa de email'))
            }
        })
    })
})