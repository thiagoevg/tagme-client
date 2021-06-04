function Navbar({ handleSearch, searchWord }) {
  return (<input
    placeholder="Buscar Receita..."
    style={{ fontStyle: "italic" }}
    type="text"
    className="w-50 form-control shadow-none no-border"
    id="searchWord"
    name="searchWord"
    onChange={handleSearch}
    value={searchWord}
  />)
}

export default Navbar