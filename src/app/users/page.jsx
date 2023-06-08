'use client'


import FormCuston from '@/components/Form';
import InputCuston from '@/components/InputCuston'
import InputPassword from '@/components/InputPassword'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Select from 'react-select';
import { localStorageExpires, getLocalStorage} from '@/util/Helpers'
import CategoryPostService from '@/services/useCategory/post'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {UserEdit} from "@/components/Users";
import Layout from "@/components/Layout";
import { getUsers} from '@/services/Get/Api';
import {useQueries} from "@tanstack/react-query";

import Button from "react-bootstrap/Button";

export default function Login() {
  const [users] =
      useQueries({
        queries: [

          {
            queryKey: ["Users"],
            queryFn: () => getUsers(),

          },

        ],
      });



  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  if( getLocalStorage('nome') != 'undefined' || getLocalStorage('nome') != null || getLocalStorage('nome') != '' ){

    return (
        <>
          <Layout>
            <Container className="mt-5 min-vh-100">

              <Row>
                { users.data?.map( function ( item, i ) {
                  return (
                      <Col key={`teste_${i}`}>
                        <UserEdit nome={item.nome} email={item.email} created_on={item.created_on} id={item.id} admin={item.admin}  />
                      </Col>
                  )})}
              </Row>
            </Container>
          </Layout>



        </>
    )

  }else{

    return (
        window.location.href='/'
    )
  }
}




