let onSingleLetterCallback = null;

ComfyJS.onChat = (user, message, flags, self, extra) => {
    
    // User entered a single letter
    if(onSingleLetterCallback && (/^[a-z]$/i).test(message)) {
        onSingleLetterCallback(user, message);
    }
}
// ComfyJS.Init(CONFIG.channel);

export default {
    // Must init first
    init: function(channel) {
        ComfyJS.Init(channel);
    },

    // Answer like: A, B, C, etc.
    onSingleLetter: function(callback) {
        onSingleLetterCallback = callback;
    }
};
