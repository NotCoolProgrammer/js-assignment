'use strict';

let allUsers = [];
let allGroups = [];
let allRights = [];


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

    allUsers.push(user)
    return user;
}

// Удаляет пользователя user
function deleteUser(user) {
    if (!user) {
        throw Error('Неправильные входные данные');
    }

    if (allUsers.indexOf(user) === -1) {
        throw Error('Пользователь уже был удален ранее');
    }

    allUsers.splice(allUsers.indexOf(user), 1);
}

// Возвращает массив групп, к которым принадлежит пользователь user
function userGroups(user) {
   return user.groups;
}

// Добавляет пользователя user в группу group
function addUserToGroup(user, group) {

    if (allUsers.indexOf(user) === -1) {
        throw Error ('Не существует пользователя');
    }

    if (allGroups.indexOf(group) === -1) {
        throw Error ('Не существует группы');
    }

    allUsers[allUsers.indexOf(user)].groups.push(group);

}

// Удаляет пользователя user из группы group. Должна бросить исключение, если пользователя user нет в группе group
function removeUserFromGroup(user, group) {
    if (allUsers.indexOf(user) === -1) {
        throw Error ('Не существует пользователя');
    }

    if (allGroups.indexOf(group) === -1) {
        throw Error ('Не существует группы');
    }

    if (allUsers[allUsers.indexOf(user)].groups.length === 0) {
        throw Error ("Некорректные данные");
    }

    allUsers[allUsers.indexOf(user)].groups.splice(allUsers[allUsers.indexOf(user)].groups.indexOf(group, 1));

}

// Возвращает массив прав
function rights() {
    return allRights;
}

// Создает новое право с именем name и возвращает его
function createRight(name) {
    let right = {
        name: name
    }

    allRights.push(right);
    return right;
}

// Удаляет право right
function deleteRight(right) {
    if (!right) {
        throw Error('It is not a right');
    }

    if (allRights.indexOf(right) === -1) {
        throw Error('the operation was performed earlier');
    }

    allRights.splice(allRights.indexOf(right), 1);
}

// Возвращает массив групп
function groups() {
    return allGroups;
}

// Создает новую группу и возвращает её.
function createGroup(name) {
    let group = {
        name: name,
        rights: []
    }
    allGroups.push(group);
    return group;
}

// Удаляет группу group
function deleteGroup(group) {
    if (!group) {
        throw Error('It is not a group');
    }

    if (allGroups.indexOf(group) === -1) {
        throw Error('the operation was performed earlier');
    }

    allGroups.splice(allGroups.indexOf(group), 1);
}

// Возвращает массив прав, которые принадлежат группе group
function groupRights(group) {
    return group.rights;
}

// Добавляет право right к группе group
function addRightToGroup(right, group) {
    if (allRights.indexOf(right) === -1) {
        throw Error ('Не существует права');
    }

    if (allGroups.indexOf(group) === -1) {
        throw Error ('Не существует группы');
    }
    group.rights.push(right);
}

// Удаляет право right из группы group. Должна бросить исключение, если права right нет в группе group
function removeRightFromGroup(right, group) {
    if (allRights.indexOf(right) === -1) {
        throw Error ('Не существует права');
    }

    if (allGroups.indexOf(group) === -1) {
        throw Error ('Не существует группы');
    }

    if (allGroups[allGroups.indexOf(group)].rights.length === 0) {
        throw Error ("Некорректные данные");
    }
    allGroups[allGroups.indexOf(group)].rights.splice(allGroups[allGroups.indexOf(group)].rights.indexOf(group, 1));
}

function login(username, password) {
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].name === username && allUsers[i].password === password) {
            return true;
        }
    }
}

function currentUser() {
    
}

function logout() {
    
}

function isAuthorized(user, right) {
    // user.groups.forEach(group => {      //тут вообще игнорируются все последующие права в группе, считывется только первое
    //     if (group.rights[allRights.indexOf(right)].name === right.name) {
    //         return true
    //     }
    // });

    // user.groups.forEach(group => {
    //     group.rights.forEach(onlyRight => {
    //         if (onlyRight.name === right.name) {
    //             return true;
    //         }
    //     })
    // });

    user.groups.some(group => {                 //не выходит из функции после первого найденного совпадения
        group.rights.some(element => element.name === right.name);
    });
}
