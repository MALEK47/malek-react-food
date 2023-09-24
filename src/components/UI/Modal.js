import { Fragment } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const PortalElenemnt = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={props.onClose}/>, PortalElenemnt)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        PortalElenemnt
      )}
    </Fragment>
  );
};

export default Modal;
