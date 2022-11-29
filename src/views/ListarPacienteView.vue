<template>
    <div class="listarPacinte">

        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h4 class="m-0 font-weight-bold text-dark text-center">Listar Paciente</h4>


            </div>

            <div>
                <vue-good-table :columns="columns" :rows="rows" :line-numbers="true" :search-options="{
                    enabled: true
                }" :pagination-options="{
    enabled: true,
    mode: 'records'
}">
                    <span v-if="columns.field == 'consulta'">
                        Consulta
                    </span>
                </vue-good-table>
            </div>
        </div>

        


    </div>
</template>


<script>
import axios from "axios"
export default {

    data() {
        return {
            lista: null,

            columns: [
                {
                    label: 'Nome',
                    field: 'name',
                },
                {
                    label: 'Data',
                    field: 'date',
                }
                ,
                {
                    label: 'BI',
                    field: 'bi',
                }
                ,
                {
                    label: 'Sexo',
                    field: 'sexo',
                }
                ,
                {
                    label: 'Actions',
                    field: 'actions',
                    sortable: false,
                }
            ],
            rows: [
                // { id: 1, name: "John", age: 20, createdAt: '', score: 0.03343 },
            ],

        }
    }, created() {

        this.listar();
    },
    methods: {
        listar() {

            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.get('http://localhost/historico_mais/api/listar_paciente', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res.data)
                    this.lista = res.data.data;

                    this.lista.forEach(element => {
                        console.log(element.nome)
                        this.rows.push({ name: "" + element.nome + "", date: "" + element.Data + "", bi: "" + element.BI + "", sexo: "" + element.sexo + "" }) //<input type="submit" value="">
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
nav li.router-link-active,
nav li.router-link-exact-active {
    background-color: #42b983;
    color: #42b983;
}

.menucolor {
    background: #00a8e1 !important;
}
</style>
  