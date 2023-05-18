import { Express } from 'express'
import { ServicoCliente } from "../servico/cliente";

export const getClientePage = (site: Express, servico: ServicoCliente) => {
    site.get('/page/cliente', async (req, res) => {
        
        res.send(
            `
                    <h1>Currículo</h1>
                    <h2>Jéssica Barros Torchia</h2>
                    <h3>Bacharel em Engenharia Civil | Desenvolvedora de Software Júnior |
                        Node.js | Javascript
                        Barra Mansa, Rio de Janeiro, Brasil
                    </h3>
                    <br />
                    <i>Contato: (24)98817-0587 | <a href="mailto:jessicabt-10@hotmail.com">jessicabt-10@hotmail.com</a></i>
                    <br/>
                    <i>LinkedIn: www.linkedin.com/in/jessicabarros-torchia-desenvolvedorasoftware</i>
                    <br/>
                    <img src="https://media.licdn.com/dms/image/D4D03AQE0OfLRxGj4qQ/profile-displayphoto-shrink_200_200/0/1680217480872?e=1689206400&v=beta&t=uftuWIa2FBbhe9lK1V1DediuVUZ4bjHzFilq3I0yY-s" />
                    <h3>Resumo</h3>
                    <p>Formada em Engenharia Civil no Centro Universitário de Volta
                        Redonda - UniFOA e MBA em Orçamento, Planejamento e Controle
                        na Construção Civil na faculdade Unyleya.
                    <p>
                    <p>
                        Atualmente atuando com Desenvolvimento de Software Júnior
                        back-end onde sigo expandindo o conhecimento para a referida
                        área profissional através de cursos onlines, projetos pessoais e
                        prestações de serviços na área de desenvolvimento em tecnologia.
                    </p>
                    <p>
                        Experiências profissionais anteriormente nas áreas: administrativa, imobiliária, setor público e
                        monitoria das disciplinas: Desenho Arquitetônico Topográfico e Engenharia Urbana.
                    </p>
                    <p>
                        Busco oportunidade profissional na área de desenvolvimento de software onde 
                        permita o meu crescimento intelectual, profissional e técnico, assim podendo
                        contribuir com ela por muito tempo, à medida em que crescemos juntos.
                    </p>
                    <h3>Experiência</h3>
                    <h4>Pomodo</h4>
                        <i>Engenheira de software júnior</i>
                        <br/>
                        <i>setembro de 2022 - atualmente</i>
                        <br/>
                        <i>Barra Mansa  - RJ</i>
                    <ul>
                        <li>Criação de APIs Rest em NodeJs;</li>
                        <li>Criação de queries SQL para Postgres;</li>
                        <li>Uso de ferramenta de ORM para consultas;</li>
                        <li>Confecção de testes de unidade e integração;</li>
                        <li>Criação de um protótipo de serviço back-end para academias.</li>
                    </ul>
            
                    <h4>Secretaria Municipal de Estratégia Governamental - Prefeitura Municipal de Volta Redonda</h4>
                        <i>Diretora II</i>
                        <br/>
                        <i>fevereiro de 2021 - novembro de 2022</i>
                        <br/>
                        <i>Volta Redonda - RJ</i>
                    <ul>
                        <li>Suporte geral a Diretora do Departamento Geral Administrativo;</li>
                        <li>Responsável pelo registro das Leis e Decretos Municipais no PortalVR ;</li>
                        <li>Interface e suporte administrativo a todas Secretarias, Autarquias e Órgãos Públicos;</li>
                        <li>Elaboração e conferência de documentos oficiais;</li>
                        <li>Controle de planilhas e relatórios;</li>
                        <li>Elaboração de planilhas de controle;</li>
                        <li>Conferência das edições do VR EM DESTAQUE;</li>
                        <li>Acompanhamento de Processos Administrativos e;</li>
                        <li>Atendimento ao público.</li>
                    </ul>   
                    <h4>Prefeitura Municipal de Volta Redonda - Defesa Civil</h4>
                        <i>Auxiliar Administrativo</i>
                        <br/>
                        <i>outubro de 2017 - fevereiro de 2021</i>
                        <br/>
                        <i>Volta Redonda  - RJ</i>
                    <ul>
                        <li>Responsável do setor administrativo operacional da Defesa Civil;</li>
                        <li>Controle de planilhas e relatórios das vistorias realizadas;</li>
                        <li>Controle, execução e resposta de ofícios e memorandos controlando os prazos;</li>
                        <li>Desenvolvimento e acompanhamento da ferramenta de Gestão de Planejamento Estratégico;</li>
                        <li>Acompanhamento e auxílio na execução de relatórios técnicos de vistoria;</li>
                        <li>Acompanhamento e resposta às solicitações no Fiscaliza VR (Software Público de Gestão Municipal); </li>
                        <li>Supervisão e orientação de estagiários;</li>
                        <li>Gerenciamento de informações;</li>
                        <li>Atendimento ao público;</li>
                        <li>Rotinas administrativas.</li>
                    </ul>
                    <h4>VWA Serviços e Consultoria Ambiental Ltda</h4>
                        <i>Estágio em Engenharia Civil</i>
                        <br/>
                        <i>outubro de 2017 - dezembro de 2017</i>
                        <br/>
                        <i>Volta Redonda - RJ</i>
                    <ul>
                        <li>Acompanhamento de visitas técnicas de monitoramento das ETES e ETAS,
                            avaliando o índice de poluição de efluentes, água, chaminés, solos, resíduos e
                            ar.</li>
                    </ul>
                    <h4>Sauer Corretora de Seguros e Imóveis</h4>
                        <i>Auxiliar Administrativo</i>
                        <br/>
                        <i>setembro de 2015 - março de 2017</i>
                        <br/>
                        <i>Volta Redonda - RJ</i>
                    <ul>
                        <li>Acompanhamento de pagamento de inquilinos e repasse de proprietários;</li>
                        <li>Controle e atualização de planilhas eletrônicas;</li>
                        <li>Atendimento ao cliente;</li>
                        <li>Elaboração, acompanhamento e emissão de contratos e todo o processo de locação;</li>
                        <li>Cotação de seguros imobiliários;</li>
                        <li>Consulta e verificação de documentos para pré-análise de crédito;</li>
                        <li>Vistoria de imóveis;</li>
                        <li> Responsável pela atualização do site da empresa;</li>
                        <li>Rotinas administrativas.</li>
                    </ul>
                    <h4>Saint-Gobain Canalização / Saint-Gobain Pam Bioenergia</h4>
                        <i>Aprendiz Administrativo</i>
                        <br/>
                        <i>março de 2011 - julho de 2012</i>
                        <br/>
                        <i>Barra Mansa - RJ</i>
                    <ul>
                        <li>Acompanhamento e controle do processo de pagamento de notas fiscais no
                            prazo devido;</li>
                        <li>Controle e atualização de planilhas eletrônicas em Excel;</li>
                        <li>Elaboração de apresentação em PowerPoint;</li>
                        <li>Execução de relatórios;</li>
                        <li>Responsável pelo acompanhamento do 5s no setor;</li>
                        <li>Organização de arquivos de documentos em geral;</li>
                        <li>Rotinas administrativas.</li>
                    </ul>
                    <h3>Formação acadêmica</h3>
                    <h4>Faculdade Unyleya</h4>
                    <i>Master of Business Administration - MBA, Orçamento, planejamento e controle
                        na construção civil · (2018 - 2020)</i>
                    <h4>Centro Universitário de Volta Redonda - UniFOA</h4>
                    <i>Bacharel Engenharia Civil  · (2013 - 2018)</i>
                    <h3>Cursos e competências em desenvolvimento de software</h3>
                    <ul>
                        <li>JavaScript Back-End</li>
                        <li>TypeScript</li>
                        <li>APIs Rest em NodeJs</li>
                        <li>SQL</li>
                        <li>TypeORM</li>
                        <li>Testes de Unidade e Integração</li>
                        <li>PostgreSQL</li>
                        <li>Git</li>
                        <li>GitHub</li>
                        <li>DBeaver</li>
                        <li>ESlint</li>
                        <li>Postman</li>
            
                    </ul>
                `)
    })
}










// <b>oi</b>
//          <i>jessica</i> 
//          <a href="http://google.com">vai</a>
//          <br />
//          <img src="https://tpc.googlesyndication.com/simgad/4676683961937494086/14763004658117789537?w=600&h=314" />
//          <h1>Titulo 1</h1>
//          <h2>Titulo 2</h2>
//          <h3>Titulo 3</h3>
//          <h4>Titulo 4</h4>
//          <h5>Titulo 5</h5>
//          <h6>Titulo 6</h6>
//          <p>aqui eh um paragrafo</p>
//          <ul>
//             <li>oi</li>
//             <li>oi</li>
//             <li>oi</li>
//             <li>oi</li>
//          </ul>
//          <ol>
//             <li>oi</li>
//             <li>oi</li>
//             <li>oi</li>
//             <li>oi</li>
//          </ol>
//          <div>asdfasdf</div>
//          <p>
//                 Com seus <span style="color:red">braços longos</span> e seus <i>pés</i> preênseis,<br />
//                 o <b>macaco</b> se move com grande destreza. <br />
//                 Na floresta, ele é o rei dos galhos e dos ágeis. <br />
//          </p>
//          <table style="border: 1px dashed #66FF44">
//             <tr>
//                 <th>Nome</th>
//                 <th>Idade</th>
//             </tr>
//             <tr>
//                 <td>Afonso fasdfasdfasdfas asdfasdfasdf</td>
//                 <td>39</td>
//             </tr>
//             <tr>
//                 <td>Jessica</td>
//                 <td>31</td>
//             </tr>
//         </table>

//         <form action="/cliente" method="post">
//             Aqui tem um form]
//             <label>Nome:</label><input name="nome"><br />
//             <label>Telefone:</label><input name="tel"><br />
//             <label>Email:</label><input name="email"><br />

//             <button>Enviar</button>
//         </form>