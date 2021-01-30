import {Inventory} from './inventory';
import {Express,Request,Response,NextFunction} from 'express';

export function inventoryController(url:string,app:Express,io:SocketIO.Server){

    app.get(`${url}`,async(req:Request,res:Response,next:NextFunction)=>{
        try {
            Inventory.query()
            .select("name","quantity")
            .where("quantity",">=",25)
            .then(data=>{
                res.json(data)
            });
        } catch (error) {
            res.send(error);
        }
    })

}