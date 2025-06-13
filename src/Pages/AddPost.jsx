
// AddPost.jsx
import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='sm:py-5 bg-[#F2F0EF] min-h-screen'>
        <Container>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#245F73] mb-4 sm:mb-8 tracking-tight">
                Create a New Post
            </h1>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost