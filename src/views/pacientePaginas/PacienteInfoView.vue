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





                <div style="text-align: right" class="d-flex flex-row">
                    <router-link class="btn bg-danger" to="/listarPacinte">Voltar</router-link>
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
            // this.$route.params.bi ? "" : this.$router.push({path: '/listarPacinte'})
            if (this.$route.params.bi === 'undefined') {
                this.$router.push({ path: '/listarPacinte' })
            }
        },

        user: function () {


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
                console.log(res.data.data[0])
                console.log(this.$route.params.bi)
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
  