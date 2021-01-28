import {Express} from 'express';
import {userController} from './users/users.controller';
import {studentController} from './school/school.controller';

function configRoutes(app:Express,io:SocketIO.Server):void{
    userController('/user',app,io);
    studentController('/student',app,io);
}

export {configRoutes};