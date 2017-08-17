const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const todoList = require('./todos')
const todos = todoList.todos;
const expressValidator = require('express-validator');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// set middleware
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.render('index', {todos: todos});
});


app.post('/add', (req, res) => {
  req.checkBody('todoTask', 'Must add task.').notEmpty();
  let errors = req.validationErrors();
  if (errors) {
    res.redirect('/');
  } else {
    todos.push({task: req.body.todoTask, done: false});
    res.redirect('/');
  }
})


app.post('/complete', (req, res) => {
  // console.log(req.body);
  todos.forEach((item, index) => {
    // console.log(req.body.complete);
    // console.log(todos[index].task);
    if (req.body.complete === todos[index].task) {
      item.done = true;
    }
  });
  res.redirect('/');
});


app.listen(3070, (req, res) => {
  console.log('✌️ do is 🏃  on port 3070');
});

