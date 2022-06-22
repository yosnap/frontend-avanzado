const form = document.querySelector('form');
const feedback = document.querySelector('.feedback');

const errorMessages = {
    'Username is taken':'Ya existe el usuario.'
}

form.addEventListener('submit', ev => {
    ev.preventDefault();
    feedback.innerText = ''
    const values = Object.fromEntries(new FormData(ev.target));
    signup(JSON.stringify(values));
});

const signup = async (body) => {
    try {
        const auth = await fetch('http://localhost:8000/auth/register',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body
        });
        const response = await auth.json();
        if(response.message) {
            form.reset()
            feedback.innerText = errorMessages[response.message] || response.message
        }else{
            alert(`Registrado con éxito usuario: ${response.username}`);
            form.reset();
            navigate('index.html');
        }


    } catch (error) {
        console.log(error);
    }
};
