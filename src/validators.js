import {Validator} from 'vee-validate'
import ISBN from 'isbn-validate'

export default function rules () {
    Validator.extend('isbn', {
        getMessage: field => 'Невалидный ISBN.',
        validate: value => !!ISBN.Validate(value),
    })
}
