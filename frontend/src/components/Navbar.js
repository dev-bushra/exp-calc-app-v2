import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import jsonToXlsx from "json-as-xlsx";
import xlsx from "json-as-xlsx";

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  const handleExportToExcel = () => {
    if (typeof jsonToXlsx !== "function") {
      console.error("jsonToXlsx is not defined");
      return;
    }

    const excelData = [
      {
        sheet: "Sheet 1",
        data:  [
          { name: "John", age: 30, city: "New York" },
          { name: "Alice", age: 25, city: "Los Angeles" },
          { name: "Bob", age: 35, city: "Chicago" },
        ],
      },
    ];

    // generate excel file
    jsonToXlsx(excelData, { filename: "exported-data.xlsx" }, (err, data) => {
      if (err) {
        console.error("Error generating Excel file:", err);
        return;
      }

      // create a blob object from the Excel data
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "exported-data.xlsx";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  };
  

  return (
    <header>
      <div className="container">
        <Link to="/" className="justify_between">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/XELogo_RGB.svg/1200px-XELogo_RGB.svg.png"
            width={24}
            height={24}
            style={{ marginRight: "1rem" }}
          />
          <h3 className="app-title">Expense Calculator</h3>
        </Link>
        <img
          src="https://cdn-icons-png.flaticon.com/512/6565/6565893.png"
          width={24}
          height={24}
          className="cursor_pointer"
          onClick={handleExportToExcel}
        />
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar