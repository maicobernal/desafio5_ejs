const fs = require("fs")
module.exports = class Contenedor {
    constructor(file) {
        this.file = file;
    }
    getAll = async () => {

        try {
            const check = await fs.promises.readFile(`${this.file}`, 'utf-8');
            return JSON.parse(check);

        } catch (error) {
            console.log('El archivo está vacío');
            await fs.promises.writeFile(this.file, "");
            const check = await fs.promises.readFile(this.file, 'utf-8');
            return check;

        }

    }
    saveAll = async (productoingresado) => {
        let arrayprevio = await this.getAll();
        let idPrevio = () => {
            if (arrayprevio.length > 0) {
                const ids = arrayprevio.map(object => {
                    return object.id;
                })
                const max = Math.max(...ids);
                return max;
            } else {
                arrayprevio = [];
                return 0;

            }
        }
        productoingresado.forEach((value, index) => {
            value.id = index + idPrevio() + 1;
            value.price = parseInt(value.price);
            value.stock = parseInt(value.stock);
        })
        arrayprevio.push(...productoingresado);

        try {
            await fs.promises.writeFile(`${this.file}`, JSON.stringify(arrayprevio, null, 2));
            return console.log(`Nuevo item agregado con exito!`);
        } catch (error) {
            throw new Error('Error en el guardado');
        }
    }

    getById = async (nro) => {
        try {
            const check = await this.getAll();
            let validate = 0;
            let producto = {};
            check.forEach((element) => {
                if (element.id == nro) {
                    validate++;
                    producto = element;
                    console.log('Exito, producto encontrado')
                }
            })
            if (validate == 0) {
                throw new Error('No existe el producto')
            }
            console.log(producto)
            return producto
        } catch (err) {
            throw new Error('Error al obtener el Id :' + err);
        }
    }

    getRandom = async () => {
        try {
            const check = await this.getAll();
            let random = Math.floor(Math.random() * check.length);
            console.log('Exito, producto encontrado')
            return check[random];
        } catch (err) {
            throw new Error('Error al obtener productos aleatorios: ' + err);
        }
    }

    deleteById = async (nro) => {
        try {
            const check = await this.getAll();
            if (check.some((element) => element.id == nro)) {
                check.forEach(element => {
                    if (nro == element.id) {
                        check.splice(check.indexOf(element), 1);
                        console.log('Exito, producto eliminado')
                    }
                })
                await fs.promises.writeFile(this.file, JSON.stringify(check, null, 2));
            } else {
                throw new Error('No existe el producto')
            }
        } catch (err) {
            throw new Error('Error al borrar: ' + err)
        }
    }

    deleteAll = async () => {
        try {
            await fs.promises.writeFile(this.file, "") //JSON.stringify([], null, 2);
            console.log('Todos los productos fueron eliminados');
        } catch (err) {
            throw new Error('No se pudieron borrar todos los objetos' + err);
        }
    }

    sellById = async (nro) => {
        try {
            let check = await this.getAll();
            if (check.some((element) => element.id == nro & element.stock > 0)) {
                let validate = 0;
                check.forEach(element => {
                    element.stock--;
                    validate++;
                    console.log('El producto se vendio con exito');
                    console.log('Quedan ' + element.stock + ' unidades');
                })
                await fs.promises.writeFile(this.file, JSON.stringify(check, null, 2));
            } else {
                if (check.some((element) => element.id == nro) == False) {
                    throw new Error('El producto no existe')
                }
                if (check.some((element) => element.id == nro & element.stock < 0)) {
                    throw new Error('El producto no tiene stock')
                }
            }
        } catch (err) {
            throw new Error('Error en la venta' + err);
        }

    }
    modifyById = async (nro, modified) => {
        try {
            const check = await this.getAll();
            if (check.some((element) => element.id == nro)) {
                check.forEach(element => {
                    if (nro == element.id) {
                        element.title = modified.title;
                        element.price = parseInt(modified.price);
                        element.stock = parseInt(modified.stock);
                        element.thumbnail = modified.thumbnail;
                        console.log('El producto se modifico con exito');
                    }
                })
                await fs.promises.writeFile(this.file, JSON.stringify(check, null, 2));
            } else {
                throw new Error('No existe el producto');
            }
        } catch (err) {
            throw new Error('Error al modificar el producto: ' + err);
        }
    }
}
