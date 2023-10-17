// const db = require('../../createDbConnection.js');
const host = "http://localhost:4000";
const obj = {username:'admin', password: 'admin'};

describe('db testing', () => {
  it('insert', () => {
      cy.findOne(obj).then((res) => {

        res ? cy.insertOne(obj) : cy.log('aaaaaaaaa');
      })
    })

  it('delete inserted item', () => {
    cy.findOne(obj).then(res => {
      cy.log(JSON.stringify(res));
      cy.deleteOne(res);
    })
  })

  // it('delete admin:admin', () => {
  //   cy.findMany({username:'admin', password: 'admin'}).then(
  //     res => {

  //       cy.log(JSON.stringify(res));

  //       (res || []).forEach(element => {
  //         cy.deleteMany(element);
  //       });
  //     }
  //   )
  // })
  
})