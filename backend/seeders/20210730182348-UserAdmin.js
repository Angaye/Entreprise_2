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
      username: 'ChargéCom',
      email: 'dXNlcjAwQHRlc3QuZnI=', // user00@test.fr
      password: '$2b$10$3xdKk2dM4z0qh82RnI57FuBxlfWO8MWVpwN97UppchSyd7XOdeGiC', // mdp00
      isAdmin: true,
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
