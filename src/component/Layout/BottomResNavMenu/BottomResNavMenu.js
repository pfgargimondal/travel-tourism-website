import "./BottomResNavMenu.css";



export const BottomResNavMenu = () => {
  return (
    <div className="bottom-res-nav-menu d-flex align-items-center justify-content-center bg-white position-fixed bottom-0 start-0 end-0">
      <div className="res-nav-menus">
        <i class="bi mb-1 bi-house-door-fill"></i>

        <span>Home</span>
      </div>

      <div className="res-nav-menus">
        <i class="bi mb-1 bi-backpack2-fill"></i>

        <span>My Trips</span>
      </div>

      <div className="res-nav-menus">
        <i class="bi mb-1 bi-search-heart-fill"></i>

        <span>MCT</span>
      </div>

      <div className="res-nav-menus">
        <i class="bi mb-1 bi-person-fill"></i>
        
        <span>Profile</span>
      </div>

      <div className="res-nav-menus">
        <i class="bi mb-1 bi-bag-heart-fill"></i>

        <span>Cart</span>
      </div>
    </div>
  )
}