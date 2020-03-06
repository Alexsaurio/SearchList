import React, {Component} from 'react'

import axiosCards from '../../axios/axios-cards';

import './cardlist.css';

class CardList extends Component{

    searchCard = (name) => {
        axiosCards.get('/cards/named?exact='+name)
        .then(response => {
            console.log(response.data);
            //return response.data;
        })
        .catch( error =>{
            console.log(error);
            //this.setState({ error: error });
        })
    }

    render(){
        //let list ="nada";
        let list = Object.keys(this.props.Cards)
        .map( igkey => {
            return [...Array(this.props.Cards[igkey])].map( (m,i) => {
                return <div 
                key={igkey} 
                className="Carta"
                onClick={e => this.props.CardShow(e,igkey, m.name, m.cantidad, m.conseguidas, m.image, m.lore)}
                //onClick={this.}
                >
                    <img src={m.image} alt={m.name}/>
                    <p><strong>Cantidad: </strong>{m.cantidad}</p>
                    <p><strong>Restantes: </strong>{m.conseguidas}</p>
                    
                </div>
            });
        });

        return(
            <div>
                <h1>- Lista de Cartas -</h1>
                <h2> Buscadas {list.length} </h2>
                {list}
            </div>
        );
    }
}

export default CardList;