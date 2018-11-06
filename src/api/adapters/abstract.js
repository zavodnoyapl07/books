export default class AbstractAdapter {
    constructor () {
        if (new.target === AbstractAdapter) {
            throw new TypeError('Cannot construct Abstract instances directly')
        }
    }

    getList () {
        abstractMethod('getList', this.constructor.name)
    }

    getItem () {
        abstractMethod('getItem', this.constructor.name)
    }

    uploadImage () {
        abstractMethod('uploadImage', this.constructor.name)
    }

    deleteItem () {
        abstractMethod('deleteItem', this.constructor.name)
    }

    updateItem () {
        abstractMethod('updateItem', this.constructor.name)
    }

    addItem () {
        abstractMethod('addItem', this.constructor.name)
    }
}

function abstractMethod (methodName, className) {
    throw new Error(`add ${methodName} method in ${className}`)
}
