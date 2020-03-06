import React, { Component } from 'react';
import './App.css';

import CardList from './containers/cardList/cardlist';
import axiosCards from './axios/axios-cards';
import axiosStore from './axios/axios-store';
import Aux from './components/au/Au';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';


class App extends Component {
  state = {
    purchasing: false,
    modalCard: false,
    search: [],
    cards: {},
    card: {},
  }

  componentDidMount() {
    axiosStore.get('/cards.json')
        .then(reponse => {
            this.setState({ cards: reponse.data });
        })
        .catch(error => {
            console.log(error);
        });
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(this.state.cards, nextState);
  //   return nextState.cards === this.state.cards;
  // }
  // componentWillUpdate(nextProps, nextState){
  //   console.log("com",nextProps, nextState);
  // }

  purchaseHandler = () => {
      this.setState({ purchasing: true, search: [] });
  }

  purchaseCancelHandler = () => {
      this.setState({ purchasing: false, search: [] });
  }
  modalCardHandler = () => {
    this.setState({ modalCard: true, search: [] });
}

  modalCardCancelHandler = () => {
      this.setState({ modalCard: false, search: [] });
  }

  handleInputChange = (event) => {
    const { value } = event.target;

    axiosCards.get('/cards/autocomplete?q='+value)
    .then(response => {
        this.setState({ search: response.data.data })
    })
    .catch( error =>{
        console.log(error);
    })

  }

  cardShow= (e,igkey, nombre, cantidad, conseguidas, image, lore) =>{
    const cardDetail = {
      id: igkey,
      name: nombre,
      cont: cantidad,
      rest: conseguidas,
      image: image,
      lore: lore
    }
    this.setState({ card: cardDetail });
    this.modalCardHandler();
  }

  deletedCard = () => {
    axiosStore.delete('/cards/'+this.state.card.id+'.json')
    .then(response => {
        this.componentDidMount();
        this.modalCardCancelHandler();
    })
    .catch(error => {
        console.log(error);
    });

  }

  updateMenusCard = () => {
    const { card } = this.state;
    if (card.cont > 0) {
      const cardUP = {
        name: card.name,
        image: card.image,
        lore: card.lore,
        cantidad: card.cont - 1,
        conseguidas: card.rest + 1
      }
      axiosStore.put('/cards/'+card.id+'.json', cardUP )
      .then(response => {
          this.componentDidMount();
          this.modalCardCancelHandler();
      })
      .catch(error => {
          console.log(error);
      });
    }else{
      this.modalCardCancelHandler();
    }
  } 
  
  updatePlusCard = () => {
    const { card } = this.state;
    const cardUP = {
      name: card.name,
      image: card.image,
      lore: card.lore,
      cantidad: card.cont + 1,
      conseguidas: card.rest
    }
    axiosStore.put('/cards/'+card.id+'.json', cardUP )
    .then(response => {
        this.componentDidMount();
        this.modalCardCancelHandler();
    })
    .catch(error => {
        console.log(error);
    });
  }

  newCard = (event, name) => {
    axiosCards.get('/cards/named?exact='+name)
    .then(response => {
        const card = {
        cantidad: 1,
        name: name,
        conseguidas: 0,
        lore: response.data.oracle_text,
        image: response.data.image_uris.small
        }
        axiosStore.post('/cards.json', card)
        .then(reponse => {
            this.componentDidMount();
            this.purchaseCancelHandler();
        })
        .catch(error => {
            console.log(error);
        });
    })
    .catch( error =>{
        console.log(error);
        //this.setState({ error: error });
    })

 }

 updateDelCard = () => {
  const { card } = this.state;
  if (card.rest > 0) {
    const cardUP = {
      name: card.name,
      image: card.image,
      lore: card.lore,
      cantidad: card.cont,
      conseguidas: card.rest - 1
    }
    axiosStore.put('/cards/'+card.id+'.json', cardUP )
    .then(response => {
        this.componentDidMount();
        this.modalCardCancelHandler();
    })
    .catch(error => {
        console.log(error);
    });
  }else{
    this.modalCardCancelHandler();
  }
} 
  render() {
    let historial = Object.keys(this.state.search)
    .map( igkey => {
        return [...Array(this.state.search[igkey])].map( (m,_) => {
            return <div 
            key={'card'+m} 
            onClick={e => this.newCard(e,m)}
            className="opcion"
            >
                {m}
            </div>
        });
    });
    const {card} = this.state;
    return (
      
      <div className="App">
        <button className="btn" onClick={this.purchaseHandler}> Buscar </button>
        <CardList 
          Cards={this.state.cards}
          Show={this.modalCardHandler}
          CardShow={this.cardShow}
          />
        <Aux>
        <Modal 
            
            show={this.state.modalCard} 
            modalClosed={this.modalCardCancelHandler}>
                <h1> {card.name} </h1>
                <img src={card.image} alt={card.name}/>
                <p>{card.lore}</p>
                <br/>
                <p><strong>Cantidad: </strong>{card.cont} <strong>Restantes: </strong>{card.rest}</p>
                <Button btnType="Button Success" clicked={this.updatePlusCard}> Sumar </Button>
                <Button btnType="Button Restar" clicked={this.updateMenusCard}> Restar </Button>
                {/* <Button btnType="Button Warning" clicked={this.updateDelCard}> Perdi la carta </Button> */}
                <Button btnType="Button Danger" clicked={this.deletedCard}> Borrar </Button>
            </Modal>
            <Modal 
            show={this.state.purchasing} 
            modalClosed={this.purchaseCancelHandler}>
                <h1> Buscador de Cartas </h1>
                <input 
                placeholder="Buscar Carta" 
                onChange={e => this.handleInputChange(e)}/>
                  { historial } 
            </Modal>
        </Aux>
      </div>
    );
  }
}

export default App;
