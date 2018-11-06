<template>
    <div class="short-item">
        <div class="short-item__block">
            <div class="short-item__image">
                <img v-if="book.image" :src="book.image">
                <img v-else src="/image/default.jpg">
            </div>
            <div class="short-item__info">
                <div class="short-item__title">
                    {{ book.title }}
                </div>
                <div class="short-item__authors">
                    <span class="label">Авторы:</span>
                    <span v-for="(author, key) in book.authors" :key="key" class="short-item__authors-item">
                        {{ author.firstName }} {{ author.lastName }}
                        <span v-if="(key + 1) !== book.authors.length">, </span>
                    </span>
                </div>
                <div v-if="book.pages">
                    <span class="label">Количество страниц: </span>
                    {{ book.pages }}
                </div>
                <div v-if="book.publishingName">
                    <span class="label">Название издательства: </span>
                    {{ book.publishingName }}
                </div>
                <div v-if="book.publicationDate">
                    <span class="label">Год публикации: </span>
                    {{ getYear(book.publicationDate) }}
                </div>
                <div v-if="book.editionDate">
                    <span class="label">Дата выхода в тираж: </span>
                    {{ dateFormat(book.editionDate) }}
                </div>
                <div v-if="book.isbn">
                    <span class="label">ISBN: </span>
                    {{ book.isbn }}
                </div>
            </div>
            <div class="short-item__action">
                <router-link :to="{ name: 'edit_book', params: { id: book.id }}">Редактировать</router-link>
                <a href="javascript:void(0)" @click="remove(book)">Удалить</a>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'ShortItem',
    props: [
        'book',
    ],
    methods: {
        dateFormat (date) {
            date = new Date(date)
            const day = date.getDate()
            const month = date.getMonth()
            const year = date.getFullYear()
            return `${day <= 9 ? '0' + day : day}-${month <= 9 ? '0' + month : month}-${year}`
        },
        getYear (date) {
            date = new Date(date)
            return date.getFullYear()
        },
        remove (item) {
            this.$store.dispatch('deleteBook', item.id)
        },
    },
}
</script>
