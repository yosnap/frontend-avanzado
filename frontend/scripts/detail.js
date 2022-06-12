const box = document.querySelector('.box');

const getAdvert = async() => {
    const id = localStorage.getItem('current');
    try {
        box.innerHTML = '<h1>Cargando</h1>'
        const req = await fetch(`http://localhost:8000/api/adverts?id=${id}`);
        const data = await req.json();
        console.log(data)
        box.innerHTML = `
        <article class="wr-30">
        <h3>${data[0].name}</h3>
        <p>${data[0].description}</p>
        <p>${data[0].price}</p>
        <p>${data[0].sell ? 'Venta' : 'Compra'}</p>
        <img src="${data[0].image}" alt="product image" />
    </article>
        `
    } catch (error) {
        
    }
}

getAdvert();