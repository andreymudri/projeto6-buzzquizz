let Quizzes = document.querySelector('#listaquizz');
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

function pegarQuizz() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
        promise.then(renderQuizz);
        promise.then(console.log('puxei os quizz'));
        promise.catch(erro);
}
function erro(response) {
    console.log(response);    
}
function renderQuizz(response) {
    Quizzes.innerHTML = '';
    let infodata = response.data; 
    for (let i = 0; i < 6; i++){
        Quizzes.innerHTML += `<div class="shadow">\n
        <div><img src="${infodata[i].image}" alt="quizz"></div>\n
        <div class="title"> ${infodata[i].title}</div></div>
    `;
    }
}
pegarQuizz();