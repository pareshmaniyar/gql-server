var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        employee(id: Int!): Employee
        employees(topic: String): [Employee]
    },
    type Employee {
        id: Int,
        jobTitleName: String,
        firstName: String,
        lastName: String,
        preferredFullName: String,
        employeeCode: String,
        region: String,
        phoneNumber: String,
        emailAddress: String
    }
`);
var employeesData = [
    {
        "id":1,
        "jobTitleName":"Developer",
        "firstName":"Romin",
        "lastName":"Irani",
        "preferredFullName":"Romin Irani",
        "employeeCode":"E1",
        "region":"CA",
        "phoneNumber":"408-1234567",
        "emailAddress":"romin.k.irani@gmail.com"
    },
    {
        "id":2,
        "jobTitleName":"Developer",
        "firstName":"Neil",
        "lastName":"Irani",
        "preferredFullName":"Neil Irani",
        "employeeCode":"E2",
        "region":"CA",
        "phoneNumber":"408-1111111",
        "emailAddress":"neilrirani@gmail.com"
    },
    {
        "id":3,
        "jobTitleName":"Program Directory",
        "firstName":"Tom",
        "lastName":"Hanks",
        "preferredFullName":"Tom Hanks",
        "employeeCode":"E3",
        "region":"CA",
        "phoneNumber":"408-2222222",
        "emailAddress":"tomhanks@gmail.com"
    }
]

var getEmployee = function(args) { 
    var id = args.id;
    return employeesData.filter(employee => {
        return employee.id == id;
    })[0];
}
var getEmployees = function(args) {
    if (args.topic) {
        var topic = args.topic;
        return employeesData.filter(course => course.topic === topic);
    } else {
        return employeesData;
    }
}
var root = {
    employee: getEmployee,
    employees: getEmployees
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
