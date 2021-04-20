/* TODO ACESSO a API, vai ser atravez deste arquivo fotoService.js!

 */

export default class fotoService {

    constructor(resource) {

        this._resource = resource('v1/fotos{/id}')
    }

    //OBS.: É uma boa pratica sempre alertar um erro com uma mensagem de ALTO nível para o usuário, ou seja, por aqui!

    lista() {

        return this._resource
                .query()
                .then(res => res.json(), err => { //Configurei minha professa, que será conprida lá em home.vue, para retornar o que desejo (".then(fotos => this.fotos = fotos, err => console.log(err));")
                    console.log(err);

                    throw new Error('Não foi possível carregar as fotos'); //Faz o Callback de erro da promisse
                }); 

    }

    cadastra(foto) {

        if(foto._id) { //Se a foto tem um ID eu faço um Uptade

            return this._resource
                    .update({ id: foto._id }, foto); //Vai receber o mesmo Id e a nova foto

        } else { //Se não eu faço um Post

                    return this._resource
                       .save(foto);
                }

    }

    apaga(id) {

        return this._resource.delete({ id }) //como {/id} e id tem o mesmo nome posso dizer apenas "id"
            .then(null, err => {
                console.log(err);
                throw new Error('Não foi possível remover a foto. Tente mais tarde');
            })
    }

    busca(id) {

        return this._resource
                .get({ id })
                .then(res => res.json());
    }
}