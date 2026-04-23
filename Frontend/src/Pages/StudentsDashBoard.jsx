import { useEffect, useState } from "react";
import API from "../api/axios";

export default function StudentsDashboard() {
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState("");

  
  const fetchBatches = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/batches", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("BATCHES:", res.data); 
      setBatches(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load batches");
    }
  };

  const joinBatch = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(`/batches/join/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Joined successfully ");
      fetchBatches(); 
    } catch (err) {
      console.error(err);
      alert("Failed to join ");
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  return (

    <div>
      <h2>Student Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {batches.length === 0 && !error && (
        <p>No batches available</p>
      )}

    
      {batches.map((b) => (
        <div
          key={b._id}
          style={{
            border: "1px solid black",
            margin: 10,
            padding: 10,
          }}
        >
          <h3>{b.name}</h3>

          <button onClick={() => joinBatch(b._id)}>
            Join Batch
          </button>
        </div>
      ))}

    </div>

  );
}