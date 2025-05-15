import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: 500,
    margin: 'auto',
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    borderRadius: 12,
    boxShadow: '0 0 16px rgb(255, 1, 1)',
    color: '#fff',
  },
  todoItem: {
    margin: '10px 0',
    padding: '10px 15px',
    borderRadius: 10,
    transition: 'all 1s ease',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgb(3, 221, 255)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoText: {
    marginLeft: 12,
    flexGrow: 1,
    fontSize: 18,
    transition: 'color 0.3s ease',
  },
  button: {
    padding: '8px 16px',
    marginLeft: 12,
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 16,
    transition: 'all 0.3s ease',
  },
  addButton: {
    backgroundColor: '#ff6f61',
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#ff3b3b',
    color: '#fff',
  },
  checkbox: {
    width: 20,
    height: 20,
    cursor: 'pointer',
  },
  input: {
    width: '70%',
    padding: 10,
    fontSize: 18,
    borderRadius: 8,
    border: 'none',
    outline: 'none',
  },
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [hoveredId, setHoveredId] = useState(null);

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1
        style={{
          animation: 'colorPulse 3s infinite alternate, slideDown 1s ease forwards',
          textAlign: 'center',
          marginBottom: 30,
          userSelect: 'none',
          fontSize: 36,
          fontWeight: '900',
          textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        Todo List
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new todo"
          style={styles.input}
          onKeyDown={e => { if (e.key === 'Enter') addTodo(); }}
        />
        <button
          onClick={addTodo}
          style={{ ...styles.button, ...styles.addButton }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ff856f'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ff6f61'}
        >
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => {
          const isHovered = hoveredId === todo.id;
          return (
            <li
              key={todo.id}
              style={{
                ...styles.todoItem,
                backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.15)',
                color: todo.completed ? '#bbb' : '#fff',
                textDecoration: todo.completed ? 'line-through' : 'none',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={() => setHoveredId(todo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={styles.checkbox}
              />
              <span style={styles.todoText}>{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  ...styles.button,
                  ...styles.deleteButton,
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(20px)',
                  transition: 'all 0.3s ease',
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <style>{`
        @keyframes colorPulse {
          0% { color: #ff6f61; }
          50% { color: #ffb88c; }
          100% { color: #ff6f61; }
        }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;
