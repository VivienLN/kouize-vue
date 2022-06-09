import Helpers from './Helpers';
  
let onSingleLetterCallback = null;
let onMessageCallback = null;

ComfyJS.onChat = (user, message, flags, self, extra) => {
  let username = Helpers.sanitizeUser(user);
  // User entered a single letter
  if(onSingleLetterCallback && (/^[a-z]$/i).test(message)) {
    onSingleLetterCallback(username, message);
  }
  // Any message
  if(onMessageCallback) {
    onMessageCallback(username, message);
  }
}

export default {
  // Must init first
  init(channel) {
    ComfyJS.Init(channel);
  },

  // Answer like: A, B, C, etc.
  onSingleLetter(callback) {
    onSingleLetterCallback = callback;
  },

  // Any message
  onMessage(callback) {
    onMessageCallback = callback;
  },
};
