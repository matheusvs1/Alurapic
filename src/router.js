//Neste arquivo, vou criar as rotas do meu programa

import cadastro from './components/cadastro/cadastro.vue';
import home from './components/home/home.vue';

export const routes = [
    /*Note um problema com o comando: path: '' . Se eu mudar para '/home', terei que efetuar as mesmas mudanças
    de endereço para todos os meus botões e hiperlink criado... Bora deixar o código mais fléxivel*/

    { path: '', name: 'home', component: home, titulo: 'Home', menu: true }, //path: '', equivale ao endereço localhost:3000/#/
    
    { path: '/cadastro', name: 'cadastro', component: cadastro, titulo: 'Cadastro de fotos', menu: true},

    //'/cadastro:id' -> Estou especificando que quando ele receber algo a mais será direcionado para a página de cadastro... E ainda poderei usar este a mais para indentificar qual foto quero alterar
    { path: '/cadastro/:id', name: 'altera', component: cadastro, titulo: 'Cadastro de fotos', menu: false},
    //item "menu" é uma validação para quando for verdade aparecer na tela principal


    //Se aparecer alguma direção desconhecida, o usuário vai para a tela home
    { path: '*', component: home, menu: false}

    
    /* COMANDO SEM A FLEXIBILIDADE ADICIONAL MENCIONADA
    { path: '', component: home, titulo: 'Home' }, //path: '', equivale ao endereço localhost:3000/#/
    { path: '/cadastro', component: cadastro, titulo: 'Cadastro de fotos'}
    */
];