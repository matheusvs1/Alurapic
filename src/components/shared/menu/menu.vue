<template>
    
    <!--Como trabalho com Single page Aplication, não posso usar ancora, pois meu objetivo é trocar de página
    sem a necessidade de recarrega-lá; para isto troco a Tag "<a>" por "<router-link>" (tag especial do Vue-router)
      e no lugar de "href" eu uso o comando "to"-->
     <nav>
      <ul>       
          <li v-for="rota in rotas">
              
              <router-link :to="rota.path ? rota.path: '/'"> <!-- O comando ao lado é um "if" inline... Em resumo, quando recebe falso (''), o valor de será "/" que é o retorno para home -->
              
                  {{ rota.titulo }}
              
              </router-link>
          
          </li>
      </ul>
      </nav>

</template>

<script>
export default {
    
    props: ['rotas']
}
</script>

<style scoped>

</style>