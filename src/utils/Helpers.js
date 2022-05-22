export default {
  sanitizeUser(user) {
    return user.replace(/[^a-z0-9àçéèêëîïñôöù_-]/ig, '');
  }
}