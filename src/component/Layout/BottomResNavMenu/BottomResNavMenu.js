import "./BottomResNavMenu.css";



export const BottomResNavMenu = () => {
  return (
    <div className="bottom-res-nav-menu d-flex align-items-center justify-content-center bg-white position-fixed bottom-0 start-0 end-0">
      <div className="res-nav-menus active">
        <i className="bi mb-1 bi-house-door-fill"></i>

        <span>Home</span>
      </div>

      <div className="res-nav-menus">
        <i className="bi mb-1 bi-backpack2-fill"></i>

        <span>My Trips</span>
      </div>

      <div className="res-nav-menus bg-white">
        <div className="dweiojrwerwer mx-auto position-relative rounded-circle">
          <i className="bi mb-1 bi-search-heart-fill top-50 start-50 position-absolute"></i>
        </div>

        <img src="./images/logomini.png" className="img-fluid" alt="" />
      </div>

      <div className="res-nav-menus">
        <i className="bi mb-1 bi-person-fill"></i>
        
        <span>Profile</span>
      </div>

      <div className="res-nav-menus">
        <div className="diweurwer position-relative">
          <i className="bi mb-1 bi-bag-heart-fill"></i>

          <span className="position-absolute rounded-circle text-white">1</span>
        </div>

        <span>Cart</span>
      </div>
    </div>
  )
}