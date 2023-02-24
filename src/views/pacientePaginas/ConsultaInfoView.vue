<template>
    <div class="historico_pacinte_consutla">



        <div class="card-header py-3">
            <h4 class="m-0 font-weight-bold text-dark text-center">Informação da Consulta
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
                        <input type="text" class="form-control" v-model="medico" name="doc_identificacao" disabled
                            placeholder="Insira o Documento da Identificação" autocomplete="off" required="requiored">
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
                                placeholder="Insira o Documento da Identificação" autocomplete="off" required="requiored">

                        </div>

                        <div class="form-group col-6">
                            <label>Preção Arterial</label>
                            <input type="number" disabled class="form-control" v-model="presao_arterial"
                                name="presao_arterial" placeholder="Insira o Documento da Identificação" autocomplete="off"
                                required="requiored">

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
                        <input type="date" disabled v-model="date" name="data" id="data" required class="form-control" />
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
                    <input type="text" disabled class="form-control" v-model="diagnostico" name="diagnostico"
                        placeholder="Insira o Documento da Identificação" autocomplete="off" required="requiored">
                </div>


                <div v-if="exame_confirm">


                    <div class="row" id="linha-horizontal"> </div>

                    <div class=" form-group col-6">

                        <label for="checkbox_exame">Exames</label>
                    </div>

                    <div class="card shadow mb-4">

                        <div>
                            <vue-good-table :columns="columns_exame" :rows="rows_exame" :line-numbers="true"
                                :search-options="{
                                    enabled: true
                                }" :pagination-options="{
    enabled: true,
    mode: 'records',
    perPage: 3,
}">
                                <div slot="emptystate">
                                    Sem dados
                                </div>
                                <template slot="table-row" slot-scope="props">
                                    <span class="d-flex justify-content-center" v-if="props.column.field == 'actions'">
                                        <img :src="props.row.url" @click="ver(props.row.url)" alt="" width="66" height="66"
                                            srcset="" data-toggle="modal" data-target="#exampleModal">

                                    </span>
                                </template>
                            </vue-good-table>
                        </div>
                    </div>


                    <imagem_modal :url="img_modal" />

                </div>

                <div v-if="procedimento_confirm">


                    <div class="row" id="linha-horizontal"> </div>

                    <div class=" form-group col-6">

                        <label for="checkbox_exame">Procedimento Medico</label>
                    </div>

                    <div class="card shadow mb-4">

                        <div>
                            <vue-good-table :columns="columns_procedimento" :rows="rows_procedimento" :line-numbers="true"
                                :search-options="{
                                    enabled: true
                                }" :pagination-options="{
    enabled: true,
    mode: 'records',
    perPage: 3,
}">
                                <div slot="emptystate">
                                    Sem dados
                                </div>

                            </vue-good-table>
                        </div>
                    </div>




                </div>



                <div class="row" id="linha-horizontal"> </div>

                <div class="form-group ">
                    <label for="exampleFormControlTextarea1">Receita </label>
                    <textarea class="form-control" disabled v-model="receita" name="receita" required
                        id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <div style="text-align: right" class="d-flex flex-row">
                    <router-link class="btn bg-danger"
                        :to="{ name: 'historico_pacinte', params: { bi: doc_identificacao } }">Voltar</router-link>
                </div>
            </form>
        </div>

        <div v-else class="spinner "> </div>



    </div>
</template>
  
  
<script>
import axios from "axios"
import imagem_modal from '@/components/ModalImg.vue'
export default {
    name: 'App',
    components: {
        imagem_modal
    },
    data() {
        return {


            img_modal: null,


            triagem: null,
            exame_confirm: null,
            procedimento_confirm: null, 

            medico: 'Medico',


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
            lista_procedimento: [],
            lista_exame: {},
            receita: null,


            sexo: null,
            numero: null,

            columns_exame: [
                {
                    label: 'Nome',
                    field: 'nome',
                },
                {
                    label: 'Exame',
                    field: 'actions',
                    sortable: false,
                    // html: true,
                }
                ,
                {
                    label: 'Url',
                    field: 'url',
                    hidden: true,
                }
            ],
            rows_exame: [
                // { id: 1, name: "John", actions: 20, createdAt: '', score: 0.03343 },
            ],

            columns_procedimento: [
                {
                    label: 'Procedimento',
                    field: 'procedimento',
                },
                {
                    label: 'Descrição Porcedimento',
                    field: 'descricao',
                    sortable: false,
                    // html: true,
                }
            ],
            rows_procedimento: [
                // { id: 1, name: "John", actions: 20, createdAt: '', score: 0.03343 },
            ],



        }
    }, created() {

        this.redirecionar();
        this.listar();

        this.consulta_info()
    },
    methods: {
        ver(url) {

            this.img_modal = url

        },
        redirecionar() {

            if (this.$route.params.bi === 'undefined') {
                this.$router.push({ path: '/listarPacinte' })
            }
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



                this.medicos(res.data.data[0].numero_ordem)

                if (res.data.data[0].triagem) {
                    this.triagem = true
                    this.temperatura = res.data.data[0].triagem.temperatura
                    this.peso = res.data.data[0].triagem.peso
                    this.presao_arterial = res.data.data[0].triagem.precao_arterial
                }

                this.date = res.data.data[0].data_consulta
                this.local_consulta = res.data.data[0].local_consulta
                this.descricao_sintoma = res.data.data[0].descricao_sintomas
                this.diagnostico = res.data.data[0].diagnostico
                this.receita = res.data.data[0].receita


                if (res.data.data[0].exame) {

                    this.exame_confirm = true

                    this.lista_de_exame.push(res.data.data[0].exame)


                    this.lista_de_exame.forEach(element => {

                        this.rows_exame.push({ nome: "" + element.nome ? element.nome : "" + "", url: "" + element.url ? element.url : "" + "" })
                    });

                }
                if (res.data.data[0].procedimento) {

                     this.procedimento_confirm = true

                    this.lista_procedimento.push(res.data.data[0].procedimento)


                    this.lista_procedimento.forEach(element => {
                        console.log(element);

                         this.rows_procedimento.push({ procedimento: "" + element.procedimento ? element.procedimento : "" + "", descricao: "" + element.descricoao ? element.descricoao : "" + "" })
                    });

                }



            }).catch((error) => {
                console.error(error)
            })

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
  