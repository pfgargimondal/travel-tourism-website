export const Meal = () => {
  return (
    <div className="duinweuirhwer rounded-2 border p-3 d-flex gap-3">
        <div className="idnieuhrewr position-relative rounded-1 overflow-hidden">
            <img src="/images/insta8.png" alt="" className="img-fluid w-100 object-fit-cover h-100" />

            <img src="/images/veg.png" style={{ width: "1rem" }} className="img-fluid bg-white m-1 position-absolute bottom-0 start-0" alt="" />
        </div>

        <div className="diheifsdf">
            <p className="mb-2" style={{ fontWeight: 600 }}>6E Eats Choice Of The Day (Veg) + Beverage of choice</p>

            <div className="oidmejwijrwer d-flex align-items-center justify-content-between">
                <h6 className="mb-0"><b>400</b></h6>

                <button className="bg-white border-primary rounded-1 py-1 text-primary btn">ADD</button>
            </div>
        </div>
    </div>
  )
}