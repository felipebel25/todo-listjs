import { ToDo } from ".";

export class TodoList{
    constructor(){
        this.cargarLocalStorage()
    }
    nuevoTodo(todo){
        this.todos.push(todo)
        this.guardarLocalStorage()

    }
    eliminarTodo(id){
        this.todos = this.todos.filter(todo => todo.id != id)
        this.guardarLocalStorage()
        console.log(this.todos);
    }
    marcarCompletado(id){
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado
                this.guardarLocalStorage()
                break
            }
        }
    }
    borrarTodos(){
        this.todos = this.todos.filter(todo => !todo.completado)
        this.guardarLocalStorage()
        

    }
    guardarLocalStorage(){
        localStorage.setItem('toDo', JSON.stringify(this.todos))
    }
    cargarLocalStorage(){
        this.todos = (localStorage.getItem('toDo')) 
            ? JSON.parse(localStorage.getItem('toDo')) 
            : [];

        this.todos = this.todos.map(ToDo.fromJson)

        
    }
}