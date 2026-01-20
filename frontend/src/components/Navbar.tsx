import icon from "../assets/iconprod.svg"
export const Navbar = () => {
  return (
    <>
  
   <nav className="navbar navbar-light bg-dark">
  <div className="container">
    <a className="navbar-brand d-flex " href="# ">
           <img src={icon} alt="logo" width={40} height={40} />
    </a>
   
  </div>
</nav>

    </>
  )
}
