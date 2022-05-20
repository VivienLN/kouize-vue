
import CONFIG from '../config'

ComfyJS.Init(CONFIG.channel);

export default {
    onAnswer(callback) {
        ComfyJS.onChat = (user, message, flags, self, extra) => {
            console.log('onAnswer | Message: ' + message);
            callback(user, message);
        }
    }
};
