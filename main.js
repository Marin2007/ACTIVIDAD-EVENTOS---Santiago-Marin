document.addEventListener("DOMContentLoaded", () => {
  const selectTipo = document.getElementById("tipo");
  const buscador = document.getElementById("buscador");
  const listaResultados = document.getElementById("resultados");

  let datosPeliculas = [];
  let datosSeries = [];
  let tipoSeleccionado = "peliculas";

  // Función para cargar datos desde JSON
  const cargarDatos = async () => {
    try {
      const resPeliculas = await fetch("./peliculas.json");
      datosPeliculas = await resPeliculas.json();

      const resSeries = await fetch("./series.json");
      datosSeries = await resSeries.json();
    } catch (error) {
      console.error("Error al cargar los archivos JSON:", error);
      alert("Hubo un problema al cargar los datos. Intenta nuevamente.");
    }
  };

  // Inicializar cargando los datos
  cargarDatos();

  // Cambiar tipo
  selectTipo.addEventListener("change", (event) => {
    tipoSeleccionado = event.target.value;
    listaResultados.classList.add("oculto"); // Ocultar resultados al cambiar de tipo
  });

  // Filtrar búsqueda en tiempo real
  buscador.addEventListener("input", () => {
    const query = buscador.value.trim().toUpperCase();
    const datos = tipoSeleccionado === "peliculas" ? datosPeliculas : datosSeries;

    listaResultados.innerHTML = "";

    if (query) {
      const resultadosFiltrados = datos.filter((item) =>
        item.nombre.startsWith(query)
      );

      if (resultadosFiltrados.length === 0) {
        listaResultados.innerHTML = "<li>No se encontraron resultados.</li>";
      } else {
        resultadosFiltrados.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item.nombre;

          const p = document.createElement("p");
          p.textContent = item.sinopsis;

          li.appendChild(p);
          listaResultados.appendChild(li);

          // Eventos de mouseover y mouseout
          li.addEventListener("mouseover", () => (p.style.display = "block"));
          li.addEventListener("mouseout", () => (p.style.display = "none"));
        });
      }
    }

    listaResultados.classList.remove("oculto"); // Mostrar resultados al buscar
  });
});
