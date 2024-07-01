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

async function showProductos(){
    let productos =  await fetchData(BASEURL+'/gestion/', 'GET');
    const tableProductos = document.querySelector('#list-table-products tbody');
    tableProductos.innerHTML='';
    productos.forEach((producto, index) => {
      let tr = `<tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>
                        <img src="${producto.url_imagen}" width="20%">
                    </td>
                    <td>
                        <button class="btn-viv" onclick='updateProducto(${producto.id_producto})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-viv" onclick='deleteProducto(${producto.id_producto})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableProductos.insertAdjacentHTML("beforeend",tr);
    });
}


async function saveProducto(){
    const idProducto = document.querySelector('#id_producto').value;
    const nombre = document.querySelector('#nombre').value;
    const precio = document.querySelector('#precio').value;
    const url_imagen = document.querySelector('#url_imagen').value;
    //VALIDACION DE FORMULARIO
    if (!nombre || !precio || !url_imagen) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    
    const productoData = {
        nombre: nombre,
        precio: precio,
        url_imagen: url_imagen,
    };
  let result = null;
 
  if(idProducto!==""){
    result = await fetchData(`${BASEURL}/gestion/${idProducto}`, 'PUT', productoData);
  }else{
    
    result = await fetchData(`${BASEURL}/gestion/`, 'POST', productoData);
  }
  
  const formProducto = document.querySelector('#form-product');
  formProducto.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showProductos();
}



function deleteProducto(id){
    Swal.fire({
        title: "Esta seguro de eliminar el producto?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/gestion/${id}`, 'DELETE');
          showProductos();
          Swal.fire(response.message, "", "success");
        }
    });
    
}


async function updateProducto(id){
    
    let response = await fetchData(`${BASEURL}/gestion/${id}`, 'GET');
    const idProducto = document.querySelector('#id_producto');
    const nombre = document.querySelector('#nombre');
    const precio = document.querySelector('#precio');
    const url_imagen = document.querySelector('#url_imagen');
    
    idProducto.value = response.id_producto;
    nombre.value = response.nombre;
    precio.value = response.precio;
    url_imagen.value = response.url_imagen;
}


document.addEventListener('DOMContentLoaded',function(){
    const btnSaveProduct = document.querySelector('#btn-save-product');

    btnSaveProduct.addEventListener('click',saveProducto);
    showProductos();
});
  