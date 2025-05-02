const { getFilms } = require('./apiClient');

const resolvers = {
  Query: {
    films: async () => {
      return await getFilms();  // Obtiene las películas del API externo
    }
  }
};

module.exports = resolvers;
