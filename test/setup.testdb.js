conn = new Mongo();
db = connect('notifier_demo');

var curYear = new Date().getFullYear();

db.users.remove({});

db.users.insert({
    _id: ObjectId('111111111111111111110001'),
    firstName: 'userFirst',
    lastName: 'userLast',
    userTel: '1234/56789',
    userEmail: 'user@gmail.com',
    hashedPassword: '7422a98bd783f63a9e242adde9d20fff5d20ad7d', // user
    salt: 'hUSxAgsgRwEpfWfS2m5SKsyjOJYWrg21qWnebUeqIhbndfVljWbvWLj68HgmL2uRO0i0c5/CYFYM8trIKPygcGEkLmNR6qxS3pINUW0iI05JkUkqbodB/WSSmsw+8HmEu67Vc+Hho6fpDwXsCId4N7i8cD+PvhJmRzyk5WvTw1k=',
    roles: []
});

db.users.insert({
    _id: ObjectId('111111111111111111110002'),
    firstName: 'adminFirst',
    lastName: 'adminLast',
    userTel: '+98 7654 321',
    userEmail: 'admin@gmail.com',
    hashedPassword: 'ca6a0cca16b21299724f71ef2fb23321ea5f1d6f', // admin
    salt: 'Kn6OJvtD2fDxN8LSqr2C/QGVvuvhfTOBJQY7osU94AHCQu/6Ux0s1DrFThYDq8d+wsscYglbW/2ggbsEX0nWE3AFSeIp/wkENBzcsR7jx1o5FS9GlEaaDL6TEuo+3Q1YKyTnBSUxgHqe4MORX5nRD9W9imQkwnO62gzZpFMLIOo=',
    roles: ['admin','fadmin']
});

db.users.insert({
    _id: ObjectId('111111111111111111110004'),
    firstName: 'testFirst',
    lastName: 'testLast',
    userTel: '1234/56789',
    userEmail: 'test@gmail.com',
    hashedPassword: '3fb9421d0d206d6726a1bf476183b6d2281781f7', // test
    salt: 'j3D+6LLnpmfebjVSCLWVF3G2dCgNvVO/ieVu6VjOiGj1/zGhiHa4Sc8NO7ojrl59oZ5qdVPoLNXHd0xqJ/kSGKQTsiVs5JbKHMxIff+JIfioByLfz2pbL37br3HKiQWCDNF//Orf2oa9vt7XElkhS7ZfVksmsSoAvkQji5Wce6c=',
    roles: []
});

var userCnt = db.users.find().count();
print("Users inserted: " + userCnt);
