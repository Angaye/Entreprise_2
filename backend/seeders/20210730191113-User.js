'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      username: 'User01',
      email: 'dXNlcjAxQHRlc3QuZnI=', //user01@test.fr
      password: '$2b$10$eBtosCp7fxzoXxZatZmDNurBwYcyFOcQVhKWn1oqDwXiXQvue53VO', //mdp01
      createdAt:"2021-08-01 09:00:00",
      updatedAt:"2021-08-01 09:00:00"
    },{
      username: 'User02',
      email: 'dXNlcjAyQHRlc3QuZnI=', //user02@test.fr
      password: '$2b$10$fwvs2kLJ8DAzsQjhAwSc9OjgirukdxsWLj.nBq6MLQiPkTJzOQ.I.', //mdp02
      createdAt:"2021-08-01 09:00:00",
      updatedAt:"2021-08-01 09:00:00"
    },{
      username: 'User03',
      email: 'dXNlcjAzQHRlc3QuZnI=', //user03@test.fr
      password: '$2b$10$X2/YUpLtoenkYjf2nJBE8OMj6WTQXhdxQRCEuolLFBuS6uKrnyVSm', //mdp03
      createdAt:"2021-08-01 09:00:00",
      updatedAt:"2021-08-01 09:00:00"
    },{
      username: 'User04',
      email: 'dXNlcjA0QHRlc3QuZnI=', //user04@test.fr
      password: '$2b$10$nJMvxYoBMyGAGZKwo.VH.OIt2pPvUMYVzyyXaUFRA4oAA9pKKnH7C', //mdp04
      createdAt:"2021-08-01 09:00:00",
      updatedAt:"2021-08-01 09:00:00"
    },{
      username: 'User05',
      email: 'dXNlcjA1QHRlc3QuZnI=', //user05@test.fr
      password: '$2b$10$fKN3lr5cohDqXYxda/7QeOmTSNYKOKKz8qB7u8d6pYHAXvbtov2/W', //mdp05
      createdAt:"2021-08-01 09:00:00",
      updatedAt:"2021-08-01 09:00:00"
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
