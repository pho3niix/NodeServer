import {User} from './users/users';
import mongoose from 'mongoose';
import Knex from 'knex';

export function initDB(name:string):void{
    mongoose.connect(name,{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(async(db)=>{
        // if (process.env.NODE_ENV !== 'production') {
        //     mongoose.set("debug", true);
        // }
        console.log(">>> Database connected");
    })
    .catch((err:Error)=>{
        console.log(err);
    })
}

export const knex = Knex({
    client:'mysql',
    connection:{
        host:"127.0.0.1",
        user:"root",
        password:"",
        database:"express"
    },
    pool:{
        min:0,
        max:10
    }
});

export {User};