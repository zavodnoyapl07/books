import Vue from 'vue'
import Router from 'vue-router'
import UpsertBook from './components/UpsertBook.vue'
import List from './components/List.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'list',
            component: List,
        },
        {
            path: '/add',
            name: 'add_book',
            component: UpsertBook,
        },
        {
            path: '/edit/:id',
            name: 'edit_book',
            component: UpsertBook,
        },

    ],
})
