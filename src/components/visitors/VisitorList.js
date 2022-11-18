import React, { Fragment, useEffect, useState } from 'react';
import VisitorCreateForm from './VisitorCreateForm';

import { Plus } from "react-feather";
import { toast } from 'react-toastify';
import VisitorItem from './VisitorItem';
import Pagination from '../CustomPagination';
import CustomPagination from '../CustomPagination';

const VisitorList = (props) => {

    const { setLoading } = props;

    let baseURL = `${process.env.REACT_APP_API_URL}`;

    if (process.env.REACT_APP_MODE === 'prod') {
        baseURL = `${process.env.REACT_APP_PRODUCTION_APP_API_URL}`;
    }

    if (process.env.REACT_APP_MODE === 'stage') {
        baseURL = `${process.env.REACT_APP_STAGING_APP_API_URL}`;
    }

    const [visitors, setVisitors] = useState([]);
    const [deleteList, setDeleteList] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        pages: 0,
        current: 0,
    })

    const [showCreateForm, setShowCreateForm] = useState(false);

    const toggleCreateModal = e => setShowCreateForm(!showCreateForm);

    const getVisitors = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetch(`${baseURL}/visitors?page=${page}`);
            const resData = await res.json();
            if (resData.status === 'success') {
                setVisitors(resData.data.data);
                setPagination({
                    total: resData.data.last_page,
                    last_page: resData.data.last_page,
                    current: resData.data.current_page,
                })
            } else {
                toast(`Error: ${resData?.message}`);
            }
        } catch (error) {
            toast(`Error: Server error`);
        }
        setLoading(false);
    }

    useEffect(() => {
        getVisitors();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addVisitor = async (inputs) => {
        setLoading(true);
        const data = {};
        try {
            const res = await fetch(`${baseURL}/visitors`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(inputs)
            });
            const resData = await res.json();
            data.status = resData.status;
            if (!resData.message) {
                data.message = "Successfully added";
            } else {
                data.message = resData.message;
            }


        } catch (error) {
            data.status = 'error';
            data.message = `Error: Server error`;
        }
        setLoading(false);
        return data;
    }

    const updateVisitorDeleteList = (id, value) => {
        const newDeleteList = [...deleteList];
        if (newDeleteList.includes(id)) {
            const index = newDeleteList.indexOf(id);
            newDeleteList.splice(index, 1);
        } else {
            newDeleteList.push(id);
        }
        setDeleteList(newDeleteList);
    }

    const deleteSelectedItems = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {};
        try {
            const res = await fetch(`${baseURL}/visitors/bulk`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
                body: JSON.stringify({
                    visitor_ids: deleteList
                })
            });
            const resData = await res.json();
            data.status = resData.status;
            if (!resData.message) {
                data.message = "Successfully deleted";
            } else {
                data.message = resData.message;
            }


        } catch (error) {
            data.status = 'error';
            data.message = `Error: Server error`;
        }

        if (data.status === 'success') {
            getVisitors();
            toast(data.message, { type: 'success' });
        } else {
            toast(data.message, { type: 'success' });
        }
        setLoading(false);
    }

    return (
        <Fragment>
            <div className="container p-0">

                <div className="row mb-2">
                    <div className="col-md-12">
                        <h1 className="h3 text-center mt-2 mb-3">Посетителей конференций </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <span className='btn btn-secondary' onClick={deleteSelectedItems} >
                            Delete selected
                        </span>
                    </div>
                    <div className="col-md-3">
                        {/* <SearchForm getPageItems={getUsers} /> */}
                    </div>

                    <div className="col-md-6">
                        <div className="crud_actions text-end">
                            <button className="btn btn-primary" onClick={setShowCreateForm}>
                                Добавить
                                <Plus />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-xl-12 col-xxl-12 d-flex">

                        <div className="card w-100 table-responsive">
                            <table className="table custom-table table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">-</th>
                                        <th scope="col">#</th>
                                        <th scope="col">Имя</th>
                                        <th scope="col">Фамилия</th>
                                        <th scope="col">Номер телефона</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Оплачен?</th>
                                        <th scope="col">Комментарий</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        visitors.map((item, index) => (
                                            <VisitorItem
                                                key={`user${item.id}`}
                                                number={index + 1}
                                                visitor={item}
                                                updateVisitorDeleteList={updateVisitorDeleteList}
                                            />
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>

                    </div>

                    <div className="row mt-2">
                        <div className="col-12">
                            <CustomPagination getPageItems={getVisitors} paginationData={pagination} />
                        </div>
                    </div>
                </div>
            </div>

            <VisitorCreateForm is_shown={showCreateForm} toggle={toggleCreateModal} addVisitor={addVisitor} getVisitors={getVisitors} />

        </Fragment>
    )
};

export default VisitorList;
