export default {
  sanitizeUser(user) {
    return user.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9_-]/ig, '');
  },

  canonizeAnswer(message) {
    // About normalize+replace: https://stackoverflow.com/a/37511463
    return message.toLowerCase()
      .replace(/[:-]/gi, ' ')
      .replace(/\s\s+/g, ' ')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z\s]/gi, '');
  }
}