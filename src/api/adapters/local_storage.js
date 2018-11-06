import AbstractAdapter from './abstract'
import {localStorage} from 's-localstorage'

export default class LocalStorageAdapter extends AbstractAdapter {
    getList () {
        return new Promise((resolve) => {
            resolve(localStorage.get('books', {}))
        })
    }

    getItem (id) {
        return new Promise((resolve) => {
            const books = localStorage.get('books', {})
            const book = books[id] ? books[id] : null
            if (book) {
                if (book.publicationDate) {
                    book.publicationDate = new Date(book.publicationDate)
                }
                if (book.editionDate) {
                    book.editionDate = new Date(book.editionDate)
                }
            }
            resolve(book)
        })
    }

    uploadImage (image) {
        const reader = new FileReader()

        return new Promise((resolve) => {
            reader.readAsDataURL(image)
            reader.onload = function () {
                resolve(reader.result)
            }
        })
    }

    deleteItem (id) {
        return new Promise((resolve) => {
            const books = localStorage.get('books', {})
            delete books[id]
            localStorage.set('books', books)
            resolve(true)
        })
    }

    updateItem (item) {
        return new Promise((resolve) => {
            const books = localStorage.get('books', {})
            books[item.id] = item
            localStorage.set('books', books)
            resolve(item)
        })
    }

    addItem (item) {
        return new Promise((resolve) => {
            const books = localStorage.get('books', {})
            const ids = Object.keys(books).map((val) => {
                return parseInt(val)
            })
            console.log(ids, Math.max(ids), (ids.length > 0 ? Math.max(ids) : 0) + 1)
            item.id = (ids.length > 0 ? Math.max.apply(null, ids) : 0) + 1
            books[item.id] = item
            localStorage.set('books', books)
            resolve(item)
        })
    }
}

