import { useState } from 'react';
import receita from './Data/receita.js';

export default function App() {
  const [minhaReceita, setMinhaReceita] = useState(receita);

  function handleChange(evento, itemID) {
    {/* Quando eu tiver uma chamada de modificação, quero realmente modificar 
    vou criar uma variável recebendo uma cópia (...minhaReceita.ingredientes) do elemento quee eu tinha anterior a mudança, e
    sobre esses elementos quero fazer uma tranformação. Dento de 'map.' investigue cada item da minhaReceita onde novos itens serão trazidos.
    Dentro do parenteses depois de 'item =>' é onde vejo qual item está sendo modificado, e altero apenas aquele.
    Se for igual, eu copio o item e vou modificar o campo, buscando pelo pelo target name que dei nos campos que serão modificados.
    [evento.target.name] : evento.target.value -> após, eu utilizo o setMinhaReceita, onde eu copio a receita, e dessa minhaReceita, 
    quero altera o campo preenchido (ingredientes) pelo novo valor (novosIngredientes), quando a função for chamada. */}
    const novosIngredientes = minhaReceita.ingredientes.map(
      /* Aqui eu pego a lista de ingredientes modificadas com o evento onChanges e atribuo todos os ingredientes (modificados ou não) 
      para a variável 'novosIngredientes' */
      item => {
        if (item.id === itemID) {
          return {
            ...item,
            [evento.target.name]: evento.target.value
          }
        } else {
          return item;
        }
      }
    )
    setMinhaReceita(
      { ...minhaReceita, ingredientes: novosIngredientes }
    )
  }

  return (
    <>
      <div name="cabecalho" style={{ border: '1px solid', padding: '5px 10px 5px 20px', margin: '20px' }}>
        <h1>Receita de: {minhaReceita.nomeReceita}</h1>
        <p> Porções: {minhaReceita.porcoes}</p>
        <p>Tempo de preparo: {minhaReceita.tempo} minutos</p>
        <p>Custo da receita: R$ {minhaReceita.ingredientes.reduce((acumulado, ingr) => acumulado + (ingr.quantidade * ingr.precoUnitario), 0).toFixed(2)}</p>
        {/* dento da minhaReceita, vá nos ingredientes e vamos fazer uma redução. Dentro dos parênteses, calcule através da função criada. 
        Acumular o valor calculado de cada ingrediente (quantidade do ingrediente  * preço unitário do ingrediente) na variável 'acumulado'.
        Quando começar a fazer o c´slculo no reduce, a variável acumulado é zero - 0. O toFixed é pra ser 2 casas depois da vírgula */}
      </div>
      <div name="listaDeIngedientes" style={{ border: '1px solid', padding: '5px 10px 5px 20px', margin: '20px' }}>
        <h1>Lista de ingredientes: </h1>
        {minhaReceita.ingredientes.map( // mapeia a minhaReceita os ingredientes
          item => { // pega cada item que compõe meu ingrediente, transforme e retorne...
            return ( // uma div do ingrediente, onde na div traga a lista de ingredientes.
              <div style={{ padding: '2.5px 10px 2.5px 0px', margin: '5px' }}>
                <label style={{ margin: '5px' }}>
                  Ingrediente:
                  <input value={item.item} style={{ margin: '5px' }}/>
                </label>
                <label style={{ margin: '5px' }}>
                  Quantidade:
                  <input name='quantidade' value={item.quantidade} style={{ margin: '5px' }} onChange={(e) => handleChange(e, item.id)} /> {/* Criando solução genérica:
                  Dou um nome para o input, quando eu mudaer ele (onChange) dispara uma função para atualizar o componente.
                  Ao atualizar, rode uma função onde vou identificar qual foi o e (evento) *se mudou a quantidade, ou o nome do ingrediente...*
                  chamamos a função handleChange, passando qual foi o evento e o id do item.*/}
                </label>
                <label style={{ margin: '5px' }}>
                  Unidade:
                  <input value={item.unidade} style={{ margin: '5px' }} />
                </label>
                <label style={{ margin: '5px' }}>
                  Preço unitário:
                  <input value={item.precoUnitario} style={{ margin: '5px' }} />
                </label>
              </div>
            );
          }
        )}
      </div>
      <div name="passoDaElaboracao" style={{ border: '1px solid', padding: '5px 10px 5px 20px', margin: '20px' }}>
        <h2>Modo de preparo: </h2>
        {
          minhaReceita.preparo.map(
            etapa =>
            (<div style={{ border: '1px solid', padding: '5px 10px 5px 20px', margin: '20px' }}>
              <p><img src={`${process.env.PUBLIC_URL}/img/passo${etapa.passo}.jpg`} style={{width: '200px'}}></img> {etapa.descricao}</p>
              
            </div>)
          )
        }
      </div>
    </>
  );
}