import { useState } from 'react';
import tarefas from './Data/task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
/* Instalei do site https://docs.fontawesome.com/web/use-with/react/, para poder utilizar icones diferentes e importei eles acima :
    npm i --save @fortawesome/react-fontawesome@latest     |       npm i --save @fortawesome/free-solid-svg-icons */

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
    const [listaDeTarefas, setListasDeTarefas] = useState([...tarefas]); /* Criei um estado chamado listaDeTarefas consumindo tudo de tarefas*/
    const [umaTarefa, setumaTarefa] = useState('');
    const [indice, setIndice] = useState(3);
    const [atualizaTarefa, setAtualizaTarefa] = useState('');

    function adicionaTarefa() {
        const novaTarefa = { id: indice, descricao: umaTarefa, finalizado: false }
        setListasDeTarefas([...listaDeTarefas, novaTarefa])
        setumaTarefa('')
        setIndice(indice + 1)
    }

    function eliminaTarefa(id) {
        const novaListaDeTarefas = listaDeTarefas.filter(tarefa => tarefa.id !== id)
        setListasDeTarefas(novaListaDeTarefas)
    }

    function atualizaTarefaPorID() {
        const novaLista = [...listaDeTarefas].filter(tarefa => tarefa.id !== atualizaTarefa.id)
        const listaAtualizada = [...novaLista, atualizaTarefa]
        setListasDeTarefas(listaAtualizada)
    }

    function atualizaTarefaPorID() {
        const listaAtualizada = listaDeTarefas.map(tarefa => 
            tarefa.id === atualizaTarefa.id ? atualizaTarefa : tarefa
        );
        setListasDeTarefas(listaAtualizada);
        setAtualizaTarefa({id: null, descricao: '', finalizado: false});
    }

    return (
        <div className='container App'>
            <br /><br />
            <h2>Lista de Tarefas</h2>
            <br /><br />

            {/*Campo de atualização de tarefas */}
            <div className='row'>
                <div className='col'>
                    <input type='text'
                           value={atualizaTarefa.descricao}
                           onChange={(e) => setAtualizaTarefa({...atualizaTarefa, descricao: e.target.value})}
                           /* Melhoria código acima. Código do professor abaixo:
                           onChange={(e) => setAtualizaTarefa({id: atualizaTarefa.id, descricao: e.target.value, finalizado: atualizaTarefa.finalizado})} */
                           className='form-control form-control-lg' />
                </div>
                <div className='col-auto'>
                    <button onClick={atualizaTarefaPorID}
                            className='btn btn-lg btn-sucess'>Atualizar</button>
                </div>
            </div>

            {/*Campo de inserção de tarefas */}
            <div className='row'>
                <div className='col'>
                    <input type='text'
                           value={umaTarefa} 
                           onChange={(e) => setumaTarefa(e.target.value)}
                           className='form-control form-control-lg' /> {/* nome da classe é do bootstrap que já existe estilização. */}
                </div>
                <div className='col-auto'>
                    <button onClick={adicionaTarefa}
                            className='btn btn-lg btn-sucess'>Adicionar</button>
                </div>
            </div>
            {listaDeTarefas.map( /* Consuma/Mapeia a minha listaDeTarefas e transforme a listaDeTarefas em (↓) */
                (tarefa, index) => { /* Consuma a listaDeTarefas e retorna cada tarefa e o indíce de cada elemento. (↓) */
                    return ( 
                /* Depois retorne uma div com a descrição de cada tarefa demonstrada (↓) 
                Vou incluir o bootstrap na minha aplicação com npm install --save bootstrap. Após inclui-se className nas div (container e col) */
                        <>
                            <div className='col myTask'>
                                <span>{tarefa.id}</span>
                                <span>{tarefa.descricao}</span>
            {/*Campo de exclusão de tarefas */}
                                <div className='icone'>
                                    <span title='editar' onClick={() => setAtualizaTarefa({id: tarefa.id, 
                                                                                           descricao: tarefa.descricao, 
                                                                                           finalizado: tarefa.finalizado})}>
                                        <FontAwesomeIcon icon={faPen}/>
                                    </span>
                                    <span title='excluir' onClick={() => eliminaTarefa(tarefa.id)}>
                                        <FontAwesomeIcon icon={faTrashCan}/>
                                    </span>
                                </div>
                            </div>
                        </>
                    )
                }
            )}
        </div>
    );
};