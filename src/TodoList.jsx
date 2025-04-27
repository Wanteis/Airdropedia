import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const TodoList = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch tasks from Supabase
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setTodos(data || []);
        setLoading(false);
      });
  }, [user]);

  // Add task to Supabase
  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user) return;
    setLoadingAdd(true);
    setError('');
    const { data, error } = await supabase.from('tasks').insert([
      { user_id: user.id, title: input, completed: false }
    ]).select();
    if (error) setError(error.message);
    else if (data && data[0]) setTodos([data[0], ...todos]);
    setInput('');
    setLoadingAdd(false);
  };

  // Toggle completion in Supabase
  const toggleTodo = async (idx) => {
    const todo = todos[idx];
    setLoading(true);
    setError('');
    const { data, error } = await supabase
      .from('tasks')
      .update({ completed: !todo.completed })
      .eq('id', todo.id)
      .eq('user_id', user.id)
      .select();
    if (error) setError(error.message);
    else if (data && data[0]) setTodos(
      todos.map((t, i) => i === idx ? data[0] : t)
    );
    setLoading(false);
  };

  // Remove from Supabase
  const removeTodo = async (idx) => {
    const todo = todos[idx];
    setLoading(true);
    setError('');
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', todo.id)
      .eq('user_id', user.id);
    if (error) setError(error.message);
    else setTodos(todos.filter((_, i) => i !== idx));
    setLoading(false);
  };


  return (
    <div className="bg-[#181f33] p-6 rounded-xl shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-[#8bb6f9]">My To-Do List</h2>
      {error && (
        <div className="mb-2 text-red-400 text-sm">{error}</div>
      )}
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 rounded-lg bg-[#232b47] text-white border border-[#232b47] focus:outline-none"
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loadingAdd}
        />
        <button
          type="submit"
          className="bg-accent2 text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent transition"
          disabled={!input.trim()}
        >
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {todos.map((todo, idx) => (
          <li
            key={idx}
            className={`flex items-center justify-between px-3 py-2 rounded-lg bg-[#232b47] ${todo.completed ? 'opacity-60 line-through' : ''}`}
          >
            <span
              className="flex-1 cursor-pointer"
              onClick={() => toggleTodo(idx)}
            >
              {todo.title}
            </span>
            <button
              className="ml-4 text-red-400 hover:text-red-600"
              onClick={() => removeTodo(idx)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
