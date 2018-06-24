Promise.all([ // Ejecuta todas las llamadas de manera paralela.
  fetch('/data/cohorts/lim-2018-03-pre-core-pw/users.json'),
  fetch('/data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  fetch('/data/cohorts.json')
]).then((responses)=>{ // Responde a todas las promesas.
  return Promise.all(responses.map((response => response.json())));
}).then((responseJsons)=>{ // Arreglo de respuestas en json.
  let users = responseJsons[0];
  let progress = responseJsons[1];
  let cohorts = responseJsons[2];
  
  muestraCohorts(users);
  const cohort = cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
  const courses = Object.keys(cohort.coursesIndex);
  computeUsersStats(users, progress, courses);
}).catch(
  (error)=>{ // Al menos una llamada falló.
  }
);

// Buscador de cohorts no terminada aun.
muestraCohorts = (users) => {
  /* const cohortsId = courses.map(courses => element.id);
  const contenedor = document.getElementById('cohortsdata');
  cohortsId.forEach(element => {
    const item = document.createElement('option');
    item.innerText = element;
    contenedor.appendChild(item);
  }) */
};
computeUsersStats = (users, progress, courses) =>{
  let newUsers = [];
  users.forEach(user => {
    let readsCompleted = 0, readsTotal = 0, scoreSumQuizz = 0, scoreAvg = 0,
      quizzCompleted = 0, quizzTotal = 0, practiceTotal = 0, practiceCompleted = 0, percent = 0;
    courses.forEach(course => {
      if (progress[user.id][course]) {
        Object.values(progress[user.id][course].units).forEach(unit => {
          Object.values(unit.parts).forEach(part => {
            if (part.type === 'read') {
              readsTotal += 1;
              if (part.completed === 1) {
                readsCompleted += 1;
              }
            }
            if (part.type === 'quiz') {
              quizzTotal += 1;
              if (part.completed === 1) {
                quizzCompleted += 1;
                scoreSumQuizz += part.score;
              }
            }
            if (part.type === 'practice') {
              practiceTotal += 1;
              if (part.completed === 1) {
                practiceCompleted++;
              }
            }
          });
        });
        // Calculo de porcentajes aqui
        user.stats = {
          percent: percent,
          exercises: {
            total: practiceTotal,
            completed: practiceCompleted,
            percent: Math.round(practiceTotal / practiceCompleted * 100)
          },
          quizzes: {
            total: quizzTotal,
            completed: quizzCompleted,
            percent: 0,
            scoreSum: scoreSumQuizz,
            scoreAvg: 0,
          },
          reads: {
            total: readsTotal,
            completed: readsCompleted,
            percent: 0,
          },
        };
      } else {
        user.stats = {
          percent: 0,
          exercises: {},
          quizzes: {},
          reads: {},
        };
      }
      // console.log(user)
      newUsers.push(user);
    });
  });
  console.log(newUsers);
  return users;
};

