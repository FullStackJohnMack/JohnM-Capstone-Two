// import React from 'react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeMessages } from './actions/messagesActions';
import Alert from 'react-bootstrap/Alert';
import { v4 as uuid } from 'uuid';


function FlashedMessages () {

    const dispatch = useDispatch();
    
    const messages = useSelector(store=>store.messages);
    
    useEffect(()=>{
        if (messages[0]) {
        setTimeout(function() {
            dispatch(removeMessages());
        },7000);
        }    
    })
    


    if (!messages) {
        return null
    } else {
    const messageList = [];
    messages.forEach(message => {
        messageList.push(
            <Alert variant="danger" key={uuid()}>
                <h6>{message}</h6>
            </Alert>
        )
    })
    return (
        messageList
    )
    }
    
}

export default FlashedMessages;