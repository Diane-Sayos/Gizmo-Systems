const { faker } = require('@faker-js/faker');

const STUDENTS = []
const CAMPUSES = []

function createRandomStudents(){
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        imageUrl: faker.image.avatar(260, 160, true),
        gpa:((Math.random() * 4.0)),
        campusId: (Math.ceil(Math.random() * 20))
    }
};
function createRandomCampuses(){
    return {
        name: `${faker.company.companyName()} University`,
        address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
        imageUrl: faker.image.business(260, 160, true),
        description: faker.random.words(50),
    }
};
Array.from({length:20}).forEach(() => CAMPUSES.push(createRandomCampuses()));
Array.from({length:238}).forEach(() => STUDENTS.push(createRandomStudents()));

module.exports = { STUDENTS, CAMPUSES }