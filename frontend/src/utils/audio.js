export const audioContext = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;

export const speakText = (text, lang = 'te-IN') => {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        utterance.volume = 0.8;

        // Try to get appropriate voice
        const voices = speechSynthesis.getVoices();
        const teluguVoice = voices.find(voice => voice.lang.includes('te'));
        const englishVoice = voices.find(voice => voice.lang.includes('en'));

        if (lang === 'te-IN' && teluguVoice) {
            utterance.voice = teluguVoice;
        } else if (lang === 'en-US' && englishVoice) {
            utterance.voice = englishVoice;
        }

        speechSynthesis.speak(utterance);
        return utterance;
    }
    return null;
};
