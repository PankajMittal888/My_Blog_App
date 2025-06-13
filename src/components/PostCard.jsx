
import React from 'react';
import appwriteService from "../authservice/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-[#F2F0EF] rounded-2xl p-4 shadow-md hover:shadow-xl transition duration-300 border border-[#BBBDBC]">
      
        <div className="w-full aspect-[4/3] overflow-hidden rounded-xl mb-4">
          <img
            src={appwriteService.getFileView(featuredimage)}
            alt={title || "Post image"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

    
        <h2 className="text-base sm:text-lg font-semibold text-[#245F73] line-clamp-2 hover:text-[#733E24] transition-colors duration-200">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
