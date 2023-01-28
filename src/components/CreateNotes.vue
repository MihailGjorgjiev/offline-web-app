<template>
    <div class="ui basic content center aligned segment">
        <button class="ui basic button icon" @click="showModel">
            <i class="plus icon"></i>
        </button>
        <div class="ui centered card" v-show="showElement">
            <div class="content">
                <div class="ui form">
                    <div class="field">
                        <label>Title</label>
                        <input type="text" v-model="titleText">
                    </div>
                    <div class="field">
                        <label>Description</label>
                        <input type="text" v-model="descriptionText">
                    </div>
                    <div class="ui two buttons">
                        <button class="ui basic green button" @click="sendDataModel">Create</button>
                        <button class="ui basic black button" @click="closeModel">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import store from '@/store';
export default {
    name: "CreateNotes",
    data() {
        return {
            titleText: "",
            descriptionText: "",
            showElement: false
        }
    },
    methods: {
        showModel: function () {
            this.showElement = true;
        },
        closeModel: function () {
            this.showElement = false;
        },
        sendDataModel: function () {
            if (this.titleText.length > 0 && this.descriptionText.length > 0) {
                const title = this.titleText;
                const description = this.descriptionText;
                const newNote={title:title,description:description};
                store.dispatch('addNote',newNote);
            }
            this.titleText = "";
            this.descriptionText = "";
            this.showElement = false;
        },
        CreateNote(note) {
            this.notes.push(note);
            // console.log(note)
            console.log('Note has been added.');
        }
    }
}
</script>   