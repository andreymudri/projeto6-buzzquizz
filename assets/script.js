function criarPerguntas() {
    let titulo = document.querySelector('.titulo').value;
    let imagem = document.querySelector('.imagem').value;
    let qtdPerguntas= document.querySelector('.qtdPerguntas').value;
    let niveis = document.querySelector('.niveis').value;

    if ((titulo.length>19 && titulo.length<66) && (imagem.startsWith("http://") || imagem.startsWith("https://")) && Number(qtdPerguntas)>2 && niveis>1){
        document.querySelector('.InfoBasica').classList.add('escondido');
        document.querySelector('.Perguntas').classList.remove('escondido');
    }
    else {
        alert('n pode')
   }
}

function criarNiveis(){
    let pergunta = document.querySelector('.pergunta').value;
    let fundo = document.querySelector('.fundo').value;
    let resposta = document.querySelector('.resposta').value;
    let urlimagem = document.querySelector('.urlimagem').value;
    //let Incorreta = document.querySelector('.resposta .Incorreta').value
    //console.log(Incorreta);
    if (pergunta.length>19 && (fundo.startsWith("#") && fundo.length===7) && resposta !=="" && (urlimagem.startsWith("http://") || urlimagem.startsWith("https://"))){
        document.querySelector('.Perguntas').classList.add('escondido');
    }else {
        alert('n pode');
    }
}