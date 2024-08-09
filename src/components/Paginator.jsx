import { useEffect } from "react"
import { Link } from "react-router-dom"

export const Paginator = ({ paginator, path }) => {


  useEffect(() => {
    console.log(paginator)

  }, [])

  const onClick = () => {
    console.log(paginator);
  }

  return (
    <>
      <div className="container d-flex justify-content-center mt-4">

        {/* <h6>pages</h6> */}
        {
          paginator.totalPages && paginator.totalPages > 1 &&
          <ul className="d-flex flex-row" style={{ listStyleType: 'none' }}>

            {
              !paginator.first ?
                <Link to={`/${path}/page/0`}>
                  <button className="btn btn-link" onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-bar-left" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0M4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5" />
                    </svg>
                  </button>
                </Link>
                :
                <Link>
                  <button className="btn btn-link" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-bar-left" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0M4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5" />
                    </svg>
                  </button>
                </Link>
            }

            {
              !paginator.first ?
                <li className="page-item">
                  <Link className="link-opacity-100-hover" to={`/${path}/page/${paginator.number - 1}`}>
                    <button className="btn btn-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                      </svg>
                    </button>

                  </Link>
                </li>
                :
                <li>
                  <button className="btn btn-link" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                  </button>
                </li>
            }          
              <h4 className="text-primary"> {paginator.pageable.pageNumber + 1} </h4>         
            {
              !paginator.last ?
                <li className="page-item">
                  <Link className="link-opacity-100-hover" to={`/${path}/page/${paginator.number + 1}`} >
                    <button className="btn btn-link" onClick={onClick}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                      </svg>
                    </button>
                  </Link>
                </li>
                :
                <li>
                  <button className="btn btn-link" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </button>
                </li>
            }

            {
              !paginator.last ?
                <Link to={`/${path}/page/${paginator.totalPages - 1}`}>
                  <button className="btn btn-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-bar-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0M11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                </Link>
                :
                <Link>
                  <button className="btn btn-link" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-bar-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0M11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                </Link>
            }
          </ul>
        }
      </div>
    </>
  )
}