<<<<<<< HEAD
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
=======
// Función de display navbar
$('.btn-expand-collapse').click(function(e) {
  $('.navbar-primary').toggleClass('collapsed');
});
  
  
var delay = 500;
$('.progress-bar').each(function(i) {
  $(this).delay(delay * i).animate({ width: $(this).attr('aria-valuenow') + '%' }, delay);
  
  $(this).prop('Counter', 0).animate({
    Counter: $(this).text()
  }, {
    duration: delay,
    easing: 'swing',
    step: function(now) {
      $(this).text(Math.ceil(now) + '%');
    }
  });
});
>>>>>>> arreglos


