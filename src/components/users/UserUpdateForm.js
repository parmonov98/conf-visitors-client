import React, {useEffect, useRef, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {useDispatch, useSelector} from "react-redux";
import {getFirmOptions, getUserRolIdData, setUpdateUserId, updateUser} from "../../actions/user";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Button from "react-bootstrap/Button";
import {getParams} from "../../utils/hooks/getParams";

const UserUpdateForm = () => {

    const dispatch = useDispatch();

    const {user} = useSelector(state => state);
    const {error, users, loading, update_user, currentPage, user_rol_id_data, firm_options} = user || {};
    useEffect(() => {
        getFirmOptions();
    }, [getFirmOptions]);

    const defaultValues = {
        name: '',
        email: '',
        role_id: '',
        password: ''
    };
    const [inputs, setInputs] = useState(defaultValues);

    const [errors, setErrors] = useState();

    const formRef = useRef();

    useEffect(() => {
        setInputs(update_user)
    }, [update_user])

    const handleChange = e => {
        setErrors({});
        e.target.oldValue = e.target.value;
        setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}));
    };

    const closeModal = () => {
        // removing update_user from redux by sending null to setUpdateUserId
        dispatch(setUpdateUserId(null));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser(update_user.id, inputs, getParams()));
    };

    useEffect(() => {
        dispatch(getUserRolIdData());
    }, [getUserRolIdData]);


    useEffect(() => {
        if (error && loading === false) {
            const errorsItems = error?.errors;
            let errorObject = {};
            if (error && error?.errors) {
                Object.keys(error?.errors).forEach((item, index) => errorObject[item] = errorsItems[item][0]);
            }
            setErrors(errorObject);
        }
    }, [error]);

    let condition = false;
    if (update_user !== null)
        condition = true;

    return (
        <div>
            <Modal show={condition} onHide={closeModal}>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title className="text-black">Foydalanuvchini tahrirlash</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-3 pb-4 mx-3">

                    <form onSubmit={handleSubmit} ref={formRef}>

                        <div className="mb-3">
                            <label htmlFor="firm_id">Firma</label>
                            <select name="firm_id"
                                    value={inputs?.firm_id || ''}
                                    id="firm_id"
                                    className="form-control"
                                    onChange={handleChange}
                                    onKeyUp={e => e.target.oldValue = e.target.value}
                            >
                                <option value="">Tanlang</option>
                                {
                                    firm_options.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                            <div className="error">
                                {errors?.firm_id}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name">Ism</label>
                            <input
                                name="name"
                                className={'form-control'}
                                type="text"
                                value={inputs?.name || ''}
                                placeholder={'kiriting'}
                                onChange={handleChange}
                                onKeyUp={e => e.target.oldValue = e.target.value}
                            />

                            <div className="error">
                                {errors?.name}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                name="email"
                                className={'form-control'}
                                type="email"
                                value={inputs?.email || ''}
                                placeholder={'kiriting'}
                                onChange={handleChange}
                                onKeyUp={e => e.target.oldValue = e.target.value}
                            />

                            <div className="error">
                                {errors?.email}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Parol</label>
                            <input
                                name="password"
                                className={'form-control'}
                                type="password"
                                value={inputs?.password || ''}
                                placeholder={'kiriting'}
                                onChange={handleChange}
                                onKeyUp={e => e.target.oldValue = e.target.value}
                            />

                            <div className="error">
                                {errors?.password}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role_id">Rol</label>
                            <select className="form-control"
                                    name={'role_id'} id={'role_id'}
                                    onChange={handleChange}
                                    value={inputs?.role_id || ''}
                                    onKeyUp={e => e.target.oldValue = e.target.value}>
                                <option value={''}>Tanlang</option>
                                {
                                    user?.user_rol_id_data.map((item, index) => (
                                        <option key={index} value={item.id}>{item.title}</option>
                                    ))
                                }
                            </select>
                            <div className="error">
                                {errors?.role_id}
                            </div>
                        </div>


                        <div className="d-flex gap-2">
                            <Button className="w-50" variant="secondary" type="button" onClick={closeModal}>
                                Bekor qilish
                            </Button>
                            <Button className="w-50" variant="primary" type="submit">Saqlash</Button>
                        </div>

                    </form>

                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserUpdateForm;