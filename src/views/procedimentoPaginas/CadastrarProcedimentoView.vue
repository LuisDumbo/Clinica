<template>
    <div class="cadastrar_procedimento">

        <div v-if="erro" class="alert alert-danger alert-dismissible animate__animated animate__fadeInDown">
            <strong>Erro!</strong> Escolha Um Medico!
        </div>

        <div v-if="sucesso" class="alert alert-success alert-dismissible animate__animated animate__fadeInDown">
            <strong>Registado!</strong> Paciente Foi Registado!
        </div>

        <div class="card-header py-3">
            <h4 class="m-0 font-weight-bold text-dark text-center">Cadastrar Procedimento
            </h4>
        </div>

        <div v-if="lista">
            <form ref="paciente" @submit.prevent="user" autocomplete="off" class="form">
                <div class="row">
                    <div class="form-group col-6">
                        <label for="nome">Nome Completo</label>
                        <input type="text" v-model="nome" name="nome" value="" id="nome" required minlength="5" disabled
                            class="form-control" />

                    </div>

                    <div class="form-group col-6">
                        <label>BI</label>
                        <input type="text" class="form-control" v-model="doc_identificacao" name="doc_identificacao"
                            disabled placeholder="Insira o Documento da Identificação" autocomplete="off"
                            required="requiored">

                    </div>

                </div>

                <div class="row" id="linha-horizontal">

                </div>


                <div class="form-group col-6">
                    <h5 class="font-weight-bold">Dados Procedimento</h5>

                </div>



                <div class="row">
                    <div class="form-group col-6">
                        <label for="data">Data Procedimento</label>
                        <input type="date" v-model="date" name="data" id="data" required class="form-control" />
                    </div>
                    <div class="form-group col-6">
                        <label>Local</label>
                        <input type="text" class="form-control" v-model="local" name="local_consulta"
                            placeholder="Insira o Documento da Identificação" autocomplete="off" required="requiored">
                    </div>

                </div>

                <div class=" form-group col-6">

                    <input type="number" id="numero_exame" v-model.number="numero_procedimento"
                        @input="zerar_procedimeno" />
                </div>


                <div>

                    <table id="example" class=" table table-bordered " cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Nª</th>
                                <th>Procedimento</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr class="animate__animated animate__fadeIn " v-for=" um_procedimento in numero_procedimento"
                                :key="um_procedimento.id">
                                <td>
                                    {{ um_procedimento }}
                                </td>
                                <td>
                                    <input type="text" step="any" class="form-control" name="procedimento[]"
                                        v-model="procedimento[um_procedimento - 1]" placeholder="Procedimento"
                                        autocomplete="off" required="requiored">
                                </td>
                                <td>
                                    <input type="text" step="any" class="form-control" name="procedimento_descricao[]"
                                        v-model="procedimento_descricao[um_procedimento - 1]"
                                        placeholder="procedimento_descricao" autocomplete="off" required="requiored">
                                </td>

                            </tr>
                        </tbody>
                    </table>


                </div>


                <div style="text-align: right" class="d-flex flex-row">
                    <button type="submit" name="utibtn" class="btn btn-success btn-small">Registar</button>
                    <router-link class="btn bg-danger" to="/listarPacinte">Cancelar</router-link>
                </div>
            </form>
        </div>

        <div v-else class="spinner "> </div>


    </div>
</template>
  
  
<script>
import axios from "axios"

export default {
    name: 'App',
    data() {
        return {

            local: null,
            date: null,
            numero_procedimento: 1,
            erro: null,
            sucesso: null,

            imgSrc: '',

            imagem: [],
            mostrar: '',

            triagem: null,
            exame_confirm: null,

            medico: 'Medico',
            options: [],

            marcial: null,
            lista: false,
            paciente: [],

            procedimento: [],
            procedimento_descricao: [],

            nome: null,

            doc_identificacao: null,




        }
    }, created() {
        this.redirecionar();
        this.listar();
    },
    methods: {

        redirecionar() {

            if (this.$route.params.bi === 'undefined') {
                this.$router.push({ path: '/listarPacinte' })
            }
        },

        user: function (event) {


            this.lista = false


            var i = 0;

            this.procedimento.forEach(elemnto => {

                const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'



                let dados = {

                    BI: this.doc_identificacao,
                    dados: {
                        local_procedimento: this.local,
                        data_procedimento: this.date,
                        procedimento: elemnto,
                        descricoao: this.procedimento_descricao[i]
                    }

                }
                axios.post('http://localhost/historico_mais/api/registar_procedimento', dados, {
                    headers: {

                        'Authorization': `Bearer ${token}`
                    }
                }).then((resposta) => {

                    console.log(resposta.data)
                })

                // console.log(`Porcedimento confirme ${elemnto} com as devidas descricao ${this.procedimento_descricao[i]} `)

                i++

            })

            this.listar()



            this.local = ''
            this.medico = 'Medico'
            this.date = ''
            this.descricao_sintoma = ''
            this.diagnostico = ''
            this.receita = ''



            //  this.zerarTudo()
            this.exame_confirm = false

            event.target.reset();
            this.erro = null
            this.zerar_procedimeno()
            this.sucesso = true
        },
        zerar() {
            this.imagem.length = 0
            this.exame.length = 0
        },
        zerarTudo() {
            this.zerar()
            this.numero_exame = 1
        },
        zerar_procedimeno() {

            this.procedimento.length = 0
            this.procedimento_descricao.length = 0
            this.numero_procedimento = 1

        },
        listar() {



            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.get('http://localhost/historico_mais/api/paciente?bi=' + this.$route.params.bi + '', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }, params: {
                    BI: this.$route.params.bi
                }
            }).then((res) => {
                // console.log(res.data.data[0])
                //  console.log(this.$route.params.bi)
                this.lista = res.data.data[0];

                //console.log(res.data.data[0].nome)
                this.nome = res.data.data[0].nome ? res.data.data[0].nome : ""
                //  this.date = res.data.data[0].Data ? res.data.data[0].Data : ""
                this.doc_identificacao = res.data.data[0].BI ? res.data.data[0].BI : ""
                this.sexo = res.data.data[0].sexo ? res.data.data[0].sexo : ""
                this.numero = res.data.data[0].numero ? res.data.data[0].numero : ""

            })
                .catch((error) => {
                    console.error(error)
                })





        }

    }
}
</script>
  
<style>
#linha-horizontal {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
  