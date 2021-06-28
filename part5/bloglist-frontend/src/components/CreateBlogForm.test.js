import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm /> tests', () => {
    const mockHandler = jest.fn()
    let component

    beforeEach(() => {
        component = render(<CreateBlogForm createBlog={mockHandler} />)
    })

    test('ensure that the \'createBlog\' handler is called with the right parameter', () => {
        const titleInput = component.container.querySelector('#title')
        fireEvent.change(titleInput, {target: {value: 'title1'}})

        const authorInput = component.container.querySelector('#author')
        fireEvent.change(authorInput, {target: {value: 'author1'}})

        const urlInput = component.container.querySelector('#url')
        fireEvent.change(urlInput, {target: {value: 'url1'}})

        const createButton = component.queryByText('create')

        fireEvent.click(createButton)

        expect(mockHandler.mock.calls).toHaveLength(1)

        expect(mockHandler.mock.calls[0][0].title).toBe('title1')
        expect(mockHandler.mock.calls[0][0].author).toBe('author1')
        expect(mockHandler.mock.calls[0][0].url).toBe('url1')
    })
})
