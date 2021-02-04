describe('Sun button onClick functionality', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001")
  })

  it('changes background', () => {
    cy.get(".sun").click()
    cy.get("#root").should('have.css', 'background-image', 'url("https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80")')
  })

  it('changes innerHTML of button', () => {
    cy.get(".sun").click()
    cy.get(".sun").should('contain', "That's better!")
  })
})
