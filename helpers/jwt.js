const jwt = require('jsonwebtoken')

const generarJWT = (uid, name ) => {

    return new Promise((resolve, reject)=>{

        const payload = {uid, name}

        jwt.sign(payload ,process.env.KEY_WORD_SEED,{
            expiresIn: '2h'
        }, (err,token)=>{

            if(err){
                console.log(err)
                reject('No se pudo generar el token, el mio.')
            }

            resolve(token)
        })


    })
}

module.exports = {
    generarJWT
}