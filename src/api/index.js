import AbstractAdapter from './adapters/abstract'

class Api {
    /**
     * @var AbstractAdapter | null
     */
    adapter = null

    constructor (adapter) {
        if (!(adapter instanceof AbstractAdapter)) {
            throw new TypeError('Adapter should be extends AbstractAdapter')
        }
        this.adapter = adapter
    }

    getList () {
        return this.adapter.getList()
    }

    getItem (id) {
        return this.adapter.getItem(id)
    }

    uploadImage (image) {
        return this.adapter.uploadImage(image)
    }

    deleteItem (id) {
        return this.adapter.deleteItem(id)
    }

    updateItem (item) {
        return this.adapter.updateItem(item)
    }

    addItem (item) {
        return this.adapter.addItem(item)
    }
}
let api = null

export function initApi (adapt) {
    api = new Api(adapt)
}

/**
 * @returns Api
 */
export default function getApi () {
    if (!api) {
        throw new Error('Api is nit init')
    }

    return api
}
