<template>
    <div class="editar_paciente">

        <div class="card-header py-3">
            <h4 class="m-0 font-weight-bold text-dark text-center">Editar Paciente
            </h4>
        </div>

        <div v-if="lista">
            <form ref="paciente" @submit.prevent="user" autocomplete="off" class="form">
                <div class="form-group">
                    <label for="nome">Nome Completo</label>
                    <input type="text" v-model="nome" name="nome" value="" id="nome" required minlength="5"
                        class="form-control" />
                </div>
                <div class="form-group">
                    <label for="data">Data Nasciemnto</label>
                    <input type="date" v-model="date" name="data" id="data" required class="form-control" />
                </div>
                <div class="form-group">
                    <label for="local">Sexo</label>
                    <select name="sexo" v-model="sexo">
                        <option>Masculino</option>
                        <option>Femenino</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>BI</label>
                    <input type="text" class="form-control" v-model="doc_identificacao" name="doc_identificacao"
                        placeholder="Insira o Documento da Identificação" autocomplete="off" required="requiored">
                </div>

                <div class="form-group">
                    <label>Numero</label>
                    <input type="text" class="form-control" v-model="numero" name="numero"
                        placeholder="Insira o Documento da Identificação" autocomplete="off" required="requiored">
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
            exame: null,
            marcial: null,
            lista: false,
            paciente: [],

            nome: null,
            date: null,
            doc_identificacao: null,
            sexo: null,
            numero: null

        }
    }, created() {
        //this.getUser();
        this.redirecionar();
        this.listar();
    },
    methods: {
        redirecionar() {
            // this.$route.params.bi ? "" : this.$router.push({path: '/listarPacinte'})
            if (this.$route.params.bi === 'undefined') {
                this.$router.push({ path: '/listarPacinte' })
            }
        },

        user: function (event) {

            const dados = {

                BI: this.doc_identificacao,
                dados: {
                    nome: this.nome,
                    Data: this.date,
                    BI: this.doc_identificacao,
                    sexo: this.sexo,
                    numero: this.numero
                }

            }
            this.lista = false 

            this.nome = ''
            this.date = ''
            this.doc_identificacao = ''
            this.sexo = ''
            this.numero = ''

            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.post('http://localhost/historico_mais/api/editar_paciente', dados, {
                headers: {

                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    this.$router.push({ path: '/listarPacinte' });
                    console.log(res.data)
                  //()  this.lista = res.data.data;

                })
                .catch((error) => {
                    console.error(error)
                })


            event.target.reset();


        },
        listar() {

            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.get('http://localhost/historico_mais/api/paciente?bi=' + this.$route.params.bi + '', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }, params: {
                    BI: this.$route.params.bi
                }
            })
                .then((res) => {
                    console.log(res.data.data[0])
                    console.log(this.$route.params.bi)
                    this.lista = res.data.data[0];

                    console.log(res.data.data[0].nome)
                    this.nome = res.data.data[0].nome ? res.data.data[0].nome : ""
                    this.date = res.data.data[0].Data ? res.data.data[0].Data : ""
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
</style>
  