<template>
  <div class="flex justify-center column">
    <div class="note_header"> Мои заметки </div>
    <note v-for="(note,index) in notes" :key="note">
      <div class="note" :style="{backgroundColor : bgcolor }" v-if="note">
        <span id="delete_note" @click="deleteNote(index)"></span>
        <div class="note_text_block">
          <div class="note_text">
            <span> {{note }} </span>
          </div>
        </div>
      </div>
      </note>
    <div class="note_header"> Добавить заметку </div>
    <q-form class="note_form" @submit.prevent="addNote">
      <q-input type="text" v-model="newNote"></q-input>
      <q-input value="Добавить" type="submit"></q-input>
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newNote : '',
      notes : '',
    }
  },
  props:['bgcolor'],
  methods : {
    addNote() {
      let notes = localStorage.getItem('notes');
      if(notes != null) {
        notes+= ',' + this.newNote;
      } else notes = new Array(this.newNote)
      console.log(notes)
      localStorage.setItem('notes',notes)
      window.location.reload()
    },
    deleteNote(note) {
      let notes = this.notes
      notes.splice(notes,1)
      localStorage.setItem('notes',notes)
      window.location.reload()
    }
  },
  mounted() {
    let notes = localStorage.getItem('notes')
    this.notes = notes.split(',')
  },
  watch: {
      bgcolor : function() {
        return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
      }

  }
}
</script>

<style>
  body {
    background: #FF5F6D;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFC371, #FF5F6D);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFC371, #FF5F6D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .note_form {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  .note_header {
    text-decoration: underline;
    margin: 5px;
    font-size: 25px;
    margin-left: auto;
    margin-right: auto;
  }

  .note_text {
    height: auto;
    width: 400px;
  }
  .note_text_block {
    width: 400px;
    height: auto;
    word-wrap:break-word;
  }
  .note {
    background: #F3904F;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #7483da, #F3904F);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #707ecf, #F3904F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    margin: 5px;
    width: 400px;
    height: auto;
    border-radius: 15px;
    border: 2px solid black;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: 25px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  #delete_note {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
    padding-top: 15px;
    padding-left: 15px;
    font-size: 10px;
    border-radius: 20px;
    border: 0.1px solid black;
    background-color: #c95656;
    cursor: pointer;
  }

</style>
