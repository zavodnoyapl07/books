import Vue from 'vue'
import Vuex from 'vuex'
import getApi, {initApi} from './api'
import {localStorage} from 's-localstorage'
import LocalStorageAdapter from './api/adapters/local_storage'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        books: {},
        orderBy: 'id|desc',
    },
    mutations: {
        SET_BOOKS (state, books) {
            state.books = books
        },
        UPSERT_BOOK (state, book) {
            Vue.set(state.books, book.id, book)
        },
        REMOVE_BOOK (state, bookId) {
            Vue.delete(state.books, bookId)
        },
        SET_ORDER (state, val) {
            state.orderBy = val
        },
    },
    actions: {
        init ({commit}) {
            initApi(new LocalStorageAdapter())
            getApi().getList().then(res => {
                commit('SET_BOOKS', res)
            })
            commit('SET_ORDER', localStorage.get('orderBy', 'id|desc'))
        },
        setOrder ({commit}, val) {
            localStorage.set('orderBy', val)
            commit('SET_ORDER', val)
        },
        loadBook ({commit}, id) {
            return new Promise((resolve) => {
                getApi().getItem(id).then(res => {
                    if (res) {
                        commit('UPSERT_BOOK', res)
                    }
                    resolve(res)
                })
            })
        },
        updateBook ({commit}, item) {
            getApi().updateItem(item).then(res => {
                commit('UPSERT_BOOK', res)
            })
        },
        addBook ({commit}, item) {
            return new Promise((resolve) => {
                getApi().addItem(item).then(res => {
                    commit('UPSERT_BOOK', res)
                    resolve(res)
                })
            })
        },
        deleteBook ({commit}, id) {
            return new Promise((resolve) => {
                getApi().deleteItem(id).then(() => {
                    commit('REMOVE_BOOK', id)
                    resolve()
                })
            })
        },
    },
    getters: {
        books (state) {
            return state.books
        },
        orderBy (state) {
            return state.orderBy
        },
        getBook: state => bookId => {
            if (!state.books[bookId]) {
                return {
                    id: undefined,
                    title: undefined,
                    authors: [
                        {
                            firstName: undefined,
                            lastName: undefined,
                        },
                    ],
                    pages: undefined,
                    publishingName: undefined,
                    publicationDate: undefined,
                    editionDate: undefined,
                    isbn: undefined,
                    image: undefined,
                }
            }
            return state.books[bookId]
        },
    },
})
