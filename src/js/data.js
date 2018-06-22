Promise.all([ // Ejecuta todas las llamadas de manera paralela.
  fetch('/data/cohorts/lim-2018-03-pre-core-pw/users.json'),
  fetch('/data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  fetch('/data/cohorts.json')
]).then((responses)=>{ // Responde a todas las promesas.
  return Promise.all(responses.map((response => response.json())));
}).then((responseJsons)=>{ // Arreglo de respuestas en json.

  let users = responseJsons[0];
  let progress = responseJsons[1];
  let courses = responseJsons[2];

 computeUsersStats(users, progress, courses);
 
}).catch(
  (error)=>{ // Al menos una llamada falló.
  }
);


window.computeUsersStats = (users, progress, courses) => {
  users.map(user => {
    courses.map(course => {     
      if (progress[user.id][course]) {        
        user.stats = {
          percent: progress[user.id][course].percent,
          exercises: {
            total: 0,
            completed: 0
          },
          quizzes: {
            total: 0,
            completed: 0,
            scoreSum: 0
          },
          reads: {
            total: 0,
            completed: 0
          },
        };

        // Recupera los valores del objeto y los devuelve en un arreglo
        Object.values(progress[user.id][course].units).forEach(unit => {
          Object.values(unit.elements).forEach(element => {
            switch (element) {             
            case element.type === 'practice':          
              user.stats.exercises.total++;
              user.stats.exercises.completed.push(element.completed);
            
            case element.type === 'quiz': 
              user.stats.quizzes.total++;
              user.stats.quizzes.completed.push(element.completed);
            
            case element.completed: 
              user.stats.quizzes.scoreSum.push(element.score);
              
            case element.type === 'read':
              user.stats.reads.total++;
              user.stats.reads.completed.push(element.completed);
            }
          }
          );
        });

        // Promedio porcentaje
        user.stats.exercises.percent = Math.round(user.stats.exercises.completed / user.stats.exercises.total * 100);
        user.stats.quizzes.percent = Math.round(user.stats.quizzes.completed / user.stats.quizzes.total * 100);
        user.stats.quizzes.scoreAvg = Math.round(user.stats.quizzes.scoreSum / user.stats.quizzes.completed);
        user.stats.reads.percent = Math.round(user.stats.reads.completed / user.stats.reads.total * 100);
      } else {
        user.stats = {
          percent: 0,
          exercises: {},
          quizzes: {},
          reads: {},
        };
      }
    });
  });
  return users;
};


window.sortUsers = (users, orderBy, orderDirection) => {
  if (orderBy === 'name') {
    return users.sort(orderByName(orderDirection));
  } else if (orderBy === 'stats.percent') {
    return users.sort(orderByTotalPercentage(orderDirection));
  } else {
    return users.sort(orderByStats(orderBy, orderDirection));
  }
};

window.orderByName = (orderDirection) => {
  return function(student1, student2) {
    let comparisonResult = student1.name.localeCompare(student2.name);
    return orderDirection === 'ASC' ? comparisonResult : -comparisonResult;
  };
};

window.orderByTotalPercentage = (orderDirection) => {
  return function(student1, student2) {
    let comparisonResult = student1.stats.percent - student2.stats.percent;
    return orderDirection === 'ASC' ? comparisonResult : -comparisonResult;
  };
};

window.orderByStats = (orderBy, orderDirection) => {
  let criteria = orderBy.split('.');
  return function(student1, student2) {
    let comparisonResult = student1.stats[quizzes[1]][completed[2]] - student2.stats[quizzes[1]][completed[2]];
    return orderDirection === 'ASC' ? comparisonResult : -comparisonResult;
  };
};

window.filterUsers = (users, search) => {
  let upperCaseSearch = search.toUpperCase();
  return users.filter(user => user.name.toUpperCase().includes(upperCaseSearch));
};
console.log(window, filterUsers);


 
