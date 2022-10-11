//FUNCIONES PARA TABLA CUSTOM


//Funcion limpiar campos del formulario

function limpiar_formulario(){
	
		var campoTextoID = document.getElementById("codigo");
		var campoTextoNombre = document.getElementById("name");
		var campoTextoMarca = document.getElementById("brand");
		var campoTextoModelo= document.getElementById("model_number");
		var campoTextoCategoria = document.getElementById("category_id");
		var divResultado = document.getElementById("resultado");
		
		campoTextoID.value = "";
		campoTextoNombre.value = "";
		campoTextoMarca.value = "";
		campoTextoModelo.value = "";
		campoTextoCategoria.value = "";		
		divResultado.innerHTML = "";
		
}

                                         
//Funcion (GET) consultar o traer toda la informacion o registro de la tabla costume
function consultar_todo(){
    $.ajax({
        url:"https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume",
        type:"GET",
        datatype:"json",
		
		error: function(xhr, status){
			alert('ha ocurrido un problema, intentalo nuevamente, ' + xhr.status);
		},
		
		complete: function(xhr, status){
			alert('Resultado de comprobacion -- cod. estado: ' + xhr.status);
		},	
		
        success:function(json){
            //console.log(respuesta);
            //crearRespuestaGastos(respuesta.items)
			
			$("#resultado").empty();
			tabla = "<center> <table border='1'> <tr> <th>ID:</th> <th>NOMBRE:</th> <th>MARCA:</th> <th>NUMERO MODELO</th> <th>CATEGORIA ID</th>  </tr>"
			total = 0;
			filas = ""
			for (i=0; i<json.items.length; i++){
				filas += "<tr>";
				filas += "<td>" + json.items[i].id + "</td>";
				filas += "<td>" + json.items[i].name + "</td>";
				filas += "<td>" + json.items[i].brand + "</td>";
				filas += "<td>" + json.items[i].model + "</td>";
				filas += "<td>" + json.items[i].category_id + "</td>";
				filas += "<td> <button onclick='borrar_registro("+json.items[i].id+")'>Borrar</button>";
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
	let id= $("#codigo").val()
	console.log(id)
	if(!validarCampo($("#codigo"))){
		alert("Debe ingresar ID valido a buscar");
	
	}
	else{

		$.ajax({
			url:`https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume/${id}`,

			
			type: 'GET',
			dataType: 'json',

			success: function(json){
				tabla = "<center><table border='1'>";
				filas = "";
				if (json.items.length > 0){
					console.log(json);
					$("#resultado").empty();
					filas += "<tr><th>ID:<td>" + json.items[0].id
					filas += "<tr><th>NOMBRE:<td>" + json.items[0].name
					filas += "<tr><th>MARCA:<td>" + json.items[0].brand
					filas += "<tr><th>NUMERO MODELO:<td>" + json.items[0].model
					filas += "<tr><th>CATEGORIA ID:<td>" + json.items[0].category_id
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


//Funcion (POST) Registrar o Guardar toda la informacion en la tabla costume

function guardarInformacion(){
	
	if(!validarCampo($("#name"))){
		alert("Debe ingresar un nombre");
		return;
	}
	if(!validarCampo($("#brand"))){
		alert("Debe ingresar una marca");
		return;
	}
	if(!validarCampo($("#model_number"))){
		alert("Debe ingresar un numero modelo");
		return;
	}
	if(!validarCampo($("#category_id"))){
		alert("Debe ingresar una categoria ID");
		return;
	}
	if (validarCampo($("#codigo")) && validarCampo($("#name")) && validarCampo($("#brand")) && validarCampo($("#model_number")) && validarCampo($("#category_id"))){
	//console.log("entre")

	let data={
			id: $("#codigo").val(),
			name: $("#name").val(),
			brand: $("#brand").val(),			
			model: $("#model_number").val(),
			category_id: $("#category_id").val()			
		};
		//console.log(`la data es ${JSON.stringify(data)}`)
		
    $.ajax({
        url: 'https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume',
		
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


//Funcion (PUT) Editar o Actualizar registro de la tabla costume
function editar_Informacion(){
    let myData={
        id:$("#codigo").val(),
        name:$("#name").val(),
		brand:$("#brand").val(),
        model:$("#model_number").val(),
        category_id:$("#category_id").val()
    };
    //console.log(myData);
    let dataToSend = JSON.stringify(myData);
	
	if (confirm("Está seguro de actualizar el registro:  " + $("#codigo").val() + "??")){
		
		$.ajax({
			url:"https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume",
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


//Funcion (DELETE) Borrar o Eliminar registro de la tabla costume
function borrar_registro(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
	
	
	if (confirm("Está seguro de eliminar el registro:  " + idElemento + "  ??")){
	
		$.ajax({
			url:"https://g046d563e5c841f-retouno.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume",
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
