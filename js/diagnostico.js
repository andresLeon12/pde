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
		rect.addEventListener("click", function(event) { 
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Caries',
					bg: 'red',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 1;
   						target.graphics.clear().beginFill("red").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
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
				{
					text: 'Prótesis fija',
					bg: 'green',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 1;
   						target.graphics.clear().beginFill("green").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Prótesis movil',
					bg: 'orange',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 1;
   						target.graphics.clear().beginFill("orange").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Obturación',
					bg: 'blue',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 1;
   						target.graphics.clear().beginFill("blue").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
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
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Caries',
					bg: 'red',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 2;
   						target.graphics.clear().beginFill("red").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
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
				{
					text: 'Restos',
					bg: 'brown',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 2;
   						target.graphics.clear().beginFill("brown").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Prótesis fija',
					bg: 'green',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 2;
   						target.graphics.clear().beginFill("green").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Prótesis movil',
					bg: 'orange',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 2;
   						target.graphics.clear().beginFill("orange").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Obturación',
					bg: 'blue',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 2;
   						target.graphics.clear().beginFill("blue").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
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
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Caries',
					bg: 'red',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 3;
   						target.graphics.clear().beginFill("red").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
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
				{
					text: 'Prótesis fija',
					bg: 'green',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 3;
   						target.graphics.clear().beginFill("green").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Prótesis movil',
					bg: 'orange',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 3;
   						target.graphics.clear().beginFill("orange").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Obturación',
					bg: 'blue',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 3;
   						target.graphics.clear().beginFill("blue").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
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
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Caries',
					bg: 'red',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 4;
   						target.graphics.clear().beginFill("red").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
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
				{
					text: 'Prótesis fija',
					bg: 'green',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 4;
   						target.graphics.clear().beginFill("green").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Prótesis movil',
					bg: 'orange',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 4;
   						target.graphics.clear().beginFill("orange").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Obturación',
					bg: 'blue',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 4;
   						target.graphics.clear().beginFill("blue").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
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
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Caries',
					bg: 'red',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 5;
   						target.graphics.clear().beginFill("red").drawCircle(0, 0, 33).endFill();
   						muelas.update();
					}
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
				{
					text: 'Prótesis fija',
					bg: 'green',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 5;
   						target.graphics.clear().beginFill("green").drawCircle(0, 0, 33).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Prótesis movil',
					bg: 'orange',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 5;
   						target.graphics.clear().beginFill("orange").drawCircle(0, 0, 33).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Obturación',
					bg: 'blue',
					color: 'white',
					onClick: function () {
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 5;
   						target.graphics.clear().beginFill("blue").drawCircle(0, 0, 33).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
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
		createjs.Touch.enable(muelas)
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
		infoDientes.idPaciente = datos._id;
		infoDientes.posicion = localStorage.getItem("zona");
		var canvas = document.getElementById("muelas");
		infoDientes.urlFile = canvas.toDataURL();
		var isOnline = $("#isOnline").val();
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
			var sesiones_guardadas = (localStorage.getItem("sesiones_guardadas") == null) ? [] : localStorage.getItem("sesiones_guardadas");
			alert(sesiones_guardadas);
			sesiones_guardadas[sesiones_guardadas.length] = infoDientes;
			localStorage.setItem("sesiones_guardadas", sesiones_guardadas);
		}
		application.addNotification({
        		message: 'Información guardada',
		        button: {
		            text: 'Cerrar',
		            color: 'lightgreen'
		        }
    		});
	}
});