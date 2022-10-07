const port = process.env.PORT || 3000;
const app = require('./app');
const { syncAndSeed } = require('../db/db');

const setup = async() => {
    await syncAndSeed();
    console.log('Seeding Succesful!')
    app.listen(port, ()=> console.log(`listening on port ${port}`));
};

setup();