const form = document.querySelector('.form');
const token = localStorage.getItem('token');
const feedback = document.querySelector('.feedback');
const btn = document.querySelector('btn-reg')

const createAdvert = async (body) => {
    
    try {
        let req = await fetch('http://localhost:8000/api/adverts', {
            method: 'POST',
            body,
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
            }
        }); 
        return await req.json();
    } catch (error) {
        console.log(error);
    }
}

const success = () => {
    feedback.setAttribute('style','color:green');
    feedback.innerHTML = 'Registro exitoso';
    setTimeout(()=> {
        feedback.removeAttribute('style');
        feedback.innerHTML = ''
    },3000);
}
 
form.addEventListener('submit', async ev => {
    ev.preventDefault();
    let file = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: new FormData(form),
        headers:{'Authorization':`Bearer ${token}`}
    });
    let image = await file.json();

    let values = Object.fromEntries(new FormData(ev.target));
    const {name,description,sell,price} = values;
    const args = {name,description,sell,price,image:image.path};
    const response = await createAdvert(JSON.stringify(args));
    form.reset();
});

