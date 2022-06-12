const btnClose = document.querySelector('.logout');

btnClose.addEventListener('click', e => {
    e.preventDefault();
    localStorage.clear();
    navigate('index.html');
})