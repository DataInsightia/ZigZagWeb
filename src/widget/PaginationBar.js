import React, { useState } from 'react'

// export default function Pagination({ data, pageLimit, dataLimit, RenderComponent ,workState}){
//   const [pages] = useState(Math.round(data.length / dataLimit))
//   const [currentPage, setCurrentPage] = useState(1)

//   function goToNextPage() {
//     setCurrentPage((page) => page + 1)
//   }

//   function goToPreviousPage() {
//     setCurrentPage((page) => page - 1)
//   }
//   function changePage(event) {
//     const pageNumber = Number(event.target.textContent)
//     setCurrentPage(pageNumber)
//   }
//   const getPaginatedData = () => {
//     const startIndex = currentPage * dataLimit - dataLimit
//     const endIndex = startIndex + dataLimit
//     return data.slice(startIndex, endIndex)
//   }

//   const getPaginationGroup = () => {
//     let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
//     return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
//   }

//   return (
//     <div>
//       <div className="mt-20">
       
//         {getPaginatedData().map((d, index) => (
//         <RenderComponent key={index} data={d} workState={workState}/>
//           // <>{workState}</>
//        ))} 
//       </div>
//       <PaginationBar
//         goToPreviousPage={goToPreviousPage}
//         currentPage={currentPage}
//         getPaginationGroup={getPaginationGroup}
//         changePage={changePage}
//         goToNextPage={goToNextPage}
//         pages={pages}
//       />
//     </div>
//   )
// }
export default function PaginationBar({
  goToPreviousPage,
  currentPage,
  getPaginationGroup,
  changePage,
  goToNextPage,
  pages,
}) {
  return (
    <div class="flex flex-col items-center m-0">
      <div class="flex text-gray-700">
        <button
          onClick={goToPreviousPage}
          className={`h-8 w-8 mr-1 flex justify-center items-center rounded-md bg-gray-200 cursor-pointer ${
            currentPage === 1 ? 'pointer-events-none' : ''
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-left w-4 h-4"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div class="flex h-8 font-medium rounded-full ">
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full ${
                currentPage === item ? 'bg-rose-600 text-white' : ''
              }`}
            >
              <span>{item}</span>
            </button>
          ))}
        </div>
        <button
          onClick={goToNextPage}
          className={`h-8 w-8 ml-1 flex justify-center items-center rounded-md bg-gray-200 cursor-pointer ${
            currentPage === pages ? 'pointer-events-none' : ''
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-right w-4 h-4"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  )
}
