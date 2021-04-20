<!-- Quero criar uma div (class="painel), dentro dela uma h2(classe="painel-titulo")  e ao lado
uma outra div (classe="painel-itens")...

Para isto, uso o comando: div.painel>h2.painel-titulo+div.painel-conteudo
  -->

<template>
 
        <div class="painel">        <!-- v-on: é igual a @-->
            <h2 class="painel-titulo" @dblclick="visible = !visible">{{ titulo }} </h2>
             <!--Para que este divisão receba um componente 
             dentro dela, preciso usar o comando slot... 
             Caso contrário o arquivo será apenas subtituido-->
            
            <transition name="painel-fate">

            <div class="painel-conteudo" v-show="visible">
            <!-- o comando v-show, só funcionar se ele estar contido dentro de uma outra div-->
                <slot> <!--v-show, se for false o elemento não aparece... se for true o elemento aparece... No caso a imagem -->
                </slot>
            </div>

            </transition>

        </div>

</template>

<script>
export default {

    props: ['titulo'],

    data() {

        return{
            visible: true
        }
    }
}
</script>

<style scoped> /*Scoped, diz que todas as mudanças de style são feitos
                apenas neste página e não mais goblamente*/

  .painel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .painel-titulo {
    text-align: center;
    border: solid 2px;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }

/*Observações para os comando de transition:
painel-fade-enter // antes do elemento ser incluído ou removido, o estado atual
painel-fade-enter-active // quando o elemento esta sendo incluído
painel-fade-leave-active // quando o elemento esta sendo removido*/

     * {
      box-shadow: 5px 5px 5px;
  }

 .painel-fade-enter, .painel-fade-leave-active {

     opacity: 0;
 }

 .painel-fade-enter-active, .painel-fade-leave-active {

     transition: opacity .4s;
 }

   .painel-conteudo { /*Este efeito é para quando eu aumentar a imagem, ela não estrapolar o enquadramento. */
    overflow: hidden;
  }

</style>
