//Pega o formulario pelo id
const form = document.getElementById('formulario');

//Função que pega os carros do localStorage passando de array de string para obj
const storageGet = (local) => {
    return JSON.parse(localStorage.getItem(local))
};

//Função que coloca os carros do localStorage passando de obj para array de string
const storageSet = (local, array) => {
    return localStorage.setItem(local, JSON.stringify(array));
}

//Cadrastra os carros para ir ao patio
const cadastraCarro = (e) => {
    //pegando valores dos campos do formulario
    var modelo = form.modelo.value;
    var placa = form.placa.value;
    //Criando hora e minutos
    var time = new Date;
    var horas = time.getHours();
    var minutos = time.getMinutes();
    
    //Verificando se campos estão preenchidos
    if(!form.modelo.value && !form.placa.value){
        alert('Preencha todos os campos!');
        return false;
    }
    
    //Criando obj carro com dados do formulario mais hora e minuto
    carro = {
        modelo,
        placa,
        horas,
        minutos
    }

    //Verificando se patio esta vazio se estiver coloca carro
    if(localStorage.getItem('patio') === null){
        var arrayCarros = [];
        arrayCarros.push(carro);
        storageSet('patio', arrayCarros);
    } else {
        //Se patio já tiver carro coloca mais um
        arrayCarros = storageGet('patio');        
        arrayCarros.push(carro);
        storageSet('patio', arrayCarros);        
    } 
    //Reseta formulario depois que o carro foi inserido no patio
    form.reset();
    
    //Chama fução para mostrar o carro após ser inserido no patio
    mostraPatio();
    //Previne o envio do formulario
    e.preventDefault();    
};

//Deleta carro do patio
const finalizarPatio = (placa) =>{
    //Verifica se a placa do carro a ser deletado existe no patio
    var arrayCarros = storageGet('patio');
    for(var i in arrayCarros){
      if(arrayCarros[i].placa === placa){
        arrayCarros.splice(i, 1);//Se existir deleta o carro
      }
      //Atualiza o patio novamente
      storageSet('patio', arrayCarros);
    }
    //Chama a função mostraPatio novamente 
    mostraPatio();  
}

//Mostra os carros que estão no patio
const mostraPatio = () => {
    var arrayCarros = storageGet('patio');
    //Pega a <tbody> que vai mostrar resultado pelo id
    var carrosResultado = document.getElementById('resultado');
    //Inicia o <tbody> vazio
    carrosResultado.innerHTML = '';
    //percorre o arrayCarros para pegar os itens
    for(var i in arrayCarros){
        var modelo = arrayCarros[i].modelo;
        var placa = arrayCarros[i].placa;
        var horas = arrayCarros[i].horas;
        var minutos = arrayCarros[i].minutos;
        //Mostra o carro na tabela e coloca a função finalizarPatio com o parametro placa no onclick do button
        carrosResultado.innerHTML += '<tr><td>'+modelo+'</td><td>'+placa+'</td><td>'+horas+' : '+minutos+'</td><td><button class="btn btn-danger" onclick="finalizarPatio(\''+placa+'\')">Finalizar</button></td></tr>';
        
    }    
}
//Coloca função mostraPatio no loaing
window.addEventListener("load", mostraPatio);
//Chama a função cadrastraCarro no submit do formulario
form.addEventListener('submit', cadastraCarro);
