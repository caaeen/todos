import React, { useState } from 'react';

const Card = ({ id, data, onChange }) => {
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(data);

    const deletes = async () => {
        try {
            await fetch(`http://localhost:5000/delete/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
      
            if (onChange) onChange();
        } catch (error) {
            console.log(error);
        }
    };

    const edits = async () => {
        if (!editMode) {
            setEditMode(true);
        } else {
            setEditMode(false);
            try {
                const body = { todo: text };
                await fetch(`http://localhost:5000/update/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                
                });
                console.log(body);
                if (onChange) onChange();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className='w-full shadow justify-between bg-white min-h-[90px] flex gap-2 p-2 rounded-sm hover:scale-105 ease duration-200'>
            <div className='w-full'>
                <textarea
                    className='w-full max-h-[150px] p-2'
                    value={text}
                    disabled={!editMode}
                    onChange={e => setText(e.target.value)}
                />
            </div>
            <div className='flex flex-row gap-2'>
                <button
                    onClick={edits}
                    className='bg-gray-500/20 px-2 h-[30px] rounded-sm py-1 cursor-pointer hover:bg-gray-500 hover:text-white ease duration-200'
                >
                    {editMode ? "Save" : "Edit"}
                </button>
                <button
                    onClick={deletes}
                    className='bg-red-500/20 px-2 h-[30px] rounded-sm py-1 cursor-pointer hover:bg-red-500 hover:text-white ease duration-200'
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Card;