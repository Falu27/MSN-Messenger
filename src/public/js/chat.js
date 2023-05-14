const socket = io({
    autoConnect:false
});
const chatBox = document.getElementById('chatBox');
let user;

Swal.fire({
    title:"User Name:",
    input:"text",
    icon:"question",
    inputValidator: (value) =>{
        return !value && 'Ingrese un Nombre de Usuario para ingresar.'
    },
    allowOutsideClick: false,
    allowEscapeKey:false
}).then(result=>{
    user = result.value;
    socket.connect();
    socket.emit('authenticated', user)
})

chatBox.addEventListener('keyup', evt=>{
    if(evt.key==='Enter'){
        if(chatBox.value.trim().length>0){
            socket.emit('message', {user, message:chatBox.value.trim()})
        }
    }
})

socket.on('logs', data=>{
    const logs = document.getElementById('logs');
    let message = "";
    data.forEach(log=>{
        message+= `${log.user} dice: ${log.message} <br/>`
    })
    logs.innerHTML = message;
})

socket.on('newUserConnected', data=>{
    if(!user) return;
    Swal.fire({
        toast:true, //alerta de solo una esquina
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: `${data} se unio al chat!`,
        icon: "success"
    })
})