describe('App component', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')

    })

    it ('renders the create animal component on navbar button press then redirects to home page on navbar button press', () => {
        cy.get('[data-testid="navbar-create-bt"]').click()
        cy.get('[data-testid="create-animal"]').should('exist')
        cy.get('[data-testid="navbar-home-bt"]').click()
        cy.get('[data-testid="home"]').should('exist') 
    })


    it('renders the create animal component;  accepts/requires all inputs; then redirects to home page on save',() => {
        cy.get('[data-testid="navbar-create-bt"]').click()
        cy.get('[data-testid="create-animal"]').should('exist')
        cy.get('[data-testid="create-animal-save-bt"]').click()
        cy.get('[data-testid="create-animal"]').should('exist')
        cy.get('[data-testid="create-animal-input-species"]').type('Test Species').should('have.value','Test Species')
        cy.get('[data-testid="create-animal-input-birthdate"]').type('2019-10-15').should('have.value','2019-10-15')
        cy.get('[data-testid="create-animal-input-temperament"]').select('Even').should('have.value','Even')
        cy.get('[data-testid="create-animal-input-enclosure"]').type('Test Enclosure').should('have.value','Test Enclosure')
        cy.get('[data-testid="create-animal-input-keeper"]').select('Bilbo Baggins - Senior Zookeeper').should('have.value',1)
        //cycle through inputs removing them one at a time to ensure they are required
        cy.get('[data-testid="create-animal-save-bt"]').click()
        cy.get('[data-testid="create-animal"]').should('exist')
        cy.get('[data-testid="create-animal-input-name"]').type('Test Animal').should('have.value','Test Animal')
        cy.get('[data-testid="create-animal-input-species"]').clear()
        cy.get('[data-testid="create-animal-save-bt"]').click()
        cy.get('[data-testid="create-animal"]').should('exist')
        cy.get('[data-testid="create-animal-input-species"]').type('Test Species').should('have.value','Test Species')
        cy.get('[data-testid="create-animal-input-birthdate"]').clear()
        cy.get('[data-testid="create-animal-save-bt"]').click()
        cy.get('[data-testid="create-animal"]').should('exist')
        cy.get('[data-testid="create-animal-input-birthdate"]').type('2019-10-15').should('have.value','2019-10-15')
        cy.get('[data-testid="create-animal-input-temperament"]').select('')
        cy.get('[data-testid="create-animal-save-bt"]').click()
        cy.get('[data-testid="create-animal"]').should('exist')
        cy.get('[data-testid="create-animal-input-temperament"]').select('Even').should('have.value','Even')
        cy.get('[data-testid="create-animal-input-enclosure"]').clear()
        cy.get('[data-testid="create-animal-save-bt"]').click()
        cy.get('[data-testid="create-animal"]').should('exist')
        cy.get('[data-testid="create-animal-input-enclosure"]').type('Test Enclosure').should('have.value','Test Enclosure')
        cy.get('[data-testid="create-animal-input-keeper"]').select('')
        cy.get('[data-testid="create-animal-save-bt"]').click()
        cy.get('[data-testid="create-animal"]').should('exist')
        cy.get('[data-testid="create-animal-input-keeper"]').select('Bilbo Baggins - Senior Zookeeper').should('have.value',1)
        cy.get('[data-testid="create-animal-save-bt"]').click()
        cy.get('[data-testid="home"]').should('exist') 
    })


    it('renders the Test Animal in the Animal List',()=>{
        cy.get('[data-testid="animal-list-animal-Test Animal"]').click()
        cy.get('[data-testid="animal-details-name"]').should('have.text','Test Animal')
        cy.get('[data-testid="animal-details-enclosure"]').should('have.text','Test Enclosure')
        cy.get('[data-testid="animal-details-temperament"]').should('have.text','Even')
        cy.get('[data-testid="animal-details-species"]').should('have.text','Test Species')
        cy.get('[data-testid="animal-details-keeper"]').should('have.text','Bilbo')
    })

         

    it('renders/creates/deletes feedings on the animal details page',()=>{
        cy.get('[data-testid="animal-list-animal-Test Animal"]').click()
        cy.get('[data-testid="feeding-list-add-bt"]').click()
        cy.get('[data-testid="feeding-list-feedings"]').should('have.length',1)
        cy.get('[data-testid="feeding-list-add-bt"]').click()
        cy.get('[data-testid="feeding-list-feedings"]').should('have.length',2)
        cy.get('[data-testid="feeding-list-feedings-delete-btn"]').each(($btn,index) =>{
            if (index === 0) cy.wrap($btn).click()
        })
        cy.get('[data-testid="feeding-list-feedings"]').should('have.length',1)
    }) 

    it('renders animal info correctly and renders the last feeding on the Animal List',()=>{
        cy.get('[data-testid="animal-list-animal-Test Animal-name"]').should('have.text','Test Animal')
        cy.get('[data-testid="animal-list-animal-Test Animal-enclosure"]').should('have.text','Enclolsure: Test Enclosure, Temperament: Even ')
        cy.get('[data-testid="animal-list-animal-Test Animal-last-fed"]').invoke('text').then(text => expect(text.length).to.be.at.least(8))
    }) 

    
    it('deletes animals',()=>{
        cy.get('[data-testid="animal-list-animal-Test Animal"]').click()
        cy.get('[data-testid="animal-details-delete-bt"]').click()
        cy.get('[data-testid="home"]').should('exist') 
        cy.get('[data-testid="animal-list-animal-Test Animal"]').should('not.exist')
    }) 
    
     
})