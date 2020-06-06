import React from 'react'
import { Link } from 'react-router-dom'

const Pagination = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div className=" pb-2 pt-3 " style={{ display: "inline-block" }}>
        {props.pages && props.pages.length &&
          <ul className="pagination text-center">
            <li className={`page-item first-item ${props.currentPage === 1 ? 'disabled' : ''}`}>
              <Link to={{ search: `?page=1` }} className="page-link">First</Link>
            </li>
            <li className={`page-item previous-item ${props.currentPage === 1 ? 'disabled' : ''}`}>
              <Link to={{ search: `?page=${props.currentPage - 1}` }} className="page-link">Previous</Link>
            </li>
            {props.pages.map(page =>
              <li key={page} className={`page-item number-item ${props.currentPage === page ? 'active' : ''}`}>
                <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
              </li>
            )}
            <li className={`page-item next-item ${props.currentPage === props.totalPages ? 'disabled' : ''}`}>
              <Link to={{ search: `?page=${props.currentPage + 1}` }} className="page-link">Next</Link>
            </li>
            <li className={`page-item last-item ${props.currentPage === props.totalPages ? 'disabled' : ''}`}>
              <Link to={{ search: `?page=${props.totalPages}` }} className="page-link">Last</Link>
            </li>
          </ul>
        }
      </div>
    </div>
  )
}

export default Pagination;