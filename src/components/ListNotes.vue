<template>
  <TextNote v-for="note in notes" :key="note.id" :note="note" @deleteNote="deleteNote" />

</template>

<script>
import TextNote from './TextNote.vue';
export default {
  name: "ListNotes",
  computed: {
      notes() {
          return this.$store.state.notes
      }
  },
  components: {
      TextNote,
  },
  methods: {
      deleteNote(note) {
          var ifRemove = confirm("Do you really want to delete this note?");
          if (ifRemove) {
              this.$store.dispatch('deleteNote',note)
          }
      }
  }
}

</script>