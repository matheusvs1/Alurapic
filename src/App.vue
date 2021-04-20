<!-- Quero criar uma div (class="painel), dentro dela uma h2(classe="painel-titulo")  e ao lado
uma outra div (classe="painel-itens")...

Para isto, uso o comando: div.painel>h2.painel-titulo+div.painel-conteudo
  -->

<template>
 
  
 
  <div class="corpo">

    
    <meu-menu :rotas="routes"/>

    <transition name="pagina">  <!--Com isto, vou criar um efeito na hora de trocar de página-->
    
        <!--Hora exibi um componente (home.vue) hora outro (cadastro.vue) -->
        <router-view></router-view>

    </transition>

  </div>
 
</template>

<script>

/*Lá em cima, eu repito o comando "router-link" duas vezes... Por que não usar um v-for... considerando 
que tenho as informações no meu arquivo router.js*/

import {routes} from './router.js';

import menu from './components/shared/menu/menu.vue';

export default {

    components: {

      'meu-menu' : menu

    },

    //Este comando criar o link de rota direto nas minhas telas
    data() {

      return {
        
        routes : routes.filter(route => route.menu)
      }
    }
}
</script>

<style>

  .corpo{
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }

  
 .pagina-enter, .pagina-leave-active {

     opacity: 0;
 }

 .pagina-enter-active, .pagina-leave-active {

     transition: opacity .4s;
 }

</style>
