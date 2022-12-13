<template>
    <div class="editar_paciente">

        <div class="card-header py-3">
            <h4 class="m-0 font-weight-bold text-dark text-center">Informação Medico
            </h4>
        </div>

        <div v-if="lista">
            <form ref="paciente" @submit.prevent="user" autocomplete="off" class="form">

                <div class="row">
                    <div class="form-group col-6">
                        <label for="nome">Nome Completo</label>
                        <input type="text" v-model="nome" name="nome" id="nome" required minlength="5" disabled
                            class="form-control" />

                    </div>

                    <div class="form-group col-6">
                        <label for="data">Numero Ordem</label>
                        <input type="number" v-model="numero_rodem" name="numero_ordem" id="data" required disabled
                            class="form-control" />

                    </div>

                </div>

                <div  class="card shadow mb-4">
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
                            <!--

                            <template slot="table-row" slot-scope="props">
                                <span class="d-flex flex-row" v-if="props.column.field == 'actions'">
                                    <router-link class="btn btn-primary btn-sm w-25 "
                                        :to="{ name: 'historico_pacinte', params: { bi: props.row.bi } }">Info</router-link>
                                 
                                    <router-link class="btn bg-success btn-sm"
                                        :to="{ name: 'consulta', params: { bi: props.row.bi } }">Constula</router-link>
                                    <router-link class="btn bg-info btn-sm"
                                        :to="{ name: 'cadastrar_exame', params: { bi: props.row.bi } }">Exame
                                    </router-link>
                                    <router-link class="btn bg-warning btn-sm"
                                        :to="{ name: 'editar_paciente', params: { bi: props.row.bi } }">Edit
                                    </router-link>
                                </span>
                            </template> -->

                        </vue-good-table>
                    </div>
                </div>



                <div style="text-align: right" class="d-flex flex-row">

                    <router-link class="btn bg-danger" to="/listar_medico">Voltar</router-link>
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
                /*
                {
                    label: 'Sexo',
                    field: 'sexo',
                }
                ,
                {
                    label: 'Consulta',
                    field: 'actions',
                    sortable: false,
                    // html: true,
                } */
            ],
            rows: [
                // { id: 1, name: "John", actions: 20, createdAt: '', score: 0.03343 },
            ],
            exame: null,

            lista_consulta: null , 
            marcial: null,
            lista: false,
            paciente: [],

            nome: null,
            numero_rodem: null,
            especialidade: null,

        }
    }, created() {
        //this.getUser();
        this.redirecionar();
        this.listar();
        this.historico();
    },
    methods: {
        redirecionar() {
            // this.$route.params.bi ? "" : this.$router.push({path: '/listarPacinte'})
            if (this.$route.params.bi === 'undefined') {
                this.$router.push({ path: '/listar_medico' })
            }
        },
        historico() {

            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.get('http://localhost/historico_mais/api/listar_consulta_medico?numero_ordem=' + this.$route.params.numero_rodem + '', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }, params: {
                    BI: this.$route.params.bi
                }
            }).then((res) => {

               // console.log(res.data)

                this.lista_consulta = res.data.data;
               // console.log(this.$route.params.numero_rodem )

                this.lista_consulta.forEach(element => {
                    //console.log(this.$route.params.numero_rodem )
                    this.rows.push({ diagnostico: "" + element.diagnostico ? element.diagnostico : "" + "", date: "" + element.data_consulta ? element.data_consulta : "" + "", local: "" + element.local_consulta ? element.local_consulta : "" + "" /*, sexo: "" + element.sexo ? element.sexo : "" + "", actions: '' */ }) //<input type="submit" value="">
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

            axios.get('http://localhost/historico_mais/api/medico?numero_ordem=' + this.$route.params.numero_rodem + '', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    // console.log(res.data.data[0])
                    //console.log(this.$route.params.bi)
                    this.lista = res.data.data[0];

                    // console.log(res.data.data[0].nome)
                    this.nome = res.data.data[0].nome ? res.data.data[0].nome : ""
                    this.numero_rodem = res.data.data[0].numero_rodem ? res.data.data[0].numero_rodem : ""
                    this.especialidade = res.data.data[0].especialidade ? res.data.data[0].especialidade : ""



                })
                .catch((error) => {
                    console.error(error)
                })

            // console.log(this.$route.params.numero_ordem);




        }

    }
}
</script>
  
<style>

</style>
  