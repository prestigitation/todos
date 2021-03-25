<template>
  <div class="block text-center">
    <div class="new_todo_header"> Добавить задачу </div>
    <div>
      <form class="new_todo_form" @submit.prevent="addTodo">
        <input v-model="form.name" type="text" placeholder="Введите имя задачи">
        <q-date
        v-model="form.expiration_data"
        title="Дата дедлайна"
        ></q-date>
        <div id="task_expl"> Опишите суть задачи </div>
        <q-input
        autogrow
        class="new_todo_textarea"
        v-model="form.content"
        type="textarea"
        > </q-input>
        <q-input type="submit" class="new_todo_submit"></q-input>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form : {
        name : '',
        expiration_data : '',
        content:'',
        subTasks : [],
      }
    }
  },
  props : ['expiration_data'],
  methods: {
    addTodo() {
      let todos = localStorage.getItem('todos');
      localStorage.clear('todos');
      if(todos == null)
        localStorage.setItem('todos',[JSON.stringify(this.form) ])
      else if(todos !=null) localStorage.setItem('todos',[todos, JSON.stringify(this.form) ])
      this.getTodo()
    },
    getTodo() {
      let a  = localStorage.getItem('todos');
      console.log(a);
      return a;
    },
  },
  mounted() {
    let a = this.getTodo();
    console.log(a.length);

  }
}
</script>

<style>
  .new_todo_header {
    margin-top: 10px;
    font-size: 20px;
  }
  .new_todo_form {
    font-size: 18px;
  }

  .new_todo_form>input {
    margin: 25px;
    padding:10px;
    text-align: center;
    border-radius: 30px;
    width: 50%;
  }

  .new_todo_textarea,.new_todo_submit {
    width: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  #task_expl {
    margin-top: 10px;
  }
</style>
