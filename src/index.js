import { ToDo, TodoList } from './js/classes/index'
import { agregarTareaHtml } from './js/newTodo';
import './styles.css';

const todos = []

export const todoList   = new TodoList()
//esto se puede hacer por que solo necesitamos un element el primer argumento esta llamandoa a agregarHtml
todoList.todos.forEach(agregarTareaHtml);