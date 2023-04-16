import React from 'react';
import './css/ListaDeSalas.css'

//Criando o componente gráfico que representa a Lista de Jogadores do Jogo
const ListaDeSalas = (props) => {

    function habilitarJogo() {
        if(!props.salas && props.salas.length === 0) {
            return false;
        }
        const salasArr = Object.keys(props.salas).map((key) => props.salas[key]);
        let sala = salasArr.find((sala) => {
            return sala.idDono === props.socketAtual;
        });
        return sala && sala.qtdJogadores === 2;
    }

    function desabilitarCriarSala(){
        for (let i in props.salas) {
            if(props.salas[i].idConvidado === props.socketAtual || props.salas[i].idDono === props.socketAtual)
                return true;
        }
        return false;
    }

    function desabilitarSairSala(){
        for (let i in props.salas) {
            if(props.salas[i].idConvidado === props.socketAtual || props.salas[i].idDono === props.socketAtual)
                return false;
        }
        return true;
    }

    function trocarContexto(){
        for (let i in props.salas) {
            if(props.salas[i].idDono === props.socketAtual)
                return "Fechar";
        }
        return "Sair";
    }

    return (
        <div class="caixa-salas">
            <h2 class='top-salas'>Salas de Jogo</h2>
            <div class="sub-caixa-salas">
            {Object.keys(props.salas).map((key) => (
                    <div class='item-salas' key={key}>
                        {props.salas[key].nomeDaSala} - {props.salas[key].qtdJogadores}/2
                        <button disabled={desabilitarCriarSala()} onClick={() => props.interagirSala(props.salas[key])}>Entrar</button>
                        <button disabled={desabilitarSairSala()} onClick={() => props.sairDaSala(props.salas[key])}>{trocarContexto()}</button>
                    </div>
                ))
            }
            <div class="item-salas">Novas salas aparecerão aqui</div>
            </div>
            <button class='btn-iniciar-jogo' disabled={!habilitarJogo()} onClick={() => props.iniciarJogo()}>Iniciar Jogo</button>
            <button class='btn-criar-sala' disabled={desabilitarCriarSala()} onClick={() => props.interagirSala("")}>Criar Sala</button>
            <button class='btn-atualizar-sala' onClick={() => props.interagirSala("+")}>Atualizar Lista de Salas</button>
        </div>
    );
};

export default ListaDeSalas;