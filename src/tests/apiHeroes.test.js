const assert = require('assert')
const api = require('./../api')

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTU4OTE1ODMyNn0.ZM7shexgHFUHuadhbTIUc0Z6ITBLLZ8KVshiP6fR8cY'
const headers = {
    Authorization: TOKEN
}
const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Biônica'
}

const MOCK_HEROI_INICIAL = {
    nome: 'Gavião Negro',
    poder: 'Precisão'
}

let MOCK_ID = null

describe('[API] Suite', function () {
    this.beforeAll(async () => {
        app = await api

        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL),
            headers
        })

        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
    })

    it('SELECT [GET] /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10',
            headers
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('SELECT [GET] /herois Rule: must return 3 records', async () => {
        const TAMANHO_LIMITE = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
            headers
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('SELECT [ERROR] /herois', async () => {
        const TAMANHO_LIMITE = 'TESTE'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
            headers
        })

        const statusCode = result.statusCode
        const error = '{"statusCode":400,"error":"Bad Request","message":"child \\"limit\\" fails because [\\"limit\\" must be a number]","validation":{"source":"query","keys":["limit"]}}'

        assert.deepEqual(result.payload, error)
        assert.deepEqual(statusCode, 400)
    })

    it('SELECT [GET] /herois Rule: must return 1 record', async () => {
        const TAMANHO_LIMITE = 1000
        const NAME = MOCK_HEROI_INICIAL.nome
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`,
            headers
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(dados[0].nome === NAME)
    })

    it('INSERT [POST] /herois', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois?skip=0&limit=10',
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR),
            headers
        })

        const { message } = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(message == 'Herói cadastrado com sucesso!')
    })

    it('UPDATE [PATCH] /herois/:id', async () => {
        _id = MOCK_ID
        const expected = {
            poder: 'Supermira'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected),
            headers
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Herói atualizado com sucesso!')

    })

    it('UPDATE [ERROR][PATCH] /herois/:id', async () => {
        _id = `5eb76c005735bc46a0d566c7`
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'ID não encontrada!'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify({
                poder: 'Supermira'
            }),
            headers
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 412)
        assert.deepEqual(dados, expected)
    })

    it('DELETE [DELETE] /herois/:id', async () => {
        const _id = MOCK_ID
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`,
            headers
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Herói removido com sucesso!')
    })

    it('DELETE [DELETE] /herois/:id Rule: must fail', async () => {
        _id = `5eb76c005735bc46a0d566c7`
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'ID não encontrada!'
        }

        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`,
            headers
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 412)
        assert.deepEqual(dados, expected)
    })

    it('DELETE [DELETE] /herois/:id Rule: must return internal server error', async () => {
        const _id = `ID_INVALIDO`
        const expected = {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred'
        }

        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`,
            headers
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 500)
        assert.deepEqual(dados, expected)
    })
})