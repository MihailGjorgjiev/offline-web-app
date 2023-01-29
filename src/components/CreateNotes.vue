<template>
    <div class="ui basic content center aligned segment">

        <div class="ui centered card">
            <div class="content">
                <div class="ui form">
                    <div class="field">
                        <label>Title</label>
                        <input type="text" placeholder="Enter your title" v-model="titleText">
                    </div>
                    <div class="field">
                        <label>Description</label>
                        <input type="text" placeholder="Enter your description" v-model="descriptionText">
                    </div>
                    <div class="field">
                        <label>Time Created</label>
                        <input type="text"  :value="currentTime" disabled>
                    </div>
                </div>
            </div>
        </div>
        <button id="check" @click="sendDataModel" class="ui basic button icon">
            <i class="check icon"></i>
        </button>
        <button id="cancel" @click="closeModel" class="ui basic button icon" v-show="showElement">
            <i class="cancel icon"></i>
        </button>
    </div>

</template>

<script>
import store from '@/store';
export default {
    name: "CreateNotes",
    props: ['showElement'],
    data() {
        return {
            titleText: "",
            descriptionText: ""
        }
    },
    methods: {

        sendDataModel: function () {
            if (this.titleText.length > 0 && this.descriptionText.length > 0) {
                const title = this.titleText;
                const description = this.descriptionText;
                const date=this.currentTime;
                const newNote = { title: title, description: description,timeCreated:date };
                store.dispatch('addNote', newNote);
            }
            
            this.closeModel();

        },
        showModel(){
            this.$emit('showModel')
        },
        closeModel() {
            this.titleText = "";
            this.descriptionText = "";
            this.$emit('closeModel');
        },
        CreateNote(note) {
            this.notes.push(note);
            console.log('Note has been added.');
        }
    },
    computed:{
        currentTime(){
            let datetime=new Date().toString().substring(4,24);
            let time=datetime.substring(12,20);
            let date=datetime.substring(0,11);
            return date+" "+time;
        }
    }
}
</script>   
<style scoped>
.centered {
    width: 40rem !important;
    height: 20rem !important;
}

.form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly !important;

}

label {
    font-size: x-large !important;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: bolder !important;
}
input{
    text-align: center;
    color: grey !important;
}
</style>