
import ComfyJS from 'comfy.js';
import CONFIG from '../config'

ComfyJS.onChat = (user, message, flags, self, extra) => {
    console.log('onAnswer | Message: ' + message);
}
ComfyJS.Init(CONFIG.channel);

export default {
    // onAnswer: callback => {
    //     ComfyJS.onChat = (user, message, flags, self, extra) => {
    //         console.log('onAnswer | Message: ' + message);
    //     }
    // }
};
