import { createServer } from './server'

(async() => {
    await createServer()
})()

// Criar um sitema agendamento de visita à imóveis para uma imobiliária, onde:
//1. Tem que ter cadastro de todos os imóvel para aluguel ou venda;
//2. Tem que ter cadastro de todos os corretores que trabalham na imobiliária;
//3. Tem que ter cadastro para todos os clientes interessados em visitar;
//4. Possibilidade para que o cliente ou o corretor agende um horário disponível para visita em determinado imóvel,
// cada imóvel só pode ser visitado por um cliente por vez.
//5. O cliente possa escolher o imóvel e agendar a visiata do mesmo com um corretor disponível na hora e data;
//6. Ao cadastrar a visitam o corretor e o cliente recebem uma notificação com as informações de confirmação,
// local, data, hora, nome do cliente e nome do corretor;
//7. Ao cadastrar a visita caso o corretor e ou imóvel já esteja reservado na data e horário, avisar ao cliente ou
// corretor da indisponibilidade e dar opções após o horário proposto disponíveis;
//8. Tem que ter a possibilidade de alterar o horário ou o imóvel a visitar e a possibilidade de cancelar visita;
//9. tem que ter a possibilidade de filtrar as visitas agendadas do dia e as visitas agendadas que ainda vão acontecer e as
// visitas que já aconteceram;
//