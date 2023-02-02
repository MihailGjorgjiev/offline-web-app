/* eslint-disable */
import { createStore } from 'vuex'
import axios from 'axios';
const base64 = require('base-64');
const PouchDB = require('pouchdb');
const pouchDB = PouchDB.default.defaults();
const db = new pouchDB('notepad');
const couchdb=new pouchDB("http://localhost:5984/notepad", {skip_setup: true});

db.sync(couchdb,{
  live: true,   // do a live, ongoing sync
  retry: true   // retry if the conection is lost
});

  export default createStore({
    state: {
      notes: []
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
      getNotes({ commit }) {


        db.allDocs({
          include_docs: true,
          attachments: true
        }).then(result => {
          const data = result.rows.map(el => el.doc);
          commit('UPDATE_NOTES', data);
        })

      },
      addNote({ commit }, note) {
        const notes = this.getters.notes;
        note._id = ((new Date()).getTime()).toString();
        db.put(note).then((data) => {
          note._rev = data.rev
          notes.push(note)
          commit('UPDATE_NOTES', notes);

        })

      },
      updateNote({ commit }, note) {
        db.put(note).then((data) => {
          note._rev = data.rev
        }).then(() => {
          this.dispatch('getNotes');
          const notes = this.getters.notes;
          commit('UPDATE_NOTES', notes)

        });

      },
      deleteNote({ commit }, id) {
        db.get(id).then(data => {
          db.remove(data);
        }).then(() => {
          this.dispatch('getNotes');
          const notes = this.getters.notes;
          commit('UPDATE_NOTES', notes)

        })


      },
    },

    modules: {
    }
  })
