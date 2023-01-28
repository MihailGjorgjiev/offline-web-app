import { createStore } from 'vuex'

export default createStore({
  state: {
    notes: [
      {
        "id": 1,
        "title": "Note 1",
        "description": "Desc 1"
      },
      {
        "id": 2,
        "title": "Note 2",
        "description": "Desc 2"
      },
      {
        "id": 3,
        "title": "Note 3",
        "description": "Desc 3"
      }
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
  actions: {
    getNotes() {
      return this.getters.notes;
    },
    addNote({commit},note) {
      const noteList = JSON.parse(JSON.stringify(this.getters.notes));
      const newId = noteList[noteList.length - 1] ? noteList[noteList.length - 1].id : 0;
      const newNote = { id: newId + 1, title: note.title, description: note.description };
      let noteExists = false;
      noteList.map((obj) => {
        if (obj.id === newNote.id) {
          noteExists = true;
        }
      });
      if (!noteExists) noteList.push(newNote);
      commit('UPDATE_NOTES',noteList);
    },
    updateNote({commit},note) {
      const noteList = JSON.parse(JSON.stringify(this.getters.notes));
      const newNote = { id: note.id, title: note.title, description: note.description };
      noteList.map((obj) => {
        if (obj.id === newNote.id) {
          obj.title = newNote.title;
          obj.description = newNote.description;
        }
      });
      commit('UPDATE_NOTES',noteList);
    },
    deleteNote({commit},id) {
      const noteList = JSON.parse(JSON.stringify(this.getters.notes));
      const deleteId = id;
      const newNoteList=noteList.filter(obj=>obj.id!==deleteId);
      commit('UPDATE_NOTES',newNoteList);

    },
  },
  modules: {
  }
})
