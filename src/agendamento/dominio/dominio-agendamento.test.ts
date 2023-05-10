import dayjs from "dayjs";
import { Agendamento } from "./agendamento";
describe('Agendamento', () => {
    describe('constructor', () => {
        it('Deve construir com sucesso um agendamento caso todos os parametros sejam validos', async () => {
            const agendamento = new Agendamento(
                1,
                dayjs('2023-01-05').hour(10).minute(30).second(0).millisecond(0).toDate(),
                1,
                3,
                2
            )
            expect(agendamento).toEqual({
                id: 1,
                data_hora: dayjs('2023-01-05').hour(10).minute(30).second(0).millisecond(0).toDate(),
                imovel_id: 1,
                cliente_id: 3,
                corretor_id: 2,
            })
        })

        it('deve disparar um erro caso o agendamento não possua data_hora', () => {
            expect.assertions(1)
            try {
                new Agendamento(
                    123,
                    undefined,
                    1,
                    3,
                    2
                )
            } catch (error) {
                expect(error).toEqual(new Error('Agendamento precisa de data_hora'))
            }
        })

        it('deve disparar um erro caso o agendamento não possua imovel_id', () => {
            expect.assertions(1)
            try {
                new Agendamento(
                    1,
                    dayjs('2023-01-05').hour(10).minute(30).second(0).millisecond(0).toDate(),
                    undefined,
                    3,
                    2
                )
            } catch (error) {
                expect(error).toEqual(new Error('Agendamento precisa de imovel_id'))
            }
        })

        it('deve disparar um erro caso o agendamento não possua cliente_id', () => {
            expect.assertions(1)
            try {
                new Agendamento(
                    1,
                    dayjs('2023-01-05').hour(10).minute(30).second(0).millisecond(0).toDate(),
                    2,
                    undefined,
                    2
                )
            } catch (error) {
                expect(error).toEqual(new Error('Agendamento precisa de cliente_id'))
            }
        })

        it('deve disparar um erro caso o agendamento não possua corretor_id', () => {
            expect.assertions(1)
            try {
                new Agendamento(
                    1,
                    dayjs('2023-01-05').hour(10).minute(30).second(0).millisecond(0).toDate(),
                    2,
                    3,
                    undefined
                )
            } catch (error) {
                expect(error).toEqual(new Error('Agendamento precisa de corretor_id'))
            }
        })
    })
})