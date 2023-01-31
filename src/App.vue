<template>
  <HeaderPrompt/>
  <CreateNote @closeModel="closeModel" :showElement="showElement" v-show="showElement"/>
  <ListNotes :showElement="showElement" v-show="!showElement"/>
  <button class="ui basic button icon" @click="showModel" v-show="!showElement">
    <i class="plus icon"></i>
  </button>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import HeaderPrompt from './components/HeaderPrompt.vue';
import CreateNote from './components/CreateNotes'
import ListNotes from './components/ListNotes.vue';

export default {
  name: 'App',
  components: {
    CreateNote,
    ListNotes,
    HeaderPrompt
  },
  data() {
    return {
      showElement:false 
    }
  },
  

  methods: {
    ...mapActions['getNotes'],
    CreateNote(note) {
      this.notes.push(note);
      console.log('Note has been added.');
    },
    showModel: function () {
      document.querySelector('body').classList='flexed';
      this.showElement = true;
    },
    closeModel: function () {
      document.querySelector('body').classList='';
      this.showElement = false;
    },
  },
  computed: {
    ...mapGetters['notes']
  }
}
</script>

<style>
body{
  background-color: #9e9e9e;
}
.flexed{
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 100px;
}
.ui.basic.button.icon{
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  background-color: #38c790 !important;
  border-radius: 50%;
  padding: 1.5rem;
  line-height: normal;
}
.plus,.check,.cancel{
  color: white;
  font-size: 3rem !important;

}
#cancel{
  left:3rem;
  right: unset;
  background-color: #C7386F !important;
}
#check{
  left: unset;
  right: 3rem !important;
}

</style>
