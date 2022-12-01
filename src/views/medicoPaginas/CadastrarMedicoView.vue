<template>
    <div class="medico">

        <div v-if="lista" class="alert alert-success alert-dismissible animate__animated animate__fadeInDown">
            <strong>Registado!</strong> Medico Foi Registado!
        </div>

        <div class="card-header py-3">
            <h4 class="m-0 font-weight-bold text-dark text-center">Cadastrar Medico
            </h4>
        </div>

        <div v-if="ok">
            <form ref="paciente" @submit.prevent="user" autocomplete="off" class="form">
                <div class="form-group">
                    <label for="nome">Nome Completo</label>
                    <input type="text" v-model="nome" name="nome" id="nome" required minlength="5"
                        class="form-control" />
                </div>
                <div class="form-group">
                    <label for="data">Numero Ordem</label>
                    <input type="number" v-model="numero_rodem" name="numero_ordem" id="data" required
                        class="form-control" />
                </div>
                <div class="form-group">
                    <label for="local">Especialidade</label>
                    <select name="especialidade" v-model="especialidade" especialidade>
                        <option>Medicina Geral</option>
                        <option>Pediatria</option>
                    </select>
                </div>




                <div style="text-align: right">
                    <button type="submit" name="utibtn" class="btn btn-success btn-small">Registar</button>
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
            ok: true,
            lista: false,

            nome: null,
            numero_rodem: null,
            especialidade: null,

        }
    }, created() {
        //this.getUser();
        this.listar();
    },
    methods: {

        user: function (event) {

            const dados = {

                nome: this.nome,
                numero_rodem: this.numero_rodem,
                especialidade: this.especialidade,

            }

            this.marcial = this.exame
            this.ok = false


            this.nome = ''
            this.numero_rodem = ''
            this.especialidade = ''

            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.post('http://localhost/historico_mais/api/registar_medico', dados, {
                headers: {

                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res.data)
                    this.lista = true;
                    this.ok = true

                })
                .catch((error) => {
                    console.error(error)
                })


            event.target.reset();


        },
        listar() {


        }
    }
}
</script>
  
<style>

</style>
  