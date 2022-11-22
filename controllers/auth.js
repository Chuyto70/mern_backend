const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const { generarJWT } = require('../helpers/jwt')
const Usuario = require('../models/Usuario')



const crearUsuario = async(req, res)=>{

    try {
        
    const {email, password} = req.body

   let usuario = await Usuario.findOne({email})
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'Un usuario existe con ese correo'
            })
        }

        usuario = new Usuario(req.body)
     
        
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt)


        await usuario.save()
        
        const token = await generarJWT(usuario._id,usuario.name)

        res.status(201).json({
            ok:true,
            msg:'Usuario creado',
            uid:usuario._id,
            name:usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
        ok:false,
        msg:'Por favor, hable con el administrador'
    })
    }
   
   
}

const loginUsuario = async (req, res)=>{

  
    try {

    const {email, password} = req.body

    const usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'Usuario o correo no validos'
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password)

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password Incorrecto'
            })
        }



    const token = await generarJWT(usuario.id,usuario.name)
    
    res.status(200).json({
        ok:true,    
        uid:usuario.id,
        name:usuario.name,
        token

    })
    }catch (error) {
        console.log(error)
        res.status(500).json({
        ok:false,
        msg:'Por favor, hable con el administrador'
    })
    }
  
}

const revalidarToken = async (req, res)=>{

    const {uid, name} = req
    
    const token = await generarJWT(uid, name)
 
    res.json({
        ok:true,
        token,
        uid,name
    
    })
}

module.exports = {
    crearUsuario,
    revalidarToken,
    loginUsuario
}