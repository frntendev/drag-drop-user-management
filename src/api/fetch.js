import _ from 'lodash';
import { users, groups } from './data';

/**
 * Mock the fetching of data for now. Replace this function with a real
 * data-fetching API call later on.
 *
 * @returns {Promise} the user data
 */
function fetchUsers() {
  return new Promise((resolve) => {
    // mimic an async network request
    setTimeout(() => {
      resolve(_.sortBy(users, o => o.id));
    },Math.floor(Math.random() * 600) + 300 );
  });
}

/**
 * Mock the fetching of data for now. Replace this function with a real
 * data-fetching API call later on.
 *
 * @returns {Promise} the group data
 */
function fetchGroups() {
  return new Promise(resolve => {
    // mimic an async network request
    setTimeout(() => {
      resolve(_.sortBy(groups, o => o.id ));
    }, Math.floor(Math.random() * 600) + 300 );
  });
}

/**
 * Export an object so that the API gets called like:
 * fetch.users();
 */
export default {
  users: fetchUsers,
  groups: fetchGroups
}

