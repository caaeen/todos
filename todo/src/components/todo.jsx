import {React, useState, useEffect} from 'react'
import Card from './util/card.jsx';

const Todo = () => {
    const [todo, setTodo] = useState("");
    const [showTodo, setShowTodo] = useState([]);




    const handleAddTodo = async () => {
        if(todo.length > 0){
            try {
                const body = { todo };
                const res = await fetch("http://localhost:5000/todos",{
                    method: "POST",
                    headers:{ "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                setTodo(todo => "");
                getTodo();
            } catch (error) {
                console.log(error);
                
            }
        }else{
            alert("Please enter a todo");
        }
    }


    const getTodo = async () =>{
        try {
            const res = await fetch("http://localhost:5000/show");
            const data = await res.json();
            setShowTodo(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getTodo();
    }, [])


  return (
    <div className='w-svw  min-h-svh flex justify-center bg-gray-100' >
        <div className='lg:w-1/2 flex flex-col gap-10 p-10'>
            <div className=''>
                <b className='text-2xl'>Todo</b><br /> <br />
                <input onChange={(e)=>setTodo((data)=>e.target.value)} value={todo} type="text" placeholder='Whats up?' className='border outline-none border-gray-300 px-2 py-1 rounded-sm mr-3' />
                <button onClick={handleAddTodo} className='bg-gray-500/20 px-2 rounded-sm py-1 cursor-pointer hover:bg-gray-500 hover:text-white ease duration-200'>Add</button>
            </div>
            <div className=' w-full h-full flex flex-col gap-4'>
                {showTodo.map((data) => (
                    <Card key={data.todo_id} id={data.todo_id} data={data.description} setTodo={setTodo}  onChange={getTodo} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Todo