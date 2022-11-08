import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [state, setState] = useState([]);
  const [input, setInput] = useState([]);
  const [isImportant, setIsImportant] = useState(false);
  const notesURL = "http://localhost:3001/notes";
  useEffect(() => {
    setTimeout(() => {
      axios.get(notesURL).then((response) => {
        const notes = response.data;
        console.log(notes);
        setState(notes);
        setIsLoading(false);
      });
    }, 500);
  }, []);
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  // console.log(input);
  const eventhandle = () => {
    const newData = {
      date: new Date(),
      content: input,
      important: isImportant,
    };
    axios.post(notesURL, newData).then((response) => {
      // console.log(response);
      setState(state.concat(response.data));
    });
  };

  const upEvt = (id) => {
    // console.log(id);
    axios
      .put(`${notesURL}/${id}`, {
        date: new Date(),
        content: "Hello World!",
      })
      .then((response) => {
        setState(response.data);
      });
  };

  const delEvt = (id) => {
    // console.log(id);
    axios.delete(`${notesURL}/${id}`).then(() => {
      setState("");
    });
  };

  const impEvt = (id) => {
    console.log(id);
   
  };

  return (
    <>
      <section>
        <input onChange={(e) => setInput(e.target.value)} />
        <button onClick={eventhandle}>Submit</button>
      </section>
      {state === " " ? (
        <h1>please wait</h1>
      ) : (
        state.map((list) => {
          return (
            <ul key={list.id}>
              <li>Id: {list.id}</li>
              <li>Date: {list.date}</li>
              <li>Content: {list.content}</li>

              <button onClick={() => upEvt(list.id)}>update</button>
              <button onClick={() => delEvt(list.id)}>delete</button>
              <button onClick={() => impEvt(list.id)}>
                {list.important === true ? "Important" : "NotImportant"}
              </button>
            </ul>
          );
        })
      )}
    </>
  );
}

export default App;
