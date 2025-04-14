<template>

    <div class="tt">
      <div class="t">
      <img src="public/profile.png">
      <label>Name</label> 
      <label></label>
    </div>
  
    <button class="b1">Log Out</button>
    </div>
  
    
    <div class="t">
     <button class="b2">Create Quiz</button>
     <button class="b2">Quizzes</button>
     <button class="b2">Edit Quiz</button>
  
    </div>
  
    <div class="t">
      <div> 
        <label>MY SCORES</label>
         
      </div>
  
      <div> 
        <label>MY QUIZZES</label>
  
  
      </div>
      <label>TAKEN QUIZZES</label>
  
      <div> 
  
  
      </div>
    </div>
  
  
    
  </template>
  
  <script>
  import Myquizzes from './components/myquizzes.vue';
  import Myscores from './components/myscores.vue';
  import TakenQuizzes from './takenQuizzes.vue';
  
  
  
  export default {
    name: 'App',
    components: {
      Myquizzes,
      Myscores,
      TakenQuizzes
  
    }
  }
  </script>
  
  <style scoped>
  
  body{
    background-color: rgb(228, 204, 159) ;
  }
  .b1{
    background-color: rgb(46, 40, 40) ;
    color:white;
    font-size: 20px;
    font-weight: bold;
    padding: 30px;
  }
  .b2{
    background-color: rgb(224, 177, 65) ;
    color:rgb(6, 5, 5);
    font-size: 20px;
    font-weight: bold;
    padding: 30px;
  
  }
  .t{
    display: flex;
    flex-direction: row;
    gap:10px;
  }
  .tt{
    display: flex;
    flex-direction: row;
    gap:10px;
    justify-content:space-between;
  }
  
  
  
  
  </style>