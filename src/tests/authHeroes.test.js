const assert = require('assert')
const api = require('./../api')
const Context = require('./../db/strategies/base/contextStrategy')
const Postgres = require('./../db/strategies/postgres/postgres')
const UsuarioSchema = require('./../db/strategies/postgres/schemas/usuarioSchema')

let app = {}

const USER = {
    username: 'xuxadasilva',
    password: '123'
}

const USER_DB = {
    ...USER,
    password: '$2b$04$23iIppjPn1ltcv7h89FJKOK.Esn0eGnTYXUA3c/qQvqQp3JTZCLPu'
}

describe('Suíte de teste de autenticação', function () {
    this.beforeAll(async () => {
        app = await api

        const connectionPostgres = await Postgres.connect()
        const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
        const postgresContext = new Context(new Postgres(connectionPostgres, model))
        await postgresContext.update(null, USER_DB, true)

    })

    it('Return a token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })

    it('Must fail with 401 Not Authorized', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'teste',
                password: '123'
            }
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(dados.error, 'Unauthorized')
    })

})