import React from 'react';
import Modal from 'react-bootstrap/Modal'
import {useSelector, useDispatch} from "react-redux";
import { setDeleteUserId, deleteUser} from "../../actions/user";

const UserDeleteForm = () => {

    const dispatch = useDispatch();

    const {delete_user, currentPage, numberOfPages, users} = useSelector(state => state.user);

    const closeModal = () =>{
        // removing delete user from redux state by sending null setDeleteUserId
        dispatch(setDeleteUserId(null))
    };

    let getPage = null;

    const onConfirm = () =>{

        if ((currentPage == numberOfPages) && (users.length == 1) ){
             getPage = (currentPage - 1);
        }
        else{
             getPage = currentPage;
        }
        dispatch(deleteUser(delete_user.id, getPage))
    };

    let condition = false;
    if(delete_user !== null)
        condition = true;

    return (
        <div>
            <Modal show={condition} onHide={closeModal}>
                <Modal.Header className="bg-danger" closeButton>
                    <Modal.Title className="text-white" >Foydalanuvchini o'chirish</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Siz haqiqatdan ham ushbu foydalanuvchini o'chirmoqchimisiz ?
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={closeModal} className="btn btn-secondary">YO'Q</button>
                    <button onClick={onConfirm} className="btn btn-primary">HA</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserDeleteForm;