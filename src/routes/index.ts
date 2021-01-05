import {Express} from 'express';
import {userController} from '../controllers/users.controller';
import {imageController} from '../controllers/image.controller';

function configRoutes(app:Express,io:SocketIO.Server):void{
    userController('/user',app,io);
    imageController('/upload',app,io);
}

export {configRoutes};