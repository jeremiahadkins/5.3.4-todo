const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const todoList = require('./todos')
const todos = todoList.todos;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// set middleware
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.render('index', {todos: todos});
});


app.post('/add', (req, res) => {
  // console.log('before', todos);
  todos.push({task: req.body.todoTask, done: false});
  // console.log('after', todos);
  res.redirect('/');
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
  console.log('2du is 🏃  on port 3070');
});

