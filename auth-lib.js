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
        password: password
    }

    allUsers.push(user)
    return user;
}

// Удаляет пользователя user
function deleteUser(user) {
    if (!user) {
        throw Error('hello');
    }

    if (allUsers.indexOf(user) === -1) {
        throw Error('111111');
    }

    allUsers.splice(allUsers.indexOf(user), 1);
}

// Возвращает массив групп, к которым принадлежит пользователь user
function userGroups(user) {}

// Добавляет пользователя user в группу group
function addUserToGroup(user, group) {}

// Удаляет пользователя user из группы group. Должна бросить исключение, если пользователя user нет в группе group
function removeUserFromGroup(user, group) {}

// Возвращает массив прав
function rights() {
    // let rights = ['view content', 'edit content', 'delete content', 'add content'];
    // rights.push(allRights);
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
        throw Error('It is not a group');
    }

    if (allRights.indexOf(right) === -1) {
        throw Error('the operation was performed earlier');
    }

    allRights.splice(allRights.indexOf(right), 1);
}

// Возвращает массив групп
function groups() {
    // let groups = [
    //     {
    //         "admin": [allRights[0], allRights[1], allRights[2], allRights[3]]
    //     },
    //     {
    //         "developer": [allRights[1], allRights[3], allRights[2]],
    //     },
    //     {
    //         "user": [allRights[0]]
    //     }
    //     // "admin": [allRights[0], allRights[1], allRights[2], allRights[3]],
    //     // "developer": [allRights[1], allRights[3], allRights[2]],
    //     // "user": [allRights[0]]
    // ]


    // groups.push(allGroups);
    return allGroups;
}

// Создает новую группу и возвращает её.
function createGroup(name) {
    // let groups = [
    //     {
    //         "admin": [allRights[0], allRights[1], allRights[2], allRights[3]]
    //     },
    //     {
    //         "developer": [allRights[1], allRights[3], allRights[2]],
    //     },
    //     {
    //         "user": [allRights[0]]
    //     }
    // ];
    // groups.push(allGroups);
    // return groups;

    let group = {
        name: name
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
function groupRights() {}

// Добавляет право right к группе group
function addRightToGroup() {}

// Удаляет право right из группы group. Должна бросить исключение, если права right нет в группе group
function removeRightFromGroup() {}

function login(username, password) {}

function currentUser() {}

function logout() {}

function isAuthorized(user, right) {}
