import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';


const CustomPagination = ({ paginationData, getPageItems }) => {
  const { total, current, last_page } = paginationData;
  const [pages, setPages] = useState([])
  useEffect(() => {
    setPages([...Array(last_page).keys()].map(i => i + 1));
  }, [last_page])
  const [innerCurrentPage, setInnerCurrentPage] = useState(1);

  useEffect(() => {
    setInnerCurrentPage(current);
  }, [current])
  const onPageClick = (newPage) => {
    setInnerCurrentPage(Number(newPage));
    getPageItems(newPage);
  }

  const [paginatoinItems, setPaginatoinItems] = useState([]);

  useEffect(() => {
    let items = [];

    items.push(
      <Pagination.First onClick={(event) => onPageClick(1)} key={`page0`} />
    );

    for (let number = 1; number <= last_page; number++) {
      items.push(
        <Pagination.Item onClick={(event) => onPageClick(number)} key={`page${number}`}
          active={number === Number(innerCurrentPage)}>
          {number}
        </Pagination.Item>,
      );
    }
    items.push(
      <Pagination.Last onClick={(event) => onPageClick(total)} key={`page${total + 1}`} />
    );
    setPaginatoinItems(items);
  }, [pages, innerCurrentPage])

  return total > 1 ? (
    <Pagination>
      {paginatoinItems}
    </Pagination>
  ) : ''
}

export default CustomPagination;  