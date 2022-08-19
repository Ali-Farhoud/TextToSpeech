const synth =window.speechSynthesis;

const form=document.getElementById('form');
const textInput=document.getElementById('text-input');
const rate=document.getElementById('rate-input');
const ratetxt=document.getElementById('rate-value');
const pitch=document.getElementById('pitch-input');
const pitchtxt=document.getElementById('pitch-value');
const voiceList=document.getElementById('voice-select');

let voices=[];

const getVoices=()=>{
    voices=synth.getVoices();
    let list='';
    voices.forEach((voice)=>{
        list+=`<option data-lang="${voice.lang}" data-name="${voice.name}" >${voice.name} (${voice.lang})</option>`
    });
    voiceList.innerHTML=list;
}
synth.onvoiceschanged=getVoices;

const speak=()=>{
    if(textInput!==""){
        const speakText=new SpeechSynthesisUtterance(textInput.value);
        const selectedVoice= voiceList.selectedOptions[0].getAttribute('data-name');
        voices.forEach(voice=>{
            if(voice.name===selectedVoice){
                speakText.voice=voice;
            }
        });
        speakText.rate=rate.value;
        speakText.pitch=pitch.value;
        synth.speak(speakText);
    }
}

form.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur();

})

rate.addEventListener('change',e=>ratetxt.textContent=rate.value);
pitch.addEventListener('change',e=>pitchtxt.textContent=pitch.value);

voiceList.addEventListener('change',speak);