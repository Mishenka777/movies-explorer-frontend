class MoviesApi {
  constructor(options) {
      this._baseUrl = options.baseUrl
  }

  _getResponseData(res) {
      if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`)
      }
      return res.json()
  }

  getInitialMovies() {
      return fetch(`${this._baseUrl}`, {
          headers: {
            "Content-Type": "application/json",
          },
      }).then(this._getResponseData)
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
})

export default moviesApi