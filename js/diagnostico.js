var app = angular.module('MainApp', []);
var urlServidor = 'http://127.0.0.1:3000/';
var application = new Framework7({
	material: true,
	materialRipple: true
});

app.controller('mainController', function($scope, $http){
	var isSave = true;
	var movimientos = [], posiciones = [];
	var dientes, colmillos, muelas, extras, menu, output;
	var color = "";
	var datos = JSON.parse(localStorage.getItem('paciente'));
	$scope.paciente = JSON.parse(localStorage.getItem('paciente'));

	var zona = parseInt(localStorage.getItem("zona"));
	$scope.zona_revision = '';
	switch(zona){
		case 1: $scope.zona_revision = "ZONA SUPERIOR IZQUIERDA";
		break;
		case 2: $scope.zona_revision = "ZONA SUPERIOR DERECHA";
		break;
		case 3: $scope.zona_revision = "ZONA INFERIOR IZQUIERDA";
		break;
		case 4: $scope.zona_revision = "ZONA INFERIOR DERECHA";
		break;
	}
	// Creamos JSON con la informacion

	var info = {
		//idPaciente: datos._id,//Este es nuevo
		//posicion: 1,//izquierdo superior
		caries: '0',
		ausentes: '0',
		restos: '0',
		protesis_fija: '0',
		protesis_movil: '0',
		obturacion: '0'
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
	function createMenu()
	{
		var structure_general = new createjs.Container();

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("white");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("red").drawRect(-25, -45, 180, 50);
		rect.addEventListener("click", function(event) { color = "red"; });

		var label = new createjs.Text("Caries", "bold 20px sans-serif", "#fff");
		label.textAlign = "center";
		label.y = -30;
		label.x = 60;

		var dragger = new createjs.Container();
		dragger.x = 25;
		dragger.y = 45;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("white");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("#000").drawRect(-25, 0, 180, 50);
		rect.addEventListener("click", function(event) { color = "#000"; });

		var label = new createjs.Text("Ausentes", "bold 20px sans-serif", "#fff");
		label.textAlign = "center";
		label.y = 15;
		label.x = 60;

		var dragger = new createjs.Container();
		dragger.x = 25;
		dragger.y = 45;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("white");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("#795548").drawRect(-25, 50, 180, 50);
		rect.addEventListener("click", function(event) { color = "#795548"; });

		var label = new createjs.Text("Restos", "bold 20px sans-serif", "#fff");
		label.textAlign = "center";
		label.y = 62;
		label.x = 60;

		var dragger = new createjs.Container();
		dragger.x = 25;
		dragger.y = 45;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("white");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("green").drawRect(-25, 100, 180, 50);
		rect.addEventListener("click", function(event) { color = "green"; });

		var label = new createjs.Text("Protesis fijas", "bold 20px sans-serif", "#fff");
		label.textAlign = "center";
		label.y = 115;
		label.x = 60;

		var dragger = new createjs.Container();
		dragger.x = 25;
		dragger.y = 45;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("white");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("#ff5722").drawRect(-25, 150, 180, 50);
		rect.addEventListener("click", function(event) { color = "#ff5722"; });

		var label = new createjs.Text("Protesis rem.", "bold 20px sans-serif", "#fff");
		label.textAlign = "center";
		label.y = 165;
		label.x = 60;

		var dragger = new createjs.Container();
		dragger.x = 25;
		dragger.y = 45;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("white");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("blue").drawRect(-25, 200, 180, 50);
		rect.addEventListener("click", function(event) { color = "blue"; });

		var label = new createjs.Text("Obturación", "bold 20px sans-serif", "#fff");
		label.textAlign = "center";
		label.y = 215;
		label.x = 60;

		var dragger = new createjs.Container();
		dragger.x = 25;
		dragger.y = 45;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);

		return structure_general;
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
	function createDental(name, originx, originy, withOclusal)
	{
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
		rect.addEventListener("click", function(event) { 
			var buttons = [
        {
            text: 'Button1',
            onClick: function () {
                application.alert('Button1 clicked');
            }
        },
        {
            text: 'Button2',
            onClick: function () {
                application.alert('Button2 clicked');
            }
        },
        {
            text: 'Cancel',
            color: 'red',
            onClick: function () {
                application.alert('Cancel clicked');
            }
        },
    ];
    var canvas = $("#muelas");
    application.actions(canvas, buttons);
			//$('#myModal').modal();
			/*var point = new createjs.Shape();
			if(color == "")
				return;
			point.graphics.beginFill(color).drawCircle(event.stageX, event.stageY, 5);

			var segmento = name.split("-");
			var zona = parseInt(segmento[1]);
			isSave = false;
			$("#msj").html($scope.zona_revision);*/

			switch(zona)
			{
				case 1:

					switch(color)
					{
						case "red": infoDientes.uno.mesial.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-mesial-caries";
						break;
						case "#000": infoDientes.uno.mesial.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-mesial-ausentes";
						break;
						case "#795548": infoDientes.uno.mesial.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-mesial-restos";
						break;
						case "green": infoDientes.uno.mesial.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-mesial-protesis_fija";
						break;
						case "#ff5722": infoDientes.uno.mesial.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-mesial-protesis_movil";
						break;
						case "blue": infoDientes.uno.mesial.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-mesial-obturacion";
						break;
					}
					dientes.addChild(point);
					dientes.update();
				break;
				case 2:

					switch(color)
					{
						case "red": infoDientes.dos.mesial.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-mesial-caries";
						break;
						case "#000": infoDientes.dos.mesial.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-mesial-ausentes";
						break;
						case "#795548": infoDientes.dos.mesial.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-mesial-restos";
						break;
						case "green": infoDientes.dos.mesial.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-mesial-protesis_fija";
						break;
						case "#ff5722": infoDientes.dos.mesial.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-mesial-protesis_movil";
						break;
						case "blue": infoDientes.dos.mesial.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-mesial-obturacion";
						break;
					}
					dientes.addChild(point);
					dientes.update();
				break;
				case 3:
					switch(color)
					{
						case "red": infoDientes.tres.mesial.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-mesial-caries";
						break;
						case "#000": infoDientes.tres.mesial.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-mesial-ausentes";
						break;
						case "#795548": infoDientes.tres.mesial.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-mesial-restos";
						break;
						case "green": infoDientes.tres.mesial.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-mesial-protesis_fija";
						break;
						case "#ff5722": infoDientes.tres.mesial.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-mesial-protesis_movil";
						break;
						case "blue": infoDientes.tres.mesial.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-mesial-obturacion";
						break;
					}
					colmillos.addChild(point);
					colmillos.update();
				break;
				case 4:
					switch(color)
					{
						case "red": infoDientes.cuatro.mesial.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-mesial-caries";
						break;
						case "#000": infoDientes.cuatro.mesial.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-mesial-ausentes";
						break;
						case "#795548": infoDientes.cuatro.mesial.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-mesial-restos";
						break;
						case "green": infoDientes.cuatro.mesial.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-mesial-protesis_fija";
						break;
						case "#ff5722": infoDientes.cuatro.mesial.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-mesial-protesis_movil";
						break;
						case "blue": infoDientes.cuatro.mesial.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-mesial-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 5:
					switch(color)
					{
						case "red": infoDientes.cinco.mesial.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-mesial-caries";
						break;
						case "#000": infoDientes.cinco.mesial.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-mesial-ausentes";
						break;
						case "#795548": infoDientes.cinco.mesial.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-mesial-restos";
						break;
						case "green": infoDientes.cinco.mesial.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-mesial-protesis_fija";
						break;
						case "#ff5722": infoDientes.cinco.mesial.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-mesial-protesis_movil";
						break;
						case "blue": infoDientes.cinco.mesial.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-mesial-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 6:
					switch(color)
					{
						case "red": infoDientes.seis.mesial.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-mesial-caries";
						break;
						case "#000": infoDientes.seis.mesial.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-mesial-ausentes";
						break;
						case "#795548": infoDientes.seis.mesial.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-mesial-restos";
						break;
						case "green": infoDientes.seis.mesial.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-mesial-protesis_fija";
						break;
						case "#ff5722": infoDientes.seis.mesial.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-mesial-protesis_movil";
						break;
						case "blue": infoDientes.seis.mesial.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-mesial-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 7:
					switch(color)
					{
						case "red": infoDientes.siete.mesial.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-mesial-caries";
						break;
						case "#000": infoDientes.siete.mesial.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-mesial-ausentes";
						break;
						case "#795548": infoDientes.siete.mesial.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-mesial-restos";
						break;
						case "green": infoDientes.siete.mesial.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-mesial-protesis_fija";
						break;
						case "#ff5722": infoDientes.siete.mesial.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-mesial-protesis_movil";
						break;
						case "blue": infoDientes.siete.mesial.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-mesial-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 8:
					switch(color)
					{
						case "red": infoDientes.ocho.mesial.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-mesial-caries";
						break;
						case "#000": infoDientes.ocho.mesial.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-mesial-ausentes";
						break;
						case "#795548": infoDientes.ocho.mesial.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-mesial-restos";
						break;
						case "green": infoDientes.ocho.mesial.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-mesial-protesis_fija";
						break;
						case "#ff5722": infoDientes.ocho.mesial.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-mesial-protesis_movil";
						break;
						case "blue": infoDientes.ocho.mesial.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-mesial-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
			}
		});
		
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
		rect.addEventListener("click", function(event) { 
			var point = new createjs.Shape();
			if(color == "")
				return;
			point.graphics.beginFill(color).drawCircle(event.stageX, event.stageY, 5);
			var segmento = name.split("-");
			var zona = parseInt(segmento[1]);
			isSave = false;
			$("#msj").html($scope.zona_revision);
			switch(zona)
			{
				case 1:

					switch(color)
					{
						case "red": infoDientes.uno.distal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-distal-caries";
						break;
						case "#000": infoDientes.uno.distal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-distal-ausentes";
						break;
						case "#795548": infoDientes.uno.distal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-distal-restos";
						break;
						case "green": infoDientes.uno.distal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-distal-protesis_fija";
						break;
						case "#ff5722": infoDientes.uno.distal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-distal-protesis_movil";
						break;
						case "blue": infoDientes.uno.distal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-distal-obturacion";
						break;
					}
					dientes.addChild(point);
					dientes.update();
				break;
				case 2:

					switch(color)
					{
						case "red": infoDientes.dos.distal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-distal-caries";
						break;
						case "#000": infoDientes.dos.distal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-distal-ausentes";
						break;
						case "#795548": infoDientes.dos.distal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-distal-restos";
						break;
						case "green": infoDientes.dos.distal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-distal-protesis_fija";
						break;
						case "#ff5722": infoDientes.dos.distal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-distal-protesis_movil";
						break;
						case "blue": infoDientes.dos.distal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-distal-obturacion";
						break;
					}
					dientes.addChild(point);
					dientes.update();
				break;
				case 3:
					switch(color)
					{
						case "red": infoDientes.tres.distal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-distal-caries";
						break;
						case "#000": infoDientes.tres.distal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-distal-ausentes";
						break;
						case "#795548": infoDientes.tres.distal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-distal-restos";
						break;
						case "green": infoDientes.tres.distal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-distal-protesis_fija";
						break;
						case "#ff5722": infoDientes.tres.distal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-distal-protesis_movil";
						break;
						case "blue": infoDientes.tres.distal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-distal-obturacion";
						break;
					}
					colmillos.addChild(point);
					colmillos.update();
				break;
				case 4:
					switch(color)
					{
						case "red": infoDientes.cuatro.distal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-distal-caries";
						break;
						case "#000": infoDientes.cuatro.distal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-distal-ausentes";
						break;
						case "#795548": infoDientes.cuatro.distal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-distal-restos";
						break;
						case "green": infoDientes.cuatro.distal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-distal-protesis_fija";
						break;
						case "#ff5722": infoDientes.cuatro.distal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-distal-protesis_movil";
						break;
						case "blue": infoDientes.cuatro.distal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-distal-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 5:
					switch(color)
					{
						case "red": infoDientes.cinco.distal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-distal-caries";
						break;
						case "#000": infoDientes.cinco.distal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-distal-ausentes";
						break;
						case "#795548": infoDientes.cinco.distal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-distal-restos";
						break;
						case "green": infoDientes.cinco.distal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-distal-protesis_fija";
						break;
						case "#ff5722": infoDientes.cinco.distal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-distal-protesis_movil";
						break;
						case "blue": infoDientes.cinco.distal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-distal-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 6:
					switch(color)
					{
						case "red": infoDientes.seis.distal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-distal-caries";
						break;
						case "#000": infoDientes.seis.distal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-distal-ausentes";
						break;
						case "#795548": infoDientes.seis.distal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-distal-restos";
						break;
						case "green": infoDientes.seis.distal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-distal-protesis_fija";
						break;
						case "#ff5722": infoDientes.seis.distal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-distal-protesis_movil";
						break;
						case "blue": infoDientes.seis.distal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-distal-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 7:
					switch(color)
					{
						case "red": infoDientes.siete.distal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-distal-caries";
						break;
						case "#000": infoDientes.siete.distal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-distal-ausentes";
						break;
						case "#795548": infoDientes.siete.distal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-distal-restos";
						break;
						case "green": infoDientes.siete.distal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-distal-protesis_fija";
						break;
						case "#ff5722": infoDientes.siete.distal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-distal-protesis_movil";
						break;
						case "blue": infoDientes.siete.distal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-distal-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 8:
					switch(color)
					{
						case "red": infoDientes.ocho.distal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-distal-caries";
						break;
						case "#000": infoDientes.ocho.distal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-distal-ausentes";
						break;
						case "#795548": infoDientes.ocho.distal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-distal-restos";
						break;
						case "green": infoDientes.ocho.distal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-distal-protesis_fija";
						break;
						case "#ff5722": infoDientes.ocho.distal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-distal-protesis_movil";
						break;
						case "blue": infoDientes.ocho.distal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-distal-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
			}
		});
		
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
		rect.addEventListener("click", function(event) { 
			var point = new createjs.Shape();
			if(color == "")
				return;
			point.graphics.beginFill(color).drawCircle(event.stageX, event.stageY, 5);
			var segmento = name.split("-");
			var zona = parseInt(segmento[1]);
			isSave = false;
			$("#msj").html($scope.zona_revision);
			switch(zona)
			{
				case 1:

					switch(color)
					{
						case "red": infoDientes.uno.lengual.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-lengual-caries";
						break;
						case "#000": infoDientes.uno.lengual.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-lengual-ausentes";
						break;
						case "#795548": infoDientes.uno.lengual.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-lengual-restos";
						break;
						case "green": infoDientes.uno.lengual.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-lengual-protesis_fija";
						break;
						case "#ff5722": infoDientes.uno.lengual.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-lengual-protesis_movil";
						break;
						case "blue": infoDientes.uno.lengual.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-lengual-obturacion";
						break;
					}
					dientes.addChild(point);
					dientes.update();
				break;
				case 2:

					switch(color)
					{
						case "red": infoDientes.dos.lengual.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-lengual-caries";
						break;
						case "#000": infoDientes.dos.lengual.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-lengual-ausentes";
						break;
						case "#795548": infoDientes.dos.lengual.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-lengual-restos";
						break;
						case "green": infoDientes.dos.lengual.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-lengual-protesis_fija";
						break;
						case "#ff5722": infoDientes.dos.lengual.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-lengual-protesis_movil";
						break;
						case "blue": infoDientes.dos.lengual.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-lengual-obturacion";
						break;
					}
					dientes.addChild(point);
					dientes.update();
				break;
				case 3:
					switch(color)
					{
						case "red": infoDientes.tres.lengual.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-lengual-caries";
						break;
						case "#000": infoDientes.tres.lengual.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-lengual-ausentes";
						break;
						case "#795548": infoDientes.tres.lengual.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-lengual-restos";
						break;
						case "green": infoDientes.tres.lengual.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-lengual-protesis_fija";
						break;
						case "#ff5722": infoDientes.tres.lengual.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-lengual-protesis_movil";
						break;
						case "blue": infoDientes.tres.lengual.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-lengual-obturacion";
						break;
					}
					colmillos.addChild(point);
					colmillos.update();
				break;
				case 4:
					switch(color)
					{
						case "red": infoDientes.cuatro.lengual.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-lengual-caries";
						break;
						case "#000": infoDientes.cuatro.lengual.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-lengual-ausentes";
						break;
						case "#795548": infoDientes.cuatro.lengual.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-lengual-restos";
						break;
						case "green": infoDientes.cuatro.lengual.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-lengual-protesis_fija";
						break;
						case "#ff5722": infoDientes.cuatro.lengual.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-lengual-protesis_movil";
						break;
						case "blue": infoDientes.cuatro.lengual.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-lengual-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 5:
					switch(color)
					{
						case "red": infoDientes.cinco.lengual.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-lengual-caries";
						break;
						case "#000": infoDientes.cinco.lengual.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-lengual-ausentes";
						break;
						case "#795548": infoDientes.cinco.lengual.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-lengual-restos";
						break;
						case "green": infoDientes.cinco.lengual.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-lengual-protesis_fija";
						break;
						case "#ff5722": infoDientes.cinco.lengual.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-lengual-protesis_movil";
						break;
						case "blue": infoDientes.cinco.lengual.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-lengual-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 6:
					switch(color)
					{
						case "red": infoDientes.seis.lengual.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-lengual-caries";
						break;
						case "#000": infoDientes.seis.lengual.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-lengual-ausentes";
						break;
						case "#795548": infoDientes.seis.lengual.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-lengual-restos";
						break;
						case "green": infoDientes.seis.lengual.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-lengual-protesis_fija";
						break;
						case "#ff5722": infoDientes.seis.lengual.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-lengual-protesis_movil";
						break;
						case "blue": infoDientes.seis.lengual.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-lengual-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 7:
					switch(color)
					{
						case "red": infoDientes.siete.lengual.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-lengual-caries";
						break;
						case "#000": infoDientes.siete.lengual.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-lengual-ausentes";
						break;
						case "#795548": infoDientes.siete.lengual.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-lengual-restos";
						break;
						case "green": infoDientes.siete.lengual.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-lengual-protesis_fija";
						break;
						case "#ff5722": infoDientes.siete.lengual.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-lengual-protesis_movil";
						break;
						case "blue": infoDientes.siete.lengual.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-lengual-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 8:
					switch(color)
					{
						case "red": infoDientes.ocho.lengual.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-lengual-caries";
						break;
						case "#000": infoDientes.ocho.lengual.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-lengual-ausentes";
						break;
						case "#795548": infoDientes.ocho.lengual.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-lengual-restos";
						break;
						case "green": infoDientes.ocho.lengual.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-lengual-protesis_fija";
						break;
						case "#ff5722": infoDientes.ocho.lengual.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-lengual-protesis_movil";
						break;
						case "blue": infoDientes.ocho.lengual.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-lengual-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
			}
		});
		
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
		rect.addEventListener("click", function(event) { 
			var point = new createjs.Shape();
			if(color == "")
				return;
			point.graphics.beginFill(color).drawCircle(event.stageX, event.stageY, 5);
			var segmento = name.split("-");
			var zona = parseInt(segmento[1]);
			isSave = false;
			$("#msj").html($scope.zona_revision);
			switch(zona)
			{
				case 1:

					switch(color)
					{
						case "red": infoDientes.uno.vestibular.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-vestibular-caries";
						break;
						case "#000": infoDientes.uno.vestibular.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-vestibular-ausentes";
						break;
						case "#795548": infoDientes.uno.vestibular.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-vestibular-restos";
						break;
						case "green": infoDientes.uno.vestibular.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-vestibular-protesis_fija";
						break;
						case "#ff5722": infoDientes.uno.vestibular.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-vestibular-protesis_movil";
						break;
						case "blue": infoDientes.uno.vestibular.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-vestibular-obturacion";
						break;
					}
					dientes.addChild(point);
					dientes.update();
				break;
				case 2:

					switch(color)
					{
						case "red": infoDientes.dos.vestibular.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-vestibular-caries";
						break;
						case "#000": infoDientes.dos.vestibular.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-vestibular-ausentes";
						break;
						case "#795548": infoDientes.dos.vestibular.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-vestibular-restos";
						break;
						case "green": infoDientes.dos.vestibular.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-vestibular-protesis_fija";
						break;
						case "#ff5722": infoDientes.dos.vestibular.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-vestibular-protesis_movil";
						break;
						case "blue": infoDientes.dos.vestibular.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-vestibular-obturacion";
						break;
					}
					dientes.addChild(point);
					dientes.update();
				break;
				case 3:
					switch(color)
					{
						case "red": infoDientes.tres.vestibular.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-vestibular-caries";
						break;
						case "#000": infoDientes.tres.vestibular.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-vestibular-ausentes";
						break;
						case "#795548": infoDientes.tres.vestibular.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-vestibular-restos";
						break;
						case "green": infoDientes.tres.vestibular.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-vestibular-protesis_fija";
						break;
						case "#ff5722": infoDientes.tres.vestibular.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-vestibular-protesis_movil";
						break;
						case "blue": infoDientes.tres.vestibular.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-vestibular-obturacion";
						break;
					}
					colmillos.addChild(point);
					colmillos.update();
				break;
				case 4:
					switch(color)
					{
						case "red": infoDientes.cuatro.vestibular.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-vestibular-caries";
						break;
						case "#000": infoDientes.cuatro.vestibular.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-vestibular-ausentes";
						break;
						case "#795548": infoDientes.cuatro.vestibular.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-vestibular-restos";
						break;
						case "green": infoDientes.cuatro.vestibular.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-vestibular-protesis_fija";
						break;
						case "#ff5722": infoDientes.cuatro.vestibular.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-vestibular-protesis_movil";
						break;
						case "blue": infoDientes.cuatro.vestibular.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-vestibular-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 5:
					switch(color)
					{
						case "red": infoDientes.cinco.vestibular.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-vestibular-caries";
						break;
						case "#000": infoDientes.cinco.vestibular.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-vestibular-ausentes";
						break;
						case "#795548": infoDientes.cinco.vestibular.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-vestibular-restos";
						break;
						case "green": infoDientes.cinco.vestibular.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-vestibular-protesis_fija";
						break;
						case "#ff5722": infoDientes.cinco.vestibular.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-vestibular-protesis_movil";
						break;
						case "blue": infoDientes.cinco.vestibular.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-vestibular-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 6:
					switch(color)
					{
						case "red": infoDientes.seis.vestibular.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-vestibular-caries";
						break;
						case "#000": infoDientes.seis.vestibular.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-vestibular-ausentes";
						break;
						case "#795548": infoDientes.seis.vestibular.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-vestibular-restos";
						break;
						case "green": infoDientes.seis.vestibular.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-vestibular-protesis_fija";
						break;
						case "#ff5722": infoDientes.seis.vestibular.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-vestibular-protesis_movil";
						break;
						case "blue": infoDientes.seis.vestibular.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-vestibular-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 7:
					switch(color)
					{
						case "red": infoDientes.siete.vestibular.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-vestibular-caries";
						break;
						case "#000": infoDientes.siete.vestibular.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-vestibular-ausentes";
						break;
						case "#795548": infoDientes.siete.vestibular.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-vestibular-restos";
						break;
						case "green": infoDientes.siete.vestibular.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-vestibular-protesis_fija";
						break;
						case "#ff5722": infoDientes.siete.vestibular.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-vestibular-protesis_movil";
						break;
						case "blue": infoDientes.siete.vestibular.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-vestibular-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 8:
					switch(color)
					{
						case "red": infoDientes.ocho.vestibular.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-vestibular-caries";
						break;
						case "#000": infoDientes.ocho.vestibular.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-vestibular-ausentes";
						break;
						case "#795548": infoDientes.ocho.vestibular.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-vestibular-restos";
						break;
						case "green": infoDientes.ocho.vestibular.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-vestibular-protesis_fija";
						break;
						case "#ff5722": infoDientes.ocho.vestibular.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-vestibular-protesis_movil";
						break;
						case "blue": infoDientes.ocho.vestibular.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-vestibular-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
			}
		});
		
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
		circle.addEventListener("click", function(event) { 
			var point = new createjs.Shape();
			if(color == "")
				return;
			point.graphics.beginFill(color).drawCircle(event.stageX, event.stageY, 5);
			var segmento = name.split("-");
			var zona = parseInt(segmento[1]);
			isSave = false;
			$("#msj").html($scope.zona_revision);
			switch(zona)
			{
				case 1:

					switch(color)
					{
						case "red": infoDientes.uno.oclusal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-oclusal-caries";
						break;
						case "#000": infoDientes.uno.oclusal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-oclusal-ausentes";
						break;
						case "#795548": infoDientes.uno.oclusal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-oclusal-restos";
						break;
						case "green": infoDientes.uno.oclusal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-oclusal-protesis_fija";
						break;
						case "#ff5722": infoDientes.uno.oclusal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-oclusal-protesis_movil";
						break;
						case "blue": infoDientes.uno.oclusal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "uno-oclusal-obturacion";
						break;
					}
					dientes.addChild(point);
					dientes.update();
				break;
				case 2:

					switch(color)
					{
						case "red": infoDientes.dos.oclusal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-oclusal-caries";
						break;
						case "#000": infoDientes.dos.oclusal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-oclusal-ausentes";
						break;
						case "#795548": infoDientes.dos.oclusal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-oclusal-restos";
						break;
						case "green": infoDientes.dos.oclusal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-oclusal-protesis_fija";
						break;
						case "#ff5722": infoDientes.dos.oclusal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-oclusal-protesis_movil";
						break;
						case "blue": infoDientes.dos.oclusal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "dos-oclusal-obturacion";
						break;
					}
					dientes.addChild(point);
					dientes.update();
				break;
				case 3:
					switch(color)
					{
						case "red": infoDientes.tres.oclusal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-oclusal-caries";
						break;
						case "#000": infoDientes.tres.oclusal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-oclusal-ausentes";
						break;
						case "#795548": infoDientes.tres.oclusal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-oclusal-restos";
						break;
						case "green": infoDientes.tres.oclusal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-oclusal-protesis_fija";
						break;
						case "#ff5722": infoDientes.tres.oclusal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-oclusal-protesis_movil";
						break;
						case "blue": infoDientes.tres.oclusal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "tres-oclusal-obturacion";
						break;
					}
					colmillos.addChild(point);
					colmillos.update();
				break;
				case 4:
					switch(color)
					{
						case "red": infoDientes.cuatro.oclusal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-oclusal-caries";
						break;
						case "#000": infoDientes.cuatro.oclusal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-oclusal-ausentes";
						break;
						case "#795548": infoDientes.cuatro.oclusal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-oclusal-restos";
						break;
						case "green": infoDientes.cuatro.oclusal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-oclusal-protesis_fija";
						break;
						case "#ff5722": infoDientes.cuatro.oclusal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-oclusal-protesis_movil";
						break;
						case "blue": infoDientes.cuatro.oclusal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cuatro-oclusal-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 5:
					switch(color)
					{
						case "red": infoDientes.cinco.oclusal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-oclusal-caries";
						break;
						case "#000": infoDientes.cinco.oclusal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-oclusal-ausentes";
						break;
						case "#795548": infoDientes.cinco.oclusal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-oclusal-restos";
						break;
						case "green": infoDientes.cinco.oclusal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-oclusal-protesis_fija";
						break;
						case "#ff5722": infoDientes.cinco.oclusal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-oclusal-protesis_movil";
						break;
						case "blue": infoDientes.cinco.oclusal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "cinco-oclusal-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 6:
					switch(color)
					{
						case "red": infoDientes.seis.oclusal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-oclusal-caries";
						break;
						case "#000": infoDientes.seis.oclusal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-oclusal-ausentes";
						break;
						case "#795548": infoDientes.seis.oclusal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-oclusal-restos";
						break;
						case "green": infoDientes.seis.oclusal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-oclusal-protesis_fija";
						break;
						case "#ff5722": infoDientes.seis.oclusal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-oclusal-protesis_movil";
						break;
						case "blue": infoDientes.seis.oclusal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "seis-oclusal-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 7:
					switch(color)
					{
						case "red": infoDientes.siete.oclusal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-oclusal-caries";
						break;
						case "#000": infoDientes.siete.oclusal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-oclusal-ausentes";
						break;
						case "#795548": infoDientes.siete.oclusal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-oclusal-restos";
						break;
						case "green": infoDientes.siete.oclusal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-oclusal-protesis_fija";
						break;
						case "#ff5722": infoDientes.siete.oclusal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-oclusal-protesis_movil";
						break;
						case "blue": infoDientes.siete.oclusal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "siete-oclusal-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
				case 8:
					switch(color)
					{
						case "red": infoDientes.ocho.oclusal.caries = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-oclusal-caries";
						break;
						case "#000": infoDientes.ocho.oclusal.ausentes = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-oclusal-ausentes";
						break;
						case "#795548": infoDientes.ocho.oclusal.restos = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-oclusal-restos";
						break;
						case "green": infoDientes.ocho.oclusal.protesis_fija = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-oclusal-protesis_fija";
						break;
						case "#ff5722": infoDientes.ocho.oclusal.protesis_movil = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-oclusal-protesis_movil";
						break;
						case "blue": infoDientes.ocho.oclusal.obturacion = event.stageX+"-"+event.stageY;
						movimientos[movimientos.length] = "ocho-oclusal-obturacion";
						break;
					}
					muelas.addChild(point);
					muelas.update();
				break;
			}
		});
	
		if(!withOclusal)
			return structure_general;

		var label = new createjs.Text("Oclusal", "bold 10px Arial", "#CD0000");
		label.textAlign = "center";
		label.y = -5;

		var dragger = new createjs.Container();
		dragger.x = 100 + originx;
		dragger.y = 100 + originy;
		dragger.addChild(circle, label);
		structure_general.addChild(dragger);

		return structure_general;
	}
		
	function init(callback) {
		/*dientes = new createjs.Stage("dientes");
		var structure_general = createDental("1-1", 0, 0);
		dientes.addChild(structure_general);
		var structure_general = createDental("1-2", 220, 0);
		dientes.addChild(structure_general);
		var structure_general = createBorder(0);
		dientes.addChild(structure_general);

		dientes.update();

		colmillos = new createjs.Stage("colmillos");
		var structure_general = createDental("1-3", 0, 0);
		colmillos.addChild(structure_general);
		var structure_general = createBorder(0);
		colmillos.addChild(structure_general);

		colmillos.update();*/

		muelas = new createjs.Stage("muelas");
		var structure_general = createDental("Diente 1", 0, 0, false);
		muelas.addChild(structure_general);
		var structure_general = createDental("Diente 2", 180, 0, false);
		muelas.addChild(structure_general);
		var structure_general = createDental("Colmillo", 360, 0, false);
		muelas.addChild(structure_general);
		var structure_general = createDental("Premolar 1", 540, 0, true);
		muelas.addChild(structure_general);
		var structure_general = createDental("Premolar 2", 720, 0, true);
		muelas.addChild(structure_general);
		var structure_general = createDental("Molar 1", 900, 0, true);
		muelas.addChild(structure_general);
		var structure_general = createDental("Molar 2", 1080, 0, true);
		muelas.addChild(structure_general);
		var structure_general = createDental("Molar 3", 1260, 0, true);
		muelas.addChild(structure_general);
		//var structure_general = createBorder(180);
		//muelas.addChild(structure_general);

		muelas.update();

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
		fillPoints(uno, dientes);
		var dos = infoDientes.dos;
		fillPoints(dos, dientes);
		var tres = infoDientes.tres;
		fillPoints(tres, colmillos);
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
			for(j in diente[i]) {
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
			}
		}
	}

	$scope.Undo = function() {
		if(movimientos.length == 0)
			return;
		var last = movimientos.pop();
		switch(last){
			case "uno-mesial-caries": putPoint(infoDientes.uno.mesial.caries, dientes);infoDientes.uno.mesial.caries = '0';
			break;
			case "uno-mesial-ausentes": putPoint(infoDientes.uno.mesial.ausentes, dientes);infoDientes.uno.mesial.ausentes = '0';
			break;
			case "uno-mesial-restos": putPoint(infoDientes.uno.mesial.restos, dientes);infoDientes.uno.mesial.restos = '0';
			break;
			case "uno-mesial-protesis_fija": putPoint(infoDientes.uno.mesial.protesis_fija, dientes);infoDientes.uno.mesial.protesis_fija = '0';
			break;
			case "uno-mesial-protesis_movil": putPoint(infoDientes.uno.mesial.protesis_movil, dientes);infoDientes.uno.mesial.protesis_movil = '0';
			break;
			case "uno-mesial-obturacion": putPoint(infoDientes.uno.mesial.obturacion, dientes);infoDientes.uno.mesial.obturacion = '0';
			break;
			// ************************************************
			case "uno-distal-caries": putPoint(infoDientes.uno.distal.caries, dientes);infoDientes.uno.distal.caries = '0';
			break;
			case "uno-distal-ausentes": putPoint(infoDientes.uno.distal.ausentes, dientes);infoDientes.uno.distal.ausentes = '0';
			break;
			case "uno-distal-restos": putPoint(infoDientes.uno.distal.restos, dientes);infoDientes.uno.distal.restos = '0';
			break;
			case "uno-distal-protesis_fija": putPoint(infoDientes.uno.distal.protesis_fija, dientes);infoDientes.uno.distal.protesis_fija = '0';
			break;
			case "uno-distal-protesis_movil": putPoint(infoDientes.uno.distal.protesis_movil, dientes);infoDientes.uno.distal.protesis_movil = '0';
			break;
			case "uno-distal-obturacion": putPoint(infoDientes.uno.distal.obturacion, dientes);infoDientes.uno.distal.obturacion = '0';
			break;
			// ************************************************
			case "uno-lengual-caries": putPoint(infoDientes.uno.lengual.caries, dientes);infoDientes.uno.lengual.caries = '0';
			break;
			case "uno-lengual-ausentes": putPoint(infoDientes.uno.lengual.ausentes, dientes);infoDientes.uno.lengual.ausentes = '0';
			break;
			case "uno-lengual-restos": putPoint(infoDientes.uno.lengual.restos, dientes);infoDientes.uno.lengual.restos = '0';
			break;
			case "uno-lengual-protesis_fija": putPoint(infoDientes.uno.lengual.protesis_fija, dientes);infoDientes.uno.lengual.protesis_fija = '0';
			break;
			case "uno-lengual-protesis_movil": putPoint(infoDientes.uno.lengual.protesis_movil, dientes);infoDientes.uno.lengual.protesis_movil = '0';
			break;
			case "uno-lengual-obturacion": putPoint(infoDientes.uno.lengual.obturacion, dientes);infoDientes.uno.lengual.obturacion = '0';
			break;
			// ************************************************
			case "uno-vestibular-caries": putPoint(infoDientes.uno.vestibular.caries, dientes);infoDientes.uno.vestibular.caries = '0';
			break;
			case "uno-vestibular-ausentes": putPoint(infoDientes.uno.vestibular.ausentes, dientes);infoDientes.uno.vestibular.ausentes = '0';
			break;
			case "uno-vestibular-restos": putPoint(infoDientes.uno.vestibular.restos, dientes);infoDientes.uno.vestibular.restos = '0';
			break;
			case "uno-vestibular-protesis_fija": putPoint(infoDientes.uno.vestibular.protesis_fija, dientes);infoDientes.uno.vestibular.protesis_fija = '0';
			break;
			case "uno-vestibular-protesis_movil": putPoint(infoDientes.uno.vestibular.protesis_movil, dientes);infoDientes.uno.vestibular.protesis_movil = '0';
			break;
			case "uno-vestibular-obturacion": putPoint(infoDientes.uno.vestibular.obturacion, dientes);infoDientes.uno.vestibular.obturacion = '0';
			break;
			// ************************************************
			case "uno-oclusal-caries": putPoint(infoDientes.uno.oclusal.caries, dientes);infoDientes.uno.oclusal.caries = '0';
			break;
			case "uno-oclusal-ausentes": putPoint(infoDientes.uno.oclusal.ausentes, dientes);infoDientes.uno.oclusal.ausentes = '0';
			break;
			case "uno-oclusal-restos": putPoint(infoDientes.uno.oclusal.restos, dientes);infoDientes.uno.oclusal.restos = '0';
			break;
			case "uno-oclusal-protesis_fija": putPoint(infoDientes.uno.oclusal.protesis_fija, dientes);infoDientes.uno.oclusal.protesis_fija = '0';
			break;
			case "uno-oclusal-protesis_movil": putPoint(infoDientes.uno.oclusal.protesis_movil, dientes);infoDientes.uno.oclusal.protesis_movil = '0';
			break;
			case "uno-oclusal-obturacion": putPoint(infoDientes.uno.oclusal.obturacion, dientes);infoDientes.uno.oclusal.obturacion = '0';
			break;
		}
		switch(last){
			case "dos-mesial-caries": putPoint(infoDientes.dos.mesial.caries, dientes);infoDientes.dos.mesial.caries = '0';
			break;
			case "dos-mesial-ausentes": putPoint(infoDientes.dos.mesial.ausentes, dientes);infoDientes.dos.mesial.ausentes = '0';
			break;
			case "dos-mesial-restos": putPoint(infoDientes.dos.mesial.restos, dientes);infoDientes.dos.mesial.restos = '0';
			break;
			case "dos-mesial-protesis_fija": putPoint(infoDientes.dos.mesial.protesis_fija, dientes);infoDientes.dos.mesial.protesis_fija = '0';
			break;
			case "dos-mesial-protesis_movil": putPoint(infoDientes.dos.mesial.protesis_movil, dientes);infoDientes.dos.mesial.protesis_movil = '0';
			break;
			case "dos-mesial-obturacion": putPoint(infoDientes.dos.mesial.obturacion, dientes);infoDientes.dos.mesial.obturacion = '0';
			break;
			// ************************************************
			case "dos-distal-caries": putPoint(infoDientes.dos.distal.caries, dientes);infoDientes.dos.distal.caries = '0';
			break;
			case "dos-distal-ausentes": putPoint(infoDientes.dos.distal.ausentes, dientes);infoDientes.dos.distal.ausentes = '0';
			break;
			case "dos-distal-restos": putPoint(infoDientes.dos.distal.restos, dientes);infoDientes.dos.distal.restos = '0';
			break;
			case "dos-distal-protesis_fija": putPoint(infoDientes.dos.distal.protesis_fija, dientes);infoDientes.dos.distal.protesis_fija = '0';
			break;
			case "dos-distal-protesis_movil": putPoint(infoDientes.dos.distal.protesis_movil, dientes);infoDientes.dos.distal.protesis_movil = '0';
			break;
			case "dos-distal-obturacion": putPoint(infoDientes.dos.distal.obturacion, dientes);infoDientes.dos.distal.obturacion = '0';
			break;
			// ************************************************
			case "dos-lengual-caries": putPoint(infoDientes.dos.lengual.caries, dientes);infoDientes.dos.lengual.caries = '0';
			break;
			case "dos-lengual-ausentes": putPoint(infoDientes.dos.lengual.ausentes, dientes);infoDientes.dos.lengual.ausentes = '0';
			break;
			case "dos-lengual-restos": putPoint(infoDientes.dos.lengual.restos, dientes);infoDientes.dos.lengual.restos = '0';
			break;
			case "dos-lengual-protesis_fija": putPoint(infoDientes.dos.lengual.protesis_fija, dientes);infoDientes.dos.lengual.protesis_fija = '0';
			break;
			case "dos-lengual-protesis_movil": putPoint(infoDientes.dos.lengual.protesis_movil, dientes);infoDientes.dos.lengual.protesis_movil = '0';
			break;
			case "dos-lengual-obturacion": putPoint(infoDientes.dos.lengual.obturacion, dientes);infoDientes.dos.lengual.obturacion = '0';
			break;
			// ************************************************
			case "dos-vestibular-caries": putPoint(infoDientes.dos.vestibular.caries, dientes);infoDientes.dos.vestibular.caries = '0';
			break;
			case "dos-vestibular-ausentes": putPoint(infoDientes.dos.vestibular.ausentes, dientes);infoDientes.dos.vestibular.ausentes = '0';
			break;
			case "dos-vestibular-restos": putPoint(infoDientes.dos.vestibular.restos, dientes);infoDientes.dos.vestibular.restos = '0';
			break;
			case "dos-vestibular-protesis_fija": putPoint(infoDientes.dos.vestibular.protesis_fija, dientes);infoDientes.dos.vestibular.protesis_fija = '0';
			break;
			case "dos-vestibular-protesis_movil": putPoint(infoDientes.dos.vestibular.protesis_movil, dientes);infoDientes.dos.vestibular.protesis_movil = '0';
			break;
			case "dos-vestibular-obturacion": putPoint(infoDientes.dos.vestibular.obturacion, dientes);infoDientes.dos.vestibular.obturacion = '0';
			break;
			// ************************************************
			case "dos-oclusal-caries": putPoint(infoDientes.dos.oclusal.caries, dientes);infoDientes.dos.oclusal.caries = '0';
			break;
			case "dos-oclusal-ausentes": putPoint(infoDientes.dos.oclusal.ausentes, dientes);infoDientes.dos.oclusal.ausentes = '0';
			break;
			case "dos-oclusal-restos": putPoint(infoDientes.dos.oclusal.restos, dientes);infoDientes.dos.oclusal.restos = '0';
			break;
			case "dos-oclusal-protesis_fija": putPoint(infoDientes.dos.oclusal.protesis_fija, dientes);infoDientes.dos.oclusal.protesis_fija = '0';
			break;
			case "dos-oclusal-protesis_movil": putPoint(infoDientes.dos.oclusal.protesis_movil, dientes);infoDientes.dos.oclusal.protesis_movil = '0';
			break;
			case "dos-oclusal-obturacion": putPoint(infoDientes.dos.oclusal.obturacion, dientes);infoDientes.dos.oclusal.obturacion = '0';
			break;
		}
		switch(last){
			case "tres-mesial-caries": putPoint(infoDientes.tres.mesial.caries, colmillos);infoDientes.tres.mesial.caries = '0';
			break;
			case "tres-mesial-ausentes": putPoint(infoDientes.tres.mesial.ausentes, colmillos);infoDientes.tres.mesial.ausentes = '0';
			break;
			case "tres-mesial-restos": putPoint(infoDientes.tres.mesial.restos, colmillos);infoDientes.tres.mesial.restos = '0';
			break;
			case "tres-mesial-protesis_fija": putPoint(infoDientes.tres.mesial.protesis_fija, colmillos);infoDientes.tres.mesial.protesis_fija = '0';
			break;
			case "tres-mesial-protesis_movil": putPoint(infoDientes.tres.mesial.protesis_movil, colmillos);infoDientes.tres.mesial.protesis_movil = '0';
			break;
			case "tres-mesial-obturacion": putPoint(infoDientes.tres.mesial.obturacion, colmillos);infoDientes.tres.mesial.obturacion = '0';
			break;
			// ************************************************
			case "tres-distal-caries": putPoint(infoDientes.tres.distal.caries, colmillos);infoDientes.tres.distal.caries = '0';
			break;
			case "tres-distal-ausentes": putPoint(infoDientes.tres.distal.ausentes, colmillos);infoDientes.tres.distal.ausentes = '0';
			break;
			case "tres-distal-restos": putPoint(infoDientes.tres.distal.restos, colmillos);infoDientes.tres.distal.restos = '0';
			break;
			case "tres-distal-protesis_fija": putPoint(infoDientes.tres.distal.protesis_fija, colmillos);infoDientes.tres.distal.protesis_fija = '0';
			break;
			case "tres-distal-protesis_movil": putPoint(infoDientes.tres.distal.protesis_movil, colmillos);infoDientes.tres.distal.protesis_movil = '0';
			break;
			case "tres-distal-obturacion": putPoint(infoDientes.tres.distal.obturacion, colmillos);infoDientes.tres.distal.obturacion = '0';
			break;
			// ************************************************
			case "tres-lengual-caries": putPoint(infoDientes.tres.lengual.caries, colmillos);infoDientes.tres.lengual.caries = '0';
			break;
			case "tres-lengual-ausentes": putPoint(infoDientes.tres.lengual.ausentes, colmillos);infoDientes.tres.lengual.ausentes = '0';
			break;
			case "tres-lengual-restos": putPoint(infoDientes.tres.lengual.restos, colmillos);infoDientes.tres.lengual.restos = '0';
			break;
			case "tres-lengual-protesis_fija": putPoint(infoDientes.tres.lengual.protesis_fija, colmillos);infoDientes.tres.lengual.protesis_fija = '0';
			break;
			case "tres-lengual-protesis_movil": putPoint(infoDientes.tres.lengual.protesis_movil, colmillos);infoDientes.tres.lengual.protesis_movil = '0';
			break;
			case "tres-lengual-obturacion": putPoint(infoDientes.tres.lengual.obturacion, colmillos);infoDientes.tres.lengual.obturacion = '0';
			break;
			// ************************************************
			case "tres-vestibular-caries": putPoint(infoDientes.tres.vestibular.caries, colmillos);infoDientes.tres.vestibular.caries = '0';
			break;
			case "tres-vestibular-ausentes": putPoint(infoDientes.tres.vestibular.ausentes, colmillos);infoDientes.tres.vestibular.ausentes = '0';
			break;
			case "tres-vestibular-restos": putPoint(infoDientes.tres.vestibular.restos, colmillos);infoDientes.tres.vestibular.restos = '0';
			break;
			case "tres-vestibular-protesis_fija": putPoint(infoDientes.tres.vestibular.protesis_fija, colmillos);infoDientes.tres.vestibular.protesis_fija = '0';
			break;
			case "tres-vestibular-protesis_movil": putPoint(infoDientes.tres.vestibular.protesis_movil, colmillos);infoDientes.tres.vestibular.protesis_movil = '0';
			break;
			case "tres-vestibular-obturacion": putPoint(infoDientes.tres.vestibular.obturacion, colmillos);infoDientes.tres.vestibular.obturacion = '0';
			break;
			// ************************************************
			case "tres-oclusal-caries": putPoint(infoDientes.tres.oclusal.caries, colmillos);infoDientes.tres.oclusal.caries = '0';
			break;
			case "tres-oclusal-ausentes": putPoint(infoDientes.tres.oclusal.ausentes, colmillos);infoDientes.tres.oclusal.ausentes = '0';
			break;
			case "tres-oclusal-restos": putPoint(infoDientes.tres.oclusal.restos, colmillos);infoDientes.tres.oclusal.restos = '0';
			break;
			case "tres-oclusal-protesis_fija": putPoint(infoDientes.tres.oclusal.protesis_fija, colmillos);infoDientes.tres.oclusal.protesis_fija = '0';
			break;
			case "tres-oclusal-protesis_movil": putPoint(infoDientes.tres.oclusal.protesis_movil, colmillos);infoDientes.tres.oclusal.protesis_movil = '0';
			break;
			case "tres-oclusal-obturacion": putPoint(infoDientes.tres.oclusal.obturacion, colmillos);infoDientes.tres.oclusal.obturacion = '0';
			break;
		}
		switch(last){
			case "cuatro-mesial-caries": putPoint(infoDientes.cuatro.mesial.caries, muelas);infoDientes.cuatro.mesial.caries = '0';
			break;
			case "cuatro-mesial-ausentes": putPoint(infoDientes.cuatro.mesial.ausentes, muelas);infoDientes.cuatro.mesial.ausentes = '0';
			break;
			case "cuatro-mesial-restos": putPoint(infoDientes.cuatro.mesial.restos, muelas);infoDientes.cuatro.mesial.restos = '0';
			break;
			case "cuatro-mesial-protesis_fija": putPoint(infoDientes.cuatro.mesial.protesis_fija, muelas);infoDientes.cuatro.mesial.protesis_fija = '0';
			break;
			case "cuatro-mesial-protesis_movil": putPoint(infoDientes.cuatro.mesial.protesis_movil, muelas);infoDientes.cuatro.mesial.protesis_movil = '0';
			break;
			case "cuatro-mesial-obturacion": putPoint(infoDientes.cuatro.mesial.obturacion, muelas);infoDientes.cuatro.mesial.obturacion = '0';
			break;
			// ************************************************
			case "cuatro-distal-caries": putPoint(infoDientes.cuatro.distal.caries, muelas);infoDientes.cuatro.distal.caries = '0';
			break;
			case "cuatro-distal-ausentes": putPoint(infoDientes.cuatro.distal.ausentes, muelas);infoDientes.cuatro.distal.ausentes = '0';
			break;
			case "cuatro-distal-restos": putPoint(infoDientes.cuatro.distal.restos, muelas);infoDientes.cuatro.distal.restos = '0';
			break;
			case "cuatro-distal-protesis_fija": putPoint(infoDientes.cuatro.distal.protesis_fija, muelas);infoDientes.cuatro.distal.protesis_fija = '0';
			break;
			case "cuatro-distal-protesis_movil": putPoint(infoDientes.cuatro.distal.protesis_movil, muelas);infoDientes.cuatro.distal.protesis_movil = '0';
			break;
			case "cuatro-distal-obturacion": putPoint(infoDientes.cuatro.distal.obturacion, muelas);infoDientes.cuatro.distal.obturacion = '0';
			break;
			// ************************************************
			case "cuatro-lengual-caries": putPoint(infoDientes.cuatro.lengual.caries, muelas);infoDientes.cuatro.lengual.caries = '0';
			break;
			case "cuatro-lengual-ausentes": putPoint(infoDientes.cuatro.lengual.ausentes, muelas);infoDientes.cuatro.lengual.ausentes = '0';
			break;
			case "cuatro-lengual-restos": putPoint(infoDientes.cuatro.lengual.restos, muelas);infoDientes.cuatro.lengual.restos = '0';
			break;
			case "cuatro-lengual-protesis_fija": putPoint(infoDientes.cuatro.lengual.protesis_fija, muelas);infoDientes.cuatro.lengual.protesis_fija = '0';
			break;
			case "cuatro-lengual-protesis_movil": putPoint(infoDientes.cuatro.lengual.protesis_movil, muelas);infoDientes.cuatro.lengual.protesis_movil = '0';
			break;
			case "cuatro-lengual-obturacion": putPoint(infoDientes.cuatro.lengual.obturacion, muelas);infoDientes.cuatro.lengual.obturacion = '0';
			break;
			// ************************************************
			case "cuatro-vestibular-caries": putPoint(infoDientes.cuatro.vestibular.caries, muelas);infoDientes.cuatro.vestibular.caries = '0';
			break;
			case "cuatro-vestibular-ausentes": putPoint(infoDientes.cuatro.vestibular.ausentes, muelas);infoDientes.cuatro.vestibular.ausentes = '0';
			break;
			case "cuatro-vestibular-restos": putPoint(infoDientes.cuatro.vestibular.restos, muelas);infoDientes.cuatro.vestibular.restos = '0';
			break;
			case "cuatro-vestibular-protesis_fija": putPoint(infoDientes.cuatro.vestibular.protesis_fija, muelas);infoDientes.cuatro.vestibular.protesis_fija = '0';
			break;
			case "cuatro-vestibular-protesis_movil": putPoint(infoDientes.cuatro.vestibular.protesis_movil, muelas);infoDientes.cuatro.vestibular.protesis_movil = '0';
			break;
			case "cuatro-vestibular-obturacion": putPoint(infoDientes.cuatro.vestibular.obturacion, muelas);infoDientes.cuatro.vestibular.obturacion = '0';
			break;
			// ************************************************
			case "cuatro-oclusal-caries": putPoint(infoDientes.cuatro.oclusal.caries, muelas);infoDientes.cuatro.oclusal.caries = '0';
			break;
			case "cuatro-oclusal-ausentes": putPoint(infoDientes.cuatro.oclusal.ausentes, muelas);infoDientes.cuatro.oclusal.ausentes = '0';
			break;
			case "cuatro-oclusal-restos": putPoint(infoDientes.cuatro.oclusal.restos, muelas);infoDientes.cuatro.oclusal.restos = '0';
			break;
			case "cuatro-oclusal-protesis_fija": putPoint(infoDientes.cuatro.oclusal.protesis_fija, muelas);infoDientes.cuatro.oclusal.protesis_fija = '0';
			break;
			case "cuatro-oclusal-protesis_movil": putPoint(infoDientes.cuatro.oclusal.protesis_movil, muelas);infoDientes.cuatro.oclusal.protesis_movil = '0';
			break;
			case "cuatro-oclusal-obturacion": putPoint(infoDientes.cuatro.oclusal.obturacion, muelas);infoDientes.cuatro.oclusal.obturacion = '0';
			break;
		}
		switch(last){
			case "cinco-mesial-caries": putPoint(infoDientes.cinco.mesial.caries, muelas);infoDientes.cinco.mesial.caries = '0';
			break;
			case "cinco-mesial-ausentes": putPoint(infoDientes.cinco.mesial.ausentes, muelas);infoDientes.cinco.mesial.ausentes = '0';
			break;
			case "cinco-mesial-restos": putPoint(infoDientes.cinco.mesial.restos, muelas);infoDientes.cinco.mesial.restos = '0';
			break;
			case "cinco-mesial-protesis_fija": putPoint(infoDientes.cinco.mesial.protesis_fija, muelas);infoDientes.cinco.mesial.protesis_fija = '0';
			break;
			case "cinco-mesial-protesis_movil": putPoint(infoDientes.cinco.mesial.protesis_movil, muelas);infoDientes.cinco.mesial.protesis_movil = '0';
			break;
			case "cinco-mesial-obturacion": putPoint(infoDientes.cinco.mesial.obturacion, muelas);infoDientes.cinco.mesial.obturacion = '0';
			break;
			// ************************************************
			case "cinco-distal-caries": putPoint(infoDientes.cinco.distal.caries, muelas);infoDientes.cinco.distal.caries = '0';
			break;
			case "cinco-distal-ausentes": putPoint(infoDientes.cinco.distal.ausentes, muelas);infoDientes.cinco.distal.ausentes = '0';
			break;
			case "cinco-distal-restos": putPoint(infoDientes.cinco.distal.restos, muelas);infoDientes.cinco.distal.restos = '0';
			break;
			case "cinco-distal-protesis_fija": putPoint(infoDientes.cinco.distal.protesis_fija, muelas);infoDientes.cinco.distal.protesis_fija = '0';
			break;
			case "cinco-distal-protesis_movil": putPoint(infoDientes.cinco.distal.protesis_movil, muelas);infoDientes.cinco.distal.protesis_movil = '0';
			break;
			case "cinco-distal-obturacion": putPoint(infoDientes.cinco.distal.obturacion, muelas);infoDientes.cinco.distal.obturacion = '0';
			break;
			// ************************************************
			case "cinco-lengual-caries": putPoint(infoDientes.cinco.lengual.caries, muelas);infoDientes.cinco.lengual.caries = '0';
			break;
			case "cinco-lengual-ausentes": putPoint(infoDientes.cinco.lengual.ausentes, muelas);infoDientes.cinco.lengual.ausentes = '0';
			break;
			case "cinco-lengual-restos": putPoint(infoDientes.cinco.lengual.restos, muelas);infoDientes.cinco.lengual.restos = '0';
			break;
			case "cinco-lengual-protesis_fija": putPoint(infoDientes.cinco.lengual.protesis_fija, muelas);infoDientes.cinco.lengual.protesis_fija = '0';
			break;
			case "cinco-lengual-protesis_movil": putPoint(infoDientes.cinco.lengual.protesis_movil, muelas);infoDientes.cinco.lengual.protesis_movil = '0';
			break;
			case "cinco-lengual-obturacion": putPoint(infoDientes.cinco.lengual.obturacion, muelas);infoDientes.cinco.lengual.obturacion = '0';
			break;
			// ************************************************
			case "cinco-vestibular-caries": putPoint(infoDientes.cinco.vestibular.caries, muelas);infoDientes.cinco.vestibular.caries = '0';
			break;
			case "cinco-vestibular-ausentes": putPoint(infoDientes.cinco.vestibular.ausentes, muelas);infoDientes.cinco.vestibular.ausentes = '0';
			break;
			case "cinco-vestibular-restos": putPoint(infoDientes.cinco.vestibular.restos, muelas);infoDientes.cinco.vestibular.restos = '0';
			break;
			case "cinco-vestibular-protesis_fija": putPoint(infoDientes.cinco.vestibular.protesis_fija, muelas);infoDientes.cinco.vestibular.protesis_fija = '0';
			break;
			case "cinco-vestibular-protesis_movil": putPoint(infoDientes.cinco.vestibular.protesis_movil, muelas);infoDientes.cinco.vestibular.protesis_movil = '0';
			break;
			case "cinco-vestibular-obturacion": putPoint(infoDientes.cinco.vestibular.obturacion, muelas);infoDientes.cinco.vestibular.obturacion = '0';
			break;
			// ************************************************
			case "cinco-oclusal-caries": putPoint(infoDientes.cinco.oclusal.caries, muelas);infoDientes.cinco.oclusal.caries = '0';
			break;
			case "cinco-oclusal-ausentes": putPoint(infoDientes.cinco.oclusal.ausentes, muelas);infoDientes.cinco.oclusal.ausentes = '0';
			break;
			case "cinco-oclusal-restos": putPoint(infoDientes.cinco.oclusal.restos, muelas);infoDientes.cinco.oclusal.restos = '0';
			break;
			case "cinco-oclusal-protesis_fija": putPoint(infoDientes.cinco.oclusal.protesis_fija, muelas);infoDientes.cinco.oclusal.protesis_fija = '0';
			break;
			case "cinco-oclusal-protesis_movil": putPoint(infoDientes.cinco.oclusal.protesis_movil, muelas);infoDientes.cinco.oclusal.protesis_movil = '0';
			break;
			case "cinco-oclusal-obturacion": putPoint(infoDientes.cinco.oclusal.obturacion, muelas);infoDientes.cinco.oclusal.obturacion = '0';
			break;
		}
		switch(last){
			case "seis-mesial-caries": putPoint(infoDientes.seis.mesial.caries, muelas);infoDientes.seis.mesial.caries = '0';
			break;
			case "seis-mesial-ausentes": putPoint(infoDientes.seis.mesial.ausentes, muelas);infoDientes.seis.mesial.ausentes = '0';
			break;
			case "seis-mesial-restos": putPoint(infoDientes.seis.mesial.restos, muelas);infoDientes.seis.mesial.restos = '0';
			break;
			case "seis-mesial-protesis_fija": putPoint(infoDientes.seis.mesial.protesis_fija, muelas);infoDientes.seis.mesial.protesis_fija = '0';
			break;
			case "seis-mesial-protesis_movil": putPoint(infoDientes.seis.mesial.protesis_movil, muelas);infoDientes.seis.mesial.protesis_movil = '0';
			break;
			case "seis-mesial-obturacion": putPoint(infoDientes.seis.mesial.obturacion, muelas);infoDientes.seis.mesial.obturacion = '0';
			break;
			// ************************************************
			case "seis-distal-caries": putPoint(infoDientes.seis.distal.caries, muelas);infoDientes.seis.distal.caries = '0';
			break;
			case "seis-distal-ausentes": putPoint(infoDientes.seis.distal.ausentes, muelas);infoDientes.seis.distal.ausentes = '0';
			break;
			case "seis-distal-restos": putPoint(infoDientes.seis.distal.restos, muelas);infoDientes.seis.distal.restos = '0';
			break;
			case "seis-distal-protesis_fija": putPoint(infoDientes.seis.distal.protesis_fija, muelas);infoDientes.seis.distal.protesis_fija = '0';
			break;
			case "seis-distal-protesis_movil": putPoint(infoDientes.seis.distal.protesis_movil, muelas);infoDientes.seis.distal.protesis_movil = '0';
			break;
			case "seis-distal-obturacion": putPoint(infoDientes.seis.distal.obturacion, muelas);infoDientes.seis.distal.obturacion = '0';
			break;
			// ************************************************
			case "seis-lengual-caries": putPoint(infoDientes.seis.lengual.caries, muelas);infoDientes.seis.lengual.caries = '0';
			break;
			case "seis-lengual-ausentes": putPoint(infoDientes.seis.lengual.ausentes, muelas);infoDientes.seis.lengual.ausentes = '0';
			break;
			case "seis-lengual-restos": putPoint(infoDientes.seis.lengual.restos, muelas);infoDientes.seis.lengual.restos = '0';
			break;
			case "seis-lengual-protesis_fija": putPoint(infoDientes.seis.lengual.protesis_fija, muelas);infoDientes.seis.lengual.protesis_fija = '0';
			break;
			case "seis-lengual-protesis_movil": putPoint(infoDientes.seis.lengual.protesis_movil, muelas);infoDientes.seis.lengual.protesis_movil = '0';
			break;
			case "seis-lengual-obturacion": putPoint(infoDientes.seis.lengual.obturacion, muelas);infoDientes.seis.lengual.obturacion = '0';
			break;
			// ************************************************
			case "seis-vestibular-caries": putPoint(infoDientes.seis.vestibular.caries, muelas);infoDientes.seis.vestibular.caries = '0';
			break;
			case "seis-vestibular-ausentes": putPoint(infoDientes.seis.vestibular.ausentes, muelas);infoDientes.seis.vestibular.ausentes = '0';
			break;
			case "seis-vestibular-restos": putPoint(infoDientes.seis.vestibular.restos, muelas);infoDientes.seis.vestibular.restos = '0';
			break;
			case "seis-vestibular-protesis_fija": putPoint(infoDientes.seis.vestibular.protesis_fija, muelas);infoDientes.seis.vestibular.protesis_fija = '0';
			break;
			case "seis-vestibular-protesis_movil": putPoint(infoDientes.seis.vestibular.protesis_movil, muelas);infoDientes.seis.vestibular.protesis_movil = '0';
			break;
			case "seis-vestibular-obturacion": putPoint(infoDientes.seis.vestibular.obturacion, muelas);infoDientes.seis.vestibular.obturacion = '0';
			break;
			// ************************************************
			case "seis-oclusal-caries": putPoint(infoDientes.seis.oclusal.caries, muelas);infoDientes.seis.oclusal.caries = '0';
			break;
			case "seis-oclusal-ausentes": putPoint(infoDientes.seis.oclusal.ausentes, muelas);infoDientes.seis.oclusal.ausentes = '0';
			break;
			case "seis-oclusal-restos": putPoint(infoDientes.seis.oclusal.restos, muelas);infoDientes.seis.oclusal.restos = '0';
			break;
			case "seis-oclusal-protesis_fija": putPoint(infoDientes.seis.oclusal.protesis_fija, muelas);infoDientes.seis.oclusal.protesis_fija = '0';
			break;
			case "seis-oclusal-protesis_movil": putPoint(infoDientes.seis.oclusal.protesis_movil, muelas);infoDientes.seis.oclusal.protesis_movil = '0';
			break;
			case "seis-oclusal-obturacion": putPoint(infoDientes.seis.oclusal.obturacion, muelas);infoDientes.seis.oclusal.obturacion = '0';
			break;
		}
		switch(last){
			case "siete-mesial-caries": putPoint(infoDientes.siete.mesial.caries, muelas);infoDientes.siete.mesial.caries = '0';
			break;
			case "siete-mesial-ausentes": putPoint(infoDientes.siete.mesial.ausentes, muelas);infoDientes.siete.mesial.ausentes = '0';
			break;
			case "siete-mesial-restos": putPoint(infoDientes.siete.mesial.restos, muelas);infoDientes.siete.mesial.restos = '0';
			break;
			case "siete-mesial-protesis_fija": putPoint(infoDientes.siete.mesial.protesis_fija, muelas);infoDientes.siete.mesial.protesis_fija = '0';
			break;
			case "siete-mesial-protesis_movil": putPoint(infoDientes.siete.mesial.protesis_movil, muelas);infoDientes.siete.mesial.protesis_movil = '0';
			break;
			case "siete-mesial-obturacion": putPoint(infoDientes.siete.mesial.obturacion, muelas);infoDientes.siete.mesial.obturacion = '0';
			break;
			// ************************************************
			case "siete-distal-caries": putPoint(infoDientes.siete.distal.caries, muelas);infoDientes.siete.distal.caries = '0';
			break;
			case "siete-distal-ausentes": putPoint(infoDientes.siete.distal.ausentes, muelas);infoDientes.siete.distal.ausentes = '0';
			break;
			case "siete-distal-restos": putPoint(infoDientes.siete.distal.restos, muelas);infoDientes.siete.distal.restos = '0';
			break;
			case "siete-distal-protesis_fija": putPoint(infoDientes.siete.distal.protesis_fija, muelas);infoDientes.siete.distal.protesis_fija = '0';
			break;
			case "siete-distal-protesis_movil": putPoint(infoDientes.siete.distal.protesis_movil, muelas);infoDientes.siete.distal.protesis_movil = '0';
			break;
			case "siete-distal-obturacion": putPoint(infoDientes.siete.distal.obturacion, muelas);infoDientes.siete.distal.obturacion = '0';
			break;
			// ************************************************
			case "siete-lengual-caries": putPoint(infoDientes.siete.lengual.caries, muelas);infoDientes.siete.lengual.caries = '0';
			break;
			case "siete-lengual-ausentes": putPoint(infoDientes.siete.lengual.ausentes, muelas);infoDientes.siete.lengual.ausentes = '0';
			break;
			case "siete-lengual-restos": putPoint(infoDientes.siete.lengual.restos, muelas);infoDientes.siete.lengual.restos = '0';
			break;
			case "siete-lengual-protesis_fija": putPoint(infoDientes.siete.lengual.protesis_fija, muelas);infoDientes.siete.lengual.protesis_fija = '0';
			break;
			case "siete-lengual-protesis_movil": putPoint(infoDientes.siete.lengual.protesis_movil, muelas);infoDientes.siete.lengual.protesis_movil = '0';
			break;
			case "siete-lengual-obturacion": putPoint(infoDientes.siete.lengual.obturacion, muelas);infoDientes.siete.lengual.obturacion = '0';
			break;
			// ************************************************
			case "siete-vestibular-caries": putPoint(infoDientes.siete.vestibular.caries, muelas);infoDientes.siete.vestibular.caries = '0';
			break;
			case "siete-vestibular-ausentes": putPoint(infoDientes.siete.vestibular.ausentes, muelas);infoDientes.siete.vestibular.ausentes = '0';
			break;
			case "siete-vestibular-restos": putPoint(infoDientes.siete.vestibular.restos, muelas);infoDientes.siete.vestibular.restos = '0';
			break;
			case "siete-vestibular-protesis_fija": putPoint(infoDientes.siete.vestibular.protesis_fija, muelas);infoDientes.siete.vestibular.protesis_fija = '0';
			break;
			case "siete-vestibular-protesis_movil": putPoint(infoDientes.siete.vestibular.protesis_movil, muelas);infoDientes.siete.vestibular.protesis_movil = '0';
			break;
			case "siete-vestibular-obturacion": putPoint(infoDientes.siete.vestibular.obturacion, muelas);infoDientes.siete.vestibular.obturacion = '0';
			break;
			// ************************************************
			case "siete-oclusal-caries": putPoint(infoDientes.siete.oclusal.caries, muelas);infoDientes.siete.oclusal.caries = '0';
			break;
			case "siete-oclusal-ausentes": putPoint(infoDientes.siete.oclusal.ausentes, muelas);infoDientes.siete.oclusal.ausentes = '0';
			break;
			case "siete-oclusal-restos": putPoint(infoDientes.siete.oclusal.restos, muelas);infoDientes.siete.oclusal.restos = '0';
			break;
			case "siete-oclusal-protesis_fija": putPoint(infoDientes.siete.oclusal.protesis_fija, muelas);infoDientes.siete.oclusal.protesis_fija = '0';
			break;
			case "siete-oclusal-protesis_movil": putPoint(infoDientes.siete.oclusal.protesis_movil, muelas);infoDientes.siete.oclusal.protesis_movil = '0';
			break;
			case "siete-oclusal-obturacion": putPoint(infoDientes.siete.oclusal.obturacion, muelas);infoDientes.siete.oclusal.obturacion = '0';
			break;
		}
		switch(last){
			case "ocho-mesial-caries": putPoint(infoDientes.ocho.mesial.caries, muelas);infoDientes.ocho.mesial.caries = '0';
			break;
			case "ocho-mesial-ausentes": putPoint(infoDientes.ocho.mesial.ausentes, muelas);infoDientes.ocho.mesial.ausentes = '0';
			break;
			case "ocho-mesial-restos": putPoint(infoDientes.ocho.mesial.restos, muelas);infoDientes.ocho.mesial.restos = '0';
			break;
			case "ocho-mesial-protesis_fija": putPoint(infoDientes.ocho.mesial.protesis_fija, muelas);infoDientes.ocho.mesial.protesis_fija = '0';
			break;
			case "ocho-mesial-protesis_movil": putPoint(infoDientes.ocho.mesial.protesis_movil, muelas);infoDientes.ocho.mesial.protesis_movil = '0';
			break;
			case "ocho-mesial-obturacion": putPoint(infoDientes.ocho.mesial.obturacion, muelas);infoDientes.ocho.mesial.obturacion = '0';
			break;
			// ************************************************
			case "ocho-distal-caries": putPoint(infoDientes.ocho.distal.caries, muelas);infoDientes.ocho.distal.caries = '0';
			break;
			case "ocho-distal-ausentes": putPoint(infoDientes.ocho.distal.ausentes, muelas);infoDientes.ocho.distal.ausentes = '0';
			break;
			case "ocho-distal-restos": putPoint(infoDientes.ocho.distal.restos, muelas);infoDientes.ocho.distal.restos = '0';
			break;
			case "ocho-distal-protesis_fija": putPoint(infoDientes.ocho.distal.protesis_fija, muelas);infoDientes.ocho.distal.protesis_fija = '0';
			break;
			case "ocho-distal-protesis_movil": putPoint(infoDientes.ocho.distal.protesis_movil, muelas);infoDientes.ocho.distal.protesis_movil = '0';
			break;
			case "ocho-distal-obturacion": putPoint(infoDientes.ocho.distal.obturacion, muelas);infoDientes.ocho.distal.obturacion = '0';
			break;
			// ************************************************
			case "ocho-lengual-caries": putPoint(infoDientes.ocho.lengual.caries, muelas);infoDientes.ocho.lengual.caries = '0';
			break;
			case "ocho-lengual-ausentes": putPoint(infoDientes.ocho.lengual.ausentes, muelas);infoDientes.ocho.lengual.ausentes = '0';
			break;
			case "ocho-lengual-restos": putPoint(infoDientes.ocho.lengual.restos, muelas);infoDientes.ocho.lengual.restos = '0';
			break;
			case "ocho-lengual-protesis_fija": putPoint(infoDientes.ocho.lengual.protesis_fija, muelas);infoDientes.ocho.lengual.protesis_fija = '0';
			break;
			case "ocho-lengual-protesis_movil": putPoint(infoDientes.ocho.lengual.protesis_movil, muelas);infoDientes.ocho.lengual.protesis_movil = '0';
			break;
			case "ocho-lengual-obturacion": putPoint(infoDientes.ocho.lengual.obturacion, muelas);infoDientes.ocho.lengual.obturacion = '0';
			break;
			// ************************************************
			case "ocho-vestibular-caries": putPoint(infoDientes.ocho.vestibular.caries, muelas);infoDientes.ocho.vestibular.caries = '0';
			break;
			case "ocho-vestibular-ausentes": putPoint(infoDientes.ocho.vestibular.ausentes, muelas);infoDientes.ocho.vestibular.ausentes = '0';
			break;
			case "ocho-vestibular-restos": putPoint(infoDientes.ocho.vestibular.restos, muelas);infoDientes.ocho.vestibular.restos = '0';
			break;
			case "ocho-vestibular-protesis_fija": putPoint(infoDientes.ocho.vestibular.protesis_fija, muelas);infoDientes.ocho.vestibular.protesis_fija = '0';
			break;
			case "ocho-vestibular-protesis_movil": putPoint(infoDientes.ocho.vestibular.protesis_movil, muelas);infoDientes.ocho.vestibular.protesis_movil = '0';
			break;
			case "ocho-vestibular-obturacion": putPoint(infoDientes.ocho.vestibular.obturacion, muelas);infoDientes.ocho.vestibular.obturacion = '0';
			break;
			// ************************************************
			case "ocho-oclusal-caries": putPoint(infoDientes.ocho.oclusal.caries, muelas);infoDientes.ocho.oclusal.caries = '0';
			break;
			case "ocho-oclusal-ausentes": putPoint(infoDientes.ocho.oclusal.ausentes, muelas);infoDientes.ocho.oclusal.ausentes = '0';
			break;
			case "ocho-oclusal-restos": putPoint(infoDientes.ocho.oclusal.restos, muelas);infoDientes.ocho.oclusal.restos = '0';
			break;
			case "ocho-oclusal-protesis_fija": putPoint(infoDientes.ocho.oclusal.protesis_fija, muelas);infoDientes.ocho.oclusal.protesis_fija = '0';
			break;
			case "ocho-oclusal-protesis_movil": putPoint(infoDientes.ocho.oclusal.protesis_movil, muelas);infoDientes.ocho.oclusal.protesis_movil = '0';
			break;
			case "ocho-oclusal-obturacion": putPoint(infoDientes.ocho.oclusal.obturacion, muelas);infoDientes.ocho.oclusal.obturacion = '0';
			break;
		}
		//alert(JSON.stringify(infoDientes.uno.mesial))
		//load();
		//dientes.clear();
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
		infoDientes.idPaciente = datos._id;
		infoDientes.posicion = localStorage.getItem("zona");
		$http.post(urlServidor+"info/nuevaInformacion", infoDientes).success(function(respuesta) {
			if(respuesta.status){
				isSave = true;
				$("#msj").html($scope.zona_revision+" - Información guardada. <i class='fa fa-check-circle'>");
			}
		})
	}
});