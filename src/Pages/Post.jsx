
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../authservice/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-6 sm:py-8 bg-[#F2F0EF]">
            <Container>

                {/* ✅ Responsive Image Container */}
                <div className="w-[80vw] h-[50vh] sm:w-[60vw] sm:h-[50ch] mx-auto mb-4 sm:mb-6 relative border border-[#BBBDBC] rounded-xl p-2 sm:p-3">
                    <img
                        src={appwriteService.getFileView(post.featuredimage)}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-3 top-3 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    bgColor="bg-[#245F73]"
                                    className="px-3 py-1.5 text-[#F2F0EF] text-sm hover:bg-[#733E24]"
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                bgColor="bg-[#733E24]"
                                className="px-3 py-1.5 text-[#F2F0EF] text-sm hover:bg-[#245F73]"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* ✅ Title */}
                <div className="w-full max-w-[70vw] mx-auto mb-4 sm:mb-6">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#245F73]">
                        {post.title}
                    </h1>
                </div>

                {/* ✅ Content */}
                <div className="w-full max-w-[70vw] mx-auto text-[#245F73] text-sm sm:text-base leading-relaxed">
                    {parse(post.content)}
                </div>

            </Container>
        </div>
    ) : null;
}
