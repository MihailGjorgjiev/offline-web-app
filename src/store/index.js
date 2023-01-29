import { createStore } from 'vuex'
import axios from 'axios';
export default createStore({
  state: {
    notes: [
      
    ]
  },
  getters: {
    notes: state => state.notes
  },
  mutations: {
    UPDATE_NOTES(state, payload) {
      state.notes = payload;
    }
  },
  actions:{
    getNotes({ commit }) {

      axios.get('http://localhost:3000/api/notes/').then((response) => {
        commit('UPDATE_NOTES', response.data)
      });
    },
    addNote({ commit }, note) {
  
      axios.post('http://localhost:3000/api/notes/', note).then((response) => {
        commit('UPDATE_NOTES', response.data)
      });
    },
    updateNote({ commit }, note) {
  
      axios.put('http://localhost:3000/api/notes/', note).then((response) => {
        commit('UPDATE_NOTES', response.data)
      });
    },
    deleteNote({ commit }, id) {
      axios.delete(`http://localhost:3000/api/notes/${id}`).then((response) => {
        commit('UPDATE_NOTES', response.data)
      });
  
    },
  },
  // actions: {
  //   getNotes() {
  //     return this.getters.notes;
  //   },
  //   addNote({commit},note) {
  //     const noteList = JSON.parse(JSON.stringify(this.getters.notes));
  //     const newId = noteList[noteList.length - 1] ? noteList[noteList.length - 1].id : 0;
  //     const newNote = { id: newId + 1, title: note.title, description: note.description,timeCreated:note.timeCreated };
  //     let noteExists = false;
  //     noteList.map((obj) => {
  //       if (obj.id === newNote.id) {
  //         noteExists = true;
  //       }
  //     });
  //     if (!noteExists) noteList.push(newNote);
  //     commit('UPDATE_NOTES',noteList);
  //   },
  //   updateNote({commit},note) {
  //     const noteList = JSON.parse(JSON.stringify(this.getters.notes));
  //     const newNote = { id: note.id, title: note.title, description: note.description };
  //     noteList.map((obj) => {
  //       if (obj.id === newNote.id) {
  //         obj.title = newNote.title;
  //         obj.description = newNote.description;
  //       }
  //     });
  //     commit('UPDATE_NOTES',noteList);
  //   },
  //   deleteNote({commit},id) {
  //     const noteList = JSON.parse(JSON.stringify(this.getters.notes));
  //     const deleteId = id;
  //     const newNoteList=noteList.filter(obj=>obj.id!==deleteId);
  //     commit('UPDATE_NOTES',newNoteList);

  //   },
  // },
  modules: {
  }
})
