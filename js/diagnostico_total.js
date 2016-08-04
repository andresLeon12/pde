var app = angular.module('MainApp', []);
var urlServidor = 'http://159.203.128.165:3000/';
var application = new Framework7({
	material: true,
	materialRipple: true
});
$$ = Dom7;
app.controller('mainController', function($scope, $http){
	var isSave = true;
	var movimientos = [], posiciones = [];
	var SI, SD, II, ID;

	var color = "";
	var datos = JSON.parse(localStorage.getItem('paciente'));
	$scope.paciente = JSON.parse(localStorage.getItem('paciente'));

	// Creamos JSON con la informacion
	var info = {
		//idPaciente: datos._id,//Este es nuevo
		//posicion: 1,//izquierdo superior
		caries: 0,
		ausentes: 0,
		restos: 0,
		protesis_fija: 0,
		protesis_movil: 0,
		obturacion: 0
	}
	var infoDientes = {
		uno: {
			//oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		dos: {
			//oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		tres: {
			//oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		cuatro: {
			oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		cinco: {
			oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		seis: {
			oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		siete: {
			oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		ocho: {
			oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		}
	}
	
	function createBorder(extension)
	{
		var structure_general = new createjs.Container();
		var rect = new createjs.Shape();
		rect.graphics.beginStroke("teal");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("white").drawRect(0, 0, 1, 180 + extension);
		structure_general.addChild(rect);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("teal");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("white").drawRect(210, 0, 0.5, 180 + extension);
		structure_general.addChild(rect);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("teal");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("white").drawRect(430, 0, 0.5, 180 + extension);
		structure_general.addChild(rect);

		return structure_general;
	}

	function createDental(name, originx, originy, withOclusal, muelas)
	{
		var zon = '';
		switch(name)
		{
			case "Diente 1": zon = 'uno';
			break;
			case "Diente 2": zon = 'dos';
			break;
			case "Colmillo": zon = 'tres';
			break;
			case "Premolar 1": zon = 'cuatro';
			break;
			case "Premolar 2": zon = 'cinco';
			break;
			case "Premolar 3": zon = 'seis';
			break;
			case "Molar 1": zon = 'siete';
			break;
			case "Molar 2": zon = 'ocho';
			break;
		}
		// Estructura general que contendra un diente
		var structure_general = new createjs.Container();
		structure_general.name = "diente-"+name;
		
		var text = new createjs.Text(name, "bold 14px Verdana", "teal");
		text.textAlign = "center";
		text.x = 100 + originx;
		text.y = 10 + originy;
		structure_general.addChild(text);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("#111");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("white").drawRect(0, 0, 60, 90);
		/*rect.addEventListener("click", function(event) { 
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Ausentes',
					bg: 'black',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 1;
   						target.graphics.clear().beginFill("black").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Restos',
					bg: 'brown',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 1;
   						target.graphics.clear().beginFill("brown").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
		});*/
		
		var label = new createjs.Text("Mesial", "bold 10px Arial", "#CD0000");
		label.textAlign = "center";
		label.y = 45;
		label.x = 20;

		var dragger = new createjs.Container();
		dragger.x = 25 + originx;
		dragger.y = 45 + originy;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("#111");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("white").drawRect(0, 0, 60, 90);
		/*rect.addEventListener("click", function(event) { 
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Ausentes',
					bg: 'black',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 2;
   						target.graphics.clear().beginFill("black").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
		});*/
		
		var label = new createjs.Text("Distal", "bold 10px Arial", "#CD0000");
		label.textAlign = "center";
		label.y = 45;
		label.x = 40;

		var dragger = new createjs.Container();
		dragger.x = 115 + originx;
		dragger.y = 45 + originy;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("#111");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("white").drawRect(0, 0, 90, 50);
		/*rect.addEventListener("click", function(event) { 
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Ausentes',
					bg: 'black',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 3;
   						target.graphics.clear().beginFill("black").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Restos',
					bg: 'brown',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 3;
   						target.graphics.clear().beginFill("brown").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
		});*/
		
		var label = new createjs.Text("Lengual", "bold 10px Arial", "#CD0000");
		label.textAlign = "center";
		label.y = 20;
		label.x = 42.5;

		var dragger = new createjs.Container();
		dragger.x = 55 + originx;
		dragger.y = 30 + originy;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("#111");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("white").drawRect(0, 0, 90, 50);
		/*rect.addEventListener("click", function(event) { 
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Ausentes',
					bg: 'black',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 4;
   						target.graphics.clear().beginFill("black").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Restos',
					bg: 'brown',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 4;
   						target.graphics.clear().beginFill("brown").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
		});*/
		
		var label = new createjs.Text("Vestibular", "bold 10px Arial", "#CD0000");
		label.textAlign = "center";
		label.y = 20;
		label.x = 42.5;

		var dragger = new createjs.Container();
		dragger.x = 55 + originx;
		dragger.y = 120 + originy;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);
		
		var circle = new createjs.Shape();
		circle.graphics.beginStroke("#111");
		circle.graphics.setStrokeStyle(1);
		circle.snapToPixel = true;
		circle.graphics.beginFill("white").drawCircle(0, 0, 33);
		/*circle.addEventListener("click", function(event) { 
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Ausentes',
					bg: 'black',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 5;
   						target.graphics.clear().beginFill("black").drawCircle(0, 0, 33).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Restos',
					bg: 'brown',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 5;
   						target.graphics.clear().beginFill("brown").drawCircle(0, 0, 33).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
		});*/

		var label = new createjs.Text("Oclusal", "bold 10px Arial", "#CD0000");
		label.textAlign = "center";
		label.y = -5;

		var dragger = new createjs.Container();
		dragger.x = 100 + originx;
		dragger.y = 100 + originy;
		dragger.addChild(circle, label);
		if(!withOclusal){
			structure_general.addEventListener("click", function(event) { 
				var buttons = [
					{
			            text: 'Selecciona el problema',
			            label: true
			        },
					{
					text: 'Ausentes',
					bg: 'black',
					color: 'white',
					onClick: function () {
						var circle = new createjs.Shape();
						circle.graphics.beginStroke("#111");
						circle.graphics.setStrokeStyle(1);
						circle.snapToPixel = true;
						circle.graphics.beginFill("black").drawCircle(0, 0, 66);
						var label = new createjs.Text("Ausente", "bold 10px Arial", "#FFF");
						label.textAlign = "center";
						label.y = -5;
						var dragger1 = new createjs.Container();
						dragger1.x = dragger.x;
						dragger1.y = dragger.y;
						dragger1.addChild(circle, label);
						structure_general.addChild(dragger1);
						/*var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 1;
   						target.graphics.clear().beginFill("black").drawCircle(0, 0, 66).endFill();*/
   						muelas.update();
					}
				},
				{
					text: 'Restos',
					bg: 'brown',
					color: 'white',
					onClick: function () {
						var circle = new createjs.Shape();
						circle.graphics.beginStroke("#111");
						circle.graphics.setStrokeStyle(1);
						circle.snapToPixel = true;
						circle.graphics.beginFill("brown").drawCircle(0, 0, 66);
						var label = new createjs.Text("Restos", "bold 10px Arial", "#FFF");
						label.textAlign = "center";
						label.y = -5;
						var dragger1 = new createjs.Container();
						dragger1.x = dragger.x;
						dragger1.y = dragger.y;
						dragger1.addChild(circle, label);
						structure_general.addChild(dragger1);
   						muelas.update();
					}
				},
				];
			    application.actions(buttons);
			});
			return structure_general;
		}
		structure_general.addChild(dragger);
		structure_general.addEventListener("click", function(event) { 
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Ausentes',
					bg: 'black',
					color: 'white',
					onClick: function () {
						var circle = new createjs.Shape();
						circle.graphics.beginStroke("#111");
						circle.graphics.setStrokeStyle(1);
						circle.snapToPixel = true;
						circle.graphics.beginFill("black").drawCircle(0, 0, 66);
						var label = new createjs.Text("Ausente", "bold 10px Arial", "#FFF");
						label.textAlign = "center";
						label.y = -5;
						var dragger1 = new createjs.Container();
						dragger1.x = dragger.x;
						dragger1.y = dragger.y;
						dragger1.addChild(circle, label);
						structure_general.addChild(dragger1);
						/*var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 1;
   						target.graphics.clear().beginFill("black").drawCircle(0, 0, 66).endFill();*/
   						muelas.update();
					}
				},
				{
					text: 'Restos',
					bg: 'brown',
					color: 'white',
					onClick: function () {
						var circle = new createjs.Shape();
						circle.graphics.beginStroke("#111");
						circle.graphics.setStrokeStyle(1);
						circle.snapToPixel = true;
						circle.graphics.beginFill("brown").drawCircle(0, 0, 66);
						var label = new createjs.Text("Restos", "bold 10px Arial", "#FFF");
						label.textAlign = "center";
						label.y = -5;
						var dragger1 = new createjs.Container();
						dragger1.x = dragger.x;
						dragger1.y = dragger.y;
						dragger1.addChild(circle, label);
						structure_general.addChild(dragger1);
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
		});

		return structure_general;
	}
		
	function init(callback) {

		SI = new createjs.Stage("SI");
		createjs.Touch.enable(SI)
		var structure_general = createDental("Diente 1", 0, 0, false, SI);
		SI.addChild(structure_general);
		var structure_general = createDental("Diente 2", 180, 0, false, SI);
		SI.addChild(structure_general);
		var structure_general = createDental("Colmillo", 360, 0, false, SI);
		SI.addChild(structure_general);
		var structure_general = createDental("Premolar 1", 540, 0, true, SI);
		SI.addChild(structure_general);
		var structure_general = createDental("Premolar 2", 720, 0, true, SI);
		SI.addChild(structure_general);
		var structure_general = createDental("Premolar 3", 900, 0, true, SI);
		SI.addChild(structure_general);
		var structure_general = createDental("Molar 1", 1080, 0, true, SI);
		SI.addChild(structure_general);
		var structure_general = createDental("Molar 2", 1260, 0, true, SI);
		SI.addChild(structure_general);

		SI.update();

		SD = new createjs.Stage("SD");
		createjs.Touch.enable(SD)
		var structure_general = createDental("Diente 1", 0, 0, false, SD);
		SD.addChild(structure_general);
		var structure_general = createDental("Diente 2", 180, 0, false, SD);
		SD.addChild(structure_general);
		var structure_general = createDental("Colmillo", 360, 0, false, SD);
		SD.addChild(structure_general);
		var structure_general = createDental("Premolar 1", 540, 0, true, SD);
		SD.addChild(structure_general);
		var structure_general = createDental("Premolar 2", 720, 0, true, SD);
		SD.addChild(structure_general);
		var structure_general = createDental("Premolar 3", 900, 0, true, SD);
		SD.addChild(structure_general);
		var structure_general = createDental("Molar 1", 1080, 0, true, SD);
		SD.addChild(structure_general);
		var structure_general = createDental("Molar 2", 1260, 0, true, SD);
		SD.addChild(structure_general);

		SD.update();

		II = new createjs.Stage("II");
		createjs.Touch.enable(II)
		var structure_general = createDental("Diente 1", 0, 0, false, II);
		II.addChild(structure_general);
		var structure_general = createDental("Diente 2", 180, 0, false, II);
		II.addChild(structure_general);
		var structure_general = createDental("Colmillo", 360, 0, false, II);
		II.addChild(structure_general);
		var structure_general = createDental("Premolar 1", 540, 0, true, II);
		II.addChild(structure_general);
		var structure_general = createDental("Premolar 2", 720, 0, true, II);
		II.addChild(structure_general);
		var structure_general = createDental("Premolar 3", 900, 0, true, II);
		II.addChild(structure_general);
		var structure_general = createDental("Molar 1", 1080, 0, true, II);
		II.addChild(structure_general);
		var structure_general = createDental("Molar 2", 1260, 0, true, II);
		II.addChild(structure_general);

		II.update();

		ID = new createjs.Stage("ID");
		createjs.Touch.enable(ID)
		var structure_general = createDental("Diente 1", 0, 0, false, ID);
		ID.addChild(structure_general);
		var structure_general = createDental("Diente 2", 180, 0, false, ID);
		ID.addChild(structure_general);
		var structure_general = createDental("Colmillo", 360, 0, false, ID);
		ID.addChild(structure_general);
		var structure_general = createDental("Premolar 1", 540, 0, true, ID);
		ID.addChild(structure_general);
		var structure_general = createDental("Premolar 2", 720, 0, true, ID);
		ID.addChild(structure_general);
		var structure_general = createDental("Premolar 3", 900, 0, true, ID);
		ID.addChild(structure_general);
		var structure_general = createDental("Molar 1", 1080, 0, true, ID);
		ID.addChild(structure_general);
		var structure_general = createDental("Molar 2", 1260, 0, true, ID);
		ID.addChild(structure_general);

		ID.update();

		/*menu = new createjs.Stage("menu");
		var structure_general = createMenu();
		menu.addChild(structure_general);

		menu.update();*/
		callback();
		/*dragger.on("pressmove",function(evt) {
			// currentTarget will be the container that the event listener was added to:
			evt.currentTarget.x = evt.stageX;
			evt.currentTarget.y = evt.stageY;
			// make sure to redraw the stage to show the change:
			stage.update();   
		});*/
	}

	function get(callback) {
		$http.get(urlServidor+"info/getInformacion/"+$scope.paciente._id+"/"+zona).success(function(response){
			if(response.status){
				if(response.data != null)
					infoDientes = response.data;
				callback();
			}
		});
	}

	function load() {
		var uno = infoDientes.uno;
		fillPoints(uno, muelas);
		var dos = infoDientes.dos;
		fillPoints(dos, muelas);
		var tres = infoDientes.tres;
		fillPoints(tres, muelas);
		var cuatro = infoDientes.cuatro;
		fillPoints(cuatro, muelas);
		var cinco = infoDientes.cinco;
		fillPoints(cinco, muelas);
		var seis = infoDientes.seis;
		fillPoints(seis, muelas);
		var siete = infoDientes.siete;
		fillPoints(siete, muelas);
		var ocho = infoDientes.uno;
		fillPoints(ocho, muelas);
	}

	function fillPoints(diente, position)
	{
		var posicion;
		for(i in diente) {
			/*for(j in diente[i]) {
				if(diente[i][j] != "0") {
					posicion = diente[i][j].split("-");
					var point = new createjs.Shape();
					var color = '';
					switch(j){
						case "caries": color = 'red';
						break;
						case "ausentes": color = '#000';
						break;
						case "restos": color = '#795548';
						break;
						case "protesis_fija": color = 'green';
						break;
						case "protesis_movil": color = '#ff5722';
						break;
						case "obturacion": color = 'blue';
						break;
					}
					point.graphics.beginFill(color).drawCircle(parseFloat(posicion[0]), parseFloat(posicion[1]), 5);
					position.addChild(point);
					position.update();
				}
			}*/
		}
	}

	$scope.Undo = function() {
		if(movimientos.length == 0)
			return;
		var last = movimientos.pop();
		var pos = posiciones.pop();
		last.graphics.clear().beginStroke("#111");
		last.graphics.setStrokeStyle(1);
		last.snapToPixel = true;
		switch(pos){
			case 1:
				last.graphics.beginFill("white").drawRect(0, 0, 60, 90).endFill();
			break;
			case 2:
				last.graphics.beginFill("white").drawRect(0, 0, 60, 90).endFill();
			break;
			case 3:
				last.graphics.beginFill("white").drawRect(0, 0, 90, 50).endFill();
			break;
			case 4:
				last.graphics.beginFill("white").drawRect(0, 0, 90, 50).endFill();
			break;
			case 5:
				last.graphics.beginFill("white").drawCircle(0, 0, 33).endFill();
			break;
		}
		muelas.update();
		
	}

	function putPoint(pos, zone) {
		var pp = pos.split("-");
		var x = parseFloat(pp[0]);
		var y = parseFloat(pp[1]);
		var point = new createjs.Shape();
		point.graphics.beginStroke("#fff");
		point.graphics.setStrokeStyle(1);
		point.snapToPixel = true;
		point.graphics.beginFill("white").drawCircle(x, y, 5);
		zone.addChild(point);
		zone.update();
	}

	$scope.go = function(url){
		if(!isSave)
		{
			var r = confirm("¿Guardar los cambios?");
			if (r == true) {
			    $scope.Save();
			    window.location.href = url;
			} else {
			    window.location.href = url;
			}
		}else{
			window.location.href = url;
		}
	}
	$(document).ready(function(){
		init(function(){
			get(function(){
				load();
			});
		});
	});

	$scope.Save = function()
	{
		infoDientes.idPaciente = datos.RCURP;
		infoDientes.posicion = localStorage.getItem("zona");
		var canvas = document.getElementById("muelas");
		infoDientes.urlFile = canvas.toDataURL();
		var sesiones_guardadas = []
		if (localStorage.getItem("sesiones_guardadas") == null) 
			localStorage.setItem("sesiones_guardadas", JSON.stringify(sesiones_guardadas));

		sesiones_guardadas = JSON.parse(localStorage.getItem("sesiones_guardadas"));
		//localStorage.removeItem("sesiones_guardadas")
		sesiones_guardadas[sesiones_guardadas.length] = infoDientes;
			
		localStorage.setItem("sesiones_guardadas", JSON.stringify(sesiones_guardadas));
		/*var isOnline = 0;//$("#isOnline").val();
		alert(isOnline);
		if(isOnline == 1)
		{
			$http.post(urlServidor+"info/nuevaInformacion", infoDientes).success(function(respuesta) {
				if(respuesta.status){
					isSave = true;
					$("#msj").html($scope.zona_revision+" - Información guardada. <i class='fa fa-check-circle'>");
				}
			})
		}else {
			var sesiones_guardadas = []
			if (localStorage.getItem("sesiones_guardadas") == null) 
				localStorage.setItem("sesiones_guardadas", JSON.stringify(sesiones_guardadas));

			sesiones_guardadas = JSON.parse(localStorage.getItem("sesiones_guardadas"));

			//localStorage.removeItem("sesiones_guardadas")
			sesiones_guardadas[sesiones_guardadas.length] = infoDientes;
			
			localStorage.setItem("sesiones_guardadas", JSON.stringify(sesiones_guardadas));
		}*/
		application.addNotification({
        		message: 'Información guardada',
		        button: {
		            text: 'Cerrar',
		            color: 'lightgreen'
		        }
    		});
	}
});