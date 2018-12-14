const expect = require('expect');

const {Users} = require('./users.js');

describe('Users' , () => {
  var users;

  beforeEach(() => {
    users = new Users();
     users.users = [{
      id:'1',
      name:'Niki',
      room:'111'
    },
    {
      id:'2',
      name:'Siddhi',
      room:'111'
    },
    {
      id:'3',
      name:'Rashi',
      room:'121'
    }]
  });

   it('should add new Users' , () => {
      var users = new Users();

      var user = {
        id: '234',
        name: 'kani',
        room: '1011'
      };

    //  var res = users.addUser(user);
    users.addUser(user.id,user.name,user.room);

      expect(users.users).toEqual([user]);

   });

   it('should return users in room 111', () => {
     var userlist = users.getUserList('111');
     expect(userlist).toEqual(['Niki','Siddhi']);
   });

   it('should return users in room 121', () => {
     var userlist = users.getUserList('121');
     expect(userlist).toEqual(['Rashi']);
   });

   it('should remove user' , () => {
     var userId = '2';
     var user = users.removeUser(userId);
     expect(user.id).toBe(userId);
     expect(users.users.length).toBe(2);

   });

   it('should not remove user' , () => {
     var userId = '67';
     var user = users.removeUser(userId);
     expect(user).toNotExist();
     expect(users.users.length).toBe(3);

   });

   it('should get user with valid id' , () => {
       var userId = '2';
       var user = users.getUser(userId);

       expect(user.id).toBe('2');
   });

   it('should not get user' , () => {
     var userId = '45';
     var user = users.getUser(userId);
     expect(user).toNotExist();
   });

});
