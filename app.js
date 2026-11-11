const phrases=[
 ["Hello!","Olá!"],["My name is...","Meu nome é..."],["What's your name?","Qual é o seu nome?"],["How are you?","Como você está?"],["I'm fine, thank you.","Estou bem, obrigado(a)."],["Nice to meet you.","Prazer em conhecer você."]
];
const words=[["Hello","Olá"],["Good morning","Bom dia"],["Please","Por favor"],["Thank you","Obrigado(a)"],["Yes","Sim"],["No","Não"],["Sorry","Desculpa"],["Goodbye","Tchau"]];
let current=0,completed=localStorage.getItem("englishCompleted")==="yes";
const $=id=>document.getElementById(id);
function updateProgress(){const n=completed?100:0;$("progressText").textContent=n+"% concluído";$("progressBar").style.width=n+"%"}
function speak(text){if(!("speechSynthesis"in window)){alert("Seu navegador não oferece áudio de pronúncia.");return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=.86;speechSynthesis.speak(u)}
function showPhrase(){ $("lessonCount").textContent=`AULA 01 • FRASE ${current+1} DE ${phrases.length}`;$("englishPhrase").textContent=phrases[current][0];$("portuguesePhrase").textContent=phrases[current][1];$("nextPhrase").textContent=current===phrases.length-1?"Concluir aula ✓":"Próxima →";$("previousPhrase").disabled=current===0}
$("startLesson").onclick=()=>{$("lessonModal").classList.remove("hidden");showPhrase()};
$("closeLesson").onclick=()=>$("lessonModal").classList.add("hidden");
$("listenLesson").onclick=()=>speak(phrases[current][0]);
$("previousPhrase").onclick=()=>{if(current>0)current--;showPhrase()};
$("nextPhrase").onclick=()=>{if(current<phrases.length-1){current++;showPhrase()}else{completed=true;localStorage.setItem("englishCompleted","yes");updateProgress();$("lessonModal").classList.add("hidden");alert("Parabéns! Você concluiu sua primeira aula.")}};
$("listenPrompt").onclick=()=>speak("Hello! What's your name?");
$("recordBtn").onclick=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){$("speechResult").textContent="O reconhecimento de voz não está disponível neste navegador. No iPhone, tente abrir pelo Safari e permitir o microfone.";return}const r=new SR();r.lang="en-US";r.interimResults=false;r.onresult=e=>{$("speechResult").textContent="Você disse: "+e.results[0][0].transcript};r.onerror=()=>{$("speechResult").textContent="Não consegui ouvir. Verifique a permissão do microfone e tente novamente."};r.start();$("speechResult").textContent="Estou ouvindo... fale em inglês."};
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelectorAll(".panel").forEach(p=>p.classList.add("hidden"));$(b.dataset.tab).classList.remove("hidden")});
$("wordList").innerHTML=words.map(([en,pt])=>`<div class="word"><div><b>${en}</b><small>${pt}</small></div><button aria-label="Ouvir ${en}" data-word="${en}">🔊</button></div>`).join("");
$("wordList").addEventListener("click",e=>{const w=e.target.dataset.word;if(w)speak(w)});
updateProgress();
if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));