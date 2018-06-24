muestraCohorts = (cohorts) => {
  const cohortsId = cohorts.map(elemento => elemento.id);
  const contenedor = document.getElementById('cohortsData');
  cohortsId.forEach(elemento => {
    const item = document.createElement('item');
    item.innerText = elemento;
    contenedor.appendChild(item);
    console.log()
  }); 
};


