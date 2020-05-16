import React from 'react'
import Modal from "react-modal"
import { useHistory } from 'react-router-dom'
import "./confirmationModal.css"
import orders_service from '../../../api/orders-service';

// esto quita un error de la consola. 
Modal.setAppElement("#root")

export default function ConfirmationOrder(props) {

    const history = useHistory()

    console.log("props de menuClient?", props)
    console.log("props de menuClient? dishes", props.dishes)
    console.log("props de menuClient? quantity", (props.dishes.length > 0 && props.dishes.map(elem => elem.quantity)))
    
    const confirmClick = (props) => {
        const tableId = props.value._id
        const dishesId = props.dishes
        const quantity = props.dishes.map(elem => elem.quantity)
        console.log('dentro del click', tableId, dishesId, quantity)
        orders_service.addOrder(tableId, dishesId, quantity)
        history.push('/thankyou')
    }

    return (
        // className y overslayClassName aporta la clase para el CSS; isOpen determina cuando se abre el Modal y onRequestClose = {props.closeModal} habilita que se cierre el modal cuando se clica en el overlay.
        <Modal
        className = "Modal"
        isOpen = {props.isOpen}
        // onRequestClose se activa cuando el usuario clica fuera del modal.
        onRequestClose = {props.closeModal}
        overlayClassName = "Overlay"
        >
            <h2> Do you really want to confirm the order? </h2>
            <button onClick={() => confirmClick(props)} className="modal-button green">Confirm</button>
            <button className="modal-button red"  onClick={props.closeModal}>Cancel</button>
        </Modal>
    )
}