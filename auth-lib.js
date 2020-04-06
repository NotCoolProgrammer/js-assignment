'use strict';

let allUsers = [];
let allGroups = [];
let allRights = [];
let rightsInGroups = {};
let session = {};


// Возвращает массив всех пользователей.
function users() {
    return allUsers;
}

//Создает нового пользователя с указанным логином username и паролем password, возвращает созданного пользователя.
function createUser(name, password) {
    let user = {
        name: name,
        password: password,
        groups: []
    }

    allUsers.push(user);
    return user;
}

// Удаляет пользователя user
function deleteUser(user) {
    if (!user) {
        throw new Error('Неправильные входные данные');
    }

    if (!allUsers.includes(user)) {
        throw new Error(`Пользователь уже был удален ранее`);
    }

    allUsers.splice(allUsers.indexOf(user), 1);
}

// Возвращает массив групп, к которым принадлежит пользователь user
function userGroups(user) {
   return user.groups;
}

// Добавляет пользователя user в группу group
function addUserToGroup(user, group) {

    if (!allUsers.includes(user)) {
        throw new Error ('Такого пользователя нет');
    }

    if (!allGroups.includes(group)) {
        throw new Error ('Нет такой группы');
    }

    allUsers[allUsers.indexOf(user)].groups.push(group);

}

// Удаляет пользователя user из группы group. Должна бросить исключение, если пользователя user нет в группе group
function removeUserFromGroup(user, group) {
    if (allUsers[allUsers.indexOf(user)].groups.length === 0) {
        throw new Error ("Некорректные данные");
    }

    allUsers[allUsers.indexOf(user)].groups.splice(allUsers[allUsers.indexOf(user)].groups.indexOf(group, 1));

}

// Возвращает массив прав
function rights() {
    return allRights;
}

// Создает новое право с именем name и возвращает его
function createRight(name) {
    allRights.push(name);
    return name;
}

// Удаляет право right
function deleteRight(right) {
    if (!right) {
        throw new Error('It is not a right');
    }

    if (!allRights.includes(right)) {
        throw new Error('the operation was performed earlier');
    }

    allRights.splice(allRights.indexOf(right), 1);
    for (let key in rightsInGroups) {
        if (rightsInGroups[key].includes(right)) {
            rightsInGroups[key].splice(rightsInGroups[key].indexOf(right), 1)
        }
    }
}

// Возвращает массив групп
function groups() {
    return allGroups;
}

// Создает новую группу и возвращает её.
function createGroup(name) {
    allGroups.push(name);
    rightsInGroups[name] = [];

    return name;
}

// Удаляет группу group
function deleteGroup(group) {
    if (!group) {
        throw new Error('It is not a group');
    }

    if (!allGroups.includes(group)) {
        throw new Error('the operation was performed earlier');
    }

    delete rightsInGroups[group];
    allGroups.splice(allGroups.indexOf(group), 1);
    allUsers.forEach(function (user) {
        if (user.groups.includes(group)) {
            user.groups.splice(user.groups.indexOf(group), 1)
        }
    })
}

// Возвращает массив прав, которые принадлежат группе group
function groupRights(group) {
    return rightsInGroups[group]
}

// Добавляет право right к группе group
function addRightToGroup(right, group) {
    if (!allRights.includes(right)) {
        throw new Error ('Не существует права');
    }

    if (!allGroups.includes(group)) {
        throw new Error ('Не существует группы');
    }
    rightsInGroups[group].push(right)
}

// Удаляет право right из группы group. Должна бросить исключение, если права right нет в группе group
function removeRightFromGroup(right, group) {
    if (!rightsInGroups[group].includes(right)) {
        throw new Error("В этой группе не содержится данного правила")
    }
    rightsInGroups[group].splice(rightsInGroups[group].indexOf(right), 1)
}

//создание сессии пользователя в системе
function login(username, password) {
    if (!username && !password) {
        let guest = {
            name: 'guest',
            group: 'guestGroup'
        }
        let guestRight = 'guestRight';
        allUsers.push(guest);
        addRightToGroup(guestRight, guest.group);
        session[guest.name] = true;
        return true;
    }

    let filteredUser = allUsers.filter(user => user.name == username && user.password == password);

    if (!session[username] && filteredUser.length) {
        session[username] = true;
        return true;
    } else {
        return false;
    }
}

//проверка на существование сессии пользователя
function currentUser() {
    for (let key in session) {
        if (session[key]) {
            return allUsers.filter(user => user.name == key)[0];
        }
    }
}

//выход пользователя из системы
function logout() {
    session[currentUser().name] = false;
}

//проверка на то, есть  ли у пользователя переданное право
function isAuthorized(user, right) {
    if (!allUsers.includes(user)) {
        throw new error('Не сущесвует пользователя'); 
    }
    if (!allRights.includes(right)) {
        throw new error('Не существует права'); 
    }

    function userRights (user) {
        return allUsers.filter(item => item.name == user.name)[0].groups.map(group => rightsInGroups[group]);
    }

    let authorized = false;
    userRights(user).forEach(function (array) { 
        if (array.includes(right)) {
            authorized = true;
        } 
    })
    return authorized;
}

let otherUser;
let loginWithSomePermissions = false;

function loginAs (user) {
    if (isAuthorized(currentUser(), "administrator")) {
        otherUser = currentUser();
        logout();
        loginWithSomePermissions = true;
        login(user.name, user.password);
    } else {
        throw new error('У данного пользователя нету необходимых прав доступа');
    }
}

function securityWrapper (action, right) {
    let callToAction = function () {
        if (isAuthorized(currentUser(), right)) {
            action()
        } else {
            throw new error('У данного пользователя нету соответствующих прав на выполнение данного действия');
        }
    }
    return callToAction();
}








