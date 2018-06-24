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
  muestraCohorts(cohorts);
  const cohort = cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
  const courses = Object.keys(cohort.coursesIndex);
  computeUsersStats(users, progress, courses);
}).catch(
  (error)=>{ // Al menos una llamada falló.
  }
);


window.computeUsersStats = (users, progress, courses) =>{
  let newUsers = [];
  users.forEach(user => { // Recorre users
    let readsCompleted = 0, readsTotal = 0, scoreSumQuizz = 0, 
      quizzCompleted = 0, quizzTotal = 0, practiceTotal = 0, practiceCompleted = 0;
    courses.forEach(course => {
      if (progress[user.id][course]) { // Entramos a la data
        // Recupera los valores del objeto y los devuelve en un arreglo
        Object.values(progress[user.id][course].units).forEach(unit => {
          Object.values(unit.parts).forEach(part => {
            if (part.type === 'read') { 
              readsTotal++;
              if (part.completed === 1) {
                readsCompleted++;
              }
            }
            if (part.type === 'quiz') {
              quizzTotal++;
              if (part.completed === 1) {
                quizzCompleted++;
                scoreSumQuizz += part.score;
              }
            }
            if (part.type === 'practice') {
              practiceTotal++;
              if (part.completed === 1) {
                practiceCompleted++;
              }
            }
          });
        });
        
        // Calculo de porcentajes
        var percentProgress = Math.round((practiceCompleted / practiceTotal) * 100);
        var percentQuizzes = Math.round((quizzCompleted / quizzTotal) * 100);
        var divQuizzed = Math.round(scoreSumQuizz / quizzCompleted);
        var percentReads = Math.round((readsCompleted / readsTotal) * 100); 
        // Se les da la propiedad
        user.stats = { 
          percent: 0,
          exercises: {
            total: practiceTotal,
            completed: practiceCompleted,
            percent: percentProgress
          },
          quizzes: {
            total: quizzTotal,
            completed: quizzCompleted,
            percent: percentQuizzes,
            scoreSum: scoreSumQuizz,
            scoreAvg: divQuizzed
          },
          reads: {
            total: readsTotal,
            completed: readsCompleted,
            percent: percentReads
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
  
  // console.log(newUsers);
  return users;
};


sortUsers = (users, orderBy, orderDirection) => {
  let sort = [];
  if (orderBy === 'name') {
    if (orderDirection === 'ASC') {
      sorted = users.sort((ichi, ni) => ichi.name.localeCompare(ni.name));
    }
    if (orderDirection === 'DESC') {
      sorted = users.sort((ichi, ni) => ichi.name.localeCompare(ni.name)).reverse();
      console.log(orderDirection);
    }
  };

  if (orderBy === 'general percent') {
    if (orderDirection === 'ASC') {
      sorted = users.sort((ichi, ni) => ichi.stats - ni.stats);
    }
    if (orderDirection === 'DESC') {
      sorted = users.sort((ichi, ni) => ichi.stats - ni.stats).reverse();
    }
  };
  if (orderBy === 'excersices percent') {
    if (orderDirection === 'ASC') {
      sorted = users.sort((ichi, ni) => ichi.percentProgress - ni.percentProgress);
    }
    if (orderDirection === 'DESC') {
      sorted = users.sort((ichi, ni) => ichi.percentProgress - ni.percentProgress).reverse();
    }
  };
  if (orderBy === 'quizzes percent') {
    if (orderDirection === 'ASC') {
      sorted = users.sort((ichi, ni) => ichi.percentQuizzes - ni.percentQuizzes);
    }
    if (orderDirection === 'DESC') {
      sorted = users.sort((ichi, ni) => ichi.percentQuizzes - ni.percentQuizzes).reverse();
    }
  };
  if (orderBy === 'media quizzes') {
    if (orderDirection === 'ASC') {
      sorted = users.sort((ichi, ni) => ichi.divQuizzed - ni.divQuizzed);
    }
    if (orderDirection === 'DESC') {
      sorted = users.sort((ichi, ni) => ichi.divQuizzed - ni.divQuizzed).reverse();
    }
  };
  if (orderBy === 'reads percent') {
    if (orderDirection === 'ASC') {
      sorted = users.sort((ichi, ni) => ichi.percentReads - ni.percentReads);
    }
    if (orderDirection === 'DESC') {
      sorted = users.sort((ichi, ni) => ichi.percentReads - ni.percentReads).reverse();
    }
  };
  return sort;
};


/* filterUsers(users, search){}
processCohortData(options) */