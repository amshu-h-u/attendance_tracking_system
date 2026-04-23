import { useEffect, useState } from "react";
import API from "../api/axios";

export default function TrainerDashboard() {
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState("");
  const [batchName, setBatchName] = useState("");

  const token = localStorage.getItem("token");



  const fetchBatches = async () => {
    try {
      const res = await API.get("/batches", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      setBatches(res.data);
    } 
    
    catch (err) {
      console.error(err);
      setError("Failed to load batches");
    }
  };

  const createBatch = async () => {
    try {
      if (!batchName) {
        alert("Enter batch name");
        return;
      }

      await API.post(
        "/batches",
        { name: batchName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Batch created ");
      setBatchName("");
      fetchBatches(); 
    } catch (err) {
      console.error(err);
      alert("Failed to create batch ");
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  return (
    <div>
      <h2>Trainer Dashboard</h2>

      
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter batch name"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
        />
        <button onClick={createBatch}>Create Batch</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {batches.length === 0 && !error && <p>No batches found</p>}
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
          <p>Batch ID: {b._id}</p>
        </div>
      ))}
    </div>
  );
}