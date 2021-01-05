import {uploadImage} from '../global.functions';
import fs from 'fs';
import Path from 'path';
import axios from 'axios';
import {Express,Request,Response,NextFunction} from 'express'

export function imageController(base_url:string,app:Express,io:SocketIO.Server){
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
            res.status(200).json({
                url:"http://localhost:3000/public/images/"+upload.image,
                data:data.data[0]
            })
        })
        .catch((err:Error)=>{
            res.json(err)
        })

    })
}