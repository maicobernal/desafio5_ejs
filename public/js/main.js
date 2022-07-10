function borrar() {
    var id = document.getElementById("idlook").value;
    var url = "/api/productos/form/" + id;
    fetch(url, {
      method: 'DELETE'
    })
    .then((response)=> {
      if(!response.ok){
        throw new Error(response.statusText);
      }
        return response.json();
    })
    .then((data) =>{
      if(data.stat === "fail") {
        throw new Error(data.message);
      }
        alert('Producto eliminado con éxito')
        console.log(data.stat);
    })
    .catch((err) =>{
      console.log(err);
      alert('El ID ingresado no existe')
    })
  }

  function procesar() {
    var id = document.getElementById("idlook").value;
    var url = "/api/productos/" + id;
    fetch(url)
    .then((response)=> {
      if(!response.ok) {
        throw new Error("not ok");
      }
        return response.json();
    })
    .then((data) =>{
      if(data.stat === "fail") {
        throw new Error(data.message);
      }
        document.getElementById("idproducto").value = data.id;
        document.getElementById("title").value = data.title;
        document.getElementById("price").value = data.price;
        document.getElementById("stock").value = data.stock;
        document.getElementById("thumbnail").value = data.thumbnail;
      
    })
    .catch((err) =>{
      console.log(err);
      alert('El ID ingresado no existe');
    })
}

  function mandar(){
    const objeto = {
      id: document.getElementById("idproducto").value,
      title: document.getElementById("title").value,
      price: document.getElementById("price").value,
      stock: document.getElementById("stock").value,
      thumbnail: document.getElementById("thumbnail").value
    }
    const url = '/api/productos/form'
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(objeto),
      headers: {
      'Content-Type': 'application/json'
      }
      
    })
    .then((response)=> {
        return response.json();
    })
    .then((data) =>{
      alert('Producto modificado con éxito')
      console.log(data);
    });
  }