let Quizzes = document.querySelector('#listaquizz');

let niveis;
let qtdPerguntas;
let pergunta;
let pageNiveis;
let fundo;
let resposta;
let urlimagem;
let respostaIncorreta;
let urlimagemIncorreta;

let questions = [];
let answers = [];
let objetoQuizz = [];

let pagePerguntas = document.querySelector('.listaPerguntas').innerHTML;
function criarPerguntas() {
    let titulo = document.querySelector('.titulo').value;
    let imagem = document.querySelector('.imagem').value;
    qtdPerguntas = document.querySelector('.qtdPerguntas').value;
    niveis = document.querySelector('.niveis').value;



    if ((titulo.length > 19 && titulo.length < 66) && (imagem.startsWith("http://") || imagem.startsWith("https://")) && Number(qtdPerguntas) > 2 && niveis > 1) {
        document.querySelector('.InfoBasica').classList.add('escondido');

        objetoQuizz.title = titulo;
        objetoQuizz.image = imagem;

        console.log(objetoQuizz);


        for (i = 2; i <= qtdPerguntas; i++) {
            pagePerguntas += `<div class="fechado">
            <h2>Pergunta ${i}</h2><img onclick="abrirPergunta(this)" src="imagens/icone.png">
        </div>

        `

            document.querySelector('.listaPerguntas').innerHTML = pagePerguntas;
        }

        document.querySelector('.Perguntas').classList.remove('escondido');
        console.log(pagePerguntas);

        //
        FinalizacaoImagem(titulo, imagem)

    }
    else {
        alert('Por favor, preencha os dados corretamente.')
    }




}

//insere a imagem na aba de finalização
function FinalizacaoImagem(titulo, imagem) {
    const img = document.querySelector(".tela3 .imagemQuizz");
    const tituloQuizz = img.querySelector(".tela3 .tituloQuizz");
    tituloQuizz.innerHTML = titulo;

    img.setAttribute("style", `    
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("https://img.freepik.com/fotos-gratis/lindo-retrato-de-cachorro_23-2149218450.jpg?w=2000");
    `);

    img.setAttribute("style", `    
    background-size: cover`);
}

function abrirPergunta(clicado) {
    clicado.classList.add('escondido');
    clicado.parentNode.classList.add('aberto');
    clicado.parentNode.classList.remove('fechado');
    let fechar = clicado.parentNode.innerHTML;

    fechar += `
    <textarea class="input pergunta" type="text" value="" placeholder="Texto da pergunta"></textarea>
    <textarea class="input fundo" type="text" value="" placeholder="Cor de fundo da pergunta"></textarea>
    <h2>Resposta correta</h2>
    <textarea class="input resposta" type="text" value="" placeholder="Resposta correta"></textarea>
    <textarea class="input urlimagem" type="text" value="" placeholder="URL da imagem"></textarea>
    <h2>Respostas Incorretas</h2>
    <textarea class="input respostaIncorreta1" type="text" value="" placeholder="Resposta incorreta 1"></textarea>
    <textarea class="input urlimagemIncorreta1" type="text" value="" placeholder="URL da imagem 1"></textarea>

    <textarea class="input respostaIncorreta" type="text" value="" placeholder="Resposta incorreta 2"></textarea>
    <textarea class="input urlimagemIncorreta" type="text" value="" placeholder="URL da imagem 2"></textarea>

    <textarea class="input respostaIncorreta" type="text" value="" placeholder="Resposta incorreta 3"></textarea>
    <textarea class="input urlimagemIncorreta" type="text" value="" placeholder="URL da imagem 3"></textarea>
    `

    clicado.parentNode.innerHTML = fechar;
}


function criarNiveis() {


    let verificaitems = document.querySelectorAll('.aberto');
    console.log(verificaitems.length);


    for (contador = 1; contador <= qtdPerguntas; contador++) {
        pergunta = document.querySelector(`.aberto:nth-child(${contador}) .pergunta`).value;
        console.log('aqui' + pergunta);
        fundo = document.querySelector(`.aberto:nth-child(${contador}) .fundo`).value;
        resposta = document.querySelector(`.aberto:nth-child(${contador}) .resposta`).value;
        urlimagem = document.querySelector(`.aberto:nth-child(${contador}) .urlimagem`).value;
        respostaIncorreta = document.querySelector(`.aberto:nth-child(${contador}) .respostaIncorreta1`).value;
        urlimagemIncorreta = document.querySelector(`.aberto:nth-child(${contador}) .urlimagemIncorreta1`).value;


        if (verificaitems.length === (Number(qtdPerguntas) + 1) &&
            pergunta.length > 19 && 
           (fundo.startsWith("#") && fundo.length === 7) && 
            resposta !== "" && 
            (urlimagem.startsWith("http://") || urlimagem.startsWith("https://")) &&
            respostaIncorreta !== "" &&
            (urlimagemIncorreta.startsWith("http://") || urlimagemIncorreta.startsWith("https://"))
        ) {
            pageNiveis = document.querySelector('.listaNiveis').innerHTML;

            objetoQuizz.push({questions:{title: pergunta, color: fundo, answers: [
                {text: resposta, image: urlimagem, isCorrectAnswer: true}, 
                {text: respostaIncorreta, image: urlimagemIncorreta, isCorrectAnswer: false}
            ]}
            })


        } else {

            return (alert('Por favor, preencha os dados corretamente.'));
        }
    }
    

    for (i=2; i<=niveis; i++){
        pageNiveis += `<div class="fechado">
         <h2>Nível ${i}</h2><img onclick="abrirNiveis(this)" src="imagens/icone.png">
         </div>
            `
        document.querySelector('.listaNiveis').innerHTML = pageNiveis;
    }
    document.querySelector('.Perguntas').classList.add('escondido');
    document.querySelector('.Niveis').classList.remove('escondido');
}


function abrirNiveis(clicado) {
    clicado.classList.add('escondido');
    clicado.parentNode.classList.add('aberto');
    clicado.parentNode.classList.remove('fechado');
    let fechar = clicado.parentNode.innerHTML;

    fechar += `
    <textarea class="input tituloNivel" type="text" value="" placeholder="Título do nível"></textarea>
    <textarea class="input porcentagemNivel" type="text" value="" placeholder="% de acerto mínima"></textarea>
    <textarea class="input urlNivel" type="text" value="" placeholder="URL da imagem do nível"></textarea>
    <textarea class="input descricaoNivel" type="text" value="" placeholder="Descrição do nível"></textarea>
    `

    clicado.parentNode.innerHTML = fechar;

}

function finalizarQuizz() {
    let verificaitems = document.querySelectorAll('.aberto');
    console.log(verificaitems.length);


    for (contador = 1; contador <= niveis; contador++) {
        tituloNivel = document.querySelector(`.aberto:nth-child(${contador}) .tituloNivel`).value;
        porcentagemNivel = document.querySelector(`.aberto:nth-child(${contador}) .porcentagemNivel`).value;
        urlNivel = document.querySelector(`.aberto:nth-child(${contador}) .urlNivel`).value;
        descricaoNivel = document.querySelector(`.aberto:nth-child(${contador}) .descricaoNivel`).value;

        if (verificaitems.length === (Number(qtdPerguntas) + Number(niveis)) &&
            tituloNivel.length > 9 &&
            (porcentagemNivel >= 0 && porcentagemNivel < 101) &&
            (urlNivel.startsWith("http://") || urlNivel.startsWith("https://")) &&
            descricaoNivel.length > 29) { 

                objetoQuizz.push({levels: {title : tituloNivel, image: urlNivel, text: descricaoNivel, minValue: porcentagemNivel}})

            
        }else {   
         return(alert('Por favor, preencha os dados corretamente.'));
        }    }
        document.querySelector('.Niveis').classList.add('escondido');
        document.querySelector('.Finalizacao').classList.remove('escondido');

}


function pegarQuizz() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(renderQuizz);
    promise.catch(erro);
    if (localStorage !== null) {
        let esconder1 = document.querySelector('.quizzCriados');
        esconder1.classList.add('escondido');
    } else {
        let esconder2 = document.querySelector('.criarquizz');
        esconder2.classList.add('escondido');
    }
    escondeTela2();
    escondeTela3();
}
function erro(response) {
    console.log(response);
}
function renderQuizz(response) {
    Quizzes.innerHTML = '';
    let infodata = response.data;
    for (let i = 0; i < 6; i++) {
        Quizzes.innerHTML += `<div class="shadow" onclick="buscarQuizz(${infodata[i].id})">\n
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
    quizzSelecionado = dados;
    escondeTela1();

    const img = document.querySelector(".tela2 .imagemquizz");
    const tituloQuizz = img.querySelector(".tela2 .tituloQuizz");

    tituloQuizz.innerHTML = quizzSelecionado.data.title;
    img.setAttribute("style", `background-image: url(${quizzSelecionado.data.image});
    `);

    quizzSelecionado.data.questions.forEach(gerarPerguntas);

    tela2.style.display = "flex";

    tela2.querySelector(".imagemquizz").scrollIntoView();

}

//Gera um elemento HTML para cada pergunta e adiciona a pagina
function gerarPerguntas(pergunta, index) {


    const novaDiv = document.createElement("div");

    novaDiv.classList.add("question");
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
    let solucao = quizzSelecionado.data.questions[index].answers;

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

    if (quizzSelecionado.data.questions.length > idPergunta) {
        let proxPergunta = document.getElementById(idPergunta).parentNode;
        proxPergunta.scrollIntoView();

    } else {
        calcularResultados();
        document.querySelector(".resultado").scrollIntoView()
    }

}

//gera o resultado do quizz;
function calcularResultados() {
    let acertos = document.querySelectorAll(".selecionado.correta").length;
    let perguntas = document.querySelectorAll(".tela2 .question").length;

    let porc = Math.round((acertos / perguntas) * 100);

    let nivel = descobrirNivel(porc);

    gerarResultados(quizzSelecionado.data.levels[nivel], porc);
}

// retorna o nivel correspondente a cada porcentagem
function descobrirNivel(porcAcertos) {

    let index = 0;
    while (porcAcertos > quizzSelecionado.data.levels[index + 1].minValue) {

        index++;

        if (index === quizzSelecionado.data.levels.length - 1) break;

    }

    return index;
}

///gera o html dos resultados
function gerarResultados(level, porcAcertos) {
    const novaDiv = document.createElement("div");

    novaDiv.classList.add("resultado");

    novaDiv.innerHTML = `<div class="textoresultado">
                    <h3>${porcAcertos}% de acerto: ${level.title}</h3>
                </div>
                <img
                    src=${level.image}>
                <p>${level.text}</p>`;

    tela2.appendChild(novaDiv);
}

function reiniciarQuizz() {
    removerPerguntas();
    visualizarQuizz(quizzSelecionado);
}

function removerPerguntas() {

    let remover;

    for (let i = 0; i < quizzSelecionado.data.questions.length; i++) {
        remover = tela2.querySelector(".question");
        tela2.removeChild(remover);
    }

    remover = tela2.querySelector(".resultado");
    if (tela2.querySelector(".resultado") != null) {
        tela2.removeChild(remover);
    }


}

function escondeTela1() {
    let esconder1 = document.querySelector('.quizzlocal');
    esconder1.classList.add('escondido');
    let esconder2 = document.querySelector('.criarquizz');
    esconder2.classList.add('escondido');
    let esconder3 = document.querySelector('.todosquizz');
    esconder3.classList.add('escondido');
}
function escondeTela2() {
    let esconder = document.querySelector('.tela2');
    esconder.classList.add('escondido');
}
function escondeTela3() {
    let esconder1 = document.querySelector('.tela3');
    esconder1.classList.add('escondido');
    let esconder2 = document.querySelector('.tela3.Niveis');
    esconder2.classList.add('escondido');
}

function criarquizz() {
    escondeTela1();
    escondeTela2();
    let mostra = document.querySelector('.tela3');
    mostra.classList.remove('escondido');

}
function returnHome() {
    tela2.style.display = "none";
    removerPerguntas();
    escondeTela2();
    escondeTela3();
    let mostrar1 = document.querySelector('.quizzlocal');
    mostrar1.classList.remove('escondido');
    let mostrar2 = document.querySelector('.criarquizz');
    mostrar2.classList.remove('escondido');
    let mostrar3 = document.querySelector('.todosquizz');
    mostrar3.classList.remove('escondido');

}

function returnHome2(){
    document.querySelector('.Finalizacao').classList.add('escondido');
    let mostrar1 = document.querySelector('.quizzlocal');
    mostrar1.classList.remove('escondido');
    let mostrar2 = document.querySelector('.criarquizz');
    mostrar2.classList.remove('escondido');
    let mostrar3 = document.querySelector('.todosquizz');
    mostrar3.classList.remove('escondido');

}





function criarObjetoquizz() {
    objetoQuizz = {
        title: document.querySelector('.titulo').value,
        image: document.querySelector('.imagem').value,
        questions: [{
            title: document.querySelector('.input.pergunta').value,
            color: document.querySelector('.input.fundo').value,
            answers: []
        }
        ],
        levels: []
    };

    let qtdPerguntas = document.querySelector('.qtdPerguntas').value;

    for (let i = 0; i < qtdPerguntas; i++) {

        let quizz = {
            title: document.querySelectorAll('.input.pergunta')[i].value, // titulo do quizz
            color: document.querySelectorAll('.input.fundo')[i].value, // imagem background to titulo do quizz    
            answers: [{
                text: document.querySelectorAll('.input.resposta')[i].value, //1
                image: document.querySelectorAll('.input.urlimagem')[i].value, //1
                isCorrectAnswer: true
            }, {
                text: document.querySelectorAll('.input.pergunta')[1].value,  //2
                image: document.querySelectorAll('.input.urlimagemIncorreta')[0].value, //2
                isCorrectAnswer: false
            }]
        }
        if (document.querySelectorAll('.input.pergunta')[2].value !== '') {
            Quizz.questions[i].answers[2].text = document.querySelectorAll('.input.pergunta')[2].value   //3
            Quizz.questions[i].answers[2].image = document.querySelectorAll('.input.urlimagemIncorreta')[1].value   //3
            Quizz.questions[i].answers[2].isCorrectAnswer = false;
        }
        if (document.querySelectorAll('.input.pergunta')[3].value !== '') {

            Quizz.questions[i].answers[3].text = document.querySelectorAll('.input.pergunta')[3].value  //4
            Quizz.questions[i].answers[3].image = document.querySelectorAll('.input.urlimagemIncorreta')[2].value  //4
            Quizz.questions[i].answers[3].isCorrectAnswer = false;
        }
    }
}
