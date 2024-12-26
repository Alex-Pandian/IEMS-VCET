import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

const Create = () => {
    const [inputevent, Setinputevent] = useState({title:'', description:'', starting_date:'', ending_date:'', time:'', venue:'', brochure_path:''});
    const [file, setFile] = useState(null);
    const { faculty_id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        Setinputevent((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        const { title, description, starting_date, ending_date, time, venue } = inputevent;
        formData.append('faculty_id', faculty_id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('starting_date', starting_date);
        formData.append('ending_date', ending_date);
        formData.append('time', time);
        formData.append('venue', venue);
        console.log(formData);
        try {
            console.log('works');
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/events/add`, {
                method: "POST",
                credentials: "include",
                body: formData
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            console.log(data);
            console.log('Success');
            Setinputevent({title:'', description:'', starting_date:'', ending_date:'', time:'', venue:'', brochure_path:''});
            setFile(null);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-90 mt-0" style={{ maxWidth: '800px', width: '100%' }}>
            <form className="text-center shadow p-3 d-flex flex-column gap-3 m" style={{ width: '100%' }} onSubmit={handleSubmit}>
                <h2>Event Creation Form</h2>
                <div className="form-group d-inline-flex">
                    <label htmlFor="title" className="col-2">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={inputevent.title} onChange={handleChange} placeholder="Title" required />
                </div>
                <div className="form-group d-inline-flex">
                    <label htmlFor="desc" className="col-2">Description</label>
                    <textarea rows="5" className="form-control" id="desc" name='description' value={inputevent.description} onChange={handleChange} placeholder="Description" required></textarea>
                </div>
                <div className="form-group d-inline-flex">
                    <label htmlFor="sdate" className="col-2">Start Date</label>
                    <input type="date" className="form-control" id="sdate" name='starting_date' value={inputevent.starting_date} onChange={handleChange} required/>
                    <label htmlFor="edate" className="col-2">End Date</label>
                    <input type="date" className="form-control" id="edate" name='ending_date' value={inputevent.ending_date} onChange={handleChange} required/>
                </div>
                <div className="form-group d-inline-flex">
                    <label htmlFor="time" className="col-2">Time</label>
                    <input type="time" className="form-control" id="time" name='time' value={inputevent.time} onChange={handleChange} required/>
                </div>
                <div className="form-group d-inline-flex">
                    <label htmlFor="venue" className="col-2">Venue</label>
                    <input type="text" className="form-control" id="venue" name='venue' value={inputevent.venue} onChange={handleChange} placeholder="Enter Venue" required/>
                </div>
                <div className="form-group d-inline-flex">
                    <label htmlFor="brochure" className="col-2">Upload Brochure</label>
                    <input type="file" className="form-control-file" id="brochure" name='brochure_path' onChange={handleFileChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    );
};

export default Create;