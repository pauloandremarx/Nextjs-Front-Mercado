import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";

import { getProducts, getCategory, getTax } from '@/services/Get/Api';
import {useQueries} from "@tanstack/react-query";


export default function Product( props ) {

    const [products, category, tax] =
        useQueries({
            queries: [
                {
                    queryKey: ["Products"],
                    queryFn: () => getProducts(),

                },
                {
                    queryKey: ["Category"],
                    queryFn: () => getCategory(),

                },

                {
                    queryKey: ["Tax"],
                    queryFn: () => getTax(),

                },
            ],
        });

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };



    if (category.isLoading) return "Carregando categorias...";
    if ( category.error ) return category.error.message;



    return (
        <Card style={ { width: '18rem' } }   className="mx-auto my-2">
            <Card.Body>
                <Card.Title>{props.nome }</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"> R$ {props.valor}</Card.Subtitle>
                <Card.Text>
                    <Badge bg="secondary">   { category?.data.find( word => word.id === props.category_id )?.nome } </Badge>

                </Card.Text>
                <Button variant="primary" onClick={ () => addToCart( props, quantity, tax?.data.find( word => word.id_category === props.category_id )?.valor )}>Adicinar ao carrinho</Button>

                <ButtonGroup size="sm" className='mt-2' variant="outline-warning">
                    <Button  className='me-2'  onClick={ () => decreaseQuantity()}>-</Button>
                    <Button variant="secondary"> Quantidade <Badge bg="secondary">  {quantity} </Badge></Button>
                    <Button   className='mx-2'  onClick={ () => increaseQuantity()}>+</Button>
                </ButtonGroup>
                <Alert variant="danger" className='mt-3'>
                    { tax?.data.find( word => word.id_category === props.category_id )?.valor }
                    % de imposto dessa categoria de produto
                </Alert>
            </Card.Body>
        </Card>

    );
}