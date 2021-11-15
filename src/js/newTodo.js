import '../css/componentes.css';
import { ToDo, TodoList } from './classes';
import {todoList} from '../index'

const ul = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo')
const btnBorrar = document.querySelector('.clear-completed')
const uiFilters = document.querySelector('.filters')
const botones = document.querySelectorAll('.filtro')

export const agregarTareaHtml = (todo) => {
    const completed = (todo.completado) ? 'completed' : ''
    const checked = (todo.completado) ? 'checked' : ''
    const dataHtml = `
        <li class="${completed}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${checked}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `
    const div = document.createElement('div')
    div.innerHTML = dataHtml
    ul.append(div.firstElementChild)
    return div.firstElementChild

}
//eventos

const eventHandleChange =(e) =>{
    if (e.keyCode === 13 && txtInput.value.length > 0) {
        const newTodo = new ToDo(txtInput.value)
        todoList.nuevoTodo(newTodo)
        txtInput.value = ''
        
        agregarTareaHtml(newTodo)
    }
}
txtInput.addEventListener('keyup',eventHandleChange )

ul.addEventListener('click',(e) =>{
   const nombreElemento = e.target.localName //input, label, button
   const todoElement = e.target.parentElement.parentElement
   const dataId = todoElement.getAttribute('data-id')
    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(dataId)
        todoElement.classList.toggle('completed')
    }else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(dataId)
        ul.removeChild(todoElement)
    }

    console.log(todoList);
})

btnBorrar.addEventListener('click', ()=>{
    todoList.borrarTodos()
    for(let i = ul.children.length-1; i >= 0 ; i--){
        const elemento =ul.children[i]
        if (elemento.className === 'completed') {
            ul.removeChild(elemento)
        }
    }
})
uiFilters.addEventListener('click', (e) =>{

    const filtro = e.target.text
    if(!filtro)return;
    console.log(botones);
    botones.forEach(obj => obj.classList.remove('selected'))

    e.target.classList.add('selected')

    for (const elemento of ul.children) {
        elemento.classList.remove('hidden')
    
        const completado = elemento.classList.contains('completed')
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden')
                    
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden')
                   
                    
                }
                break;
        
         
        }
    }

    
})