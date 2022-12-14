<template>
    <div class="historico_pacinte">

        <div class="card-header py-3">
            <h4 class="m-0 font-weight-bold text-dark text-center">Historico do Paciente
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

                <div class="form-group d-flex justify-content-center ">
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-secondary active">
                            <input type="radio" @click="consultas" name="options" id="option1" autocomplete="off"
                                checked> Consultas
                        </label>

                        <label class="btn btn-secondary">
                            <input type="radio" @click="exames" name="options" id="option3" autocomplete="off"> Exames
                        </label>
                    </div>
                </div>

                <div v-if="confirm_consulta" class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h4 class="m-0 font-weight-bold text-dark text-center">Listar Consulta</h4>


                    </div>

                    <div>
                        <vue-good-table :columns="columns" :rows="rows" :line-numbers="true" :search-options="{
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
                                    <router-link class="btn bg-success btn-sm text-center"
                                        :to="{ name: 'historico_pacinte_consutla', params: { bi: doc_identificacao , id_consulta: props.row.id_consulta  } }">Ver</router-link>

                                  
                                </span>
                            </template>

                        </vue-good-table>
                    </div>
                </div>

                <div v-if="confirm_exames" class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h4 class="m-0 font-weight-bold text-dark text-center">Listar Exame</h4>


                    </div>

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
                                    <!--
                                    <router-link class="btn bg-success btn-sm"
                                        :to="{ name: 'consulta', params: { bi: props.row.bi } }">Ver</router-link> -->


                                    <img :src="props.row.url" @click="ver(props.row.url)" alt="" width="66" height="66"
                                        srcset="" data-toggle="modal" data-target="#exampleModal">

                                </span>
                            </template>


                        </vue-good-table>
                    </div>
                </div>




                <div style="text-align: right" class="d-flex flex-row">
                    <router-link class="btn bg-danger" to="/listarPacinte">Voltar</router-link>
                </div>
            </form>
            <!-- Button trigger modal  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button> -->


            <!-- Modal -->
            <div class="modal fade " id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered " role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Imagem</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img :src="img_nem" height="300px" width="100%" alt="" srcset="">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
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

            confirm_consulta: true,
            confirm_exames: null,
            img_nem: null,


            columns: [
                {
                    label: 'Diagnostico',
                    field: 'diagnostico',
                },
                {
                    label: 'Data',
                    field: 'date',
                }
                ,
                {
                    label: 'Local',
                    field: 'local',
                }
                ,
                {
                    label: 'Consulta',
                    field: 'actions',
                    sortable: false,
                    // html: true,
                },
                {
                    label: 'Id_consulta',
                    field: 'id_consulta',
                    hidden: true,
                }
               
            ],
            rows: [
                // { id: 1, name: "John", actions: 20, createdAt: '', score: 0.03343 },
            ],


            columns_exame: [
                {
                    label: 'Nome',
                    field: 'nome',
                },
                {
                    label: 'Local',
                    field: 'local',
                }
                ,
                {
                    label: 'Data',
                    field: 'date',
                },
                {
                    label: 'Consulta',
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

            lista_consulta: null,
            lista_exame: null,



            lista: false,


            nome: null,

            doc_identificacao: null,


        }
    }, created() {
        //this.getUser();
        this.redirecionar();
        this.listar();
        this.historico()
    },
    methods: {
        redirecionar() {
           
            if (this.$route.params.bi === 'undefined') {
                this.$router.push({ path: '/listarPacinte' })
            }
        },
        ver(url) {
            console.log("ver clicado com a url" + url)
            this.img_nem = url

        },

        user: function () {


        },
        exames() {
            console.log("exame")

            this.confirm_consulta = false
            this.confirm_exames = true
        },
        consultas() {
            console.log("consulta ")
            this.confirm_exames = false
            this.confirm_consulta = true
        },

        historico() {
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.get('http://localhost/historico_mais/api/listar_consulta?bi=' + this.$route.params.bi + '', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }, params: {
                    BI: this.$route.params.bi
                }
            }).then((res) => {

                console.log(res.data)

                this.lista_consulta = res.data.data;

                this.lista_consulta.forEach(element => {
                    console.log(element.diagnostico)
                    this.rows.push({ diagnostico: "" + element.diagnostico ? element.diagnostico : "" + "", date: "" + element.data_consulta ? element.data_consulta : "" + "", local: "" + element.local_consulta ? element.local_consulta : "" + "", id_consulta: "" + element.id_consulta ? element.id_consulta : "" + "" /*, sexo: "" + element.sexo ? element.sexo : "" + "", actions: '' */ }) //<input type="submit" value="">
                });

              

            }).catch((error) => {
                console.error(error)
            })


            axios.get('http://localhost/historico_mais/api/listar_exame?bi=' + this.$route.params.bi + '', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }, params: {
                    BI: this.$route.params.bi
                }
            }).then((res) => {


                this.lista_exame = res.data.data;
                console.log(res.data.data)

                this.lista_exame.forEach(element => {
                    console.log(element.url)
                    this.rows_exame.push({ nome: "" + element.nome ? element.nome : "" + "", local: "" + element.local_exame ? element.local_exame : "" + "", date: "" + element.data ? element.data : "" + "", url: "" + element.url ? element.url : "" + "",/*, sexo: "" + element.sexo ? element.sexo : "" + "", actions: '' */ }) //<input type="submit" value="">
                });

                /*
                console.log(this.$route.params.bi)
                this.lista = res.data.data[0];

                console.log(res.data.data[0].nome)
                this.nome = res.data.data[0].nome ? res.data.data[0].nome : ""
                this.date = res.data.data[0].Data ? res.data.data[0].Data : ""
                this.doc_identificacao = res.data.data[0].BI ? res.data.data[0].BI : ""
                this.sexo = res.data.data[0].sexo ? res.data.data[0].sexo : ""
                this.numero = res.data.data[0].numero ? res.data.data[0].numero : "" */

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
                // console.log(res.data.data[0])
                //console.log(this.$route.params.bi)
                this.lista = res.data.data[0];

                console.log(res.data.data[0].nome)
                this.nome = res.data.data[0].nome ? res.data.data[0].nome : ""
                this.date = res.data.data[0].Data ? res.data.data[0].Data : ""
                this.doc_identificacao = res.data.data[0].BI ? res.data.data[0].BI : ""
                this.sexo = res.data.data[0].sexo ? res.data.data[0].sexo : ""
                this.numero = res.data.data[0].numero ? res.data.data[0].numero : ""
            }).catch((error) => {
                console.error(error)
            })

        }

    }
}
</script>
  
<style>

</style>
  