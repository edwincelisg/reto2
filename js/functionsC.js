//FUNCIONES PARA TABLA CLIENT


//Funcion limpiar campos del formulario

function limpiar_formulario(){
	
		var campoTextoID = document.getElementById("codigoc");
		var campoTextoNombre = document.getElementById("namec");
		var campoTextoEmail = document.getElementById("emailc");
		var campoTextoEdad= document.getElementById("agec");
		var divResultado = document.getElementById("resultado");
		
		campoTextoID.value = "";
		campoTextoNombre.value = "";
		campoTextoEmail.value = "";
		campoTextoEdad.value = "";		
		divResultado.innerHTML = "";
		
}

                                         
//Funcion (GET) consultar o traer toda la informacion o registro de la tabla client
function consultar_todo(){
    $.ajax({
        url:"https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        datatype:"json",
		
		error: function(xhr, status){
			alert('A ocurrido un problema, intentalo nuevamente, ' + xhr.status);
		},
		
		complete: function(xhr, status){
			alert('Resultado de comprobacion -- cod. estado: ' + xhr.status);
		},	
		
        success:function(json){
            //console.log(respuesta);
            //crearRespuestaGastos(respuesta.items)
			
			$("#resultado").empty();
			tabla = "<center> <table border='1'> <tr> <th>ID:</th> <th>NOMBRE:</th> <th>EMAIL:</th> <th>EDAD</th>  </tr>"
			total = 0;
			filas = ""
			for (i=0; i<json.items.length; i++){
				filas += "<tr>";
				filas += "<td>" + json.items[i].id + "</td>";
				filas += "<td>" + json.items[i].name + "</td>";
				filas += "<td>" + json.items[i].email + "</td>";
				filas += "<td>" + json.items[i].age + "</td>";
				filas += "<td> <button onclick='borrar_registro("+json.items[i].id+")'>Borrar</button>";//se agrega el boton y este tiene la funcion borrar registro:
				total += json.items[i].valor
				filas += "</tr>";
			}
			filas += "</table>"
			$("#resultado").append(tabla + filas + "</center>")
			//console.log(json)
			
			
        }

    });
}

                                         
function validarCampo(campoTexto){
	//console.log(`el campo de texto dice: ${campoTexto.val()}`)
	if(campoTexto.val() !== ""){
	//	console.log(campoTexto.val())
		return true;
		
	}
	else{
		return false;
	}
}


//Funcion (GET) para buscar o Consultar por ID

function consultaID(){
	let id= $("#codigoc").val()
	//console.log(id)
	if(!validarCampo(id)){
		alert("Debe ingresar ID valido a buscar");
	
	}
	else{

		$.ajax({
			url:`https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client/${id}`,

			
			type: 'GET',
			dataType: 'json',

			success: function(json){
				tabla = "<center><table border='1'>";
				filas = "";
				if (json.items.length > 0){
					//console.log(json);
					$("#resultado").empty();
					filas += "<tr><th>ID:<td>" + json.items[0].id
					filas += "<tr><th>NOMBRE:<td>" + json.items[0].name
					filas += "<tr><th>EMAIL:<td>" + json.items[0].email
					filas += "<tr><th>EDAD:<td>" + json.items[0].age
					$("#resultado").append(tabla + filas + "</center>")
					
				}
				else{
					alert("El registro con ID: "+ id.val() + "No existe")
				}
				
			},

			error: function(xhr, status){
				alert('ha ocurrido un problema, Error: ' + xhr.status);
			},
			
			complete: function(xhr, status){
				alert('La peticion ha sido realizada,' + xhr.status);
				
			}		

		});
	}
}


//Funcion (POST) Registrar o Guardar toda la informacion en la tabla client

function guardarInformacion(){
	
	if(!validarCampo($("#namec"))){
		alert("Debe ingresar un nombre");
		return;
	}
	if(!validarCampo($("#emailc"))){
		alert("Debe ingresar un email");
		return;
	}
	if(!validarCampo($("#agec"))){
		alert("Debe ingresar una edad");
		return;
	}
	if (validarCampo($("#codigoc")) && validarCampo($("#namec")) && validarCampo($("#emailc")) && validarCampo($("#agec"))){
	
	
		let data={
				id: $("#codigoc").val(),
				name: $("#namec").val(),
				email: $("#emailc").val(),			
				age: $("#agec").val()			
			};
			/*console.log(`la data es ${JSON.stringify(data)}`)*/
			
		$.ajax({
			url: 'https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client',
			
			data:data,
			
			type: 'POST',
			
			dataType: 'json',
			
					
			success:function(json){		
			},
			
			error: function(xhr, status){
				if(xhr.status == 200){
				//	console.log("El registro se a guardado con exito");
				}
				else{
				//	console.log("Favor revise que los datos esten correctos");
				}
			},
			
			complete: function(xhr, status){
				alert('La peticion al servidor ha sido procesada con exito' + xhr.status);
				limpiar_formulario();
				consultar_todo();
				
			},	
		});
}}


//Funcion (PUT) Editar o Actualizar registro de la tabla client
function editar_Informacion(){
    let myData={
        id:$("#codigoc").val(),
        name:$("#namec").val(),
		email:$("#emailc").val(),
        age:$("#agec").val()
    };
 //   console.log(myData);
    let dataToSend = JSON.stringify(myData);
	
	if (confirm("Está seguro de actualizar el registro:  " + $("#codigoc").val() + "??")){
		
		$.ajax({
			url:"https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client",
			type:"PUT",
			data:dataToSend,
			contentType:"application/JSON",
			datatype:"JSON",
			success:function(respuesta){
				$("#resultado").empty();

				consultar_todo();
				alert("Se ha realizado la Actualizacion del registro correctamente")
			}
		});
	}
}


//Funcion (DELETE) Borrar o Eliminar registro de la tabla client
function borrar_registro(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
	
	
	if (confirm("Está seguro de eliminar el registro:  " + idElemento + "??")){
	
		$.ajax({
			url:"https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client",
			type:"DELETE",
			data:dataToSend,
			contentType:"application/JSON",
			datatype:"JSON",
			
			success:function(respuesta){
				$("#resultado").empty();
				limpiar_formulario();
				consultar_todo();
				alert("El registro se ha eliminado correctamente.")
				
			}
		});
	}
}
