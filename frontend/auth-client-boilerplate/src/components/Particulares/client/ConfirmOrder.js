
import React from 'react'
import Modal from "react-modal"
import { Link} from 'react-router-dom'
import "./confirmationModal.css"

// esto quita un error de la consola. 
Modal.setAppElement("#root")

export default function ConfirmationOrder(props) {



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
            <Link  to={'/thankyou'}><button className="modal-button green">Confirm</button> </Link>
            <button className="modal-button red"  onClick={props.closeModal}>Cancel</button>
        </Modal>
    )
}

