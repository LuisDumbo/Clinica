<template>
    <div class="historico_pacinte">

        <div class="card-header py-3">
            <h4 class="m-0 font-weight-bold text-dark text-center">Cadastrar Consulta
            </h4>
        </div>

        <div v-if="lista">
            <form ref="paciente" @submit.prevent="file" autocomplete="off" class="form">
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

                        <select class="form-control" v-model="selected">
                            <option disabled>Medico</option>
                            <option v-for="option in options" :key="option" :value="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>

                    <div class=" form-group col-6">

                        <input type="checkbox" id="checkbox" v-model="triagem" />
                        <label for="checkbox">Triagem</label>
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
                            <input type="text" v-model="nome" name="nome" value="" id="nome" required minlength="5"
                                disabled class="form-control" />

                        </div>

                        <div class="form-group col-6">
                            <label>Peso</label>
                            <input type="text" class="form-control" v-model="doc_identificacao" name="doc_identificacao"
                                disabled placeholder="Insira o Documento da Identificação" autocomplete="off"
                                required="requiored">

                        </div>

                        <div class="form-group col-6">
                            <label>Preção Arterial</label>
                            <input type="text" class="form-control" v-model="doc_identificacao" name="doc_identificacao"
                                disabled placeholder="Insira o Documento da Identificação" autocomplete="off"
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
                        <input type="date" v-model="date" name="data" id="data" required class="form-control" />
                    </div>
                    <div class="form-group col-6">
                        <label>Local</label>
                        <input type="text" class="form-control" v-model="doc_identificacao" name="doc_identificacao"
                            placeholder="Insira o Documento da Identificação" autocomplete="off" required="requiored">
                    </div>

                </div>
                <div class="form-group ">
                    <label for="exampleFormControlTextarea1">Descrição Sintomas </label>
                    <textarea class="form-control" name="descricao" required id="exampleFormControlTextarea1"
                        rows="3"></textarea>
                </div>

                <div class="form-group ">
                    <label>Diagnóstico</label>
                    <input type="text" class="form-control" v-model="doc_identificacao" name="doc_identificacao"
                        placeholder="Insira o Documento da Identificação" autocomplete="off" required="requiored">
                </div>

                <div class="row" id="linha-horizontal"> </div>

                <div class=" form-group col-6">

                    <input type="checkbox" id="checkbox_exame" v-model="exame_confirm" />
                    <label for="checkbox_exame">Exames</label>
                </div>

                <div v-if="exame_confirm">

                    <table id="example" class=" table table-bordered " cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Exame</th>
                                <th>Resultado</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>
                                    <input type="text" step="any" class="form-control" name="exame[]"
                                        placeholder="Exame" autocomplete="off" required="requiored">
                                </td>
                                <td>
                                    <input type="file" ref="file" step="any" class="form-control" name="solucao[]"
                                        @change="onFile" placeholder="Resultado" autocomplete="off"
                                        required="requiored">
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>



                <div class="row" id="linha-horizontal"> </div>

                <img :src="imgSrc" v-if="imgSrc" />


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

        <select v-model="selected">
            <option v-for="option in options" :key="option" :value="option.value">
                {{ option.text }}
            </option>
        </select>

        <div>Selected: {{ selected }}</div>


    </div>

</template>
  
  
<script>
import axios from "axios"

export default {
    name: 'App',
    data() {
        return {

            imgSrc: '',
            imagem: '',

            triagem: null,
            exame_confirm: null,

            selected: 'Medico',
            options: [],
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
        this.medicos();
    },
    methods: {
        redirecionar() {
            // this.$route.params.bi ? "" : this.$router.push({path: '/listarPacinte'})
            if (this.$route.params.bi === 'undefined') {
                this.$router.push({ path: '/listarPacinte' })
            }
        },
        onFile(e) {
            const files = e.target.files
            if (!files.length) return

            this.imagem = this.$refs.file.files[0];

            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = () => (this.imgSrc = reader.result)
        },

        file() {
            let formData = new FormData();
            formData.append('sendimage', this.imagem);

            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.post('http://localhost/historico_mais/api/arquivo', formData, {
                headers: {

                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    // this.$router.push({ path: '/listarPacinte' });
                    console.log(res.data)
                    //()  this.lista = res.data.data;

                })
                .catch((error) => {
                    console.error(error)
                })

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





        }, medicos() {
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.get('http://localhost/historico_mais/api/listar_medico', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    // console.log(res.data)
                    this.lista_medicos = res.data.data;

                    this.lista_medicos.forEach(element => {
                        //console.log(element.nome)
                        this.options.push({ text: element.nome, value: element.numero_rodem ? element.numero_rodem : "" }) //<input type="submit" value="">
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
  