const adapterMovie = (movies) => {
  return movies.map(movie => {
    return {
      title: movie.title,
      dateToCreate: movie.day_to_create,
      image: movie.image
    }
  })
}

module.exports = {
  adapterMovie
}