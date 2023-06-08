'use client'

import styles from './home.module.css';
import Layout from '@/components/Layout';
 import { useQueries } from "@tanstack/react-query";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import {Product as Products} from "@/components/Products";
import { getProducts, getCategory, getTax } from '@/services/Get/Api';


export default function Home() {

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

    if (products.isLoading) return "Caregando produtos...";
    if ( products.error ) return products.error.message;

    if (category.isLoading) return "Caregando categorias...";
    if ( category.error ) return category.error.message;

    if (tax.isLoading) return "Caregando impostos...";
    if ( tax.error ) return category.error.message;


  const addToCart = ( item, quantity, tax ) => {

      let valor = ( item.valor * quantity );
      let total = valor * ( (tax / 100) + 1 );

      const cartItem = {
        name: item.nome,
        value: valor,
        tax: tax,
        quantity: quantity,
        only_tax: total - valor,
        total: parseFloat(total).toFixed(2)
      };

      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      cartItems.push(cartItem);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      alert('Produto adicionado ao carrinho!');
    };


  // @ts-ignore
    return (
        <Layout>
          <Container className="mt-5 min-vh-100">
          <Row>
            { products.data?.map( function ( item, i ) {
              return (
                <Col key={`teste_${i}`}>
                  <Products nome={item.nome} valor={item.valor} category_id={item.category_id}  />
                </Col>
              )})}
            </Row>
          </Container>
        </Layout>
  );
}



