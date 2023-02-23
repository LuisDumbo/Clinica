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
                    <h5 class="font-weight-bold">Dados Exame</h5>

                </div>



                <div class="form-group">
                    <label>Local</label>
                    <input type="text" class="form-control" v-model="local" name="local_exame"
                        placeholder="Local Do Exame" autocomplete="off" required="requiored">
                </div>

                <div class=" form-group col-6">

                    <input type="number" id="numero_exame" v-model.number="numero_exame" @input="zerar" />
                </div>


                <div>

                    <table id="example" class=" table table-bordered " cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Nª</th>
                                <th>Exame</th>
                                <th>Resultado</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr class="animate__animated animate__fadeIn " v-for=" um_exame in numero_exame"
                                :key="um_exame.id">
                                <td>
                                    {{ um_exame }}
                                </td>
                                <td>
                                    <input type="text" step="any" class="form-control" name="exame[]"
                                        v-model="exame[um_exame - 1]" placeholder="Exame" autocomplete="off"
                                        required="requiored">
                                </td>
                                <td>
                                    <input type="file" ref="file" step="any" class="form-control" name="solucao[]"
                                        @change="onFile" placeholder="Resultado" autocomplete="off"
                                        required="requiored">
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
            numero_exame: 1,
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

            nome: null,

            doc_identificacao: null,


            //dadso da triagem//
            temperatura: null,
            peso: null,
            presao_arterial: null,
            //dadso da consulta 
            date: null,
            local_exame: null,
            descricao_sintoma: null,
            diagnostico: null,
            /// dados exame
            exame: [],
            lista_de_exame: [],
            lista_exame: {},
            receita: null,


            sexo: null,
            numero: null

        }
    }, created() {
        this.redirecionar();
        this.listar();
        this.medicos();
    },
    methods: {

        redirecionar() {

            if (this.$route.params.bi === 'undefined') {
                this.$router.push({ path: '/listarPacinte' })
            }
        },
        onFile(e) {
            const files = e.target.files
            if (!files.length) return

            this.imagem.push(files[0]);

            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = () => (this.imgSrc = reader.result)
        },


        file(id_consulta, bi_paciente) {

            var i = 0;

            this.imagem.forEach(element => {
                let formData = new FormData();
                formData.append('sendimage', element);

                const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

                axios.post('http://localhost/historico_mais/api/arquivo', formData, {
                    headers: {

                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(async (res) => {

                        this.mostrar = res.data.message


                        this.lista_exame = {
                            nome: this.exame[i],
                            url: res.data.message
                        }



                        this.lista_de_exame.push({
                            nome: this.exame[i],
                            url: res.data.message
                        })

                        let dados = {

                            BI: bi_paciente,
                            dados: {
                                consulta_id: id_consulta,
                                nome: this.exame[i],
                                url: res.data.message
                            }

                        }

                        axios.post('http://localhost/historico_mais/api/registar_exame', dados, {
                            headers: {

                                'Authorization': `Bearer ${token}`
                            }
                        }).then((resposta) => {

                            console.log(resposta.data)
                        })





                        console.log(this.lista_exame)
                        i++



                    })
                    .catch((error) => {
                        console.error(error)
                    })





            });


            this.zerarTudo()
            this.exame_confirm = false


        },

        user: function (event) {


            this.lista = false


            var i = 0;

            this.imagem.forEach(element => {
                let formData = new FormData();
                formData.append('sendimage', element);
                // console.log(this.local)

                const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

                axios.post('http://localhost/historico_mais/api/arquivo', formData, {
                    headers: {

                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(async (res) => {


                        let dados = {

                            BI: this.doc_identificacao,
                            dados: {
                                local_exame: this.local,
                                nome: this.exame[i],
                                url: res.data.message
                            }

                        }

                        console.log(this.local)

                        axios.post('http://localhost/historico_mais/api/registar_exame', dados, {
                            headers: {

                                'Authorization': `Bearer ${token}`
                            }
                        }).then((resposta) => {

                            console.log(resposta.data)
                        })

                        console.log(this.lista_exame)
                        i++

                    }).catch((error) => {
                        console.error(error)
                    })

            });

            this.listar()


           
            this.local_exame = ''
            this.medico = 'Medico'
            this.date = ''
            this.descricao_sintoma = ''
            this.diagnostico = ''
            this.receita = ''



            //  this.zerarTudo()
            this.exame_confirm = false

            event.target.reset();
            this.erro = null
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





        }, medicos() {
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.get('http://localhost/historico_mais/api/listar_medico', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    // console.log(res.data)
                    this.lista_medicos = res.data.data;

                    this.lista_medicos.forEach(element => {
                        //console.log(element.nome)
                        this.options.push({ text: element.nome, value: element.numero_rodem ? element.numero_rodem : "" }) //<input type="submit" value="">
                    });
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
  