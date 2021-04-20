/*Resumo da história:
    Eu apliquei uma diretira de girar a imagem na tag <imagem-responsiva>, para ela executar este conjunto de comando.
    MAS... Se eu aplicar a diretiva em qualquer outra tag, ela irá executar os comando abaixo! */

import Vue from 'vue';

Vue.directive('meu-transform', {

    bind(el, binding, vnode) { //Parâmetros padrões do comendo "bind"
 
        console.log('diretiva.associada');
        console.log(el);
        /*Os comando acimas, mostrar no console a frase: 'diretiva associada' e em seguida o elemento imagem
        que ela esta associada. (home.vue)<imagem-responsiva v-meu-transform :url="foto.url" :titulo="foto.titulo">*/ 
    
        let current = 0; //Comando para a variável de mudança de imagem começar para baixo

        /*Existem duas formas de fazer a animação de duplo clique viro a tag desejada:*/

        //  1º  CRIANDO UM OBJETO NA TAG: `v-meu-transform="{incremento:90, animate:true}"`
    /*
        el.addEventListener('dblclick', function() { //Evento que quando dou double click executo a função

        /*Nada me impede de ao ínves de colocar apenas um parâmento na tag ` v-meu-transform = "15" ` 
          colocar um OBJETO, com vários elementos: ´ v-meu-transform = "{incremento: 15, animate: true}" ´*/
        //COM ISTO:
    /*
            let incremento = 90;
            let animate = false;

            if(binding.value) { //Se tiver um valor dentro da tag `v-meu-transform`
               
                incremento = binding.value.incremento;
                animate = binding.value.animate;   
            }

            //Com os dois comando abaixo, estou trabalhando colocando um valor único na tag ` v-meu-transform `
            
            /*let incremento = binding.value || 90; /*Se eu definir um valor no comando (em home.vue) por exemplo:
                                            ` v-meu-transform = "15" `. O comando binding será responsável por captura o valor dado. */
    /*        current+= incremento;


            el.style.transform = `rotate(${current}deg)`; //Estilo em Css que aplico na tag<imagem-responsiva> para faze-lá girar
            
            //Vou usar o SEGUNDO elemento do OBJETO que a Tag armazenou
            if(animate) el.style.transition = "transform 0.5s"


            
        }) */
    
        // 2ª COLOCO UM MODIFICADO NA TAG DESEJADA: v-meu-transform.animate.reverse="15"

        //OBS.: Para tirar o efeito da animação ou a reversão, basta mudar o nome da tag, retirando o ".animate" ou ".reverse"
        
        /*
        el.addEventListener('dblclick', function() { 
            
            let incremento = binding.value || 90;
            let animate = false;

            if(binding.modifiers.reverse) {
                current-= incremento;

            } else {
                current+= incremento;
            }

            el.style.transform = `rotate(${current}deg)`;
        
            if(binding.modifiers.animate) el.style.transition = "transform 0.5s";
        });
        */
        
        /*A minha diretiva, além de suportar um ELEMENTO e OBJETO, posso fazer ela salvar ARGUMENTO
        Onde na TAG v-meu-transform, poderá se chamar:
        v-meu-transform:rotate.animate -> Chamo um argumento que manda a tag rotacionar (com animação)
        v-meu-transform:scale -> Chamo um argumento que manda a tag aumentar ou diminuir de tamanho
        */
       
        el.addEventListener('dblclick', function() { 
            
        let incremento = binding.value || 90;
        let animate = false;
        let efeito;

        if(!binding.arg || binding.arg == 'rotate') { //Se não foi passado nenhum argumento ou o argumento é igual a rotate
            if(binding.modifiers.reverse) {
                current-= incremento;

            } else {
                current+= incremento;
            }

            efeito = `rotate(${current}deg)`; //current -> rotação que vai somando com a anterior
        
        } else if(binding.arg == 'scale') {

            efeito = `scale(${incremento})`; //incremento -> o valor é fixo e não fica aumentando
        }

        el.style.transform = efeito; //O transform agora recebe uma variável, que dependedo da tag, vai girar ou aumentar a imagem
    
        if(binding.modifiers.animate) el.style.transition = "transform 0.5s";
    });

    }
})