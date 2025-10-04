import { Container, Form, Button, Row, Col } from "react-bootstrap";
import CardBase from "./CardBase";
import { useState, useEffect } from "react";

const CardList = (props) => {
  const [filteredBooks, setFilteredBooks] = useState(props.books);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let filtered = props.books;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [props.books, selectedCategory, searchQuery]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = () => {
    // Search functionality is handled by useEffect
  };

  return (
    <>
      <Container id="cards-section" className="products-container">
        {/* Filter and Search Section */}
        <div className="filter-section mb-4">
          <Row className="align-items-center">
            <Col md={8}>
              <div className="category-filters d-flex flex-wrap gap-2">
                <Button
                  variant={
                    selectedCategory === "" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleCategoryFilter("")}
                  size="sm"
                >
                  Todas
                </Button>
                <Button
                  variant={
                    selectedCategory === "autoayuda"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleCategoryFilter("autoayuda")}
                  size="sm"
                >
                  Autoayuda
                </Button>
                <Button
                  variant={
                    selectedCategory === "comics"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleCategoryFilter("comics")}
                  size="sm"
                >
                  Comics
                </Button>
                <Button
                  variant={
                    selectedCategory === "computacion"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleCategoryFilter("computacion")}
                  size="sm"
                >
                  Computación
                </Button>
                <Button
                  variant={
                    selectedCategory === "ficcion"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleCategoryFilter("ficcion")}
                  size="sm"
                >
                  Ficción
                </Button>
                <Button
                  variant={
                    selectedCategory === "infantil"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleCategoryFilter("infantil")}
                  size="sm"
                >
                  Infantil
                </Button>
              </div>
            </Col>
            <Col md={4}>
              <div className="search-section d-flex">
                <Form.Control
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="me-2"
                />
                <Button variant="success" onClick={handleSearch}>
                  Buscar
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredBooks.map((book) => (
            <CardBase book={book} key={book.id} />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center mt-4">
            <p>No se encontraron libros que coincidan con tu búsqueda.</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default CardList;
