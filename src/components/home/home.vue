<!-- Quero criar uma div (class="painel), dentro dela uma h2(classe="painel-titulo")  e ao lado
uma outra div (classe="painel-itens")...

Para isto, uso o comando: div.painel>h2.painel-titulo+div.painel-conteudo
  -->

<template>
 
 
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>

    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="filtre parte do título">
    <!-- filtro = $event.target,value, significa que toda vez que o usuário
    digitar um elemento, o filtro vai armazenar o novo elemento... Para testar basta:
    {{ filtro }} -> Isto vai fazer escrever tudo que foi escrito no input. -->

    <ul class="lista-fotos">
      <li class="lista-foto-item" v-for="foto of fotoscomFiltro"> <!--Não repito o comando para o arrey fotos... Mas agora para a função fotoscomFiltros (computer) -->

      <meu-painel :titulo="foto.titulo">           
          <imagem-responsiva v-meu-transform:scale="1.2" :url="foto.url" :titulo="foto.titulo"> </imagem-responsiva>

          <router-link :to="{ name: 'altera', params: { id: foto._id} }"> <!--paramns: {} significa que estou dando um parâmetro que será indentificado na rota  {path: '/cadastro/:id'}-->
              <meu-botao tipo="button" rotulo="ALTERAR"/>
          </router-link>

          <meu-botao tipo="button" 
                    rotulo="REMOVER" 
                    @botaoAtivado="remove(foto)" 
                    v-bind:confirmacao="true"
                    estilo="perigo"> </meu-botao> <!--Pelo exemplo de elemento filho pro pai, usuaria o comando: @botaoAtivado="remove($event, foto)"-->

            <!--A tag "meu-botao" não esta configurada para reagir a click, diferentes das outras tag (h1, input, etc...)
                Para solucionar, basta colocar esta extanção de "click.native", para esta nova tag tenha o mesmo comportamento.-->
      </meu-painel>

      </li>
    </ul>
  </div>
 
</template>

<script>

//Importar o painel
import painel from '../shared/painel/painel.vue';

import ImagemResponsiva from '../shared/responsiva/ImagemResponsiva.vue';

import Botao from '../shared/botao/botao.vue';

//Importo comando responsável por ABREVIAR os conjuntos "created() e remove()"
import fotoService from '../domain/foto/fotoService';

export default {

  //Comando para utilizar o painel que importei
  components: {
    'meu-painel' : painel,

    'imagem-responsiva' : ImagemResponsiva,

    'meu-botao' : Botao
  },

  data() {

      return{
        titulo: 'Alurapic',
        fotos: [], //precisa definir uma Arrey, caso contrario o comando abaixo não funciona!
        filtro: '',

        mensagem: ''
      }
  }, //importante da ','

  computed: {

    fotoscomFiltro() { //Comando abaixo em JS, para efetuar o filtro
      if(this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      
      } else {
        return this.fotos;
      }
    }
  },

  methods: {

    
    //IREI VOU TROCA TODA O CONJUNTO DE COMANDO POR UMA RELAÇÃO COM O ARQUIVO fotoService.js

    remove(foto) {
      this.service.apaga(foto._id)
          .then(() => {
              let indice = this.fotos.indexOf(foto);
              this.fotos.splice(indice, 1); //Com estes comando, eu removo um item de um arrey.

              this.mensagem="foto removida com sucesso";

                
              },err => {

                  this.mensagem= err.message; //Mesmo caso que em limpar()
            })
      }
  },
    /*
    //Vou SUBSTITUIR o comando remove... usando o .resource
    remove(foto) {

      this.resource
          .delete({ id: foto._id })  //Este delete() é diferente do $http. Ao ínves de passar uma contatenação tenho que passar uma propriedade que eu defino para capturar o que desejo
          .then(() => {
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1); //Com estes comando, eu removo um item de um arrey.

            this.mensagem="foto removida com sucesso";

              
            },err => {
                console.log(err);

                this.mensagem="Não foi possível remover a foto";
          })
    }
  },
    */
/*  REMOVENDO A FOTO UTILIZANDO O COMANDO remove();

    remove(foto) {  /*Pelo exemplo de elemento filho pro pai... usuaria o comando:  remove($event, foto).*/
      //alert(@event);
      //alert('Remover a foto!' + foto.titulo );
/*
        this.$http
          //Pelas configurações no meu main.js, não preciso colocar o endereço completo mais....
          .delete(`v1/fotos/${foto._id}`) // mesma coisa que: "localhost:3000/v1/fotos/" + foto._id
          .then(() => {
            
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1); //Com estes comando, eu removo um item de um arrey.

            this.mensagem="foto removida com sucesso";

            
            },err => {
                console.log(err);

                this.mensagem="Não foi possível remover a foto";
              })
        //CONTUDO: isto não é o suficiente para apagar a foto, preciso encontrar uma forma da página aplicar a mudanças. (lembrando que trabalho com Single Page Aplication)
  /*
    }
    /*O resultado do exemplo em comentário, é que o elemento filho vai passar as informações da data de 
    hoje para o elemento pai... E o mesmo exibirá na tela.*/
/*  },
*/

  created() { //Executo um comando, ao criar a minha página
    
    //AGORA VOU TROCA TODA O CONJUNTO DE COMANDO POR UMA RELAÇÃO COM O ARQUIVO fotoService.js

    this.service = new fotoService(this.$resource);

    this.service
        .lista() //Este lista, vai me devolver uma promessa e me dar a lista de fotos
        .then(fotos => this.fotos = fotos, 
                err => {
                    
                    this.mensagem = err.message; //Este comando vai pegar as mensagem que foi "jogada" dentro de .lista()
                    
                    /* Vou substitiur com comando abaixo por usando as mudanças que apliquei em .lista()
                    console.log(err);
                    //Caso o servidor tenha caido, irá exibir a mensagem abaixo para o usuário
                    this.mensagem = 'Não foi possível carregar as fotos. Tente mais tarde!';
                    */
                }
      );

  }
    /*
    
    //USANDO o comando .$resource para substituir o .get
    this.resource = this.$resource('v1/fotos{/id}'); //Como o comando .$resource não existe, primeiro eu crio ele
                                    //{/id} -> é um parametro que coloco para passar a informação para o delete() acima

    this.resource
      .query() //substitui o comando .get
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));
  } 
  */

    /*
    //ABAIXO eu utilizo o .get para executar meus comando... Porém vou trabalhar com outro ACIMA.
    this.$http.get('v1/fotos') //Comando mais enxuto
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));
    */
    
    /* Segue abaixo o comando completo:
    let promise = this.$http.get('http://localhost:3000/v1/fotos');
    
    promise.then(res => {

        res.json().then(fotos => this.fotos = fotos);
      }
    );
    */
}
</script>

<style>

  .centralizado {
    text-align: center;
  }

  .lista-fotos{
    list-style: none;
  }

  .lista-foto-item{
    display: inline-block;
  }

 
  .filtro {
    display: block;
    width: 100%;
  }

</style>
