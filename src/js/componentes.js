import { Todo, TodoList } from "../classes";

import { todoList } from "../index";

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const textInput = document.querySelector(`.new-todo`);
const btnBorrar = document.querySelector(`.clear-completed`);
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const contadorPendientes = document.querySelector('.todo-count');



export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado)? 'checked' : '' }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

// Eventos 
textInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && textInput.value.length > 0) {

        console.log(textInput.value);
        const nuevoTodo = new Todo(textInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        textInput.value = '';

    }
    contador();
});

divTodoList.addEventListener('click', (event) => {

        
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if ( nombreElemento.includes('input') ){ // click en el checkbox
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
  
    } else if ( nombreElemento.includes('button') ){ // hay que borrar el todo

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild( todoElemento );
    }
    contador();   
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length - 1; i >= 0; i--){

        
        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild( elemento );
        }
        contador();
    }
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if( !filtro ){ return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){

            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});


const contador = () => {
    const lista = new TodoList();
    let pendientes = lista.devolverNumeroPendientes();
    const contador1 = contadorPendientes.firstChild;
    contador1.innerHTML = pendientes;
}; contador();




