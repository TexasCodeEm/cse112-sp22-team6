Current Live Version (Served with Azure App Service) 

<https://pomodoro-team6.azurewebsites.net/>

Please Checkout:[ Lighthouse Report](https://drive.google.com/file/d/1jD-UHMtWKe5u7MGyK9or28RG1IbNkh3f/view?usp=sharing)  [WebpageTest Desktop Cable](https://docs.google.com/document/u/0/d/1cwTpkAQqaHO9yr2Dx3iHqmbtyRWNpKFjVHVG-wg11kQ/edit)  [Security Report](https://drive.google.com/file/d/164bgAp-9qcgZloc-m23Le2EIA_oO2eRN/view?usp=sharing)

Goals
-----

Must be done

-   Web serving (Backend)

-   Apparently he mentioned this in office hours. He said firebase is fine. He just said don't host it on github pages. He said setting up an apache server is also fine, but it requires a dedicated devops person because it requires a lot of setting up/securing.

-   We can go to his office hours to talk about it tbh. I usually attend his office hours at 2:30PM on Wednesdays, but I don't know when the officially begin.

-   Automated Javascript/image/css compression/uglification (Devops) (Jun)

-   Jslint add rules

-   More testing (Testing)

-   Not enough unit testing (baijun) 

-   Shows time on browser tab (New Feature) (Anthony) 

-   Improve statistics (Improve Feature)

-   Some of the statistics (weekly report) does not make sense with the current setup as the webpage cannot memorize user's progress

-   Ways of addressing the problem

-   Sign-in & database solution

-   Cookies (Pending, Austin)

-   Graph (test & improve) (Ask Michael) 

-   Use ZingChart for the graph. (Karina) 

-   Setup Caching

-   New safari bottom address bar blocks some buttons. Geewhan. 

-   Analytics

-   Maybe use something like [LogRocket](https://logrocket.com/?utm_source=google&utm_medium=cpc&utm_campaign=1847635570&utm_group=68714021654&utm_term=logrocket&utm_content=&gclid=Cj0KCQjw6pOTBhCTARIsAHF23fJZ8iSKGuv7fYX_h88WjiCJ9FzcJLsSQwItyrTDAUm08zJvm6_hi0QaAtZQEALw_wcB#utm_source=google&utm_medium=cpc&utm_campaign=1847635570&utm_group=68714021654&utm_term=logrocket&utm_content=&gclid=Cj0KCQjw6pOTBhCTARIsAHF23fJZ8iSKGuv7fYX_h88WjiCJ9FzcJLsSQwItyrTDAUm08zJvm6_hi0QaAtZQEALw_wcB) or Google Analytics. (Tim)

-   Research LogRocket Google Analytics, setup accounts, write down pros & cons. 

-   Refactor HTML to use less divs (Prof doesn't like divs) (Anthony Jason if you have time after task 1)

Would be good to improve if we have time

-   Make it suitable on mobile browser (change font, icon sizes)

-   Potentially turning it into a mobile app by wrapping the webpage

-   Sign-in

-   Use cookies to remember user's settings and progress without having to sign-in

-   More accessibility

-   "This will count as an interruption" prompt only shows on first time clicking reset

-   Task manager (create to-do list)

-   "Deep focus" mode, end timer if user clicks elsewhere such that the current window loses focus (feasibility tbd)

|

Name

 |

Role

 |

Familiar Tech

 |
|

Jinhao Liu

 |

Tech Lead

 |\
 |
|

Jason Au

 |

Code Reviews

 |\
 |
|

Young Jun Kim

 |

DevOps/Planner

 |\
 |
|

Anthony Dinh

 |

Designer

 |\
 |
|

Baijun Chen

 |

Dev

 |\
 |
|

Karina Sanchez

 |

Dev

 |\
 |
|

Michael Khanzadeh

 |

Dev (Backend)

 |\
 |
|

Austin Choy

 |

Dev

 |\
 |
|

Geewhan Kim

 |

Dev

 |\
 |

Developer File Reviews (check their respective tests)

Austin - accessibility.js, constants.js, settings.js (user inputs based)

Anthony - CSS files in /styles (check UI suggestions below)

Tim - timer.js, timeWorker.js (logic/functionality of the timer)

Geewhan - tasks.js, stats.js (side functionalities)

Karina - graph.js, storage.js (graphing and helper functions)

Michael - /cypress integration tests

UI Suggestions

-   Font could be changed to be more modern and "friendly smooth" instead of "strict"

-   Button texts need to be larger (cover more of the button)

-   Color contrast needs to be greater for "Complete Task: 0 Pomos"

-   Text should be more "centered" by filling space evenly rather than leaning towards "lines" and having a big space between text and the next element in that direction

Functionality/Code Suggestions

-   Insert suggestion here