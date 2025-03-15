import { Button } from "react-bootstrap";
import "../Pagination/pagination.scss";

export const Pagination = ({ page, handlePageChange, totalPages }) => {
  return (
    <div className="pagination">
      <Button
        variant="outline-secondary"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </Button>

      <span style={{ margin: "10px 20px" }}>
        Page: {page}/{totalPages}
      </span>

      <Button
        variant="outline-secondary"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};
