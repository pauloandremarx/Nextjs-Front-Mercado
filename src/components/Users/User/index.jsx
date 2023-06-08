import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";

import {getUsers} from '@/services/Get/Api';
import {useQueries} from "@tanstack/react-query";


export default function Product( props ) {

    return (
        <Card style={ { width: '18rem' } }   className="mx-auto my-2">
            <Card.Body>
                <Card.Title>{props.nome }</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"> {props.email}</Card.Subtitle>
                <Card.Text>
                    <Badge bg="secondary"> {admin ? 'Administrador' : 'Cliente'} </Badge>

                </Card.Text>
            </Card.Body>
        </Card>

    );
}