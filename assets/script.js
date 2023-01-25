function criarPerguntas() {
    let titulo = document.querySelector('.titulo').value;
    let imagem = document.querySelector('.imagem').value;
    let qtdPerguntas= document.querySelector('.qtdPerguntas').value;
    let niveis = document.querySelector('.niveis').value;

    if ((titulo.length>19 && titulo.length<66) && (imagem.startsWith("http://") || imagem.startsWith("https://")) && Number(qtdPerguntas)>2 && niveis>1){
        // document.querySelector('.InfoBasica').classList.add('escondido');
       // document.querySelector('.Perguntas').classList.remove('escondido');
    }
    else {
        alert('n pode')
   }
}