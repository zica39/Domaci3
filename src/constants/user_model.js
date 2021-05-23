const user_model = [
    {
        name: 'firstName',
        type: 'text',
        default: '',
    },
    {
        name: 'lastName',
        type: 'text',
        default: '',
    },
    {
        name: 'email',
        type: 'email',
        default: '',
    },
    {
        name: 'login',
        type: 'text',
        default: '',
    },
    {
        name: 'password',
        type: 'password',
        default: '',
    },

    {
        name: 'lang_key',
        type: 'hidden',
        default: 'en'
    },
    {
        name: 'authorities',
        type: 'hidden',
        default: ["ROLE_USER"]
    }
]

export default user_model;