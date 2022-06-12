const form = document.querySelector('form');
const feedback = document.querySelector('.feedback');

const errorMessages = {
    'username and password needed.':'Debe ingresar usuario y contraseña.',
    'Wrong username/password':'Contraseña o usuario inválidos.'
}

form.addEventListener('submit', ev => {
    ev.preventDefault();
    const values = Object.fromEntries(new FormData(ev.target));
    login(JSON.stringify(values));
});

const login = async (body) => {
    try {
        const auth = await fetch('http://localhost:8000/auth/login',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body
        });
        const response = await auth.json();
        response.message ? 
            feedback.innerText = errorMessages[response.message] || response.message 
            : null;
        if(response.accessToken){
            localStorage.setItem('token',response.accessToken);
            navigate('home.html');
        }
    } catch (error) {
        console.log(error);
    }
};

