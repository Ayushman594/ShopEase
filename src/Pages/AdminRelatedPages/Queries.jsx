import Sidebar from '../../Components/Sidebar'
import {useEffect, useState} from 'react';
import Allservices from '../../Services/Services.jsx';
import './Queries.css'

function Queries() {
  const [queries, setQueries] = useState([]);
  useEffect(() => {
    const fetchQueries = async () => {
        const data = await Allservices.getAllServices('Contacts');
        setQueries(data);
    }
    fetchQueries();
    }, []);
   const handleDelete=async(id)=>{
       Allservices.deleteService("Contacts",id);
       setQueries(queries.filter((query)=>query.queryid!==id));
   }
  return (
    <div className="d-flex main-container">
      <Sidebar />
      <div className="  container mt-5">
        <h2>Queries</h2>
       <div className="table-responsive">
    <table className="query-table border border-dark">

        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phoneno</th>
                <th>Message</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            {queries.map((query) => (
                <tr key={query.queryid}>
                    <td>{query.queryid}</td>
                    <td>{query.name}</td>
                    <td>{query.email}</td>
                    <td>{query.phoneno}</td>
                    <td>{query.message}</td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(query.queryid)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>

    </table>
</div>
      </div>
    </div>
  )
}

export default Queries
