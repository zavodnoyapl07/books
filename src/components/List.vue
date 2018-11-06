<template>
    <div class="list">
        <div v-if="books.length !== 0" class="list__sort">
            <span>Остортировать: </span>
            <select v-model="orderBy">
                <option value="id|desc">По дате добавление (убывание)</option>
                <option value="id|acs">По дате добавление (возрастание)</option>
                <option value="title|desc">По заголовку (убывание)</option>
                <option value="title|acs">По заголовку (возрастание)</option>
                <option value="publicationDate|desc">По году публикации (убывание)</option>
                <option value="publicationDate|acs">По году публикации (возрастание)</option>
            </select>
        </div>
        <div v-for="book in books" :key="book.id" class="list__row">
            <ShortItem :book="book" />
        </div>
        <div v-if="books.length === 0" class="list__empty">
            Книг не найдено
        </div>
    </div>
</template>

<script>
import ShortItem from './ShortItem'
import orderBy from 'lodash/orderBy'
export default {
    name: 'List',
    components: {
        ShortItem,
    },
    data: function () {
        return {
            orderBy: this.$store.getters.orderBy,
        }
    },
    computed: {
        books () {
            const orderElem = this.orderBy.split('|')
            const books = Object.values(this.$store.getters.books)
            return orderBy(books, [orderElem[0]], [orderElem[1]])
        },
    },
    watch: {
        orderBy (newVal, oldVal) {
            if (newVal === oldVal) {
                return
            }
            this.$store.dispatch('setOrder', newVal)
        },
    },
}
</script>
