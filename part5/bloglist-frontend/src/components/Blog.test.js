import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> tests', () => {
    const mockHandler = jest.fn()
    let component

    beforeEach(() => {
        const blog = {
            id: '1',
            title: 'title1',
            author: 'author1',
            url: 'url1',
            likes: 0
        }

        component = render(<Blog blog={blog} like={mockHandler} />)
    })

    test('renders title and author, but not url or likes by default', () => {
        const titleElem = component.queryByText('title1')
        expect(titleElem).toBeDefined()

        const authorElem = component.queryByText('author1')
        expect(authorElem).toBeDefined()

        const urlElem = component.queryByText('url1')
        expect(urlElem).toBeNull()

        const likesElem = component.queryByText('likes')
        expect(likesElem).toBeNull()
    })

    test('show url and likes when the \'show\' button is clicked', () => {
        const urlElem = component.queryByText('url1')
        expect(urlElem).toBeNull()

        const likesElem = component.queryByText('likes')
        expect(likesElem).toBeNull()

        const showButton = component.queryByText('show')

        fireEvent.click(showButton)

        const urlElemAfterClick = component.queryByText('url1')
        expect(urlElemAfterClick).toBeDefined()

        const likesElemAfterClick = component.queryByText('likes')
        expect(likesElemAfterClick).toBeDefined()
    })

    test('clicking the \'like\' button twice calls the corresponding handler twice', () => {
        const likeButton = component.queryByText('like')

        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
