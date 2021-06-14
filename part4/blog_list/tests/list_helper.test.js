const listHelper = require('../utils/list_helper')

const emptyBlogs = []
const oneBlogs = [{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
}]
const manyBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

describe('dummy', () => {
    test('dummy returns one', () => {
        const result = listHelper.dummy(emptyBlogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {
    test('total likes of empty list is 0', () => {
        const result = listHelper.totalLikes(emptyBlogs)
        expect(result).toBe(0)
    })

    test('total likes of list with one blog is the number of likes of that blog', () => {
        const result = listHelper.totalLikes(oneBlogs)
        expect(result).toBe(5)
    })

    test('total likes of list with many blogs is the sum of the likes of the blogs', () => {
        const result = listHelper.totalLikes(manyBlogs)
        expect(result).toBe(36)
    })
})

describe('favourite blog', () => {
    test('favourite blog of empty list is empty object', () => {
        const result = listHelper.favouriteBlog(emptyBlogs)
        expect(result).toEqual({})
    })

    test('favourite blog of list with one blog is that blog', () => {
        const result = listHelper.favouriteBlog(oneBlogs)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('favourite blog of list with many blogs is the first one with most likes',  () => {
        const result = listHelper.favouriteBlog(manyBlogs)
        expect(result).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })
})

describe('most blogs', () => {
    test('author with most blogs of empty list is empty object', () => {
        const result = listHelper.mostBlogs(emptyBlogs)
        expect(result).toEqual({})
    })

    test('author with most blogs of list with one blog is the author of that blog', () => {
        const result = listHelper.mostBlogs(oneBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

    test('author with most blogs of list with many blogs is the first author with most number of blogs', () => {
        const result = listHelper.mostBlogs(manyBlogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})

describe('most likes', () => {
    test('author with most likes of empty list is empty object', () => {
        const result = listHelper.mostLikes(emptyBlogs)
        expect(result).toEqual({})
    })

    test('author with most likes of list with one blog is the author of that blog', () => {
        const result = listHelper.mostLikes(oneBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('author with most likes of list with many blogs is the first author with most number of likes', () => {
        const result = listHelper.mostLikes(manyBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})
