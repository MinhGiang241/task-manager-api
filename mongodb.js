// CRUD create read update delete



// If use mongoose ,no need to do mongodb
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const objectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database ')
    }

    const db = client.db(databaseName)

    db.collection('users').insertOne({

        name: 'marine',
        age: 16
    }, (error, result) => {
        if (error) {
            return console.log(error)
        }
        console.log(result.ops)
    })

    db.collection('users').findOne({ _id: new ObjectID("5f173dc8d080d44430baeeec") }, (error, user) => {
        if (error) { return console.log('Unable to fetch data') }
        console.log(user)
    })
    db.collection('document').find({ complete: true }).toArray((error, count) => { console.log(count) })


    db.collection('users').updateOne({
        name: 'Mike',
    }, {
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((reject) => {
        console.log(reject)
    })

    db.collection('document').updateMany({ complete: false }, {
            $set: {
                complete: true
            }
        }).then((resolve) => { console.log(resolve, 'Success!!!!') })
        .catch((reject) => { console.log(reject, 'Fail!!!') })

    db.collection('users').deleteMany({
            _id: {
                $in: [ObjectID("5f187ff4e61f1221183e3482"), ObjectID("5f173dc8d080d44430baeeec")]
            }
        }).then((resolve) => { console.log(resolve, 'Success!!!!') })
        .catch((reject) => { console.log(reject, 'Fail!!!') })

})