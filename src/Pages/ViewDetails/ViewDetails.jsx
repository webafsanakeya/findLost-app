import React from 'react';
import { Link, useLoaderData } from 'react-router';

const ViewDetails = () => {

    const {    title,
    postType,
    location,
    category,
    description,
    date,
    image,
    contact,
    userName
    } = useLoaderData();

     const buttonLabel = postType === 'Lost' ? 'Found This!' : 'This is Mine!';

   
   
    return (
            <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <img src={image} alt={title} className="w-full h-64 object-cover rounded mb-4" />
      <p><strong>Post Type:</strong> {postType}</p>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Posted By:</strong> {userName}</p>
      <p><strong>Contact Info:</strong> {contact}</p>

      <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition">
        {buttonLabel}
      </button>
      <Link>
      <button>
        Submit</button></Link>
    </div>
    );
};

export default ViewDetails;