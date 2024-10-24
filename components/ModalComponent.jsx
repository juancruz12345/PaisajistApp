import { Modal, Badge } from "react-bootstrap"
import './modal.css'

export function ModalComponent({showModal, setShowModal}){
    return(
        <div>
         
      <Modal className="modal"
        size="md"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header className="modal-header" closeButton>
          Ayudas
        </Modal.Header>
        <Modal.Body className="modal-body">
        
        

        <li>
          Puedes <strong>redimensionar</strong> el lienzo haciendo click en
          la <strong>esquina inferior derecha</strong> del mismo y arrastrandolo.
        </li>

        <li>
          Puedes ver la <strong>descripción</strong> de una <strong>planta</strong> haciendo click
          sobre su imagen.
        </li>

        <li>
          La <strong>última planta</strong> agregada siempre aparecera en una <strong>capa superior</strong>.
        </li>
             
        </Modal.Body>
        <Modal.Header className="modal-header">
          Teclas
        </Modal.Header>
        <Modal.Body className="modal-body">
        <li>
        <strong>Borrar</strong> elemento seleccionado: <Badge >Supr</Badge> / <Badge >Backspace</Badge>
        </li> 
               
        <li>
        <strong>Duplicar</strong> el último elemento agregado: <Badge>D</Badge> 
        </li>
        </Modal.Body>
      </Modal>
        </div>
    )
}