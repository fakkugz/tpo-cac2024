const BASEURL = 'http://127.0.0.1:5000';


async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

async function showTienda(){
    let productos =  await fetchData(BASEURL+'/tienda/', 'GET');
    const listaProductos = document.querySelector('#tienda');
    listaProductos.innerHTML='';
    productos.forEach((producto, index) => {
      let divs = `<div class="scale-animation">
                  <img src="${producto.url_imagen}" alt="foto de ${producto.nombre}" >
                  <p class="t-item-nombre">${producto.nombre}</p>
                  <p class="t-item-precio">$${producto.precio}</p>
                  <button class="boton-carrito">Agregar al carrito</button>
                </div>`;
      listaProductos.insertAdjacentHTML("beforeend", divs);
    });
  }

  document.addEventListener('DOMContentLoaded',function(){
    showTienda();
});
