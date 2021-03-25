<template>
  <q-page class="flex flex-center">
    <router-link class="navlinks w-75 flex justify-center" to="/todo/create"> Добавить задачу <span id="plus"> + </span> </router-link>
    <todo v-for="(todo,key) in todos" :key="key">
      <span slot="todo_header">
        {{ JSON.parse(todo).name }} <span class="float-right" @click="deleteTask(key)" id="delete"> </span>
      </span>
      <span slot="todo_data">
        <q-badge text-color="warning" color="primary" v-if="JSON.parse(todo).expiration_data">
          до : {{ JSON.parse(todo).expiration_data }}
        </q-badge>
      </span>
      <div slot="todo_content" class="todo_content">
        {{ JSON.parse(todo).content }}
      </div>
      <div slot="todo_management" >
        <div class="flex justify-center flex-col">
          <div
          role="button"
          class="subTasksShow"
          :class="{ 'rotate-180' : isShow }"
          @click=" showSubTasks(key)"
          >
          🡫
          </div>
          <span id="subtasks_count" > {{ JSON.parse(todo).subTasks.length }} подзадач </span>
        </div>
        <div v-if="key==selectedItemId">
           <div class="flex justify-center subtasks"
           :style="{ backgroundColor: subtask.done == true ? '#52b202' : '#f6685e'}"
           v-for="(subtask,index) in JSON.parse(todo).subTasks" :key="subtask">
             <span class="flex flex-row justify-center subtask_text">
               {{ subtask.name }}
             </span>
             <span class="subtask" v-if="subtask.done == false">
              <span id="success_circle" @click="setDone(key,index)">  </span>
            </span>
          </div>
        </div>
        <div class="new_sub_task" v-if="key==selectedItemId">
          <q-form @submit.prevent="addSubTask(key)">
            <q-input v-model="newSubtask" class="inline-block" type="text"></q-input>
            <q-input  value="Добавить" type="submit" id="new_task_submit_button" class="block mb-auto"></q-input>
          </q-form>
        </div>
      </div>
    </todo>
    <router-view>
    </router-view>
  </q-page>
</template>

<script>
import Todo from 'src/layouts/Todo.vue'
export default {
  components: { Todo },
  name: 'PageIndex',
  data() {
    return {
      todos : '',
      subTasksShowed : false,
      newSubTaskShowed : false,
      selectedItemId: null,
      newSubtask : '',
      isShow: false,
    }
  },
  methods : {
    findSplitter(string) {
      console.log(string)
      let resultArray = new Array()
      let separatorsArray = new Array()
      let separatorPosition = 0;

      for(let symbol=0;symbol<string.length;symbol++) {
        if(string[symbol] == "{") {
          separatorsArray.push(string[symbol]);
        } else if(string[symbol] == "}") {
          separatorsArray.pop()
          if(separatorsArray.length == 0) {
            resultArray.push(string.substring(separatorPosition,symbol+1))
            separatorPosition =  symbol + 2;
          }
        } // разделить строку на массив подстрок (по разделителю "запятая")
      }
     return resultArray;
    },
    showSubTasks(id) {
        this.selectedItemId = this.selectedItemId !== id ? id : null
        this.isShow = !this.isShow;

    },
    addSubTask(id) {
      let todo = JSON.parse(this.todos[id])
      todo.subTasks.push({name:this.newSubtask,done:false})
      let todos = this.findSplitter(localStorage.getItem('todos'))
      todos[id] = JSON.stringify(todo);
      localStorage.setItem('todos',todos)
      window.location.reload()
    },
    deleteTask(id) {
      let todo = JSON.parse(this.todos[id])
      let todos = this.findSplitter(localStorage.getItem('todos'))
      todos.splice(id,1)
      localStorage.setItem('todos',todos)
      window.location.reload()
    },
    setDone(task,subTask) {
      console.log(task,subTask)
      let todo = JSON.parse(this.todos[task])
      todo.subTasks[subTask].done = true;
      let todos = this.findSplitter(localStorage.getItem('todos'))
      todos[task] = JSON.stringify(todo)
      localStorage.setItem('todos',todos)
      window.location.reload()
    }
  },
  mounted() {
    let todos = localStorage.getItem('todos');
    console.log(todos)
    this.todos = this.findSplitter(todos)
    console.log(JSON.parse(this.todos[0]).subTasks)
  },
}
</script>
<style>
body {
  background: #FF5F6D;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFC371, #FF5F6D);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFC371, #FF5F6D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.navlinks {
  margin: 20px;
    border-radius: 15px;
    border-right: 3px solid #f75462;
    border-bottom: 3px solid #f75462;
    border-left: 3px solid #FFC371;
    border-top: 3px solid #FFC371;
    color: rgb(18, 24, 19);
    font-size: 20px;
    width: 300px;
    height: 50px;
    padding: 5px;
    margin-left: auto;
    margin-right: auto;
    text-decoration: none;
    background: #00c6ff;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #0c70eb, #00c6ff);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #1071e7, #00c6ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
.subTasksShow {
    font-size : 22px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .subtask_text {
    word-wrap:break-word;
    display: inline-block;
    width: 300px;
    height: auto;
  }
  .subtasks {
    text-align: center;
    word-wrap:break-word;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
    border-radius: 15px;
    font-size: 20px;
    font-family: 'Poppins';
  }
  .new_sub_task {
    float: right;
  }

  #new_task_submit_button {
    display: block;
  }
  #subtasks_count {
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .todo_content {
    word-wrap:break-word;
  }

   #subTasksHide {
    font-size: 22px;
    margin: 10px;
  }

  #hide_new_task_button {
    font-size: 20px;
    text-align: justify;
  }

  #success_circle {
    margin-left: 10px;
    padding-top: 2px;
    padding-left: 16px;
    font-size: 10px;
    border-radius: 25px;
    border: 0.1px solid black;
    background-color: #4caf50;
    cursor: pointer;
  }

  #delete {
    padding-top: 15px;
    padding-left: 15px;
    font-size: 10px;
    border-radius: 25px;
    border: 0.1px solid black;
    background-color: #c95656;
    cursor: pointer;
  }

  #plus {
    color: #4caf50;
    font-size: 23px;
    margin-left: 10px;
    margin-right: 10px;
    -webkit-text-stroke: 1px black;
  }
  </style>
