import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";

export const CodeBarModel = ({ barcodeNumber, productNombre, setCodeBarModelIsOpen }) => {

  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeNumber && barcodeRef.current) {
      JsBarcode(barcodeRef.current, barcodeNumber, {
        format: 'CODE128', // Cambia a 'CODE128' UPC o cualquier otro formato si lo necesitas
        displayValue: true,
        width: 2,
        height: 100,
        fontSize: 18,
      });
    }
  }, [barcodeNumber]);

  return (
    <>
      <div className="modal fade show" id="staticBackdrop" style={{ display: "block" }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">{productNombre}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setCodeBarModelIsOpen(false)}></button>
            </div>
            <div className="modal-body">

              <div className="container d-flex row justify-content-center gap-4">
                {barcodeNumber && <svg ref={barcodeRef} />}
                {/* <i className="bi bi-printer-fill"></i> */}
                <button className="btn btn-success">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-printer-fill" viewBox="0 0 16 16">
                    <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1" />
                    <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}