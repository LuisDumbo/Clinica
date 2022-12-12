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
    mode: 'records',
    perPage: 5,
}">
                    <div slot="emptystate">
                        Sem dados
                    </div>

                    <template  slot="table-row" slot-scope="props">
                        <span class="d-flex flex-row" v-if="props.column.field == 'actions'">
                            <router-link class="btn btn-primary btn-sm w-25 " :to="{ name: 'historico_pacinte', params: { bi: props.row.bi } }">Info</router-link> <!--{{props.row.bi}} -->
                            <router-link class="btn bg-success btn-sm"  :to="{ name: 'consulta', params: { bi: props.row.bi } }">Constula</router-link> 
                            <router-link class="btn bg-info btn-sm"  :to="{ name: 'cadastrar_exame', params: { bi: props.row.bi } }">Exame </router-link> 
                            <router-link class="btn bg-warning btn-sm" :to="{ name: 'editar_paciente', params: { bi: props.row.bi } }">Edit </router-link> 
                        </span>
                    </template>

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
                    label: 'Consulta',
                    field: 'actions',
                    sortable: false,
                    // html: true,
                }
            ],
            rows: [
                // { id: 1, name: "John", actions: 20, createdAt: '', score: 0.03343 },
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
                        this.rows.push({ name: "" + element.nome + "", date: "" + element.Data ? element.Data : "" + "", bi: "" + element.BI ? element.BI : "" + "", sexo: "" + element.sexo ? element.sexo : "" + "", actions: '' }) //<input type="submit" value="">
                    });
                })
                .catch((error) => {
                    console.error(error)
                })

        }, escolher(params) {
            console.log("Nome : " + params.row.name);
            // this.id = params.row.id;
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
  