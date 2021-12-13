"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const autos_1 = require("../model/autos");
const database_1 = require("../database/database");
class DatoRoutes {
    constructor() {
        this.getAutos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield autos_1.Autos.find({});
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getAutos2 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const { matriculax } = req.params;
                console.log(mensaje);
                const query = yield autos_1.Autos.find({ _matricula: matriculax });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.postAutos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { tipoObjeto, precioBase, potenciaMotor, traccion, matricula } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                _tipoObjeto: tipoObjeto,
                _precioBase: precioBase,
                _potenciaMotor: potenciaMotor,
                _traccion: traccion,
                _matricula: matricula
            };
            console.log(dSchema);
            const oSchema = new autos_1.Autos(dSchema);
            yield oSchema.save();
            yield database_1.db.desconectarBD();
        });
        this.updatePm = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                //let cambio: number = 0
                const { matriculax, cambio } = req.params;
                console.log(mensaje);
                const query = yield autos_1.Autos.findOneAndUpdate({ _matricula: matriculax }, { _potenciaMotor: cambio });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/autos', this.getAutos);
        this._router.get('/autos/:matriculax', this.getAutos2);
        this._router.post('/autos/nuevo', this.postAutos);
        this._router.put('/autos/:matriculax/:cambio', this.updatePm);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.routes = obj.router;
