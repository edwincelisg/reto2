//FUNCIONES PARA TABLA MESSAGE


//Funcion limpiar campos del formulario

function limpiar_formulario(){
	
		var campoTextoID = document.getElementById("codigom");
		var campoTextoMensaje = document.getElementById("message_text");
		var divResultado = document.getElementById("resultado");
		
		campoTextoID.value = "";
		campoTextoMensaje.value = "";	
		divResultado.innerHTML = "";
		
}

                                         
//Funcion (GET) consultar o traer toda la informacion o registro de la tabla costume
function consultar_todo(){
    $.ajax({
        url:"https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message",
        type:"GET",
        datatype:"json",
		
		error: function(xhr, status){
			alert('Ha ocurrido un problema, intentalo nuevamente, ' + xhr.status);
		},
		
		complete: function(xhr, status){
			alert('Resultado de comprobacion -- cod. estado: ' + xhr.status);
		},	
		
        success:function(json){
            //console.log(respuesta);
            //crearRespuestaGastos(respuesta.items)
			
			$("#resultado").empty();
			tabla = "<center> <table border='1'> <tr> <th>ID:</th> <th>MENSAJE:</th> </tr>"
			total = 0;
			filas = ""
			for (i=0; i<json.items.length; i++){
				filas += "<tr>";
				filas += "<td>" + json.items[i].id + "</td>";
				filas += "<td>" + json.items[i].messagetext + "</td>";
				filas += "<td> <button onclick='borrar_registro("+json.items[i].id+")'>Borrar</button>";//se agrega el boton y este tiene la funcion borrar registro:
				total += json.items[i].valor
				filas += "</tr>";
			}
			filas += "</table>"
			$("#resultado").append(tabla + filas + "</center>")
			console.log(json)
			
			
        }

    });
}

                                         
function validarCampo(campoTexto){
	if(campoTexto != ""){
		return true;
	}
	else{
		return false;
	}
}


//Funcion (GET) para buscar o Consultar por ID

function consultaID(){
	let id= $("#codigom").val()
	console.log(id)
	if(!validarCampo(id)){
		alert("Debe ingresar ID valido a buscar");
	
	}
	else{

		$.ajax({
			url:`https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message/${id}`,

			
			type: 'GET',
			dataType: 'json',

			success: function(json){
				tabla = "<center><table border='1'>";
				filas = "";
				if (json.items.length > 0){
					console.log(json);
					$("#resultado").empty();
					filas += "<tr><th>ID:<td>" + json.items[0].id
					filas += "<tr><th>MENSAJE:<td>" + json.items[0].messagetext
					$("#resultado").append(tabla + filas + "</center>")
					
				}
				else{
					alert("El registro con ID: "+ id.val() + "No existe")
				}
				
			},

			error: function(xhr, status){
				alert('A ocurrido un problema, Error: ' + xhr.status);
			},
			
			complete: function(xhr, status){
				alert('La peticion ha sido realizada,' + xhr.status);
				
			}		

		});
	}
}


//Funcion (POST) Registrar o Guardar toda la informacion en la tabla message

function guardarInformacion(){
	
	if(!validarCampo($("#name"))){
		alert("Debe ingresar un nombre");
		return;
	}
	
	if(!validarCampo($("#message_text"))){
		alert("Debe ingresar un mensaje");
		return;
	}	
	let data={
			id: $("#codigom").val(),
			messagetext: $("#message_text").val()			
		};
		console.log(`la data es ${JSON.stringify(data)}`)
		
    $.ajax({
        url: 'https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message',
		
		data:data,
		
		type: 'POST',
		
		dataType: 'json',
		
				
        success:function(json){		
        },
		
		error: function(xhr, status){
			if(xhr.status == 200){
			//	console.log("Registro guardado con exito");
			}
			else{
			//	console.log("Favor revise que los datos esten correctos");
			}
		},
		
		complete: function(xhr, status){
			alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			consultar_todo();
			
		},	
    });
}


//Funcion (PUT) Editar o Actualizar registro de la tabla message
function editar_Informacion(){
    let myData={
        id:$("#codigom").val(),
        messagetext:$("#message_text").val()
    };
  //  console.log(myData);
    let dataToSend = JSON.stringify(myData);
	
	if (confirm("Est?? seguro de actualizar el registro:  " + $("#codigom").val() + "  ??")){
		
		$.ajax({
			url:"https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message",
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


//Funcion (DELETE) Borrar o Eliminar registro de la tabla message
function borrar_registro(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
	
	
	if (confirm("Est?? seguro de eliminar el registro:  " + idElemento + "??")){
	
		$.ajax({
			url:"https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message",
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
