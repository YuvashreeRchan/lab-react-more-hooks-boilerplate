import {useReducer, useRef} from 'react';

const initialState = {
  tasks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { id: Date.now(), text: action.payload, hidden: false }],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, hidden: !task.hidden } : task
        ),
      };
    default:
      return state;
  }
}

function TaskHooks() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const inputValRef = useRef(null);

  const addTask = () => {
    const task = inputValRef.current.value;
    if (task.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: task });
      inputValRef.current.value = '';
    }
  };

  const toggleTask = id => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const scrollToInput = () => {
    inputValRef.current.focus();
  };


  return (
    <div style={{ padding: '20px' }}>
      <input ref={inputValRef} type="text" style={{ marginBottom: '10px',height: '30px',marginRight: '15px'}} />
      <button onClick={addTask} style={{backgroundColor: '#FFAC33'}}>Add Task</button>
      <div style={{ marginTop: '10px' }}>
        {state.tasks.map(task => (
          <div key={task.id} style={{ backgroundColor: '#FFE4B2', padding: '10px', marginBottom: '10px' }}>
            {task.hidden ? (
                <span>Task is Hidden</span>
            ) : (
              <span>{task.text}</span>
              )}
              <button onClick={() => toggleTask(task.id)} style={{ marginLeft: '15px'}}>Toggle</button>
          </div>
        ))}
      </div>
      <button onClick={scrollToInput} style={{ marginTop: '10px',backgroundColor: '#FFAC33' }}>Scroll to Input</button>
    </div>
  )
}

export default TaskHooks;