import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoApp = () => {
    const [value, setValue] = useState('');
    const [list, setList] = useState([]);

    function handleChange(e) {
        setValue(e.target.value);
    }

    function handleSubmit() {
        if (value === "") {
            alert("Enter something....!")
        } else {
            const currentDate = new Date().toLocaleDateString();
            setList([...list, { id: Math.floor(Math.random() * Date.now()), value, date: currentDate, complete: false }]);
            setValue('');
        }
    }

    function handleComplete(id) {
        const updatedList = list.map(item => {
            if (item.id === id) {
                return { ...item, complete: !item.complete };
            }
            return item;
        });
        setList(updatedList);
    }

    function handleRemove(id) {
        const item = list.find(item => item.id === id);
        if (!item.complete) {
            alert("The task is completed, so you cannot remove it.");
        } else {
            const updatedList = list.filter(item => item.id !== id);
            setList(updatedList);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 col-sx-6">
                    <input
                        type="text"
                        placeholder="Enter the thing"
                        onChange={handleChange}
                        value={value}
                        className="form-control"
                    />
                </div>
                <div className="col-md-6 col-sm-6">
                    <button type="button" onClick={handleSubmit} className="btn btn-primary">
                        Add
                    </button>
                </div>
            </div>
            <div className="mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Tasks Description</th>
                            <th>Status</th>
                            <th>CreatedAt</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.value}</td>
                                <td>
                                    <button onClick={() => handleComplete(item.id)} className={`btn ${item.complete ? "btn-success" : "btn-danger"}`}>
                                        {item.complete ? "Complete" : "Incomplete"}
                                    </button>
                                </td>
                                <td>{item.date}</td>
                                <td>
                                    <button onClick={() => handleRemove(item.id)} disabled={!item.complete} className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TodoApp;
