import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { AmountPerSizeTable } from './AmountPerSizeTable';
import { InputQuantityTable } from './InputQuantityTable';

export const PrintComponent = ({ data, editMode, onSheetChange, inputQuantityForSpreadSheetList, empty }) => {
  const componentRef = useRef(null);

  return (
    <div>
      <ReactToPrint
        trigger={() => <button className='btn btn-success'>Imprimir</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef} className='mt-5'>
        <div className="container">
          {
            data && data.map(amount => (
              <div key={amount.id}>

                <AmountPerSizeTable
                  empty={empty || false}
                  key={amount.id}
                  amount={amount}
                  editMode={editMode}
                  onSheetChange={onSheetChange}
                />
              </div>
            ))
          }
        </div>
        <div className="container">
          {
            inputQuantityForSpreadSheetList.length > 0 &&

            <InputQuantityTable
              inputQuantityForSpreadsheet={inputQuantityForSpreadSheetList}
            />
          }
        </div>

      </div>
    </div>
  );
};