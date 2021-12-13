import { Request, Response, Router } from 'express'
import { Autos } from '../model/autos'
import { db } from '../database/database'
import { iAuto } from '../model/autos'

class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router() {
        return this._router
    }

    private getAutos = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await Autos.find({})
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }

    private getAutos2 = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                const {matriculax} = req.params
                console.log(mensaje)
                const query = await Autos.find({_matricula: matriculax})
        res.json(query)
    })
        .catch((mensaje) => {
    res.send(mensaje)
})

db.desconectarBD()
    }

    private postAutos = async (req: Request, res: Response) => {
        const {tipoObjeto, precioBase, potenciaMotor, traccion, matricula} = req.body
await db.conectarBD()
        const dSchema: iAuto ={
            _tipoObjeto:tipoObjeto,
            _precioBase:precioBase,
            _potenciaMotor:potenciaMotor,
            _traccion:traccion,
            _matricula:matricula
        }
        console.log(dSchema)
        const oSchema = new Autos(dSchema)
        await oSchema.save()
await db.desconectarBD()
    }

    private updatePm = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                //let cambio: number = 0
                const {matriculax, cambio} = req.params
                console.log(mensaje)
                const query = await Autos.findOneAndUpdate(
                    {_matricula: matriculax}, {_potenciaMotor: cambio}
                )
        res.json(query)
    })
        .catch((mensaje) => {
    res.send(mensaje)
})

db.desconectarBD()
    }

   

misRutas(){
    this._router.get('/autos', this.getAutos)
    this._router.get('/autos/:matriculax', this.getAutos2)
    this._router.post('/autos/nuevo', this.postAutos)
    this._router.put('/autos/:matriculax/:cambio', this.updatePm)    
}
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router
