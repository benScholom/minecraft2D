//namespace to rule them all

var Minecraft = {};

var tool = "";

$("#shovel").on("click",shovel)
        function shovel(event){
			$("#pickaxe").css("border", "none");
			$("#axe").css("border","none");
            $("#shovel").css("border","3px solid rgb(129, 14, 5)");
			$("#shovel").css("border-radius ", "15px");
			tool = "shovel";
			console.log(tool);
        };
$("#pickaxe").on("click",pickaxe)
        function pickaxe(event){
			$("#shovel").css("border","none");
			$("#axe").css("border","none");
            $("#pickaxe").css("border","3px solid rgb(129, 14, 5)");
			$("#pickaxe").css("border-radius ", "15px");
			tool="pickaxe";
			console.log(tool);
        }
$("#axe").on("click",axe)
        function axe(event){
			$("#shovel").css("border","none");
			$("#pickaxe").css("border","none");
            $("#axe").css("border","3px solid rgb(129, 14, 5)");
			$("#axe").css("border-radius ", "15px");
			tool="axe";
			console.log(tool);
        }

Minecraft.storage = function (el){
	if(el=="dirt"){
		$("#storage").css("background-image","url('../images/dirt.png')");
	}else if(el=="grass"){
		$("#storage").css("background-image","url('../images/grass.png')");
	}else if(el=="rock"){
		$("#storage").css("background-image","url('../images/rock.png')");
	}else if(el=="leaf"){
		$("#storage").css("background-image","url('../images/leaf.png')");
	}else if(el=="tree"){
		$("#storage").css("background-image","url('../images/tree.png')");
	}else{
		$("#storage").css("background-image","");
	}
}

//create the board
Minecraft.createMatrix = function() {
	// create game rows to hold tiles
	Minecraft.grid = new Array (20);
	// create 20 tiles within each row
	for (var i = 0 ; i < Minecraft.grid.length; i++){
		Minecraft.grid[i] = new Array (20);
		//make sure tiles are populated with nothing
		for( var j = 0; j < Minecraft.grid[i].length; j++) {
			Minecraft.grid[i][j] = "";
		}
	}
	//append tiles
	for (var i = 0; i < Minecraft.grid.length; i++) {
		//create new rows to create stable 20 x 20 grid
		var row = $("<div>");
		$("#board").append(row);
		row.addClass("mrow");
		//create the tiles within each rows and add keys and classes for future reference
		for (var j = 0; j < Minecraft.grid[i].length; j++) {
			row.append(
				$('<div/>')
					.addClass("tile")
					.data('r', i)
					.data('c', j)
					.attr("id", 20*i+j)
					.on("click", Minecraft.selected));
		}
	}
}
//build the matrix
Minecraft.createMatrix();

//creating tile names - will be assigned as classes later
Minecraft.createDirt = function(r,c) {
	Minecraft.grid[r][c] = "dirt";
}

Minecraft.createGrass = function(r,c) {
	Minecraft.grid[r][c] = "grass";
}

Minecraft.createRock = function(r,c) {
	Minecraft.grid[r][c] = "rock";
}

Minecraft.createTree = function(r,c) {
	Minecraft.grid[r][c] = "tree";
}

Minecraft.createSky = function(r,c) {
	Minecraft.grid[r][c] = "sky";
}

Minecraft.createCloud = function(r,c) {
	Minecraft.grid[r][c] = "cloud";
}

Minecraft.createFence = function(r,c) {
	Minecraft.grid[r][c] = "fence";
}
//function for hill creation given a single point
Minecraft.createHill = function(r,c) {
	Minecraft.grid[r][c] = "rock";
	Minecraft.grid[r][c-1] = "rock";
	Minecraft.grid[r][c+1] = "rock";
	Minecraft.grid[r-1][c] = "rock";
	Minecraft.grid[r][c-2] = "grass";
	Minecraft.grid[r][c+2] = "grass";
	Minecraft.grid[r-1][c-1] = "grass";
	Minecraft.grid[r-1][c+1] = "grass";
	Minecraft.grid[r-2][c] = "grass";
}
//for a bush
Minecraft.createBush = function(r,c) {
	Minecraft.grid[r][c] = "leaf";
	Minecraft.grid[r][c-1] = "leaf";
	Minecraft.grid[r][c+1] = "leaf";
	Minecraft.grid[r-1][c] = "leaf";
}
//for a tree
Minecraft.createArbol = function(r,c) {
	Minecraft.grid[r][c] = "tree";
	Minecraft.grid[r-1][c] = "tree";
	Minecraft.grid[r-2][c] = "tree";
	Minecraft.grid[r-3][c] = "tree";
	Minecraft.grid[r-3][c-1] = "leaf";
	Minecraft.grid[r-3][c+1] = "leaf";
	Minecraft.grid[r-4][c] = "leaf";
	Minecraft.grid[r-4][c-1] = "leaf";
	Minecraft.grid[r-4][c+1] = "leaf";
	Minecraft.grid[r-5][c] = "leaf";
	Minecraft.grid[r-5][c-1] = "leaf";
	Minecraft.grid[r-5][c+1] = "leaf";
	Minecraft.grid[r-6][c] = "leaf";
	Minecraft.grid[r-6][c-1] = "leaf";
	Minecraft.grid[r-6][c+1] = "leaf";
}
//for a cloud
Minecraft.createCloud = function(r,c) {
	Minecraft.grid[r][c] = "cloud";
	Minecraft.grid[r][c+1] = "cloud";
	Minecraft.grid[r][c+2] = "cloud";
	Minecraft.grid[r][c+3] = "cloud";
	Minecraft.grid[r][c+4] = "cloud";
	Minecraft.grid[r][c+5] = "cloud";
	Minecraft.grid[r][c+6] = "cloud";
	Minecraft.grid[r][c+7] = "cloud";
	Minecraft.grid[r][c+8] = "cloud";
	Minecraft.grid[r-1][c+1] = "cloud";
	Minecraft.grid[r-1][c+2] = "cloud";
	Minecraft.grid[r-1][c+3] = "cloud";
	Minecraft.grid[r-1][c+4] = "cloud";
	Minecraft.grid[r-1][c+5] = "cloud";
	Minecraft.grid[r-2][c+4] = "cloud";
	Minecraft.grid[r+1][c+5] = "cloud";
	Minecraft.grid[r+1][c+6] = "cloud";
	Minecraft.grid[r-1][c+7] = "cloud";
	Minecraft.grid[r-1][c+8] = "cloud";
}

//adding images to the board
Minecraft.populateBoard = function() {
	//going over right part of grid
	 for (var i = 12; i < Minecraft.grid.length; i++) {
	 	for (var j = 6; j < Minecraft.grid[i].length; j++)
	 		if (i != 12) {
	 			//dirt below ground
	 		Minecraft.createDirt(i,j);	 
	 	} else {
	 		//grass on top
	 		Minecraft.createGrass(i,j);
	 	}
	 }
	 //goingover left partof grid
	 for (var i = 12; i < Minecraft.grid.length; i++) {
	 	for (var j = 0; j < 3; j++)
	 		if (i != 12) {
	 		Minecraft.createDirt(i,j);	 
	 	} else {
	 		Minecraft.createGrass(i,j);
	 	}
	 }
	 //vein of stone in ground between right and left part
	 for (var i = 12; i < Minecraft.grid.length; i++) {
	 	for (var j = 3; j < 6; j++) {
	 		Minecraft.createRock(i,j);
	 	}
	 }
	 //adding hill, tree, fence, and cloud
	Minecraft.createHill(11,4);
	Minecraft.createBush(11,10);
	Minecraft.createArbol(11,16);
	Minecraft.createFence(11,19);
	Minecraft.createFence(11,18);
	Minecraft.createFence(11,14);
	Minecraft.createFence(11,13);
	Minecraft.createCloud(4,4);

//creating sky where grid element is blank and unfilled
	for(var i = 0; i < Minecraft.grid.length; i++) {
		for(var j = 0; j < Minecraft.grid[i].length; j++) {
			if(Minecraft.grid[i][j] == "") {
				Minecraft.createSky(i,j);
			}
		}
	}
//ensuring that the grid elements link to classes with the right images
	 for (var i = 0; i < Minecraft.grid.length; i++){
	 	for (var j = 0; j < Minecraft.grid[i].length; j++){
		 $(".tile").eq(20*i+j).addClass(Minecraft.grid[i][j]);
	 	}
	 }
}
//runngin function
Minecraft.populateBoard();

//reset button with bring back to default
Minecraft.resetMatrix = function() {
	//remove all classes for all tiles
	$(".tile").removeClass("dirt")
			.removeClass("rock")
			.removeClass("leaf")
			.removeClass("grass")
			.removeClass("tree")
			.removeClass("sky")
			.removeClass("cloud")
			.removeClass("fence");
//set values in the grid array to blank
		for(var i = 0; i < Minecraft.grid.length; i++) {
			for(var j = 0; j < Minecraft.grid[i].length; j++) {
				Minecraft.grid[i][j] = "";
			}
		}
		//repopulate the board
	Minecraft.populateBoard();
};


Minecraft.selected = function(event) {
	var target = $(event.target);
	var r = target.data('r');
	var c = target.data("c");
	var box = Minecraft.grid[r][c];
	console.log(Minecraft.grid[r][c]);
	target.css("border", "1px solid white");
	if (tool == "shovel" && box == "dirt") {
		target.removeClass('dirt');
		Minecraft.grid[r][c] = "sky";
		target.addClass(Minecraft.grid[r][c]);
		Minecraft.storage("dirt");
	} else if (tool == "shovel" && box == "grass") {
		target.removeClass('grass');
		Minecraft.grid[r][c] =="sky";
		target.addClass(Minecraft.grid[r][c]);
		Minecraft.storage("grass");		
	} else if (tool == "pickaxe" && box == "rock") {
		target.removeClass('rock');
		Minecraft.grid[r][c] = "sky";
		target.addClass(Minecraft.grid[r][c]);
		Minecraft.storage("rock");
	} else if (tool == "axe" && box == "leaf") {
		target.removeClass('leaf');
		Minecraft.grid[r][c] = "sky";
		target.addClass(Minecraft.grid[r][c]);
		Minecraft.storage("leaf");
	} else if (tool == "axe" && box == "tree") {
		target.removeClass('tree');
		Minecraft.grid[r][c] = "sky";
		target.addClass(Minecraft.grid[r][c]);
		Minecraft.storage("tree");
	} else {
		target.css("border", "");
		target.css("border", "1px solid red");
	}
};