import React, { Component } from 'react';

import './Modal.css';

import Aux from '../au/Au';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={this.props.show ? 'Modal ModalShow' : 'Modal ModalHide'}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}
export default Modal;