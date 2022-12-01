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
            
                <div class="form-group">
                    <label for="local">Especialidade</label>
                    <select name="especialidade" v-model="especialidade" disabled especialidade>
                        <option>Medicina Geral</option>
                        <option>Pediatria</option>
                    </select>
                </div>

                <div style="text-align: right" class="d-flex flex-row">
                    <button type="submit" name="utibtn" class="btn btn-success btn-small">Guardar</button>
                    <router-link class="btn bg-danger" to="/listar_medico">Cancelar</router-link>
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
            numero_rodem: null,
            especialidade: null,

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
                this.$router.push({ path: '/listar_medico' })
            }
        },

        user: function (event) {

            const dados = {

                numero_rodem: this.numero_rodem,
                dados: {

                    nome: this.nome,
                    numero_rodem: this.numero_rodem,
                    especialidade: this.especialidade,
                }

            }
            this.lista = false

            this.nome = ''
            this.numero_rodem = ''
            this.especialidade = ''

            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.post('http://localhost/historico_mais/api/editar_medico', dados, {
                headers: {

                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    this.$router.push({ path: '/listar_medico' });
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
  