import React, { useEffect, useState } from "react";
import appwriteService from "../authservice/config";
import { Container, PostCard } from "../components/Index";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-12 sm:py-16 bg-[#F2F0EF] text-center h-[46.5vh] md:h-[65vh]">
        <Container>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#245F73]">
            Login to read posts
          </h1>
          <p className="text-base sm:text-lg text-[#733E24] mt-2 font-medium">
            Explore content by logging in to your account.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 sm:py-10 bg-[#F2F0EF]">
      <Container>
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#245F73] tracking-tight">
            Latest Posts
          </h1>
          <p className="text-base sm:text-lg text-[#733E24] mt-2 font-medium">
            Read the latest articles from our community
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
