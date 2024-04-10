import React from 'react'

interface IProps {
  currPage: number
  totalPages: number
  paginate: (pageNumber: number) => void
}

const Pagination = ({ currPage, totalPages, paginate }: IProps) => {
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="flex justify-center items-center mt-5">
        <li>
          <button
            disabled={currPage === 1}
            onClick={() => paginate(currPage - 1)}
            className="w-12 h-12 rounded-l-md shadow-md disabled:opacity-50">
            Prev
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`w-12 h-12 flex items-center justify-center shadow-md ${
                currPage === number
                  ? 'bg-blue-500 text-white'
                  : 'hover:opacity-75'
              }`}>
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={currPage === totalPages}
            onClick={() => paginate(currPage + 1)}
            className="w-12 h-12 rounded-r-md shadow-md disabled:opacity-50">
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
