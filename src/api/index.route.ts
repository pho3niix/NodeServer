import {Express} from 'express';
import {userController} from './users/users.controller';
import {inventoryController} from './inventory/inventory.controller';

function configRoutes(app:Express,io:SocketIO.Server):void{
    userController('/user',app,io);
    inventoryController('/inventory',app,io);
}

export {configRoutes};