const form = document.getElementById('ftodo');
const errormsg = document.getElementById('error');
const todosElement = document.getElementById('todosli');

//errormsg.style.display = 'none';

let user_name = ''

document.getElementById('ftodo').onsubmit = function(e){
  e.preventDefault();
	let user_name = document.getElementById('description').dataset.id_user;
	console.log(user_name)
  fetch('/' + user_name + '/add/todo', {
    method: 'POST',
    body: JSON.stringify({
      'description': document.getElementById('description').value
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(res => {
		if(res['status'] == 'true') {
      listAll(); 
      listComplete();
      listIncomplete();
			document.getElementById("description").value = ""
			UIkit.notification({
				message: 'Todo created!',
				status: 'success',
				timeout: 3000
			});
		}
  })
  .catch(function(error) {
		UIkit.notification({
			message: 'Todo could not be created!',
			status: 'danger',
			timeout: 3000
		});
  });
}

document.getElementById('all').onclick = function(e){
  e.preventDefault();
  listAll();
}

document.getElementById('incomplete').onclick= function(e){
  e.preventDefault();
	listIncomplete();
}

document.getElementById('complete').onclick = function(e){
  e.preventDefault();
	listComplete();
}

function listAll() {
  let user_name = document.getElementById('description').dataset.id_user;
  fetch('/'+ user_name + '/todos/displayall')
    .then(response => response.json())
    .then(todos => {
        let divAll = document.getElementById("alltasks");
        divAll.innerHTML = ""
        todos.forEach(todo => {
            fillTodolist(divAll,todo);
        })
    })
}

function listIncomplete() {
  let user_name = document.getElementById('description').dataset.id_user;
  fetch('/'+ user_name + '/todos/displayincompleted')
    .then(response => response.json())
    .then(todos => {
        let divIncompleted = document.getElementById("incompletedtasks");
        divIncompleted.innerHTML = ""
        todos.forEach(todo => {
            fillTodolist(divIncompleted,todo);
        })
    })
}

function listComplete() {
  let user_name = document.getElementById('description').dataset.id_user;
  fetch('/'+ user_name + '/todos/displaycompleted')
    .then(response => response.json())
    .then(todos => {
        let divCompleted = document.getElementById("completedtasks");
        divCompleted.innerHTML = ""
        todos.forEach(todo => {
            fillTodolist(divCompleted,todo);
        })
    })
}

function fillTodolist(divTask, todo){
  let inputTodo = document.createElement('input');
  inputTodo.value = todo['description'];
  inputTodo.disabled = true;
  inputTodo.type = "text"; 
  inputTodo.classList.add("uk-form-blank");

  let liTodo = document.createElement('li');
  liTodo.dataset.todoid = todo['id'];
  let editButton = document.createElement('i');
	editButton.setAttribute("class", "far fa-edit");
	editButton.style.margin = '0 5px 0 2px';

  let removeButton = document.createElement('i');
	removeButton.setAttribute("class", "far fa-trash-alt");
	removeButton.style.margin = '0 5px 0 2px';

  divTask.appendChild(liTodo);
  liTodo.appendChild(inputTodo);
  liTodo.appendChild(editButton);
  liTodo.appendChild(removeButton);
  

  editButton.addEventListener('click', () => this.editTodo(inputTodo));
  removeButton.addEventListener('click', () => this.removeTodo(divTask,liTodo));
}

function removeTodo(divAlltasks,liTodo){
  divAlltasks.removeChild(liTodo);
  fetch
}
function editTodo(inputTodo){
  inputTodo.disabled = !inputTodo.disabled; 
}
