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

    await queryInterface.bulkInsert('articles', [{
      userId: 1,
      title: 'Christiani et celerari conpulsus ad scriptae tortis confessisque haec etiam',
      content: 'Alii summum decus in carruchis solito altioribus et ambitioso vestium cultu ponentes sudant sub ponderibus lacernarum, quas in collis insertas cingulis ipsis adnectunt nimia subtegminum tenuitate perflabiles, expandentes eas crebris agitationibus maximeque sinistra, ut longiores fimbriae tunicaeque perspicue luceant varietate liciorum effigiatae in species animalium multiformes.',
      createdAt:"2021-08-01 09:00:00",
      updatedAt:"2021-08-01 09:00:00"
    },{
      userId: 5,
      title: 'Ea autem voluit cum haec',
      content: 'Iamque lituis cladium concrepantibus internarum non celate ut antea turbidum saeviebat ingenium a veri consideratione detortum et nullo inpositorum vel conpositorum fidem sollemniter inquirente nec discernente a societate noxiorum insontes velut exturbatum e iudiciis fas omne discessit, et causarum legitima silente defensione carnifex rapinarum sequester et obductio capitum et bonorum ubique multatio versabatur per orientales provincias, quas recensere puto nunc oportunum absque Mesopotamia digesta, cum bella Parthica dicerentur, et Aegypto, quam necessario aliud reieci ad tempus.',
      createdAt:"2021-08-01 09:00:00",
      updatedAt:"2021-08-01 09:00:00"
    },{
      userId: 2,
      title: 'Facinorum circulo terrena duplici alii',
      content: 'Haec et huius modi quaedam innumerabilia ultrix facinorum impiorum bonorumque praemiatrix aliquotiens operatur Adrastia atque utinam semper quam vocabulo duplici etiam Nemesim appellamus: ius quoddam sublime numinis efficacis, humanarum mentium opinione lunari circulo superpositum, vel ut definiunt alii, substantialis tutela generali potentia partilibus praesidens fatis, quam theologi veteres fingentes Iustitiae filiam ex abdita quadam aeternitate tradunt omnia despectare terrena.',
      createdAt:"2021-08-01 09:00:00",
      updatedAt:"2021-08-01 09:00:00"
    },{
      userId: 1,
      title: 'Easque conscientia Censorius posse quasi spernentem curant id ut monstravit',
      content: 'Ideo urbs venerabilis post superbas efferatarum gentium cervices oppressas latasque leges fundamenta libertatis et retinacula sempiterna velut frugi parens et prudens et dives Caesaribus tamquam liberis suis regenda patrimonii iura permisit.',
      createdAt:"2021-08-01 09:00:00",
      updatedAt:"2021-08-01 09:00:00"
    },{
      userId: 3,
      title: 'Cum culpa saepeque homines discessurum',
      content: 'Ob haec et huius modi multa, quae cernebantur in paucis, omnibus timeri sunt coepta. et ne tot malis dissimulatis paulatimque serpentibus acervi crescerent aerumnarum, nobilitatis decreto legati mittuntur: Praetextatus ex urbi praefecto et ex vicario Venustus et ex consulari Minervius oraturi, ne delictis supplicia sint grandiora, neve senator quisquam inusitato et inlicito more tormentis exponeretur.',
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
