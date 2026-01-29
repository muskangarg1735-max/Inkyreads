import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/getallbooks");
        setData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching all books:", error);
      }
    };
    fetch();
  }, []);

  // Filter books based on search term
  const filteredBooks = Data.filter((book) =>
    book.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white h-auto px-2 py-8">
      <h4 className="text-3xl text-black mb-4">All Books</h4>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by book name..."
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!Data.length && (
        <div className="h-screen flex items-center justify-center my-8">
          <Loader />
        </div>
      )}

      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default AllBooks;