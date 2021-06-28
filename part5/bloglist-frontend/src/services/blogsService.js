import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async(blog) => {
    const config = {headers: {authorization: token}}
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const updateLikes = async(blogId, likes) => {
    const config = {headers: {authorization: token}}
    const response = await axios.put(`${baseUrl}/${blogId}`, {likes}, config)
    return response.data
}

const deleteBlog = async(blogId) => {
    const config = {headers: {authorization: token}}
    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response.data
}

const blogsService = {setToken, getAll, create, updateLikes, deleteBlog}
export default blogsService
