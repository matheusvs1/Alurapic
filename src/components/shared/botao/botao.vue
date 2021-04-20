<template>
    
    <button @click="disparaAcao()" :class="estiloDoBotao" type="tipo"> {{ rotulo }} </button>

</template>

<script>
export default {
    
    props: {
        
        /* Se eu quiser possso criar uma sequencia de comando para substituir:
        ['tipo', 'rotulo', 'confirmacao', 'estilo'],  Segue a sequência abaixo.*/

        tipo: {
            required: true,
            type: String
        },

        rotulo: {
            required: true,
            type: String
        },

        confirmacao: Boolean,

        estilo: String
    },

    methods: {

        disparaAcao() {
            if(this.confirmacao) {
                if(confirm('confirma a operação?')) {
        
                    this.$emit('botaoAtivado');
                }
                return;
            }
            this.$emit('botaoAtivado');
        }
        /*Apenas reforçando que por este comando, estou mandando um elemento filho mandar informação para
        um elemento pai... Se quiser aprimorar o código, posso colocar um dado extra para passar:
         this.$emit('botaoAtivado', new Date());*/
    },

    computed: {

        estiloDoBotao() {

            if(this.estilo == 'padrao' || !this.estilo) return 'botao botao-padrao';
            if(this.estilo == 'perigo') return 'botao botao-perigo';
        }
    }
}
</script>

<style scoped>

     .botao {
        display: inline-block;
        padding: 10px;
        border-radius: 3px;
        margin: 10px;
        font-size: 1.2em;
    }

    .botao-perigo {
        background: firebrick;
        color: white;
    }

    .botao-padrao {
        background: darkcyan;
        color: white;
    }

</style>