const assert = require('assert')
const PasswordHelper = require('./../helpers/passwordHelper')

const SENHA = 'Erick@32123123'
const HASH = '$2b$04$z.Kc.M41my/jNyFxigj8SO7ATFIpzWVl95V23MyPsBZNNS3F44.iu'

describe('[User] Suite', function () {

    it('Must generate a hash for a password', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)

        assert.ok(result.length > 10)
    })

    it('Must validate the password', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)

        assert.ok(result)
    })

})