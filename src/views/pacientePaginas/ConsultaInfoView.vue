<template>
    <div class="historico_pacinte_consutla">

        <div v-if="erro" class="alert alert-danger alert-dismissible animate__animated animate__fadeInDown">
            <strong>Erro!</strong> Escolha Um Medico!
        </div>

        <div v-if="sucesso" class="alert alert-success alert-dismissible animate__animated animate__fadeInDown">
            <strong>Registado!</strong> Paciente Foi Registado!
        </div>

        <div class="card-header py-3">
            <h4 class="m-0 font-weight-bold text-dark text-center">Cadastrar Consulta
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
                <div class="row">
                    <div class=" form-group col-6">

                        <label>Medico</label>
                        <input type="text" class="form-control" v-model="medico" name="doc_identificacao"
                            disabled placeholder="Insira o Documento da Identificação" autocomplete="off"
                            required="requiored">
                    </div>



                </div>
                <div class="row" id="linha-horizontal">

                </div>
                <div v-if="triagem">
                    <div class="form-group col-6">
                        <h5 class="font-weight-bold">Dados Triagem</h5>

                    </div>
                    <div class="row">

                        <div class="form-group col-6">
                            <label for="nome">Temperatua</label>
                            <input type="number" v-model="temperatura" name="temperatura" value="" id="nome" required
                                minlength="5" disabled class="form-control" />

                        </div>

                        <div class="form-group col-6">
                            <label>Peso</label>
                            <input type="number" disabled class="form-control" v-model="peso" name="peso"
                                placeholder="Insira o Documento da Identificação" autocomplete="off"
                                required="requiored">

                        </div>

                        <div class="form-group col-6">
                            <label>Preção Arterial</label>
                            <input type="number" disabled class="form-control" v-model="presao_arterial"
                                name="presao_arterial" placeholder="Insira o Documento da Identificação"
                                autocomplete="off" required="requiored">

                        </div>
                    </div>
                    <div class="row" id="linha-horizontal"> </div>

                </div>

                <div class="form-group col-6">
                    <h5 class="font-weight-bold">Dados Consulta</h5>

                </div>

                <div class="row">
                    <div class="form-group col-6">
                        <label for="data">Data Consulta</label>
                        <input type="date" disabled  v-model="date" name="data" id="data" required class="form-control" />
                    </div>
                    <div class="form-group col-6">
                        <label>Local</label>
                        <input type="text" disabled class="form-control" v-model="local_consulta" name="local_consulta"
                            placeholder="Insira o Documento da Identificação" autocomplete="off" required="requiored">
                    </div>

                </div>
                <div class="form-group ">
                    <label for="exampleFormControlTextarea1">Descrição Sintomas </label>
                    <textarea disabled class="form-control" name="descricao_sintoma" v-model="descricao_sintoma" required
                        id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <div class="form-group ">
                    <label>Diagnóstico</label>
                    <input type="text"  disabled class="form-control" v-model="diagnostico" name="diagnostico"
                        placeholder="Insira o Documento da Identificação" autocomplete="off" required="requiored">
                </div>

                <div class="row" id="linha-horizontal"> </div>

                <div class=" form-group col-6">

                    <input type="checkbox" id="checkbox_exame" v-model="exame_confirm" @input="zerarTudo" />
                    <label for="checkbox_exame">Exames</label>
                </div>

                <div v-if="exame_confirm">

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

                </div>



                <div class="row" id="linha-horizontal"> </div>

                <div class="form-group ">
                    <label for="exampleFormControlTextarea1">Receita </label>
                    <textarea class="form-control"  disabled v-model="receita" name="receita" required
                        id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <div style="text-align: right" class="d-flex flex-row">
                    <router-link class="btn bg-danger"
                        :to="{ name: 'historico_pacinte', params: { bi: doc_identificacao } }">Cancelar</router-link>
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
            local_consulta: null,
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
        // this.medicos();
        this.consulta_info()
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

        file(id_consulta, bi_paciente, event) {

            var i = 0;

            this.imagem.forEach(element => {
                /// console.log(element)
                let formData = new FormData();
                formData.append('sendimage', element);

                const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

                axios.post('http://localhost/historico_mais/api/arquivo', formData, {
                    headers: {

                        'Authorization': `Bearer ${token}`
                    }
                }).then(async (res) => {

                    let dados = {

                        BI: bi_paciente,
                        dados: {
                            local_exame: this.local_consulta,
                            consulta_id: id_consulta,
                            nome: this.exame[i],
                            url: res.data.message
                        }

                    }

                    axios.post('http://localhost/historico_mais/api/registar_exame', dados, {
                        headers: {

                            'Authorization': `Bearer ${token}`
                        }
                    }).then(() => {


                    })

                    i++

                }).catch((error) => {
                    console.error(error)
                })

            });


            this.exame_confirm = false

            event.target.reset();
            this.erro = null
            this.triagem = false
            this.sucesso = true


        },
        consulta_info() {


            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.get('http://localhost/historico_mais/api/consulta?id_consulta=' + this.$route.params.id_consulta + '', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }, params: {
                    BI: this.$route.params.bi
                }
            }).then((res) => {
                console.log(res.data.data[0])

                this.medicos(res.data.data[0].numero_ordem)

                if (res.data.data[0].triagem) {
                    this.triagem = true
                    this.temperatura = res.data.data[0].triagem.temperatura
                    this.peso = res.data.data[0].triagem.peso
                    this.presao_arterial = res.data.data[0].triagem.precao_arterial
                }

                this.date =res.data.data[0].data_consulta
                this.local_consulta = res.data.data[0].local_consulta
                this.descricao_sintoma= res.data.data[0].descricao_sintomas
                this.diagnostico = res.data.data[0].diagnostico
                this.receita = res.data.data[0].receita

            }).catch((error) => {
                console.error(error)
            })

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

                this.lista = res.data.data[0];


                this.nome = res.data.data[0].nome ? res.data.data[0].nome : ""

                this.doc_identificacao = res.data.data[0].BI ? res.data.data[0].BI : ""
                this.sexo = res.data.data[0].sexo ? res.data.data[0].sexo : ""
                this.numero = res.data.data[0].numero ? res.data.data[0].numero : ""

            })
                .catch((error) => {
                    console.error(error)
                })





        }, medicos(numero_ordem) {
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.get('http://localhost/historico_mais/api/medico?numero_ordem=' + numero_ordem + '', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {

                    this.lista_medicos = res.data.data;

                    this.lista_medicos.forEach(element => {
                        this.medico = element.nome

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
  