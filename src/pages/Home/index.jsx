import { useEffect, useState, useRef } from "react";
import "./style.css";
import api from "../../services/api";
import Input from "../../components/input";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [btnDesabled, setBtnDesabled] = useState(false);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
  }

  function emptyInputserror() {
    setError(true);
    setErrorMessage("Preencha todos os campos!");
    const inputs = [inputName, inputAge, inputEmail];
    inputs.forEach((input) => {
      if (input.current.value === "") {
        input.current.classList.add("input-error");
      }
      setTimeout(() => {
        setError(false);
        input.current.classList.remove("input-error");
      }, 3000);
    });
  }

  async function createUsers() {
    if (
      inputName.current.value === "" ||
      inputAge.current.value === "" ||
      inputEmail.current.value === ""
    ) {
      emptyInputserror();
      setBtnDesabled(true);
      setTimeout(() => {
        setBtnDesabled(false);
      }, 3000);
      return;
    }
    try {
      await api.post("/usuarios", {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
      });
      getUsers();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(true);
        setErrorMessage("Email já cadastrado!");
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
    inputName.current.value = "";
    inputAge.current.value = "";
    inputEmail.current.value = "";
  }

  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (user) => {
    setEditData(user);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  async function handleSaveEdit() {
    await api.put(`/usuarios/${editData.id}`, editData);
    setShowModal(false);
    setEditData(null);
    getUsers();
  }
  function handleCancelEdit() {
    setShowModal(false);
    setEditData(null);
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);

    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de Usuário</h1>
        <Input type="text" name="name" placeholder="Nome*" ref={inputName} />
        <Input type="number" name="age" placeholder="Idade*" ref={inputAge} />
        <Input
          type="email"
          name="email"
          placeholder="Email*"
          ref={inputEmail}
        />
        <button type="button" className="submit" onClick={createUsers} disabled={btnDesabled}>
          Cadastrar
        </button>
        {error && <p className="error">{errorMessage}</p>}
      </form>

      <div className="users-container">
        {users.map((user) => (
          <div key={user.id} className="user">
            <div>
              <p>
                Nome: <span>{user.name}</span>
              </p>
              <p>
                Idade: <span>{user.age}</span>
              </p>
              <p>
                Email: <span>{user.email}</span>
              </p>
            </div>
            <div>
              <button className="edit" onClick={() => handleEdit(user)}>
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
              <button className="delete" onClick={() => deleteUsers(user.id)}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="overlay">
          <div className="modal">
            <h1>Editar Usuário</h1>
            <Input
              type="text"
              name="name"
              placeholder="Nome"
              value={editData.name}
              onChange={handleInputChange}
            />
            <Input
              type="number"
              name="age"
              placeholder="Idade"
              value={editData.age}
              onChange={handleInputChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={editData.email}
              onChange={handleInputChange}
            />
            <div className="buttons">
              <button className="cancel" onClick={handleCancelEdit}>
                Cancelar
              </button>
              <button className="save" onClick={handleSaveEdit}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;