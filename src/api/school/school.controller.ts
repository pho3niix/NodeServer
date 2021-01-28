import {knex} from '../index.model';
import {Request,Response,Express} from 'express';

const table:string = "students";

export function studentController(url:string,app:Express,io:SocketIO.Server){
    app.post(`${url}`,(req:Request,res:Response)=>{
        const body = req.body;
        knex(table).insert({
            name:body.name,
            age:body.age
        })
        .then(()=>{
            res.send("Alumno registrado correctamente");
        })
        .catch(err=>{
            console.log(err);
            res.send("Ocurrio un error")
        })
    })

    app.get(`${url}`,(req:Request,res:Response)=>{
        knex.select('students.name',"students.age","asignatures.name as asignature")
        .from(table)
        .innerJoin("asignatures","students.asignature","asignatures.id_asignature")
        .then(data=>{
            let result = data.length==1?data[0]:data;
            res.send(result);
        })
        .catch(err=>{
            console.log(err);
            res.send("Ocurrio un error")
        })
    })

    app.get(`${url}/:key/:value`,(req:Request,res:Response)=>{
        knex.select('*').from(table).where(req.params.key,req.params.value)
        .then(data=>{
            let result = data.length>0?data[0]:"No hay coincidencias";
            res.send(result);
        })
        .catch(err=>{
            console.log(err);
            res.send("Ocurrio un error")
        })
    })

    app.put(`${url}`,(req:Request,res:Response)=>{
        const body = req.body;
        knex(table)
        .where("id",body.id)
        .update(body.key,body.value)
        .then(()=>{
            res.send("Alumno actualizado")
        })
        .catch(err=>{
            console.log(err);
            res.send(err);
        })
    })

    app.delete(`${url}/:id`,(req:Request,res:Response)=>{
        knex(table)
        .where("id",req.params.id)
        .del()
        .then(()=>{
            res.send("Alumno eliminado")
        })
        .catch(err=>{
            console.log(err);
            res.send(err);
        })
    })
}