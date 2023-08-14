import { useState, useRef, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Modal.css';

export default function TodoModal(props) {

  const modalTodoTitles = props.modalTodoTitle;
  const modalTodoNames = props.modalTodoName;

//   console.log(`${modalTodoNames} todo name ${modalTodoTitles} todo title`);

  const [todoName, setTodoName] = useState(props.modalTodoTitle);
  const [todoTitle, setTodoTitle] = useState(props.modalTodoName);
  const [todoId, setTodoId] = useState(props.modalTodoId)

  // console.log(`Todo title ${todoTitle} todo name ${todoName}`);

  const modalTodoNameRef = useRef();
  const modalRef = useRef();
  const closeModalRef = useRef();

  const closeModal = () => {
    props.getTodo(todoTitle, todoName, todoId);
    props.onHide();
  }

  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  }

  useEffect(() => {
    if (modalTodoNameRef.current) {
      modalTodoNameRef.current.focus()
    }
  }, []);

  useEffect(() => {
    setTodoName(props.modalTodoName);
    setTodoTitle(props.modalTodoTitle);
    setTodoId(props.modalTodoId);
  }, [props.modalTodoName, props.modalTodoTitle, props.modalTodoId]);

  useEffect(() => {
    document.addEventListener('mousedown', handleModalClick);
    return () => {
      document.removeEventListener('mousedown', handleModalClick);
    };
  }, []);

  return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        // backdrop="static"
        // keyboard={false}
        centered
      >
        <div ref={modalRef}>
            <Modal.Header>
                <Modal.Body>
                    <Row>
                        <Form.Label></Form.Label>
                          <Col>
                            <Form.Floating className="mb-3">
                            <Form.Control 
                            as="textarea"
                            style={{border: 0}}
                            className='title-input-modal'
                            size="lg" 
                            type="text" 
                            onChange={(e) => setTodoTitle(e.target.value)}
                            value={todoTitle}
                            id='floatingInputCustom'
                            placeholder="Title" 
                            />
                            <label htmlFor="floatingInputCustom">Title</label>
                            </Form.Floating>
                          </Col>
                    </Row>
                </Modal.Body>
            </Modal.Header>
            <Modal.Body>
              <Row>
                      <Form.Label></Form.Label>
                      <Col>
                        <Form.Floating className="mb-3">
                          <Form.Control
                          as="textarea"
                          style={{border: 0}} 
                          type="text" 
                          onChange={(e) => setTodoName(e.target.value)}
                          value={todoName}
                          ref={modalTodoNameRef}
                          id="floatingPasswordCustom"
                          placeholder='Add a todo...'
                          />
                          <label htmlFor="floatingPasswordCustom">Add a todo...</label>
                        </Form.Floating>
                      </Col>
                    </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={closeModal} ref={closeModalRef}>Close</Button>
            </Modal.Footer>
          </div>
        </Modal>
  );
}