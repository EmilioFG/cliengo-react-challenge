import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { toast, Slide } from 'react-toastify';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Button,
} from 'reactstrap';

import "./_user-list.scss";

import { getAllUsers, deleteUser } from '../../actions/user';

const UserList = () => {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      dispatch(getAllUsers());
      setIsLoading(false);
    }
  }, [dispatch, isLoading]);

  const isDeleteUser = (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteUser(id);
          toast("User deleted successfully", {
            transition: Slide,
            closeButton: true,
            autoClose: 5000,
            position: 'bottom-right',
            type: 'success'
          });
          setIsLoading(true);
        }
      });

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

  return (
    <Fragment>
      <Card className='my-4'>
        <CardHeader>
          <h1 class="fs-1">User List</h1>
        </CardHeader>
        <CardBody>
          <Table>
            <thead className='table-dark'>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user) => (
                  <tr key={user.id}>
                    <th>{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.country}</td>
                    <td>
                      <Link to={`users/u/${user.id}`}>
                        <Button className='btn button'>
                          Details
                        </Button>
                      </Link>
                      <Button
                        color='danger'
                        onClick={() => isDeleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </CardBody>
        <CardFooter className='mt-4 d-flex justify-content-end'>
          <Link to={'users/c'}>
            <Button color='success'>
              Create User
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default UserList;
