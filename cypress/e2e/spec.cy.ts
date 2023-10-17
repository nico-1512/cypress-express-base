describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.0:4000')
  })


  it('login', () => {
    cy.request('POST','users', {username: 'pippo', password: 'pippo'})
      .should((res) => {
        expect(res.status).to.eq(201)
      })
  })

  it('get all users', () => {
    cy
    .visit('http://127.0.0.0:4000/users')
  })
})