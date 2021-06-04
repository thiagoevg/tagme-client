import { Link } from "react-router-dom"

import miniLogo from '../../images/logo-coco-bambu-mini.png'
import iconLogin from '../../images/icon-login.png'

function Navbar({ handleSearch, searchWord }) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="ms-3">
        <Link className="navbar-brand" to="/">
          <img src={miniLogo} alt="" width="100" />
        </Link>
      </div>
      <div className="d-flex col-5 me-3">
        <input
          placeholder="Buscar Receita..."
          style={{ fontStyle: "italic", fontSize: "12px" }}
          type="text"
          className="form-control shadow-none no-border me-3"
          id="searchWord"
          name="searchWord"
          onChange={handleSearch}
          value={searchWord}
        />
        <div>
          <img src={iconLogin} alt="" width="20" />
          <small className="d-flex justify-content-center" style={{ color: "white", fontSize: "8px" }}>Sair</small>
        </div>
      </div>
    </nav>
  )
}

export default Navbar