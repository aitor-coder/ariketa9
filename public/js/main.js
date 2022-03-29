$(document).ready(function(){
	$('.deleteUser').on('click', deleteUser);
	$('.editUser').on('click',editUser);
});


let id;


function deleteUser(){
    var confirmation = confirm('Are You Sure?');
	if(confirmation){
		$.ajax({
			type: 'DELETE',
			url:  '/users/delete/'+$(this).data('id')
		}).done(function(response){
			window.location.replace('/')
		});
	} else {
		return false;
	}

}

function editUser(){
	document.getElementById('boton').value = 'Editar';
	id = $(this).data('id');
	fetch('/users/'+$(this).data('id'))
	.then(response => {
			return response.json();
		}).then(data =>{
		document.getElementById('first_name').value = data.first_name;
		document.getElementById('last_name').value = data.last_name;
		document.getElementById('email').value = data.email;
	}).catch(function(error){
		console.log(error);
	});
}


function hacerEditable(){
	if(document.getElementById().value==="Editar"){
		let user = JSON.stringify({
			first_name: document.getElementById('first_name').value,
			last_name: document.getElementById('last_name').value,
			email: document.getElementById('email').value
		});
		fetch('/users/update/' + id, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: user,
		}).then(_ => {
			window.location.replace('/')
		});
		
	}else{
		
		document.getElementById('form').submit();
	}
}
