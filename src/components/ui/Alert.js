import React from 'react';
import Alert from 'react-bootstrap/Alert';

import './Alert.css'

export default function AlertDisplay(props) {
  const alertRef = props.alertRef;

  return (
    <div className='alert'>
        <Alert 
        style={{margin: '20px'}}
        variant="danger"
        ref={alertRef}
        dismissible>
            <Alert.Heading>Oh snap!</Alert.Heading>
            <p>
                You didn't add any text, please enter a title or some text to continue.
            </p>
        </Alert>
    </div>
  )
}