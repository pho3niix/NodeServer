# FaceRecognition Setup

### Cambiar a branch face-recognition
```bash
# Comando en bash 
git checkout face-recognition 
```

### Instalar dependencias
```bash
npm install
```

### Correr servidor
```bash
npm run dev
```

### Para iniciar la aplicacion dirigirse a la siguiente ruta
```bash
http://localhost:3000/image
```

### API de servidor local para subir imagen
```bash
### Metodo POST
http://localhost:3000/upload/faceapi
```

## Archivos importantes
```bash
- src/views/image.html
- src/controllers/image.controller.ts
- src/global.function.ts # De este archivo la funcion importante es uploadImage
- public/images # Aqui se almacena la imagen subida desde el frontend
```
