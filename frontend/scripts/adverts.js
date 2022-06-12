const box = document.querySelector('.box');
const addBtn = document.querySelector('.btn-add');

const emptyContainer = `
<h3>No existen elementos</h3>
<a href="./newadvert.html" alt="Nuevo anuncio">Agregar uno</a>
`;

const getAdverts = async () => {
    try {
        const req = await fetch('http://localhost:8000/api/adverts');
        const resp = await req.json();
        return resp;
    } catch (error) {
        console.log(error)
    }
};

const formatContent = (doc) => {
    return `
    <article class="wr-30">
        <h3>${doc.name}</h3>
        <p>${doc.description}</p>
        <p>${doc.price}</p>
        <p>${doc.sell ? 'Venta' : 'Compra'}</p>
        <img src="${doc.image}" alt="product image" />
        <br>
        <a class="detail mt-1" role="button" href="#!" id="${doc.id}" >Detalles</a>
    </article>
    `
}

const loadContent = async () => {
    try {
        box.innerHTML = '<h1>Cargando</h1>'
        const data = await getAdverts();
        if(!data || data.length === 0) return box.innerHTML = emptyContainer;
        box.innerHTML = '';
        for (const doc of data) {
            let piece = formatContent(doc);
            box.innerHTML += piece;
            
        }
        const detailers = document.querySelectorAll('.detail');
        detailers.forEach(item => {
            item.addEventListener('click',e => {
                e.preventDefault();
                localStorage.setItem('current',e.target.id);
                navigate('detail.html');
            })
        })
    } catch (error) {
        box.innerHTML= error.message;
    }
};

loadContent();








