<template>
    <div>
        <p>{{Quiz.id}}{{ Quiz.name }} {{ Quiz.topic }}</p>
        <router-link :to= '/take-quiz/'>TAKE THE QUIZ</router-link>
    </div>
    
</template>


<script>
//kayn wa7d id manquant f route dyal dak lbutton 

export default {
  name: 'Quizzes',
  components: {
   
  }
}
</script>

<style scoped>

</style>
