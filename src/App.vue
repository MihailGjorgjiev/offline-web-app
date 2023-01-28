<template>
  <CreateNote/>
  <ListNotes/>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
import CreateNote from './components/CreateNotes' 
import ListNotes from './components/ListNotes.vue';
// import store from './components/store';
export default {
  name: 'App',
  components: {
    CreateNote,
    ListNotes
  },
  // data() {
  //   return {
  //     // notes:store.getters.notes
  //   }
  // },
  // beforeCreate(){
  // },
  created(){
    //console.log(this.$store.state.notes);
    this.$store.dispatch('getNotes')
  },
  
  methods:{
...mapActions['getNotes'],
    CreateNote(note){
      this.notes.push(note);
      // console.log(note)
      console.log('Note has been added.');
    }
  },
  computed: {
    ...mapGetters['notes'],
    // notes(){
    //   return this.$store.state.notes[0];
    // }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
