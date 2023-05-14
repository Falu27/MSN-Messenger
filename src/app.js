import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import views from './routes/views.js';
import { Server } from 'socket.io'

const app = express();
const PORT = process.env.PORT||8080; //en el entorno de quien te ejecuta, utiliza el puerto que elige la pc, sino utiliza el 8080
const server = app.listen(PORT, ()=>console.log('Listening on port 8080'))

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/', views);


const io = new Server(server);

const messages = [];
io.on('connection', socket=>{
    console.log(`Nuevo socket conectado`);
    socket.emit('logs', messages);

    socket.on('message', data=>{
        console.log(data);
        messages.push(data);
        io.emit('logs', messages);
    })
    socket.on('authenticated', data=>{
        socket.broadcast.emit('newUserConnected', data)
    })
})

// io para todos
//socket solo para mi
// socket.broadcast para todos menos para mi
