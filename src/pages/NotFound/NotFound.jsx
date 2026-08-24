import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="not-found">
      <div>
        <span>404</span>

        <h1>Page Not Found</h1>

        <p>
          The page you're looking for doesn't exist.
        </p>

        <Link to="/">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;