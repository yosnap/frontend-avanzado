let path = window.location.pathname.split('/');
let currentFile = path.pop();

function navigate(route){
    let newFile = [...path,route].join('/');
    window.location.assign(newFile);
};

const details = (ev) => {
    ev.preventDefault();
    alert(ev.target.id);
}

window.onload = () => {
    const token = localStorage.getItem('token');
    if(!token && currentFile){
        currentFile === 'index.html' ? null 
        : 
        currentFile === 'signup.html' ? null 
        : navigate('index.html');
    }else{
        currentFile === 'index.html' ? navigate('home.html')
        : currentFile === 'signup.html' ? navigate('home.html')
        : null;
    };
};

