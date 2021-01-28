import {Express} from 'express';
import {userController} from './users/users.controller';

function configRoutes(app:Express,io:SocketIO.Server):void{
    userController('/user',app,io);
}

export {configRoutes};