const filePath = 'cypress/files/blank.pdf'


describe('s3 testing', () => {

  let ETag;
  let file;

  it('get file locally', () => {
    cy.readFile(filePath)
  })

  it('getting bucket', () => {
    cy.request('GET', '/s3/test', {}).then(
      (response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
      }
    )
  })

  // it('insert into bucket', () => {
  //   cy.request('POST', '/s3', {filePath}).then(
  //     (response) => {
  //       expect(response.body).to.haveOwnProperty('ETag')
  //       cy.wrap(response.body.ETag).then(tag => ETag = tag)
  //     }
  //   );
  // });

  // it('getting inserted file', () => {
  //     cy.request('GET', '/s3/blank.pdf')
  //     .should((response) => {
  //       expect(response.body).to.haveOwnProperty('LastModified')
  //       expect(ETag).to.eq(response.body.ETag);
  //     });
  // });

  // it('delete inserted file', () => {
  //   cy.request('DELETE', '/s3/blank.pdf')
  //     .should((response) => {
  //       expect(response.status).to.eq(200);
  //     });
  // });
});
