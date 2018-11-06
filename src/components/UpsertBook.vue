<template>
    <div v-if="book" class="form">
        <div v-if="book.id" class="form__title">
            Редактирование книги "{{ book.title }}"
        </div>
        <div v-else class="form__title">
            Добавить книгу
        </div>
        <form class="form__content">
            <div class="form__item">
                <div class="form__item-label">Заголовок</div>
                <div class="form__item-value">
                    <span class="form-error">{{ errors.first('title') }}</span>
                    <input
                        v-model="book.title"
                        v-validate="'required|max:30'"
                        name="title"
                        type="text"
                        maxlength="30"
                    >
                </div>
            </div>
            <div class="form__group">
                <div class="form__item-label">Авторы</div>
                <div v-for="(author, key) in book.authors" :key="key" class="form__group-value">
                    <div class="form__item">
                        <div class="form__item-label">Имя автора</div>
                        <div class="form__item-value">
                            <span class="form-error">{{ errors.first('firstName') }}</span>
                            <input
                                v-model="author.firstName"
                                v-validate="'required|max:20'"
                                type="text"
                                name="firstName"
                                maxlength="20"
                                required
                            >
                        </div>
                    </div>
                    <div class="form__item">
                        <div class="form__item-label">Фамилия автора</div>
                        <div class="form__item-value">
                            <span class="form-error">{{ errors.first('lastName') }}</span>
                            <input
                                v-model="author.lastName"
                                v-validate="'required|max:20'"
                                type="text"
                                name="lastName"
                                maxlength="20"
                                required
                            >
                        </div>
                    </div>
                    <span v-if="book.authors.length > 1" class="form__group-remove" @click="removeAuthor(key)"></span>
                </div>
                <div class="btn btn_info" @click="addAuthor">Добавить автора</div>
            </div>
            <div class="form__item">
                <div class="form__item-label">Количество страниц</div>
                <div class="form__item-value">
                    <span class="form-error">{{ errors.first('pages') }}</span>
                    <input
                        v-model="book.pages"
                        v-validate="'required|min:1|max:10000'"
                        type="number"
                        name="pages"
                        min="1"
                        max="10000"
                    >
                </div>
            </div>
            <div class="form__item">
                <div class="form__item-label">Название издательства</div>
                <div class="form__item-value">
                    <span class="form-error">{{ errors.first('publishingName') }}</span>
                    <input
                        v-model="book.publishingName"
                        v-validate="'max:20'"
                        type="text"
                        name="publishingName"
                        maxlength="20"
                    >
                </div>
            </div>
            <div class="form__item">
                <div class="form__item-label">Год публикации</div>
                <div class="form__item-value">
                    <span class="form-error">{{ errors.first('publicationDate') }}</span>
                    <datepicker
                        v-model="book.publicationDate"
                        name="publicationDate"
                        :disabled-dates="disabledDatesPublicationDate"
                        :language="ru"
                        :minimum-view="`year`"
                        :format="`yyyy`"
                    />
                </div>
            </div>
            <div class="form__item">
                <div class="form__item-label">Дата выхода в тираж</div>
                <div class="form__item-value">
                    <span class="form-error">{{ errors.first('editionDate') }}</span>
                    <datepicker
                        v-model="book.editionDate"
                        :disabled-dates="disabledDatesEditionDate"
                        :language="ru"
                        name="editionDate"
                    />
                </div>
            </div>
            <div class="form__item">
                <div class="form__item-label">ISBN</div>
                <div class="form__item-value">
                    <span class="form-error">{{ errors.first('isbn') }}</span>
                    <input
                        v-model="book.isbn"
                        v-validate="'isbn'"
                        type="text"
                        name="isbn"
                    >
                </div>
            </div>
            <div class="form__item">
                <div class="form__item-label">Изображение</div>
                <div class="form__item-value">
                    <span class="form-error">{{ errors.first('image') }}</span>
                    <input
                        ref="selectFile"
                        v-validate="'mimes:image/*'"
                        class="hide"
                        name="image"
                        accept="image/x-png,image/gif,image/jpeg"
                        type="file"
                        @change="inputFile"
                    >
                    <div class="form__item-image">
                        <div class="form__item-image-prev">
                            <img v-if="book.image" :src="book.image">
                            <img v-else src="/image/default.jpg">
                        </div>
                        <div>
                            <button class="btn btn_info" @click="selectFile">Выбрать изображение</button>
                            <div v-if="book.image" class="form__item-image-remove">
                                <a href="javascript:void(0)" @click="removeFile">Удалить изображение</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="form__item">
                <button type="submit" class="btn btn_info" @click="save">Сохранить</button>
            </div>
        </form>
    </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import {ru} from 'vuejs-datepicker/dist/locale'
import getApi from '../api'
export default {
    name: 'UpsertBook',
    components: {
        Datepicker,
    },
    mounted: function () {
        this.loadBook()
    },
    data: () => {
        return {
            book: null,
            ru: ru,
        }
    },
    computed: {
        bookId () {
            return this.$route.params.id
        },
        disabledDatesPublicationDate () {
            return {
                to: new Date('1800-01-01'),
                from: this.book.editionDate ? this.book.editionDate : new Date(),
            }
        },
        disabledDatesEditionDate () {
            return {
                to: new Date(`${this.book.publicationDate ? this.book.publicationDate.getFullYear() : '1800'}-01-01`),
                from: new Date(),
            }
        },
    },
    methods: {
        loadBook () {
            if (this.bookId) {
                this.$store.dispatch('loadBook', this.bookId).then(() => {
                    this.$set(this, 'book', Object.assign({}, this.$store.getters.getBook(this.bookId)))
                    if (this.book.publicationDate && typeof this.book.publicationDate !== 'object') {
                        this.book.publicationDate = new Date(this.book.publicationDate)
                    }
                })
            } else {
                this.$set(this, 'book', Object.assign({}, this.$store.getters.getBook(null)))
            }
        },
        addAuthor () {
            this.book.authors.push(
                {
                    firstName: '',
                    lastName: '',
                }
            )
        },
        removeAuthor (key) {
            if (this.book.authors.length > 1) {
                this.book.authors.splice(key, 1)
            }
        },
        selectFile: function (e) {
            e.preventDefault()
            this.$refs.selectFile.click()
        },
        inputFile () {
            const files = this.$refs.selectFile.files || null
            const self = this
            if (!files || files.length === 0) {
                this.book.image = undefined
                return
            }

            getApi().uploadImage(files[0]).then((url) => {
                self.$set(this.book, 'image', url)
            })
        },
        removeFile () {
            this.$refs.selectFile.value = null
            this.book.image = undefined
        },
        save (e) {
            e.preventDefault()
            this.$validator.validate().then(result => {
                if (!result) {
                    return
                }
                if (this.book.id) {
                    this.$store.dispatch('updateBook', this.book)
                } else {
                    this.$store.dispatch('addBook', this.book).then(resp => {
                        console.log(resp)
                        this.$router.push({name: 'edit_book', params: { id: this.book.id }})
                    })
                }
            })
        },
    },
    watch: {
        bookId (id, oldId) {
            if (id === oldId) {
                return
            }
            this.loadBook()
        },
    },
}
</script>
