const enUS = {
  tutorialWhatIs: 'What is a Pomodoro?',
  tutorialExplanation:
    "The Pomodoro Cycle is a tool for encouraging productivity. Each cycle allocates 25 minutes of time to work followed by a 5 minute rest period. After your 4th pomo, you'll earn an extended 15 minute break!",
  tutorialHowTo: 'How to start?',
  tutorialBegin: 'You can start our timer by clicking the "Begin" button.',
  tutorialEfficient: 'Start working efficiently!',
  tutorialEfficient1:
    'Once you start the timer, the text headers and ring color will indicate the work and break stages of a cycle.',
  tutorialEfficient2:
    'You can also reset the timer by clicking the "Reset" button.',
  tutorialBreak: 'Take a break!',
  tutorialBreak1:
    'After 25 minutes of work, you can enter a 5-minute break by clicking the "Begin" button.',
  tutorialBreak2:
    'Relaxing in these five minutes will help you work more efficiently in the next cycle.',
  tutorialSettings: 'Settings',
  tutorialSettings1:
    'You can change the timer setting by clicking the "Settings" icon in the lower left corner.',
  tutorialStats: 'User Statistics',
  tutorialStats1:
    'You can browse your performance by clicking the "Statistics" icon in the upper left corner.',
  tutorialBackBtn: 'Back to homepage',
  tutorialFocusMsg: 'Time to focus!'
};

const ko = {
  tutorialWhatIs: '뽀모도로가 무엇인가요?',
  tutorialExplanation:
    '뽀모도로 사이클은 생산성을 향상시키는 도구입니다. 각 사이클은 25분의 작업 시간과 5분의 휴식 시간을 할당합니다. 4번째 포모 후에는 15분의 휴식 시간이 연장됩니다!',
  tutorialHowTo: '시작 방법',
  tutorialBegin: '"시작" 버튼을 눌러서 타이머를 시작할수 있습니다.',
  tutorialEfficient: '효율적인 작업 시작!',
  tutorialEfficient1:
    '타이머를 시작하면 텍스트 헤더와 링 색상이 작업 및 휴식 단계를 나타냅니다.',
  tutorialEfficient2:
    '"재설정" 버튼을 클릭하여 타이머를 재설정할 수도 있습니다.',
  tutorialBreak: '휴식을 취하세요!',
  tutorialBreak1:
    '25분의 작업 후 "시작" 버튼을 클릭하여 5분 휴식을 취할수 있습니다.',
  tutorialBreak2:
    '5분 동안 휴식으로 다음 주기에 더 효율적으로 작업하는 데 도움이 됩니다.',
  tutorialSettings: '설정',
  tutorialSettings1:
    '왼쪽 하단 모서리에 있는 "설정" 아이콘을 클릭하여 타이머 설정을 변경할 수 있습니다.',
  tutorialStats: '사용자 통계',
  tutorialStats1:
    '왼쪽 상단 모서리에 있는 "통계" 아이콘을 클릭하여 실적을 검색할 수 있습니다.',
  tutorialBackBtn: '홈으로',
  tutorialFocusMsg: '집중할 시간!'
};

const es = {
  tutorialWhatIs: '¿Qué es un Pomodoro?',
  tutorialExplanation:
    'El Ciclo Pomodoro es una herramienta para fomentar la productividad. Cada ciclo asigna 25 minutos de tiempo para trabajar, seguidos de un período de descanso de 5 minutos. ¡Después de su cuarto pomo, obtendrá un descanso prolongado de 15 minutos!',
  tutorialHowTo: '¿Cómo empezar?',
  tutorialBegin: 'Puede iniciar nuestro temporizador haciendo clic en el botón "Comenzar".',
  tutorialEfficient: '¡Empieza a trabajar eficientemente!',
  tutorialEfficient1:
    'Una vez que inicie el temporizador, los encabezados de texto y el color del anillo indicarán las etapas de trabajo y descanso de un ciclo.',
  tutorialEfficient2:
    'También puedes reiniciar el temporizador haciendo clic en el botón "Reiniciar".',
  tutorialBreak: '¡Tómate un descanso!',
  tutorialBreak1:
    'Después de 25 minutos de trabajo, puede ingresar un descanso de 5 minutos haciendo clic en el botón "Comenzar".',
  tutorialBreak2:
    'Relajarte en estos cinco minutos te ayudará a trabajar de manera más eficiente en el siguiente ciclo.',
  tutorialSettings: 'Configuraciones',
  tutorialSettings1:
    'Puedes cambiar la configuración del temporizador haciendo clic en el ícono "Configuración" en la esquina inferior izquierda.',
  tutorialStats: 'Estadísticas de usuario',
  tutorialStats1:
    'Puede consultar su rendimiento haciendo clic en el icono "Estadísticas" en la esquina superior izquierda.',
  tutorialBackBtn: 'Volver a la página de inicio',
  tutorialFocusMsg: 'Hora de concentrarse!'
};

export let lang = enUS;

// tutorial
const tutorialWhatIs = document.getElementById('tutorial-what-is');
const tutorialExplanation = document.getElementById('tutorial-explanation');
const tutorialHowTo = document.getElementById('tutorial-how-to');
const tutorialBegin = document.getElementById('tutorial-begin');
const tutorialEfficient = document.getElementById('tutorial-efficient');
const tutorialEfficient1 = document.getElementById('tutorial-efficient-1');
const tutorialEfficient2 = document.getElementById('tutorial-efficient-2');
const tutorialBreak = document.getElementById('tutorial-break');
const tutorialBreak1 = document.getElementById('tutorial-break-1');
const tutorialBreak2 = document.getElementById('tutorial-break-2');
const tutorialSettings = document.getElementById('tutorial-settings');
const tutorialSettings1 = document.getElementById('tutorial-settings-1');
const tutorialStats = document.getElementById('tutorial-stats');
const tutorialStats1 = document.getElementById('tutorial-stats-1');
const tutorialBackBtn = document.getElementById('go-back-button');

// get stored language, if it exists populate page with appropriate language
const storedLanguage = localStorage.getItem('language');
switch (storedLanguage) {
  case 'enUS':
    lang = enUS;
    populateLanguageTutorial();
    break;
  case 'ko':
    lang = ko;
    populateLanguageTutorial();
    break;
  case 'es':
    lang = es;
    populateLanguageTutorial();
    break;
  default:
    break;
}
// populateLanguageTutorial();

/**
 * populates all the html elements with the correct strings (based on language)
 */

function populateLanguageTutorial () {
  tutorialWhatIs.innerHTML = lang.tutorialWhatIs;
  tutorialExplanation.innerHTML = lang.tutorialExplanation;
  tutorialHowTo.innerHTML = lang.tutorialHowTo;
  tutorialBegin.innerHTML = lang.tutorialBegin;
  tutorialEfficient.innerHTML = lang.tutorialEfficient;
  tutorialEfficient1.innerHTML = lang.tutorialEfficient1;
  tutorialEfficient2.innerHTML = lang.tutorialEfficient2;
  tutorialBreak.innerHTML = lang.tutorialBreak;
  tutorialBreak1.innerHTML = lang.tutorialBreak1;
  tutorialBreak2.innerHTML = lang.tutorialBreak2;
  tutorialSettings.innerHTML = lang.tutorialSettings;
  tutorialSettings1.innerHTML = lang.tutorialSettings1;
  tutorialStats.innerHTML = lang.tutorialStats;
  tutorialStats1.innerHTML = lang.tutorialStats1;
  tutorialBackBtn.innerHTML = lang.tutorialBackBtn;
}