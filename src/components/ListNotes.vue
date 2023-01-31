<template>
    <div>
        <TextNote v-for="note in notes" :key="note.id" :note="note" @deleteNote="deleteNote"  />
    </div>

</template>

<script>
import { mapGetters } from 'vuex';
import TextNote from './TextNote.vue';

export default {
    name: "ListNotes",
    props: ['showElement'],
    created(){
        this.$store.dispatch('getNotes');
    },
    computed: {
        ...mapGetters['notes'],
        notes() {
            return this.$store.state.notes;
        }
    },
    components: {
        TextNote,
    },
    methods: {
        deleteNote(note) {
            var ifRemove = confirm("Do you really want to delete this note?");
            if (ifRemove) {
                this.$store.dispatch('deleteNote', note)
            }
        },
        closeModel(){
            this.$emit('closeModel')
        }
    }
}

</script>