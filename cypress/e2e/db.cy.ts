const host = "http://localhost:4000";
const obj = {username:'admin', password: 'admin'};
const collection = "users";
const newPass = 'astolfo';

describe('db testing', () => {
  // prepare db
  before(() => {
    cy.createCollection(collection, { database: "users", failSilently: 'true' }).then(
      (res) => {
        expect(res).to.eq("Collection created");
      }
    )
  })

  // clean up db
  after('After all', () => {
    cy.findOne({username: 'admin'}).then((res: any) => {
      expect(res).to.haveOwnProperty('_id')
      cy.deleteOne(obj);
    })
    cy.dropCollection(collection);
  })

  // ---- TESTS ----


  // it('insert', () => {
  //   cy.findOne(obj).then((res) => {
  //     expect(res).to.eq(null)
  //     cy.insertOne(obj, {collection, database: 'users'}).then((res: string) => {
  //       expect(res).not.to.be.empty;
  //     })
  //   })
  // })

  it('signin', () => {
    cy.request('POST','users', ({
      ...obj,
      repeatePassword: 'admin',
      type: 'signin'
    }))
      .should((response) => {
        expect(response.status).to.eq(201);
      })
  })

  it('login', () => {
    cy.request('POST','users', ({...obj}))
    .should((response) => {
      expect(response.status).to.eq(201);
    })
  })

  it('change password', () => {
    cy.request('POST','users/changePassword', ({
      ...obj,
      newPassword: newPass,
      repeateNewPassword: newPass 
    }))
    .should((response) => {
      expect(response.status).to.eq(201);
    })
  })

  it('login with new pass', () => {
    cy.request('POST','users', ({
      username: obj.username,
      password: newPass
    }))
    .should((response) => {
      expect(response.status).to.eq(201);
    })
  })

  it('login w/ old pass', () => {
    cy.request({
      method: 'POST',
      url: 'users', 
      body: (obj),
      failOnStatusCode: false
    })
    .should((res) => {
      expect(res.status).to.eq(401);
    })
  })

  
})
