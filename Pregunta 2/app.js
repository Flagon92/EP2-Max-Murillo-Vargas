const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('./public/scripts/config')
const port = 3000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static('public'));

/*************/ 
app.get('/', (req,res) => {
    console.log('Estamos en la pagina principal')
    res.send('Pagina Principal')
})

app.post('/signup', (req, res) => {

    const { username, password } = req.body;
    
    console.log(` Post pagina de registro ${req.body.username} ` )
    console.log( ` Post pagina de registro ${req.body.password} ` )

    if(!username || !password) {
        return res.status(400).json({
            auth: false,
            message: 'Complete usuario y contraseña'
        });
    }
    
    const user = {
        nombre: username,
        password: password
    };
    
    jwt.sign({ user }, 'secretkey', { expiresIn: '10s' }, (err, token) => {
        if (err) {
            return res.status(500).json({
                auth: false,
                message: 'No se logró generar un Token'
            });
        }
        res.json({
            auth: true,
            token: token,
            message: 'Registro Exitoso'
        });
    });

})

app.post('/signin', verifyToken, (req, res) => {
    console.log('Validacion')
    res.send('Estamos en la pagina de ingreso')
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader != 'undefined'){
        bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }else{
        res.status(401)
    }
}

/*************/

app.use(express.static('public'))
app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto: ${port}, http://localhost:${port}/`)
})

