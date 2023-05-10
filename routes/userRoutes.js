const express = require('express');
const router = express.Router();
const { check, body }= require('express-validator');

const {
    paginaPrincipal,
    paginaError,
    registrarUsuario,
    paginaRegistro,
    paginaLogin,
    paginaPrueba,
    loginUsuario
} = require('../controllers/userControllers')

//Cambiamos los app por routes

router.get('/', paginaPrincipal);
router.get('/login', paginaLogin);
router.get('/registrar', paginaRegistro);
router.get('/error',paginaError);


router.post('/login',
[
    
    check('email').isEmail(),
    check('password').isLength({min:5}),
] , loginUsuario);




router.post('/',
[
    check('nombre').isLength({min:4}),
    check('email').isEmail(),
    check('password').isLength({min:5}),
] , registrarUsuario);
    
router.post('/body', 
body('nombre').isLength({min:4}),
body('email').isEmail(),
body('password').isLength({min:5})
 ,paginaPrueba) ;
    


module.exports = router;
