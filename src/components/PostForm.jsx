


// PostForm.jsx
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../components/index";
import appwriteService from "../authservice/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredimage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : post.featuredimage,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            if (!userData || !userData.$id) {
                alert("User not logged in.");
                return;
            }

            const file = await appwriteService.uploadFile(data.image[0]);
            console.log(" Uploaded file object:", file);

            if (file) {
                const fileId = file.$id;
                data.featuredimage = fileId;

                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                });
                console.log(" Post Created:", dbPost);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-4 sm:gap-6 bg-[#F2F0EF] p-4 sm:p-6 rounded-xl border border-[#BBBDBC]">
            <div className="w-full lg:w-2/3 px-2 flex flex-col">
                <Input
                    label="Title :"
                    placeholder="Enter post title"
                    className="mb-4 w-full bg-white text-[#245F73] border-[#BBBDBC] rounded-lg px-4 py-2 text-base sm:text-lg"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Enter slug"
                    className="mb-4 w-full bg-white text-[#245F73] border-[#BBBDBC] rounded-lg px-4 py-2 text-base sm:text-lg"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE 
                    label="Content :" 
                    name="content" 
                    control={control} 
                    defaultValue={getValues("content")} 
                    className="bg-white text-[#245F73] border-[#BBBDBC] rounded-lg flex-grow"
                />
            </div>
            <div className="w-full lg:w-1/3 px-2 flex flex-col gap-4">
                <div className="flex-col  sm:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            label="Featured Image :"
                            type="file"
                            className="text-[#245F73] text-sm sm:text-base"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                    </div>
                    <div className="flex-1">
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="w-full bg-white text-[#245F73] border-[#BBBDBC] rounded-lg px-4 py-2 text-sm sm:text-base mt-3"
                            {...register("status", { required: true })}
                        />
                    </div>
                </div>
                {post && (
                    <div className="w-full">
                        <img
                            src={appwriteService.getFileView(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg w-full h-32 sm:h-40 object-cover"
                        />
                    </div>
                )}
                <Button 
                    type="submit" 
                    bgColor="bg-[#245F73]" 
                    className="w-full px-4 py-2 text-[#F2F0EF] text-sm sm:text-base font-medium rounded-lg hover:bg-[#733E24] transition-all duration-300"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}