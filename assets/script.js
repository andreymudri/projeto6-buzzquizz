let Quizzes = document.querySelector('#listaquizz');

let niveis;
function criarPerguntas() {
    let titulo = document.querySelector('.titulo').value;
    let imagem = document.querySelector('.imagem').value;
    let qtdPerguntas = document.querySelector('.qtdPerguntas').value;
    niveis = document.querySelector('.niveis').value;

    if ((titulo.length > 19 && titulo.length < 66) && (imagem.startsWith("http://") || imagem.startsWith("https://")) && Number(qtdPerguntas) > 2 && niveis > 1) {
        document.querySelector('.InfoBasica').classList.add('escondido');

        let pagePerguntas = document.querySelector('.listaPerguntas').innerHTML;
        for (i=2; i<=qtdPerguntas; i++){
            pagePerguntas += `<div class="fechado">
            <h2>Pergunta ${i}</h2><img onclick="abrirPergunta(this)" src="imagens/icone.png">
        </div>

        `

        document.querySelector('.listaPerguntas').innerHTML = pagePerguntas;
        }
        
        document.querySelector('.Perguntas').classList.remove('escondido');
        console.log(pagePerguntas)

    }
    else {
        alert('n pode')
    }
}

function abrirPergunta(clicado){
    clicado.classList.add('escondido');
    clicado.parentNode.classList.add('aberto');
    clicado.parentNode.classList.remove('fechado');
    let fechar = clicado.parentNode.innerHTML;

    fechar+= `
    <textarea class="input pergunta" type="text" value="" placeholder="Texto da pergunta"></textarea>
    <textarea class="input fundo" type="text" value="" placeholder="Cor de fundo da pergunta"></textarea>
    <h2>Resposta correta</h2>
    <textarea class="input resposta" type="text" value="" placeholder="Resposta correta"></textarea>
    <textarea class="input urlimagem" type="text" value="" placeholder="URL da imagem"></textarea>
    <h2>Respostas Incorretas</h2>
    <textarea class="input respostaIncorreta" type="text" value="" placeholder="Resposta incorreta 1"></textarea>
    <textarea class="input urlimagemIncorreta" type="text" value="" placeholder="URL da imagem 1"></textarea>

    <textarea class="input respostaIncorreta" type="text" value="" placeholder="Resposta incorreta 2"></textarea>
    <textarea class="input urlimagemIncorreta" type="text" value="" placeholder="URL da imagem 2"></textarea>

    <textarea class="input respostaIncorreta" type="text" value="" placeholder="Resposta incorreta 3"></textarea>
    <textarea class="input urlimagemIncorreta" type="text" value="" placeholder="URL da imagem 3"></textarea>
    `

    clicado.parentNode.innerHTML = fechar;
}

function criarNiveis() {
    let pergunta = document.querySelector('.pergunta').value;
    let fundo = document.querySelector('.fundo').value;
    let resposta = document.querySelector('.resposta').value;
    let urlimagem = document.querySelector('.urlimagem').value;
    let respostaIncorreta = document.querySelector('.respostaIncorreta').value;
    let urlimagemIncorreta = document.querySelector('.urlimagemIncorreta').value;

    if (pergunta.length > 19 && 
        (fundo.startsWith("#") && fundo.length === 7) && 
        resposta !== "" && 
        (urlimagem.startsWith("http://") || urlimagem.startsWith("https://")) &&
        respostaIncorreta !== "" && 
        (urlimagemIncorreta.startsWith("http://") || urlimagemIncorreta.startsWith("https://"))
        ){
        document.querySelector('.Perguntas').classList.add('escondido');
        document.querySelector('.Niveis').classList.remove('escondido');
    } else {
        alert('n pode');
    }}


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
    for (let i = 0; i < 6; i++) {
        Quizzes.innerHTML += `<div class="shadow" onclick="mostrarQuizz(${infodata[i].id})">\n
        <div><img src="${infodata[i].image}" alt="quizz"></div>\n
        <div class="title"> ${infodata[i].title}</div></div>
    `;
    }
}

pegarQuizz();

//tela2
const tela2 = document.querySelector(".tela2");
let quizzSelecionado = {};

//Busca quizz pelo ID
function buscarQuizz(id) {

    const url = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`;
    const promessa = axios.get(url);
    promessa.then(visualizarQuizz);
    promessa.catch(() => console.log("erro"));

}

//Insere os dados no HTML
function visualizarQuizz(dados) {
    quizzSelecionado = dados.data;

    const img = document.querySelector(".imagemquizz");
    const tituloQuizz = img.querySelector(".titulo");

    tituloQuizz.innerHTML = dados.data.title;
    img.setAttribute("style", `background-image: url(${dados.data.image});
    `);

    dados.data.questions.forEach(gerarPerguntas);

    tela2.style.display = "flex";

}

//Gera um elemento HTML para cada pergunta e adiciona a pagina
function gerarPerguntas(pergunta, index) {


    const novaDiv = document.createElement("div");

    novaDiv.classList.add("pergunta");
    novaDiv.innerHTML = `<div class="textopergunta" style="background-color:${pergunta.color}" >
    <p>${pergunta.title}</p>
</div>

<div class="respostas" id="${index}">
    ${gerarRespostas(pergunta.answers)}
</div>`;

    tela2.appendChild(novaDiv)

}

//Gera as respostas para cada pergunta
function gerarRespostas(answers) {

    answers.sort(comparador);

    let htmlRespostas = "";
    for (let i = 0; i < answers.length; i++) {

        if (answers[i].isCorrectAnswer) {

            htmlRespostas += `<div class="resposta" onclick="respostaClicada(this)">
            <img
                src=${answers[i].image} class="Nselecionado"> 
            <p>${answers[i].text}</p>
        </div>`;

        } else {

            htmlRespostas += `<div class="resposta" onclick="respostaClicada(this)">
            <img
                src=${answers[i].image} class="Nselecionado">
            <p>${answers[i].text}</p>
        </div>`;

        }
    }

    return htmlRespostas;
}

function comparador() {
    return Math.random() - 0.5;
}

//Altera a visualização da alternativa clicada
function respostaClicada(resposta) {

    let divRespostas = resposta.parentNode;
    if (foiClicada(divRespostas)) return;

    resposta.querySelector("img").classList.remove("Nselecionado");

    resposta.classList.add("selecionado");

    divRespostas.classList.add("respondida");

    let reps = divRespostas.querySelectorAll(".resposta");

    mostrarRespostas(divRespostas.id, reps);

    setTimeout(function () {
        scrollarPagina(divRespostas.id);

    }, 2000)


}

//verifica se a pergunta já foi respondida
function foiClicada(elemento) {
    if (elemento.classList.contains("respondida")) {
        return true;
    } else {
        return false;
    }
}

//mostra qual são as respostas erradas e a correta
function mostrarRespostas(index, reps) {
    let solucao = quizzSelecionado.questions[index].answers;

    for (let i = 0; i < reps.length; i++) {
        if (solucao[i].isCorrectAnswer) {
            reps[i].classList.add("correta");
        } else {
            reps[i].classList.add("errada");
        }
    }

}

function scrollarPagina(id) {
    let idPergunta = (Number(id) + 1);

    if (quizzSelecionado.questions.length > idPergunta) {
        let proxPergunta = document.getElementById(idPergunta).parentNode;
        proxPergunta.scrollIntoView();

    } else {
        console.log("não tem outra pergunta gerar resultados")
    }

}
