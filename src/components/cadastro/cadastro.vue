<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado"> {{ foto.titulo }}</h2>

    <h2 v-if="foto._id" class="centralizado">Alterando</h2> <!-- v-if, se or verdade o h2 aparece se for false ele não aparece-->
    
    <h2 v-else class="centralizado">Incluindo</h2> 

    <form @submit.prevent="grava()"> <!--Temos um problema aqui... Pois o comando submit por padrão vai recarregar
                                a página, fugindo da proposta de ser um Single Page aplication, então tenho
                                que motificar o comando submit: .prevent = Cancelar o componente padrão do comando -->



<!--NOTE O SEGUINTE: Neste três comando do form... Eu usei um caminho Bilateral de trafego de dados
                     @input -> Tem o papel de passar os dados do cadastro para o banco de dados
                     :value -> Tem o papel de pegar os dados em branco em "methods" e limpar os campos
                     
        Em resumo, fazia o seguinte código respectivo:
            @input="foto.titulo = $event.target.value" :value="foto.titulo"
            Um de ida e outro de volta...
            
    CONTUDO: como quero criar um caminho bilateral, ao ínves de colocar dois código, posso colocar
             apenas um, daí entra o nosso comando v-model-->


      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input data-vv-as="título" name="titulo" v-validate data-vv-rules="required" id="titulo" autocomplete="off" v-model="foto.titulo">
        <!--v-validate: chamo as ferramentas de validação do Vue;
            data-vv-rules: Regra que estou passando que a minha validação precisa seguir
            "errors.has('titulo'): Propriedade criara automaticamente pelo Vue-Validade, para guardar os possíveis erros do formulário"-->
        <span class="erro" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span> <!--Estou Interpolando uma mensagem padrão do Vuevalidate-->
      </div>
       

      <div class="controle">
        <label for="url">URL</label>
        <input name="url" v-validate data-vv-rules="required" id="url" autocomplete="off" v-model="foto.url"> <!--O modificador padrão .lazy tem a função de postergar a ação e só realizar quando sair do campo input-->
        
        <span class="erro" v-show="errors.has('url')">{{ errors.first('url') }}</span>

        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"> </imagem-responsiva>
            <!--O comando v-show tem a função de só exibir algo quando for verdadeiro... no caso, só irá exibir algo se existir conteúdo em url-->
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao">
        </textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        
        <!--Ao ínves de colocar o endereço da rota (gerando problema caso seja alterado) vou colocar o NOME que direciona a rota. P.s.: Como não é uma aplicação direta, preciso fazer um v-bind em to-->
        <router-link :to="{ name: 'home' }"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/botao.vue';

import Foto from '../domain/foto/foto.js'; //Importando o modelo do objeto "foto: {...}"

//Importo comando responsável por ABREVIAR os conjuntos "created()"
import fotoService from '../domain/foto/fotoService';

export default {


  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },

  data() {

      return {

        /*Note que repeto a estrutura do objeto foto: {...} duas vezes... Para evitar repetição vou criar 
        um modelo que terá como padrão o formato deste objeto (foto.js)*/

          foto: new Foto(),

          id: this.$route.params.id //$route comando especial do Vuerouter... .id mesmo nome que /cadastro/:id' (em router.js)

      }
  },

  methods: {

    grava() {

        this.service
            .cadastra(this.foto)
            .then(() => {

                if(this.id) { //Tem um id na foto que gravar?

                    this.$router.push({ name: 'home' });
                } 
                this.foto = new Foto();
                
                },
            err => console.log(err));
    }

    //IREI VOU TROCA TODA O CONJUNTO DE COMANDO POR UMA RELAÇÃO COM O ARQUIVO fotoService.js

      /*
      grava() {
        //Vou substituir o http pelo .resource
          this.resource
            .save(this.foto)
            .then(() => this.foto = new Foto(), err => console.log(err));
      }
      */

/*COMANDO SEM USAR O RESOURCE
          this.$http
            .post('v1/fotos', this.foto)

            .then(() => this.foto = new Foto(), err => console.log(err)); //.then (se der certo, se der errado)... No caso: se der certo -> subsitui o objeto Foto() com os novos dados; Se der errado -> Coloque no terminal erro.
*/          
    //Rápida observação, o comando .post(), envia dados para o banco de dados. (x,y) x: origem para onde quero enviar; y: Quais dados vou enviar
    //Diferente do .get() usado no home.vue; cuja função é trazer os dados para a página

          
          /* OS COMANDOS ABAIXO, É A PROVA QUE CONSIGO ARMAZENAR OS DADOS QUE O USUÁRIO ESCREVER
          console.log(this.foto.titulo);
          console.log(this.foto.url);
          console.log(this.foto.descricao);
          */
  },

   created() {

    //IREI VOU TROCA TODA O CONJUNTO DE COMANDO POR UMA RELAÇÃO COM O ARQUIVO fotoService.js
    this.service = new fotoService(this.$resource);
    
    //this.resource = this.$resource('v1/fotos');

    if(this.id) {
        this.service
            .busca(this.id)
            .then(foto => this.foto = foto);
    }
  }

}

</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

  .erro {
    color: red;

  }
</style>