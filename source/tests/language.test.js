import * as lang from '../scripts/util/language.js';

describe('Languages', () => {
  const pomoHeader = document.getElementById('pomobear-header');
  const breakMsg = document.getElementById('break-message');
  const workIndicator = document.getElementById('work-indicator');
  const shortBreakIndicator = document.getElementById('short-break-indicator');
  const longBreakIndicator = document.getElementById('long-break-indicator');
  const startStopButton = document.getElementById('start-stop-button');
  const promptText = document.getElementById('prompt-text');
  const resetYes = document.getElementById('reset-yes-button');
  const resetNo = document.getElementById('reset-no-button');
  const taskBtn = document.getElementById('task');
  const settingsHeader = document.getElementById('settings-header');
  const personalizationHeader = document.getElementById('personalization-header');
  const accessibilityHeader = document.getElementById('accessibility-header');
  const settingsColor = document.getElementById('settings-color');
  const settingsKeystroke = document.getElementById('settings-keystroke');
  const settingsAuto = document.getElementById('settings-auto');
  const settingsTab = document.getElementById('settings-tab');
  const settingsBackgrounds = document.getElementById('settings-backgrounds');
  const dropdownOriginal = document.getElementById('background_1');
  const dropdownDesert = document.getElementById('background_2');
  const dropdownLake = document.getElementById('background_3');
  const settingsLanguage = document.getElementById('settings-languages');
  const dropdownEnglish = document.getElementById('english');
  const dropdownKorean = document.getElementById('korean');
  const dropdownSpanish = document.getElementById('spanish');
  const statsHeader = document.getElementById('stats-header');
  const statTodayHeader = document.getElementById('stat-today-header');
  const statPomoCycle = document.getElementById('stat-pomo-cycle');
  const statPomoCycleUnits = document.getElementById('stat-pomo-cycle-units');
  const statInterruption = document.getElementById('stat-interruption');
  const statTotalTasks = document.getElementById('stat-total-tasks');
  const statTotalTasksUnits = document.getElementById('stat-total-tasks-units');
  const statTotalHeader = document.getElementById('stat-total-header');
  const statTotalPomoCycleUnits = document.getElementById(
    'stat-total-pomo-cycle-units'
  );
  const statTotalPomoCycle = document.getElementById('stat-total-pomo-cycle');
  const statAvgInterruption = document.getElementById('stat-avg-interruptions');
  const statAvgInterruptionUnits = document.getElementById(
    'total-interruptions-unit'
  );
  const statBestDay = document.getElementById('stat-best-day');
  const statBestDayUnits = document.getElementById('stat-best-day-units');
  const statTotalTasksTotalUnits = document.getElementById(
    'stat-total-tasks-total-units'
  );
  const statTotalTasksTotal = document.getElementById('stat-total-tasks-total');
  const statWeeklyHeader = document.getElementById('stat-weekly-header');

  beforeEach(() => {
    localStorage.clear();
  });

  // Test English
  test('Check that english is working', () => {
    localStorage.setItem('language', 'enUS');
    lang.setLanguageEn()
    expect(pomoHeader.textContent).toBe('Pomobear');
    expect(breakMsg.textContent).toBe('Take a break!');
    expect(workIndicator.textContent).toBe('Pomodoro');
    expect(shortBreakIndicator.textContent).toBe('Short Break');
    expect(longBreakIndicator.textContent).toBe('Long Break');
    expect(startStopButton.textContent).toBe('Begin');
    expect(promptText.innerHTML).toBe('This will count as an interruption.<br> Are you sure?');
    expect(resetYes.textContent).toBe('Yes');
    expect(resetNo.textContent).toBe('No');
    expect(taskBtn.innerHTML).toBe('Complete Task: <span id="task-pomo-counter">0</span> Pomos');
    expect(settingsHeader.textContent).toBe('Settings');
    expect(personalizationHeader.textContent).toBe('Personalization Options');
    expect(accessibilityHeader.textContent).toBe('Accessibility Options');
    expect(settingsColor.textContent).toBe('Colorblindness');
    expect(settingsKeystroke.textContent).toBe('Keystroke Access');
    expect(settingsAuto.textContent).toBe('Auto-Start Timer');
    expect(settingsTab.textContent).toBe('Tab Timer Visibility');
    expect(settingsBackgrounds.textContent).toBe('Backgrounds');
    expect(dropdownOriginal.textContent).toBe('Original');
    expect(dropdownDesert.textContent).toBe('Desert');
    expect(dropdownLake.textContent).toBe('Lake');
    expect(settingsLanguage.textContent).toBe('Languages');
    expect(dropdownEnglish.textContent).toBe('English');
    expect(dropdownKorean.textContent).toBe('한국어');
    expect(dropdownSpanish.textContent).toBe('Español');
    expect(statsHeader.textContent).toBe('User Statistics');
    expect(statTodayHeader.textContent).toBe('Today');
    expect(statPomoCycle.textContent).toBe('Pomos cycles:');
    expect(statPomoCycleUnits.innerHTML).toBe('<span id="today-pomodoros">____</span> po.');
    expect(statInterruption.textContent).toBe('Interruptions:');
    expect(statTotalTasks.textContent).toBe('Total Tasks:');
    expect(statTotalTasksUnits.innerHTML).toBe('<span id="today-tasks">____</span> tasks');
    expect(statTotalHeader.textContent).toBe('Totals');
    expect(statTotalPomoCycleUnits.innerHTML).toBe('<span id="total-pomodoros">____</span> po.');
    expect(statTotalPomoCycle.innerHTML).toBe('Pomos cycles:');
    expect(statAvgInterruption.innerHTML).toBe('Avg. Interruptions:');
    expect(statAvgInterruptionUnits.innerHTML).toBe('<span id="total-interruptions">____</span> per po.');
    expect(statBestDay.textContent).toBe('Best Day:');
    expect(statBestDayUnits.innerHTML).toBe('<span id="total-best-pomo">____</span> po. |<span id="total-best-time">____</span> min.');
    expect(statTotalTasksTotalUnits.innerHTML).toBe('<span id="total-tasks">____</span> tasks');
    expect(statTotalTasksTotal.textContent).toBe('Total Tasks:');
    expect(statWeeklyHeader.textContent).toBe('Weekly Overview');
  });

  // Test Korean
  test('Check that english is working', () => {
    localStorage.setItem('language', 'ko');
    lang.setLanguageKo();
    expect(pomoHeader.textContent).toBe('뽀모곰');
    expect(breakMsg.textContent).toBe('휴식을 취하세요!');
    expect(workIndicator.textContent).toBe('뽀모도로');
    expect(shortBreakIndicator.textContent).toBe('짧은 휴식');
    expect(longBreakIndicator.textContent).toBe('긴 휴식');
    expect(startStopButton.textContent).toBe('시작');
    expect(promptText.innerHTML).toBe('이것은 잠시 중단으로 간주됩니다.<br> 계속하시겠습니까?');
    expect(resetYes.textContent).toBe('예');
    expect(resetNo.textContent).toBe('아니요');
    expect(taskBtn.innerHTML).toBe('작업 완료: <span id="task-pomo-counter">0</span> 뽀모스');
    expect(settingsHeader.textContent).toBe('설정');
    expect(personalizationHeader.textContent).toBe('개인화 옵션');
    expect(accessibilityHeader.textContent).toBe('접근성 옵션');
    expect(settingsColor.textContent).toBe('색맹 옵션');
    expect(settingsKeystroke.textContent).toBe('키 입력 옵션');
    expect(settingsAuto.textContent).toBe('타이머 자동 시작');
    expect(settingsTab.textContent).toBe('탭 타이머 가시성');
    expect(settingsBackgrounds.textContent).toBe('배경');
    expect(dropdownOriginal.textContent).toBe('기본');
    expect(dropdownDesert.textContent).toBe('사막');
    expect(dropdownLake.textContent).toBe('호수');
    expect(settingsLanguage.textContent).toBe('언어');
    expect(dropdownEnglish.textContent).toBe('English');
    expect(dropdownKorean.textContent).toBe('한국어');
    expect(dropdownSpanish.textContent).toBe('Español');
    expect(statsHeader.textContent).toBe('사용자 통계');
    expect(statTodayHeader.textContent).toBe('오늘');
    expect(statPomoCycle.textContent).toBe('뽀모스 주기:');
    expect(statPomoCycleUnits.innerHTML).toBe('<span id="today-pomodoros">____</span> 뽀.');
    expect(statInterruption.textContent).toBe('잠시 중단 횟수:');
    expect(statTotalTasks.textContent).toBe('총 작업 횟수:');
    expect(statTotalTasksUnits.innerHTML).toBe('<span id="today-tasks">____</span> 작업');
    expect(statTotalHeader.textContent).toBe('합계');
    expect(statTotalPomoCycleUnits.innerHTML).toBe('<span id="total-pomodoros">____</span> 뽀.');
    expect(statTotalPomoCycle.innerHTML).toBe('뽀모스 주기:');
    expect(statAvgInterruption.innerHTML).toBe('평균 잠시 중단 횟수:');
    expect(statAvgInterruptionUnits.innerHTML).toBe('뽀당 <span id="total-interruptions">____</span>');
    expect(statBestDay.textContent).toBe('최고의 날:');
    expect(statBestDayUnits.innerHTML).toBe('<span id="total-best-pomo">____</span> 뽀. |<span id="total-best-time">____</span> 분.');
    expect(statTotalTasksTotalUnits.innerHTML).toBe('<span id="total-tasks">____</span> 작업');
    expect(statTotalTasksTotal.textContent).toBe('총 작업 횟수:');
    expect(statWeeklyHeader.textContent).toBe('주간 개요');
  });

  // Test Spanish
  test('Check that spanish is working', () => {
    localStorage.setItem('language', 'es');
    lang.setLanguageEs();
    expect(pomoHeader.textContent).toBe('Oso pomodoro');
    expect(breakMsg.textContent).toBe('¡Tómate un descanso!');
    expect(workIndicator.textContent).toBe('Pomodoro');
    expect(shortBreakIndicator.textContent).toBe('Corto Descanso');
    expect(longBreakIndicator.textContent).toBe('Descanso largo');
    expect(startStopButton.textContent).toBe('Comenzar');
    expect(promptText.innerHTML).toBe('Esto contará como una interrupción. <br> ¿Estás seguro?');
    expect(resetYes.textContent).toBe('Sí');
    expect(resetNo.textContent).toBe('No');
    expect(taskBtn.innerHTML).toBe('Tarea completa: <span id="task-pomo-counter"> 0 </span> Pomos');
    expect(settingsHeader.textContent).toBe('Configuración');
    expect(personalizationHeader.textContent).toBe('Opciones de personalización');
    expect(accessibilityHeader.textContent).toBe('Opciones de accesibilidad');
    expect(settingsColor.textContent).toBe('Daltonismo');
    expect(settingsKeystroke.textContent).toBe('Acceso mediante pulsación de tecla');
    expect(settingsAuto.textContent).toBe('Temporizador de inicio automático');
    expect(settingsTab.textContent).toBe('Visibilidad del temporizador');
    expect(settingsBackgrounds.textContent).toBe('Fondo');
    expect(dropdownOriginal.textContent).toBe('Original');
    expect(dropdownDesert.textContent).toBe('Desierto');
    expect(dropdownLake.textContent).toBe('Lago');
    expect(settingsLanguage.textContent).toBe('Idioma');
    expect(dropdownEnglish.textContent).toBe('English');
    expect(dropdownKorean.textContent).toBe('한국어');
    expect(dropdownSpanish.textContent).toBe('Español');
    expect(statsHeader.textContent).toBe('Estadísticas de usuario');
    expect(statTodayHeader.textContent).toBe('Hoy');
    expect(statPomoCycle.textContent).toBe('Pomos ciclos:');
    expect(statPomoCycleUnits.innerHTML).toBe('<span id="today-pomodoros"> ____ </span> po.');
    expect(statInterruption.textContent).toBe('Interrupciones:');
    expect(statTotalTasks.textContent).toBe('Total de tareas:');
    expect(statTotalTasksUnits.innerHTML).toBe('<span id="today-tasks"> ____ </span> tareas');
    expect(statTotalHeader.textContent).toBe('Totales');
    expect(statTotalPomoCycleUnits.innerHTML).toBe('<span id="total-pomodoros"> ____ </span> po.');
    expect(statTotalPomoCycle.innerHTML).toBe('Pomos ciclos:');
    expect(statAvgInterruption.innerHTML).toBe('Promedio de interrupciones:');
    expect(statAvgInterruptionUnits.innerHTML).toBe('<span id="total-interruptions"> ____ </span> por po.');
    expect(statBestDay.textContent).toBe('Mejor día:');
    expect(statBestDayUnits.innerHTML).toBe('<span id="total-best-pomo"> ____ </span> después. | <span id="total-best-time"> ____ </span> min. ');
    expect(statTotalTasksTotalUnits.innerHTML).toBe('<span id="total-tasks"> ____ </span> tareas');
    expect(statTotalTasksTotal.textContent).toBe('Total de tareas:');
    expect(statWeeklyHeader.textContent).toBe('Resumen semanal');
  });
});




