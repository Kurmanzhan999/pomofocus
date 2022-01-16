import classes from './Modal.module.css';
import { Fragment } from 'react';
import { createPortal } from 'react-dom';

const BackDrop = ({closeModal}) => {
    return <div onClick={closeModal} className={classes.modals}/>
}
const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}
const portal = document.getElementById('over-lays');
const Modal = (props) => {
    return(
        <Fragment>
            {createPortal(<BackDrop/>,portal)}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portal)}
        </Fragment>
       
    )
}

export default Modal;



