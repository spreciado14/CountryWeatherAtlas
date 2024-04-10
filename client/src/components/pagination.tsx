import React from 'react'

interface IProps {
  currPage: number
  totalPages: number
  paginate: (pageNumber: number) => void
  countryFlag: React.ReactNode
}

const Pagination = ({
  currPage,
  totalPages,
  paginate,
  countryFlag,
}: IProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '5rem',
      }}>
      <button
        style={{
          fontSize: '1.5rem',
          padding: '0.5rem 1rem',
        }}
        disabled={currPage === 1}
        onClick={() => paginate(currPage - 1)}
        className="disabled:opacity-50">
        ←
      </button>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        {countryFlag}
      </div>

      <button
        style={{
          fontSize: '1.5rem',
          padding: '0.5rem 1rem',
        }}
        disabled={currPage === totalPages}
        onClick={() => paginate(currPage + 1)}
        className="disabled:opacity-50">
        →
      </button>
    </div>
  )
}

export default Pagination
