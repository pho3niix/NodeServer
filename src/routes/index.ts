import {Express} from 'express';
import {userController} from '../controllers/users.controller';

function configRoutes(app:Express,io:SocketIO.Server):void{
    userController('/user',app,io);
}

export {configRoutes};