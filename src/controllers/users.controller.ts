import {IUsers} from '../models/users';
import {User} from '../models/index';
import jwt from 'jsonwebtoken';
import config from '../config';
import {Express,Request,Response,NextFunction} from 'express';
import bcrypt from 'bcrypt';
const gpc = require('generate-pincode');
import {sendEmail,uploadImage} from '../global.functions';
import passport from 'passport';
import axios from 'axios';
import fs from 'fs';
import Path from 'path';

function createToken(payload:IUsers,expires:number):string{
    let options={};
    if(expires>0)options={expiresIn:expires};
    return jwt.sign({
        id:payload._id,
        email:payload.email,
        name:payload.name
    },config.secret,options);
}

export function userController(base_url:string,app:Express,io:SocketIO.Server){
    app.post(`${base_url}/register`,async(req:Request,res:Response)=>{
        const obj = req.body;
        try {
            const user:IUsers = await User.findOne({email:obj.email});
            if(user)res.status(503).json({status:false,message:'El correo ya existe por favor intente con otro.'});
            const password = await bcrypt.hash(obj.password,bcrypt.genSaltSync(config.Bcrypt_rounds));
            User.create({
                type:obj.type,
                email:obj.email,
                password: password,
                name:obj.name,
                lastname:obj.lastname,
                pin:gpc(6)
            })
            .then((item:IUsers)=>{
                sendEmail(config.nodemailer.user,item.email,"Verificacion de cuenta","Su codigo de verificacion es: "+item.pin);
                res.status(200).json({
                    status:true,
                    message:'Usuario registrado con exito'
                })
            })
            .catch(err=>console.log(err));
        } catch (error) {
            console.log(error)
        }
    })

    app.post(`${base_url}/login`,async(req:Request,res:Response,next:NextFunction)=>{
        passport.authenticate('local-login',{session:false},(err,user)=>{
            if(err||!user)res.status(503).json({status:false,message:"Credenciales invalidas."});
            if(user.verified){
                const expiresIn:number = 5184000;
                res.status(200).json({
                    token:createToken(user,expiresIn),
                    expires:expiresIn
                })
            }else{
                res.status(401).json({'message': "Favor de verificar la cuenta"});
            }
        })(req, res);
    })

    app.post(`${base_url}/faceapi`,async(req:Request,res:Response,next:NextFunction)=>{

        const subscriptionKey = "8fdd2b2ab94744f98b9993e96c87c5b7";
        const baseUri = "https://node-faceapi.cognitiveservices.azure.com/face/v1.0/detect";

        let path = "../public/images/";
        const file:any = req.files.image;
        
        const upload = await uploadImage(file,path,file.name.slice(0,file.name.indexOf(".",0)));
        const image = fs.readFileSync(Path.join(__dirname,"../../public/images/"+upload.image));
        
        const params = {
            returnFaceId: "true",
            detectionModel: "detection_01",
            returnFaceAttributes:"emotion,age,gender",
        };

        axios({
            method:'post',
            url:baseUri,
            data:image,
            params:params,
            headers:{
                'Content-Type': 'application/octet-stream',
                "Ocp-Apim-Subscription-Key": subscriptionKey,
            }
        })
        .then((data)=>{
            res.json(data.data)
        })
        .catch((err:Error)=>{
            res.json(err)
        })

    })
}   