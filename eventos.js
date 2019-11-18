var opcao;
var contCurva = 1;
function inserirCurva(){
	curvasControle.push(CriarCurva());
	
	opcao= document.createElement("option");
	opcao.text="Curva "+contCurva+"";
	
	selectCampo.appendChild(opcao);
	
	selectCampo.selectedIndex = curvasControle.length-1;
	curvaSelecionada = selectCampo.selectedIndex;
	interacoes.value = 100;
	checkCurva.checked = true;
	checkPontos.checked = true;
	checkPoligonais.checked = true;
	contCurva++;
}

function mudarCurva(){
	curvaSelecionada = selectCampo.selectedIndex;
	checkCurva.checked = curvasControle[curvaSelecionada].desenharCurva;
	checkPontos.checked = curvasControle[curvaSelecionada].desenharPontos;
	checkPoligonais.checked = curvasControle[curvaSelecionada].desenharPoligonais;
	interacoes.value = curvasControle[curvaSelecionada].interacoes;
	Redesenhar();
}


function excluirCurva(){
	var indexEscolhido = selectCampo.selectedIndex;

	console.log(selectCampo.selectedIndex);
	var pai = document.getElementById("selectCampo");
	var removerEste = pai.getElementsByTagName("option")[indexEscolhido];
	console.log(removerEste);
	pai.removeChild(removerEste);	

	curvasControle.splice(indexEscolhido,1);
	//opcao.getElementByName("Curva "+selectCampo.selectedIndex);
	
	

	console.log(selectCampo.selectedIndex);
	//opcao.removeChild(opcao.getElementByName("Curva "+selectCampo.selectedIndex));
	Redesenhar();
}
 
function modificarInteracoes(){
	curvasControle[curvaSelecionada].interacoes = interacoes.value;
	Redesenhar();
}

function modificarVisualizacaoCurva(){
	curvasControle[curvaSelecionada].desenharCurva = checkCurva.checked;
	Redesenhar();
	console.log("aki");
}

function modificarVisualizacaoPoligonal(){
	curvasControle[curvaSelecionada].desenharPoligonais = checkPoligonais.checked;
	Redesenhar();
}

function modificarVisualizacaoPontos(){
	curvasControle[curvaSelecionada].desenharPontos = checkPontos.checked;
	Redesenhar();
}
 
//Evento de click no canvas para a criação de um ponto de controle
canvas.addEventListener('click', function(e){
	if(!moveu){
		criarPontoControle(e.offsetX, e.offsetY);
		Redesenhar();
	}else{
		moveu = false;
	}
});

//Evento de click com o botão direito do mouse no canvas para excluir um ponto de controle
canvas.addEventListener('contextmenu', function(e){
	e.preventDefault();
	excluirPontoControle(e.offsetX, e.offsetY);
	Redesenhar();
});

//Evento de apertar o botão esquerdo do mouse, verifica se está apertando em um ponto de controle
canvas.addEventListener('mousedown', function(e){

	if(estaNumPonto(e.offsetX, e.offsetY)){
		apertando = true;
	}
	
});

//Evento de mover o mouse, verifica se o mouse esta sendo clicado, se sim move o ponto de controle
canvas.addEventListener('mousemove', function(e){

	if(apertando){
		moverPontoControle(e.offsetX, e.offsetY);
		moveu = true;
		Redesenhar();
	}
	
});

//Evento de soltar o botão esqerdo do mouse
canvas.addEventListener('mouseup', function(e){
	apertando = false;
});
