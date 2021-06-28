describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'user1',
            username: 'username1',
            password: 'password1'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in to application')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('username1')
            cy.get('#password').type('password1')
            cy.contains('login').click()
            cy.contains('user1 logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('username1')
            cy.get('#password').type('wrong')
            cy.contains('login').click()
            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('html').should('not.contain', 'user1 logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            const user = {username: 'username1', password: 'password1'}
            cy.request('POST', 'http://localhost:3003/api/login', user).then((response) => {
                localStorage.setItem('loggedInUser', JSON.stringify(response.body))
            })
            cy.visit('http://localhost:3000')
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('title1')
            cy.get('#author').type('author1')
            cy.get('#url').type('url1')
            cy.get('#createBlog').click()
            cy.contains('title1 user1')
        })

        describe('some blogs exist', function() {
            beforeEach(function() {
                cy.createBlog({title: 'title1', url: 'url1'})
                cy.createBlog({title: 'title2', url: 'url2'})
            })

            it('users can like blogs', function() {
                cy.contains('show').click()
                cy.contains('like').click()
                cy.contains('likes 1')
            })

            it('blogs can be deleted', function() {
                cy.contains('show').click()
                cy.contains('delete').click()
                cy.get('html').should('not.contain', 'title1 user1')
            })

            it('blogs are ordered in the decreasing order of their likes no', function() {
                cy.contains('show').click()
                cy.contains('like').click()
                cy.contains('show').click()
                cy.get('.like').last().click()
                // wait for the like to be registered
                cy.get('.like').last().parent().contains('likes 1')
                cy.get('.like').last().click()
                // make sure that the first blog is now title2 not title1 since it has more likes
                cy.get('.like').first().parent().parent().contains('title2')
            })
        })
    })
})
