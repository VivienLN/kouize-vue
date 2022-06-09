export default {
  sanitizeUser(user) {
    return user.replace(/[^a-z0-9àçéèêëîïñôöù_-]/ig, '');
  },

  canonizeAnswer(message) {
    return message.toLowerCase()
      .replace(/[:-]/gi, ' ')
      .replace(/\s\s+/g, ' ')
      .replace(/[^a-z\s]/gi, '');
  }
}