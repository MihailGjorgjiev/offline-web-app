<template>
    <div class="ui centered card">
        <div class="content">
            <div class="header">
                {{ note.title }}
            </div>
            <div class="meta italic">
                {{ note.description }}
            </div>
            <div class="meta italic">
                {{ note.timeCreated }}
            </div>
            <div class="extra content">
                <span class="right floated edit icon" @click="showEdit">
                    <i class="edit icon"></i>
                </span>
                <span class="right floated trash icon" @click="deleteNote()">
                    <i class="trash icon"></i>
                </span>
            </div>
        </div>
        <div class="content" v-show="showModelEdit">
            <div class="ui form">
                <div class="field">
                    <label>Title</label>
                    <input type="text" v-model="thisNote.title">
                </div>
                <div class="field">
                    <label>Description</label>
                    <input type="text" v-model="thisNote.description">
                </div>
                <button id="update" @click="editNote" class="ui basic button icon">
                    <i class="check icon"></i>
                </button>
                
            </div>
        </div>
    </div>


</template>
<script>
export default {
    name: "TextNote",
    data() {
        return {
            showModelEdit: false,
            thisNote:this.note
        }
    },
    props: ['note','showElement'],
    
    methods: {
        deleteNote() {
            this.$store.dispatch('deleteNote',this.thisNote.id)
        },
        editNote() {
            // this.$emit()
            this.showModelEdit=false;
            this.$store.dispatch('updateNote',this.thisNote)
        },
        showEdit(){
            this.showModelEdit=true;
        }
    }
}
</script>

<style >
.italic {
    font-style: italic;
}
#update{
   z-index: 1;
}
</style>