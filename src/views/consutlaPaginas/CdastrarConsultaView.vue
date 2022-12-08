<template>
    <div class="historico_pacinte">

        <div class="card-header py-3">
            <h4 class="m-0 font-weight-bold text-dark text-center">Cadastrar Consulta
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
                <div class="row">
                    <div class=" form-group col-6">

                        <select class="form-control" v-model="medico" required="requiored">
                            <option disabled>Medico</option>
                            <option v-for="option in options" :key="option.id" :value="option.value">
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
                            <input type="text" v-model="temperatura" name="temperatura" value="" id="nome" required
                                minlength="5" disabled class="form-control" />

                        </div>

                        <div class="form-group col-6">
                            <label>Peso</label>
                            <input type="text" class="form-control" v-model="peso" name="peso" disabled
                                placeholder="Insira o Documento da Identificação" autocomplete="off"
                                required="requiored">

                        </div>

                        <div class="form-group col-6">
                            <label>Preção Arterial</label>
                            <input type="text" class="form-control" v-model="presao_arterial" name="presao_arterial"
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
                        <input type="text" class="form-control" v-model="local_consulta" name="local_consulta"
                            placeholder="Insira o Documento da Identificação" autocomplete="off" required="requiored">
                    </div>

                </div>
                <div class="form-group ">
                    <label for="exampleFormControlTextarea1">Descrição Sintomas </label>
                    <textarea class="form-control" name="descricao_sintoma" v-model="descricao_sintoma" required
                        id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <div class="form-group ">
                    <label>Diagnóstico</label>
                    <input type="text" class="form-control" v-model="diagnostico" name="diagnostico"
                        placeholder="Insira o Documento da Identificação" autocomplete="off" required="requiored">
                </div>

                <div class="row" id="linha-horizontal"> </div>

                <div class=" form-group col-6">

                    <input type="checkbox" id="checkbox_exame" v-model="exame_confirm" @input="zerarTudo" />
                    <label for="checkbox_exame">Exames</label>
                </div>

                <div v-if="exame_confirm">

                    <div class=" form-group col-6">

                        <input type="number" id="numero_exame" v-model.number="numero_exame" @input="zerar" />
                    </div>
                    <div>

                        <table id="example" class=" table table-bordered " cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>Nª</th>
                                    <th>Exame</th>
                                    <th>Resultado</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr class="animate__animated animate__fadeIn " v-for=" um_exame in numero_exame"
                                    :key="um_exame.id">
                                    <td>
                                        {{ um_exame }}
                                    </td>
                                    <td>
                                        <input type="text" step="any" class="form-control" name="exame[]"
                                            v-model="exame[um_exame - 1]" placeholder="Exame" autocomplete="off"
                                            required="requiored">
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

                </div>



                <div class="row" id="linha-horizontal"> </div>

                <div class="form-group ">
                    <label for="exampleFormControlTextarea1">Receita </label>
                    <textarea class="form-control" v-model="receita" name="receita" required
                        id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <div style="text-align: right" class="d-flex flex-row">
                    <button type="submit" name="utibtn" class="btn btn-success btn-small">Registar</button>
                    <router-link class="btn bg-danger" to="/listarPacinte">Cancelar</router-link>
                </div>
            </form>
        </div>

        <div v-else class="spinner "> </div>

        <!--

       

        <select v-model="medico">
            <option v-for="option in options" :key="option" :value="option.value">
                {{ option.text }}
            </option>
        </select>

        <div>medico: {{ medico }}</div>
        <div>Exame: {{ exame }}</div>


        <input type="file" @change="onFile" />
        <img :src="imgSrc" v-if="imgSrc" />
        <img :src="imgSrc" v-if="imgSrc" />

    -->

        <div>medico: {{ medico }}</div>



    </div>

</template>
  
  
<script>
import axios from "axios"

export default {
    name: 'App',
    data() {
        return {

            numero_exame: 1,

            imgSrc: '',

            imagem: [],
            mostrar: '',

            triagem: null,
            exame_confirm: null,

            medico: 'Medico',
            options: [],

            marcial: null,
            lista: false,
            paciente: [],

            nome: null,

            doc_identificacao: null,


            //dadso da triagem//
            temperatura: null,
            peso: null,
            presao_arterial: null,
            //dadso da consulta 
            date: null,
            local_consulta: null,
            descricao_sintoma: null,
            diagnostico: null,
            /// dados exame
            exame: [],
            lista_de_exame: {},
            lista_exame: {},
            receita: null,


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

            if (this.$route.params.bi === 'undefined') {
                this.$router.push({ path: '/listarPacinte' })
            }
        },
        onFile(e) {
            const files = e.target.files
            if (!files.length) return

            this.imagem.push(files[0]);

            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = () => (this.imgSrc = reader.result)
        },

        file() {

            var i = 0;
            this.imagem.forEach(element => {
                /// console.log(element)
                let formData = new FormData();
                formData.append('sendimage', element);

                const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

                axios.post('http://localhost/historico_mais/api/arquivo', formData, {
                    headers: {

                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        // this.$router.push({ path: '/listarPacinte' });
                        //  console.log(res.data.message)
                        this.mostrar = res.data.message
                        //()  this.lista = res.data.data;
                        this.lista_exame = {
                            nome: this.exame[i],
                            url: res.data.message
                        }

                        Object.assign(this.lista_de_exame,this.lista_exame);
                       // this.lista_de_exame.push(this.lista_exame)

                        console.log(this.lista_exame)

                        console.log(i)
                        i++

                        // console.log(this.exame[this.i])

                    })
                    .catch((error) => {
                        console.error(error)
                    })





            });

           // console.log(this.lista_de_exame)
            // this.zerarTudo()


        },

        user: function (event) {

            let dados = {
                BI: this.doc_identificacao,
                numero_ordem: this.medico,

                dados: {
                    data_consulta: this.date,
                    local_consulta: this.local_consulta,
                    descricao_sintomas: this.descricao_sintoma,
                    diagnostico: this.diagnostico,
                    receita: this.receita

                }

            }

            if (this.exame_confirm) {

                this.file()

               
               // Object.assign(dados.dados, { exame: this.lista_de_exame });


               
                dados = {
                    BI: this.doc_identificacao,
                    numero_ordem: this.medico,

                    dados: {
                        data_consulta: this.date,
                        local_consulta: this.local_consulta,
                        descricao_sintomas: this.descricao_sintoma,
                        diagnostico: this.diagnostico,
                        receita: this.receita,
                        exame: this.lista_de_exame

                    }

                } 
                console.log(this.lista_de_exame)

                this.exame_confirm = null
            }


            //  this.doc_identificacao = ''
            this.local_consulta = ''
            this.medico = 'Medico'
            this.date = ''
            this.descricao_sintoma = ''
            this.diagnostico = ''
            this.receita = ''

            console.log(dados)
            this.lista = false

            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImF1ZCI6IjEyMyJ9.NUChvtBBL_1gZBQPLB3kwPIEPbCn0U2vWyyUI6l03R8'

            axios.post('http://localhost/historico_mais/api/registar_consulta', dados, {
                headers: {

                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                   // this.$router.push({ path: '/listarPacinte' });
                    console.log(res.data)
                    this.listar()
                    //()  this.lista = res.data.data;

                })
                .catch((error) => {
                    console.error(error)
                })

            /*
   
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
   */

            event.target.reset();
        },
        zerar() {
            this.imagem.length = 0
            this.exame.length = 0
        },
        zerarTudo() {
            this.zerar()
            this.numero_exame = 1
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
                //  console.log(this.$route.params.bi)
                this.lista = res.data.data[0];

                //console.log(res.data.data[0].nome)
                this.nome = res.data.data[0].nome ? res.data.data[0].nome : ""
                //  this.date = res.data.data[0].Data ? res.data.data[0].Data : ""
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
  