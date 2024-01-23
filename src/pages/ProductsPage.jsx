export const ProductsPage = () => {

  

  return(
    <>
      <div className="container-sm">

<h2 className="my-3"> Insumos  </h2>
<hr />
<NewFabricModal />
<Seeker />

<section className="container row">

  {/* <div className="d-flex justify-content-center"> */}

  {
    supplies.map(({ codigoDistribuidor, color, tipo, distribuidor, temporada, id, idDistribuidor, stock, img }) => (
      <FabricCard
        key={id}
        codigoDistribuidor={codigoDistribuidor}
        color={color}
        tipo={tipo}
        distribuidor={distribuidor}
        temporada={temporada}
        idDistribuidor={idDistribuidor}
        id={id}
        img={img}
        stock={stock}
      />
    ))
  }
  {/* </div> */}

</section>
</div>
    </>
  )
}