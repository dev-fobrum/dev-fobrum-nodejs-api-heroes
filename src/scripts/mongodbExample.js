const Mongoose = require('mongoose')
Mongoose.connect('mongodb://erickwendel:minhasenhasecreta@127.0.0.1:27017/herois',
    { useNewUrlParser: true }, function (error) {
        if (!error) return;
        console.error('Falha na conexão: ', error)
    })

const connection = Mongoose.connection
connection.once('open', () => console.log('Conectado'))
// setTimeout(() => {
//     const state = connection.readyState
//     console.log('State', state)
// }, 2000)

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('Result Cadastrar', resultCadastrar)

    const listItens = await model.find()
    console.log('Result list', listItens)
}

main()