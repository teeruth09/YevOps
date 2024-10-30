import { useState } from 'react'
import { Link } from 'react-router-dom'

const CreatePostPage = () => {
  const [posts, setPosts] = useState([]) // State to store posts
  const [formData, setFormData] = useState({
    order_picture: '',
    detail: '',
  })

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const newPost = {
      ...formData,
      id: posts.length + 1, // Assuming unique ID for each post
      date: new Date().toLocaleDateString(),
      client_profile:
        'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg', // Default profile image
    }
    setPosts([...posts, newPost]) // Add new post to the posts array
    setFormData({ order_picture: '', detail: '' }) // Reset form
  }

  return (
    <div>
      <div className='flex flex-col items-center'>
        <Link to='/post'>
          <div className='fixed left-8 top-16 w-20 h-20 text-black text-[36px] rounded-full flex items-center justify-center text-center'>
            {'<'}
          </div>
        </Link>
        <h1 className='my-4 text-3xl font-bold'>Create Post</h1>

        {/* Form for creating a post */}
        <form onSubmit={handleSubmit} className='w-full max-w-2xl p-6'>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-lg font-bold mb-2'
              htmlFor='order_picture'
            >
              Picture
            </label>
            <input
              type='file'
              name='order_picture'
              onChange={(e) => {
                const file = e.target.files[0]
                setFormData({ ...formData, order_picture: file.name })
                const reader = new FileReader()
                reader.onload = (e) => {
                  setFormData({ ...formData, order_picture: e.target.result })
                }
                reader.readAsDataURL(file)
              }}
              required
              className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Upload a picture'
            />
          </div>

          <div className='mb-6'>
            <label
              className='block text-gray-700 text-lg font-bold mb-2'
              htmlFor='detail'
            >
              Details
            </label>
            <textarea
              name='detail'
              value={formData.detail}
              onChange={handleChange}
              required
              className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter details about your order'
              rows='4'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-lg'
          >
            Create Post
          </button>
        </form>

        {/* Display posts */}
        {/* <div className="mt-8 w-full flex flex-col items-center">
          {posts.map((post) => (
            <PostCard key={post.id} orderInfo={post} />
          ))}
        </div> */}
      </div>
    </div>
  )
}

export default CreatePostPage
