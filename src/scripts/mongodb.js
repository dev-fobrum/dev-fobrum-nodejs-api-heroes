// // docker ps
// // docker exec -it ea48b81160a2 mongo -u erickwendel -p minhasenhasecreta --authenticationDatabase herois

// show dbs
// user herois

// show collections

// db.herois.insert({
//     nome: 'Flash',
//     poder: 'Velocidade',
//     dataNascimento: '1998-01-01'
// })

// db.herois.find()
// db.herois.find().pretty()

// for (let i = 0; i <= 100000; i++) {
//     db.herois.insert({
//         nome: 'Clone-${i}',
//         poder: 'Velocidade',
//         dataNascimento: '1998-01-01'
//     })
// }

// db.herois.count()
// db.herois.findOne()
// db.herois.find().limit(1000).sort({ nome: -1 })
// db.herois.find({}, { poder: 1, _id: 0 })

// db.herois.update({ _id: ObjectId("5eb709675f8cca62421058ad") },
//     { nome: 'Mulher Maravilha' })

// db.herois.update({ _id: ObjectId("5eb709675f8cca62421058ad") },
//     { $set: { nome: 'Lanterna Verde' } })

// db.herois.update({ poder: 'Velocidade' },
//     { $set: { poder: 'Super Força' } })

// db.herois.remove({})
// db.herois.remove({nome: 'Mulher Maravailha'})