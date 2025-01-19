const config = {
  userApiUrl: 'https://nomoreparties.co/v1/wff-cohort-30/users/me',
  cardsApiUrl: 'https://nomoreparties.co/v1/wff-cohort-30/cards',
  authorizationToken: 'a4804a4c-45d8-4092-9048-57f3b23bd431',
}

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserData = () => {
  return fetch(config.userApiUrl, {
    headers: {
      authorization: config.authorizationToken
    }
  }).then((res) => checkResponse(res));
}

export const getCards = () => {
  return fetch(config.cardsApiUrl, {
    headers: {
      authorization: config.authorizationToken,
    }
  }).then((res) => checkResponse(res));
}

export const postCard = (cardData) => {
  return fetch(config.cardsApiUrl, {
    method: 'POST',
    headers: {
      authorization: config.authorizationToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    })
  }).then(res => checkResponse(res));
}

export const patchUserData = (name, about) => {
  return fetch(config.userApiUrl, {
    method: 'PATCH',
    headers: {
      authorization: config.authorizationToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  }).then((res) => checkResponse(res));
}

export const patchUserAvatar = (avatar) => {
  return fetch(config.userApiUrl + '/avatar', {
    method: 'PATCH',
    headers: {
      authorization: config.authorizationToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatar
    })
  }).then((res) => checkResponse(res));
}

export const deleteCardOnApi = (cardId) => {
  return fetch(`${config.cardsApiUrl}/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.authorizationToken
    }
  }).then((res) => checkResponse(res));
}

export const likeCardOnApi = (cardId) => {
  return fetch(`${config.cardsApiUrl}/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.authorizationToken
    }
  }).then((res) => checkResponse(res));
}

export const unlikeCardOnApi = (cardId) => {
  return fetch(`${config.cardsApiUrl}/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.authorizationToken
    }
  }).then((res) => checkResponse(res));
}