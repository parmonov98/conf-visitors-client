import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';


const VisitorCreateForm = ({ addVisitor, getVisitors, toggle, is_shown }) => {

    const defaultValues = {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        type: '',
        has_paid: false,
        comment: ''
    };
    const [inputs, setInputs] = useState(defaultValues);

    const [errors, setErrors] = useState({});

    const formRef = useRef();

    const isNameValid = (name) => /^[a-zA-Zа-яА-Я]+$/i.test(name);

    const isPhoneValid = (phone) => {
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        return !(!phone || regex.test(phone) === false);
    }
    const isEmailValid = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    const isTypeValid = (type) => ['guest', 'press', 'reporter'].includes(type);

    const handleChange = e => {
        e.target.oldValue = e.target.value;
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

        if (e.target.name == 'first_name') {
            const is_valid = isNameValid(e.target.value);
            if (!is_valid) {
                setErrors({ ...errors, first_name: "Invalid First name" });
                return;
            }
            delete errors.first_name;
            setErrors(errors);
        }


        if (e.target.name == 'last_name') {
            const is_valid = isNameValid(e.target.value);
            if (!is_valid) {
                setErrors({ ...errors, last_name: "Invalid Last name" });
                return;
            }
            delete errors.last_name;
            setErrors(errors);
        }

        if (e.target.name == 'phone') {
            const is_valid = isPhoneValid(e.target.value);
            if (!is_valid) {
                setErrors({ ...errors, phone: "Invalid phone" });
                return;
            }
            delete errors.phone;
            setErrors(errors);
        }
        if (e.target.name == 'email') {
            const is_valid = isEmailValid(e.target.value);
            if (!is_valid) {
                setErrors({ ...errors, email: "Invalid Email" });
                return;
            }
            delete errors.email;
            setErrors(errors);
        }

        if (e.target.name == 'type') {
            const is_valid = isTypeValid(e.target.value);
            if (!is_valid) {
                setErrors({ ...errors, type: "Invalid Type" });
                return;
            }
            delete errors.type;
            setErrors(errors);
        }


        if (e.target.name == 'has_paid') {
            setInputs(prevState => ({ ...prevState, has_paid: !inputs.has_paid }));
        }
    };

    const validateFields = () => {
        const newErrors = { ...errors };
        if (!isNameValid(inputs.first_name)) {
            newErrors.first_name = "Invalid First name";
        }

        if (!isNameValid(inputs.last_name)) {
            newErrors.last_name = "Invalid Last name";
        }

        if (!isPhoneValid(inputs.phone)) {
            newErrors.phone = "Invalid phone";
        }

        if (!isEmailValid(inputs.email)) {
            newErrors.email = "Invalid Email";
        }

        if (!isTypeValid(inputs.type)) {
            newErrors.type = "Invalid Type";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateFields()) {
            toast("Please, Enter correct values", { type: 'error' });
            return;
        }
        const data = await addVisitor(inputs);
        if (data.status === 'success') {
            setInputs(defaultValues);
            setErrors({});
            toast(data.message, { type: 'success' });
            await getVisitors();
        } else {
            toast(data.message, { type: 'error' });
        }
    };

    return (
        <Fragment>
            <Modal show={is_shown} onHide={toggle}>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title>Новый посетитель</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-3 pb-4 mx-3">

                    <form onSubmit={handleSubmit} ref={formRef}>

                        <div className="mb-3">
                            <label htmlFor="name">Имя(*)</label>
                            <input
                                name="first_name"
                                className={'form-control'}
                                type="text"
                                value={inputs.first_name || ''}
                                placeholder={'введите'}
                                onChange={handleChange}
                                onKeyUp={e => e.target.oldValue = e.target.value}
                            />

                            <div className="text-danger">
                                {errors.first_name}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="last_name">Фамилия(*)</label>
                            <input
                                name="last_name"
                                className={'form-control'}
                                type="text"
                                value={inputs.last_name || ''}
                                placeholder={'введите'}
                                onChange={handleChange}
                                onKeyUp={e => e.target.oldValue = e.target.value}
                            />

                            <div className="text-danger">
                                {errors.last_name}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone">Телефон(*)</label>
                            <input
                                name="phone"
                                className={'form-control'}
                                type="phone"
                                value={inputs.phone || ''}
                                placeholder={'введите'}
                                onChange={handleChange}
                                onKeyUp={e => e.target.oldValue = e.target.value}
                            />

                            <div className="text-danger">
                                {errors.phone}
                            </div>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="email">Email(*)</label>
                            <input
                                name="email"
                                className={'form-control'}
                                type="email"
                                value={inputs.email || ''}
                                placeholder={'введите'}
                                onChange={handleChange}
                                onKeyUp={e => e.target.oldValue = e.target.value}
                            />

                            <div className="text-danger">
                                {errors.email}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="type">Тип(*)</label>
                            <select name="type"
                                value={inputs.type || ''}
                                id="type"
                                className="form-control"
                                onChange={handleChange}
                                onKeyUp={e => e.target.oldValue = e.target.value}
                            >
                                <option value="">Выбирайте</option>
                                <option value="guest">Гость</option>
                                <option value="press">Пресса</option>
                                <option value="reporter">Докладчик</option>
                            </select>
                            <div className="text-danger">
                                {errors.type}
                            </div>
                        </div>


                        <div className="mb-3">

                            <div className="form-check">
                                <input
                                    className="form-check-input" type="checkbox"
                                    name='has_paid'
                                    checked={inputs.has_paid || false}
                                    id="has_paid"
                                    onChange={handleChange}
                                />
                                <label className='form-check-label' htmlFor="has_paid">Оплачен</label>
                            </div>
                            <div className="text-danger">
                                {errors.has_paid}
                            </div>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="comment">Коммент</label>
                            <textarea
                                name="comment"
                                className={'form-control'}
                                type="comment"
                                value={inputs?.comment || ''}
                                placeholder={'введите'}
                                onChange={handleChange}
                                onKeyUp={e => e.target.oldValue = e.target.value}
                            />

                            <div className="text-danger">
                                {errors.comment}
                            </div>
                        </div>


                        <div className="d-flex gap-2">
                            <Button className="w-50" variant="secondary" type="button" onClick={toggle}>Отменит</Button>
                            <Button className="w-50" variant="primary" type="submit">Добавить</Button>
                        </div>

                    </form>

                </Modal.Body>
            </Modal>
        </Fragment >
    );
};

VisitorCreateForm.propTypes = {
    addVisitor: PropTypes.func.isRequired,
};


export default VisitorCreateForm;
