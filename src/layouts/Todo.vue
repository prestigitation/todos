<template>
  <div class="inline-flex flex-col mt-auto align-center justify-center todo ml-auto mr-auto">
    <div class="inline-flex todo_header">
      <slot name="todo_header">
        {{ todo_header }}
      </slot>
      <span class="inline-flex todo_data">
        <slot name="todo_data">
          до : {{ expiration_data }}
        </slot>
      </span>
    </div>

    <div class="todo_content">
      <slot name="todo_content">
        {{ todo_content }}
      </slot>
    </div>
    <div> <slot name="todo_management"></slot></div>
  </div>
</template>

<script>
export default {
  name:'Todo',
  data() {
    return {
      expiration_data : 12.09,
      todo_content : 'Текст',
      todo_header : 'Хэдер',
    }
  },
  methods: {
    showSubTasks() {
      this.subTasksShowed = true;
    },
    addSubTask() {
      this.newSubTaskShowed = true;
    }
  }
}
</script>

<style>
  .todo {
    margin: 10px;
    width: 400px;
    height: auto;
    border-radius: 0px 20px 0px 20px;
    border : 3px solid black;
    background-color:#498fd4;
  }
  .todo_header{
    margin: 10px;
    font-size: 22px;
    font-family: monospace;
  }
  .todo_content {
    margin: 10px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 20px;
  }

  .todo_data {
    font-size: 20px;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

</style>
