const express = require('express')
const {Router} = express
const app = express()
const router = Router()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const Contenedor = require('./carrito.js')
let stock = new Contenedor('productos.txt');

router.get("/visualizar", async (req, res) => {
    try {
        const productos = await stock.getAll();
        res.render('./sections/visualizar.ejs',{productos})
    } catch (err) {
        res.status(500).send('Error en el proceso GET :' + err)
    }
}) 

router.get("/agregar", (req, res) => {
    try {
        res.render('./sections/agregar.ejs')
    } catch (err) {
        res.status(500).send('Error en el proceso GET :' + err)
    }
}) 

router.get("/modificar", (req, res) => {
    try {
        res.render('./sections/modificar.ejs')
    } catch (err) {
        res.status(500).send('Error en el proceso GET :' + err)
    }
}) 

router.get("/random", async (req, res) => {
    try {
        const productorandom = await stock.getRandom();
    res.render('./sections/random.ejs', {productorandom})
    } catch (err) {
        res.status(500).send('Error en el proceso GET :' + err)
    }
}) 

router.get("/eliminar", (req, res) => {
    try {
        res.render('./sections/eliminar.ejs')
    } catch (err) {
        res.status(500).send('Error en el proceso GET :' + err)
    }
}) 

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        if (id != 'random') {
            let productoById = await stock.getById(id);
            console.log(productoById)
            res.send(productoById)
        } else {
            let producto = await stock.getRandom()
            res.send(producto)
        }
    } catch (err) {
        res.status(500).send('Error en el proceso GET :' + err)
    }
}) 

router.post('/form', async (req, res) => {
    const nuevo = req.body
    try {
        const arraynuevo = []
        arraynuevo.push(nuevo)
        await stock.saveAll(arraynuevo)
        const check = await stock.getAll()
        res.send(check)
    } catch (err) {
        res.status(500).send('Error en el proceso POST:' + err)
    }
})

router.put('/form', async (req, res) => {
    const nuevo = req.body
    try {
        await stock.modifyById(nuevo.id, nuevo)
        const check = await stock.getAll()
        res.send(check)
    } catch (err) {
        res.status(500).send('Error en el proceso PUT:' + err)
    }
})

router.delete('/form/:id', async (req, res) => {
    const {id} = req.params
    try {
        await stock.deleteById(id)
        const check = await stock.getAll()
        res.send(check)
    } catch (err) {
        res.status(500).send('Error en el proceso DELETE:' + err)
    }
})

router.use('/eliminar', express.static(__dirname + '/public'))
router.use('/agregar', express.static(__dirname + '/public'))
router.use('/modificar', express.static(__dirname + '/public'))


module.exports = router