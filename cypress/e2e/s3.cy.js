
describe('s3 testing', () => {

  let ETag;

  beforeEach(() => {
    cy.request('GET', '/s3').then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    )
  })

  it('insert into bucket', () => {
    cy.request('POST', '/s3', {filePath: 'cypress/e2e/files/blank.pdf'}).then(
      (response) => {
        expect(response.body).to.haveOwnProperty('ETag')
        cy.wrap(response.body.ETag).then(tag => ETag = tag)
      }
    );
  });

  it('getting inserted file', () => {
      cy.request('GET', '/s3/blank.pdf')
      .should((response) => {
        expect(response.body).to.haveOwnProperty('LastModified')
        expect(ETag).to.eq(response.body.ETag);
      });
  });

  it('delete inserted file', () => {
    cy.request('DELETE', '/s3/blank.pdf')
      .should((response) => {
        expect(response.status).to.eq(200);
      });
  });
});
