var app = angular.module('MainApp', []);

var application = new Framework7({
	material: true
});


//var socket = io.connect('http://192.168.43.135:3000');
// Controlador de login

var urlServidor = "http://159.203.128.165:3000/";

app.controller('pacienteController', function($scope, $http){
	$scope.paciente = JSON.parse(localStorage.getItem("paciente"));

    /* Cambie esta parte para que guarde la información en el telefono sin enviarla al servidor */
	$scope.nuevoPaciente = function(){
		$scope.pacienteN.RSEX = $("#genero").val();
		if($scope.pacienteN.RCURP.length > 18 || $scope.pacienteN.RCURP.length < 18){
			application.addNotification({
        		message: 'Es necesario ingresar los 18 caracteres del CURP',
		        button: {
		            text: 'Cerrar',
		            color: 'lightgreen'
		        }
    		});
			return;
		}
		var curp = $scope.pacienteN.RCURP;
		$scope.pacienteN.RCURP = curp.toUpperCase();
		
		$scope.pacienteN.RFEC = get_today();
        var pacientes_guardados = []
        if (localStorage.getItem("pacientes_guardados") == null) 
            localStorage.setItem("pacientes_guardados", JSON.stringify(pacientes_guardados));

        pacientes_guardados = JSON.parse(localStorage.getItem("pacientes_guardados"));

        //localStorage.removeItem("pacientes_guardados")
        pacientes_guardados[pacientes_guardados.length] = $scope.pacienteN;
            
        localStorage.setItem("pacientes_guardados", JSON.stringify(pacientes_guardados));
        localStorage.setItem("paciente", JSON.stringify($scope.pacienteN));
        window.location.href = "vistas/info.html";
	}
	//listarPacientes();
	function listarPacientes(){
	   $http.get(urlServidor+"paciente/listarPacientes").success(function(response) {
            if(response.status) { // Si nos devuelve un OK la API...
                //alert("data "+response.data)
                $scope.pacientes = response.data;
            }
        })
    }
    /* Esta es la función que envia la información al servidor */
    $scope.Save = function(){
      $("#cargando").css("display", "block");
      // Guardar usuarios registrados
      if(localStorage.getItem("pacientes_guardados") != null){
        var pacientes_guardados = JSON.parse(localStorage.getItem("pacientes_guardados"));

        for(i in pacientes_guardados) {
          $http.post(urlServidor+"paciente/nuevoPaciente", pacientes_guardados[i]).success(function(respuesta) {
            if(respuesta.status){
            }
          });
        }
      }
      if(localStorage.getItem("sesiones_guardadas") != null){
        var sesiones_guardadas = JSON.parse(localStorage.getItem("sesiones_guardadas"));
        for(i in sesiones_guardadas) {
          $http.post(urlServidor+"info/nuevaInformacion", sesiones_guardadas[i]).success(function(respuesta) {
            if(respuesta.status){
            }
          }).error(function(e){alert(JSON.stringify(e))})
        }
      }
      localStorage.removeItem("pacientes_guardados");
      localStorage.removeItem("sesiones_guardadas");
      $("#save").css("display", "none");
      $("#cargando").css("display", "none");
      application.addNotification({
                message: 'Información guardada',
                button: {
                    text: 'Cerrar',
                    color: 'lightgreen'
                }
            });
    }

    // Redirigir a alguna pagina
    $scope.go = function(url){
    	window.location.href = url;
    }

    // Redirigir a alguna pagina
    $scope.editar = function(zona){
    	localStorage.setItem("zona", zona);
    	window.location.href = "diagnostico.html";
    }

	function get_today(){
        // Obtenemos la fecha de hoy con el formato dd/mm/yyyy
        var today = new Date()
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        var today = dd+'/'+mm+'/'+yyyy;
        //alert(today);
        return today;
    }

    $scope.verRegistros = function(id){
		alert("ID "+id);
		//Aqui ya puedes jalar los datos del json que se guardo para mostrarlos...y volver a editar....
		// C R E O..
	}
});