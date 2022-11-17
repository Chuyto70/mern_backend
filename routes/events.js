const express = require('express')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')
const { validarJWT } = require('../middlewares/validarJWT')
const router = express.Router()
//obtener eventos
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const isDate = require('../helpers/isDate')


router.get('/', [validarJWT], getEventos)

router.post('/', 
[   validarJWT,
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate) ,
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos   
], crearEvento)
router.put('/:id', [validarJWT,
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate) ,
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos ], actualizarEvento)
router.delete('/:id', [validarJWT], eliminarEvento)

module.exports = router
