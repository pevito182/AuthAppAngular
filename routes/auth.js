const {Router}=require('express');
const { check } = require('express-validator');
const {crearUsuario,loginUsuario,renovarToken}=require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router=Router();


//Crear
router.post('/new',
[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength({min:6}),
    validarCampos
],
crearUsuario);

//login
router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength({min:6}),
    validarCampos
],loginUsuario);


//Validar y revalidar token
router.get('/renew',validarJWT,renovarToken);

module.exports=router;