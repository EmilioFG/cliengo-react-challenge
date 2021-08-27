import React, { Fragment, useState } from "react";
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast, Slide } from 'react-toastify';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import {
  Button,
  FormGroup,
  Label,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from 'reactstrap';
import * as yup from 'yup';

import { createUser, updateUser } from '../../actions/user';

const UserForm = () => {

  const history = useHistory();
  const params = useParams();

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find((user) => user.id === +params.id);

  const [initialValues] = useState({
    name: (user) ? user.name : '',
    email: (user) ? user.email : '',
    phone: (user) ? user.phone : '',
    country: (user) ? user.country : '',
  });

  const handleSubmit = (values) => {
    try {
      if (params.id) {
        updateUser(values, params.id);
      } else {
        createUser(values);
      }

      toast(`User ${(params.id) ? 'updated' : 'created'} successfully`, {
        transition: Slide,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-right',
        type: 'success'
      });

      history.push('/users');
    } catch (error) {
      toast(error, {
        transition: Slide,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-right',
        type: 'error'
      });
    }
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('This Email is not a valid format').required('Email is required'),
    phone: yup.string().required('Phone is required'),
    country: yup.string().required('Country is required'),
  });

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <Card className='my-4'>
              <CardHeader className='d-flex justify-content-between'>
                <h1 class="fs-1">
                  {`${(params.id ? 'Update' : 'Add New')} User`}
                </h1>
                <Link to={'/users'}>
                  <Button
                    color='primary'
                    className='py-2'
                  >
                    Back
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6} className="mt-2">
                    <FormGroup>
                      <Label>Name:</Label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Type a Name"
                        className={`form-control ${(errors.name && touched.name) ? ' is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        component="div"
                        name="name"
                        className="invalid-feedback"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6} className="mt-2">
                    <FormGroup>
                      <Label>Email:</Label>
                      <Field
                        type="text"
                        name="email"
                        placeholder="Type a Email"
                        className={`form-control ${(errors.email && touched.email) ? ' is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6} className="mt-2">
                    <FormGroup>
                      <Label>Phone:</Label>
                      <Field
                        type="text"
                        name="phone"
                        placeholder="Type a Phone"
                        className={`form-control ${(errors.phone && touched.phone) ? ' is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        component="div"
                        name="phone"
                        className="invalid-feedback"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6} className="mt-2">
                    <FormGroup>
                      <Label>Country:</Label>
                      <Field
                        type="text"
                        name="country"
                        placeholder="Type a Country"
                        className={`form-control ${(errors.country && touched.country) ? ' is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        component="div"
                        name="country"
                        className="invalid-feedback"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className='mt-4 d-flex justify-content-end'>
                <Button
                  type="submit"
                  color="success"
                >
                  { `${params.id ? 'Update' : 'Submit'}` }
                </Button>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}

export default UserForm;
