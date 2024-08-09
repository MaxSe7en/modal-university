import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ProgrammeSettings.module.css";
import { admin_base_url } from "@/Utils/endpoints";

interface Programme {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

const ProgrammeSettings = () => {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [newProgramme, setNewProgramme] = useState({
    name: "",
    description: "",
  });
  const [editProgrammeId, setEditProgrammeId] = useState<number | null>(null);
  const [editProgrammeData, setEditProgrammeData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("adminTz");

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const fetchProgrammes = async () => {
    try {
      const response = await axios.get(`${admin_base_url}/programmes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setProgrammes(response.data);
    } catch (error) {
      setError("Error fetching programmes.");
    }
  };

  const handleAddProgramme = async () => {
    try {
      const response = await axios.post(
        `${admin_base_url}/programmes`,
        newProgramme,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProgrammes([...programmes, response.data]);
      setNewProgramme({ name: "", description: "" });
    } catch (error) {
      setError("Error adding programme.");
    }
  };

  const handleEditProgramme = (programme: Programme) => {
    setEditProgrammeId(programme.id);
    setEditProgrammeData({
      name: programme.name,
      description: programme.description,
    });
  };

  const handleCancelEdit = () => {
    setEditProgrammeId(null);
    setEditProgrammeData({ name: "", description: "" });
  };

  const handleUpdateProgramme = async () => {
    try {
      const response = await axios.put(
        `${admin_base_url}/programmes/${editProgrammeId}`,
        editProgrammeData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProgrammes(
        programmes.map((prog) =>
          prog.id === editProgrammeId ? response.data : prog
        )
      );
      handleCancelEdit();
    } catch (error) {
      setError("Error updating programme.");
    }
  };

  const handleRemoveProgramme = async (id: number) => {
    try {
      await axios.delete(`${admin_base_url}/programmes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setProgrammes(programmes.filter((prog) => prog.id !== id));
    } catch (error) {
      setError("Error removing programme.");
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      const response = await axios.patch(
        `${admin_base_url}/programmes/${id}/toggle`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProgrammes(
        programmes.map((prog) => (prog.id === id ? response.data : prog))
      );
    } catch (error) {
      setError("Error toggling programme status.");
    }
  };

  return (
    <div className={styles.programmeSettings}>
      <h2>Programmes</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.addProgramme}>
        <input
          type="text"
          value={newProgramme.name}
          onChange={(e) =>
            setNewProgramme({ ...newProgramme, name: e.target.value })
          }
          placeholder="Enter programme name"
        />
        <textarea
          value={newProgramme.description}
          onChange={(e) =>
            setNewProgramme({ ...newProgramme, description: e.target.value })
          }
          placeholder="Enter programme description"
        />
        <button onClick={handleAddProgramme}>Add Programme</button>
      </div>
      <ul className={styles.programmeList}>
        {programmes.map((programme) => (
          <li
            key={programme.id}
            className={programme.isActive ? styles.activeProgramme : ""}
          >
            {editProgrammeId === programme.id ? (
              <>
                <input
                  type="text"
                  value={editProgrammeData.name}
                  onChange={(e) =>
                    setEditProgrammeData({
                      ...editProgrammeData,
                      name: e.target.value,
                    })
                  }
                />
                <textarea
                  value={editProgrammeData.description}
                  onChange={(e) =>
                    setEditProgrammeData({
                      ...editProgrammeData,
                      description: e.target.value,
                    })
                  }
                />
                <button onClick={handleUpdateProgramme}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{programme.name}</h3>
                <p>{programme.description}</p>
                {programme.isActive && (
                  <span className={styles.activeTxt}>Active</span>
                )}
                <div className={styles.programmeActions}>
                  <button
                    onClick={() => handleEditProgramme(programme)}
                    className={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleActive(programme.id)}
                    className={styles.toggleActiveBtn}
                  >
                    {programme.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleRemoveProgramme(programme.id)}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgrammeSettings;
