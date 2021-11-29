window.onload = () => {
    const app = document.getElementById("root");
    const container = document.createElement("div");
    container.setAttribute("class", "container");
    app.appendChild(container);
    document.getElementById("body-main").style.backgroundColor="pink"
  
    //Si se hizo click en la tarjeta de pelicula lo guardo en localStorage
    //Muestro el link a la pág de calificaciones
    if (localStorage.getItem('calificaciones') !== null) {
      const link = document.getElementById("favoritas");
      link.innerHTML = '<a href="favoritas.html">Favoritas</a>';
    }
    //Acá agrego enlace a pág agregar
    const agregar = document.getElementById("agregar");
    agregar.innerHTML = '<a href="formulario.html">Agregar película</a>';
  
    // Aqui debemos agregar nuestro fetch
  
    fetch("http://localhost:3031/api/movies")
    .then(res=> res.json())
    .then(peliculas =>{
      /** Codigo que debemos usar para mostrar los datos en el frontend*/
        let data = peliculas.data;
    
        data.forEach((movie) => {
          const card = document.createElement("div");
          card.setAttribute("class", "card");
    
          const h1 = document.createElement("h1");
          h1.textContent = movie.title;
    
          const p = document.createElement("p");
          p.textContent = `Rating: ${movie.rating}`;
    
          const duracion = document.createElement("p");
          duracion.textContent = `Duración: ${movie.length}`;
    
          container.appendChild(card);
          card.appendChild(h1);
          card.appendChild(p);
          if (movie.genre !== null) {
            const genero = document.createElement("p");
            genero.textContent = `Genero: ${movie.genre.name}`;
            card.appendChild(genero);
          }
          //Acá guardo la info de la peli a la que se le hizo click
          const favoritas = document.createElement("p");
          favoritas.innerHTML = `<div>&#9734;</div>`;
          favoritas.addEventListener("click", function (e) {
            e.preventDefault()
            if (localStorage.calificaciones) {
              let arr = localStorage.calificaciones.split(',');
              arr.push(movie.id)
              localStorage.calificaciones = arr;
            } else {
              localStorage.setItem('calificaciones', movie.id)
            }
          })
          card.appendChild(duracion);
          card.appendChild(favoritas);
        });
      
    }).catch(error => console.log(error));
  
  };