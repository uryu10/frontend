describe('Books', () => {
  it('can list, show, create , editar and delete books', () => {
    // List Books
    cy.visit('/')
    .get('[data-cy=link-to-books]').click()

    //Create Books
    cy.get('[href="/libros/crear"]').click()
    .get('[data-cy=input-book-title]')
    .type('New Book from cypress')
    .get('[data-cy=btn-submit-book]').click()
    .get('[data-cy=book-list]').contains('New Book from cypress')

    //Show Book
    cy.get('[data-cy^=link-to-visit-book-]').last().click()
    .get('h1').should('contain.text','New Book from cypress')
    .get('[href="/libros"]').click()

    //Edit Book
    cy.get('[data-cy^=link-to-edit-book-]').last().click()
    .get('[data-cy=input-book-title]').clear()
    .type('Book Edited by cypress')
    .get('[data-cy=btn-submit-book]').click()
    .get('[data-cy=book-list]').contains('Book Edited by cypress')

    //Delete Book
    cy.get('[data-cy^=link-to-delete-book-]')
    .last()
    .click().wait(1000)
    .get('[data-cy^=link-to-visit-book-]')
    .last()
    .should('not.contain.text','Book Edited by cypress')


  })
})