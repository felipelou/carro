//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando das Click para agregar un cursos en ''Agregar al carrtio"
    listaCursos.addEventListener('click', agregarCursos);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reinicar el arreglo
        limpiarHTML();  //limpiar el html
    })
}


//Funciones
function agregarCursos(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito') ){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//elimina datos del curso

    function eliminarCurso(e){
        console.log(e.target.classList);
        if(e.target.classList.contains('borrar-curso') ){
            const cursoId = e.target.getAttribute('data-id');

            //eliminar del arreglo
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
            carritoHTML();
        }
    }
//Traversing the doom
function leerDatosCurso(curso) {
    // console.log(curso);

    //Objeto para el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //confirmar si ya existe
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
        if(existe) {
            //actualizar cantidad
            const cursos = articulosCarrito.map(curso => {
                if(curso.id === infoCurso.id){
                    curso.cantidad ++;
                    return curso;   //retorna el objeto actualizado
                }else{  
                    return curso; //retorna objetos no actualizados
                }
            })
            articulosCarrito = [...cursos]
        }else {
            //agregar carrito
            articulosCarrito = [...articulosCarrito,infoCurso]
        }


    console.log(articulosCarrito)
    carritoHTML();
}   

//Muestra carrito 
function carritoHTML() {

    //Limpiar el html
    limpiarHTML();

    //Recorer el html
    articulosCarrito.forEach( curso => {
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
            <img src="${imagen}" width="100">
            </td>
             <td>${titulo}</td>
             <td>${precio}</td>
             <td>${cantidad}</td>
             <td> 
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
             </td>
             `;
                
           //Agregar el html del carrito 
          contenedorCarrito.appendChild(row);
    });
}

//eliminar el tbody
function limpiarHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
