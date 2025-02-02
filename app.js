require('dotenv').config();
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const useragent = require('express-useragent');
const path = require('path');

const connectDB = require('./server/config/db')

const app = express()
const PORT = 3000 || process.env.PORT

connectDB()

app.use(express.static('public'))

app.use(expressLayouts);
app.use(useragent.express());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  if (req.useragent.isMobile) {
      app.set('layout', './layouts/mobile');
  } else {
      app.set('layout', './layouts/main');
  }
  next();
});

app.use('/', require('./server/routes/main'))
app.use('/addrec', require('./server/routes/addrecrouter'))
app.use('/mobile', require('./server/routes/mobile'))
app.use('/addToList', require('./server/routes/addLists'))
app.use('/api', require('./server/routes/api'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

/*
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Example app listening at http://0.0.0.0:${PORT}`);
}); 
*/