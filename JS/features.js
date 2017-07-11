var tool = "";

$("#shovel").addEventListener("click",shovel)
        function shovel(event){
			$("#pickaxe").style.border = "none";
			$("#axe").style.border = "none";
            $("#shovel").style.border = "3px solid rgb(129, 14, 5)";
			$("#shovel").style.borderRadius = "15px";
			tool = "shovel";
			console.log(tool);
        };
$("#pickaxe").addEventListener("click",pickaxe)
        function pickaxe(event){
			$("#shovel").style.border = "none";
			$("#axe").style.border = "none";
            $("#pickaxe").style.border = "3px solid rgb(129, 14, 5)";
			$("#pickaxe").style.borderRadius = "15px";
			tool="pickaxe";
			console.log(tool);
        }
$("#axe").addEventListener("click",axe)
        function axe(event){
			$("#shovel").style.border = "none";
			$("#pickaxe").style.border = "none";
            $("#axe").style.border = "3px solid rgb(129, 14, 5)";
			$("#axe").style.borderRadius = "15px";
			tool="axe";
			console.log(tool);
        }

function Minecraft.storage(el){
	if(el=="dirt"){
		$(#storage).css("background-image","url('../images/dirt.png')");
	}else if(el=="grass"){
		$(#storage).css("background-image","url('../images/grass.png')");
	}else if(el=="rock"){
		$(#storage).css("background-image","url('../images/rock.png')");
	}else if(el=="leaf"){
		$(#storage).css("background-image","url('../images/leaf.png')");
	}else if(el=="tree"){
		$(#storage).css("background-image","url('../images/tree.png')");
	}else{
		$(#storage).css("background-image","");
	}
}