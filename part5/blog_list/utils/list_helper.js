const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, elem) => sum + elem.likes, 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length <= 0) {
        return {}
    }

    const favourite = blogs.reduce((max, elem) => (elem.likes > max.likes) ? elem : max)
    const selectProps = ({title, author, likes}) => {return {title, author, likes}}
    return selectProps(favourite)
}

const getUniqueAuthors = (blogs) => {
    return [...new Set(blogs.map(b => b.author))]
}

const mostBlogs = (blogs) => {
    if (blogs.length <= 0) {
        return {}
    }

    let uniqueAuthors = getUniqueAuthors(blogs).map((authorName) => {return {author: authorName}})

    uniqueAuthors = uniqueAuthors.map((author) => {
        const authorBlogsNo = blogs.reduce((n, blog) => {
            if (author.author === blog.author) {
                return n + 1
            } else {
                return n
            }
        }, 0)
        return {...author, blogs: authorBlogsNo}
    })

    return uniqueAuthors.reduce((maxBlogsAuthor, author) => (author.blogs > maxBlogsAuthor.blogs) ? author : maxBlogsAuthor)
}

const mostLikes = (blogs) => {
    if (blogs.length <= 0) {
        return {}
    }

    let uniqueAuthors = getUniqueAuthors(blogs).map((authorName) => {return {author: authorName}})

    uniqueAuthors = uniqueAuthors.map((author) => {
        const authorLikesNo = blogs.reduce((n, blog) => {
            if (author.author === blog.author) {
                return n + blog.likes
            } else {
                return n
            }
        }, 0)
        return {...author, likes: authorLikesNo}
    })

    return uniqueAuthors.reduce((maxLikesAuthor, author) => (author.likes > maxLikesAuthor.likes) ? author : maxLikesAuthor)
}

module.exports = {dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes}
