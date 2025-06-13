
import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../authservice/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8 sm:py-10 bg-[#F2F0EF] min-h-screen">
      <Container>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#245F73] mb-6 sm:mb-8">
          Explore All Blog Posts
        </h1>

        {/* When posts are available */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-base sm:text-lg text-[#733E24] font-medium">
            No posts available yet.
          </p>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;