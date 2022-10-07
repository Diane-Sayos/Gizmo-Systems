const Sequelize = require('sequelize');
const connection = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_schools_db');
const { STRING, TEXT, VIRTUAL, DECIMAL, INTEGER } = Sequelize;
const { STUDENTS, CAMPUSES } = require('./seed');

const Campus = connection.define('campus', {
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: STRING
    },
    address: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: TEXT
    }
});
const Student = connection.define('student', {
    firstName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fullName: {
        type: VIRTUAL,
        get: function(){
            return `${this.firstName} ${this.lastName}`;
        }
    },
    email: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    imageUrl: {
        type: STRING
    },
    gpa: {
        type: DECIMAL(3, 2)
    },
    campusId: {
        type: INTEGER,
        allowNull: true
    }
});
//association
Campus.hasMany(Student);
Student.belongsTo(Campus);

const syncAndSeed = async() => {
    await connection.sync({force: true});
    //populate Campus data --- for each object in CAMPUSES array, create a campus with that object
    await Promise.all(CAMPUSES.map(campus => Campus.create(campus)));
    //populate Student data --for each object in STUDENTS array, create a student with that object
    await Promise.all(STUDENTS.map(student => Student.create(student)));
    const [abby, ava, andrea, allyssa, anna, angie, amelia, andrew, philip, veronica, vince, wyatt] = await Promise.all([
        Student.create({firstName: 'Abby', lastName: 'Reynolds', email: 'abbyreynolds00@aim.com', gpa: 4.0,imageUrl: 'https://loremflickr.com/260/160/cats?46060', campusId: null}),
        Student.create({firstName: 'Ava', lastName: 'Reynolds', email: 'avareynolds11@aim.com', gpa: 0.0,imageUrl: 'https://loremflickr.com/260/160/cats?11209', campusId: null}),
        Student.create({firstName: 'Andrea', lastName: 'Adams', email: 'andreaadams22@aim.com', gpa: 1.2,imageUrl: 'https://loremflickr.com/260/160/cats?81717', campusId: null}),
        Student.create({firstName: 'Allyssa', lastName: 'Brown', email: 'allyssabrown88@gmail.com', gpa: 3.6,imageUrl: 'https://loremflickr.com/260/160/cats?14613', campusId: null}),
        Student.create({firstName: 'Anna', lastName: 'Reyes', email: 'annareyes09@icloud.com', gpa: 4.0,imageUrl: 'https://loremflickr.com/260/160/cats?71329', campusId: null}),
        Student.create({firstName: 'Angie', lastName: 'Hernandez', email: 'angiehernandez@gmail.com', gpa: 3.3,imageUrl: 'https://loremflickr.com/260/160/cats?79655', campusId: null}),
        Student.create({firstName: 'Amelia', lastName: 'White', email: 'ameliawhite33@gmail.com', gpa: 2.2,imageUrl: 'https://loremflickr.com/260/160/cats?46060', campusId: null}),
        Student.create({firstName: 'Andrew', lastName: 'Jackson', email: 'andrewjackson55@hotmail.com', gpa:1.44,imageUrl: 'https://loremflickr.com/260/160/cats?11209', campusId: null}),
        Student.create({firstName: 'Philip', lastName: 'Matthews', email: 'philipmatthews33@aim.com', gpa: 2.55,imageUrl: 'https://loremflickr.com/260/160/cats?81717', campusId: null}),
        Student.create({firstName: 'Veronica', lastName: 'Black', email: 'verablack23@gmail.com', gpa: 1.99,imageUrl: 'https://loremflickr.com/260/160/cats?14613', campusId: null}),
        Student.create({firstName: 'Vince', lastName: 'Rain', email: 'vincerain88@icloud.com', gpa: 3.85,imageUrl: 'https://loremflickr.com/260/160/cats?7132', campusId: null}),
        Student.create({firstName: 'Wyatt', lastName: 'Johnson', email: 'wyattjohnson@aim.com', gpa: 3.99,imageUrl: 'https://loremflickr.com/260/160/cats?79655', campusId: null})
    ]);
};

module.exports = {
    Student,
    Campus,
    syncAndSeed
}