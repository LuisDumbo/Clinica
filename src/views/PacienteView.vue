<template>
    <div class="paciente">

        <div class="card-header py-3">
            <h4 class="m-0 font-weight-bold text-dark text-center">Cadastrar Paciente
            </h4>
        </div>




        <form ref="paciente" @submit.prevent="user" autocomplete="off" class="form">
            <div class="form-group">
                <label for="nome">Nome Completo</label>
                <input type="text" v-model="nome" name="nome" id="nome" required minlength="5" class="form-control" />
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


            <div style="text-align: right">
                <button type="submit" name="utibtn" class="btn btn-success btn-small">Registar</button>
            </div>
        </form>

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
            lista: null,

            nome: null,
            date: null,
            doc_identificacao: null,
            sexo: null,
            numero: null

        }
    }, created() {
        //this.getUser();
        this.listar();
    },
    methods: {

        user: function (event) {

            const dados = {

                nome: this.nome,
                Data: this.date,
                BI: this.doc_identificacao,
                sexo: this.sexo,
                numero: this.numero

            }

            this.marcial = this.exame

            var json = JSON.stringify(dados);
            console.log(json)

            this.nome = ''
            this.date = ''
            this.doc_identificacao = ''
            this.sexo = ''
            this.numero = ''

            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.post('http://localhost/historico_mais/api/registar_paciente', dados, {
                headers: {
                    
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res.data)
                    this.lista = res.data.data;
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
  