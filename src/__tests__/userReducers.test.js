import * as UserActions from "../actions/userActions";
import reducer from "../reducers/userReducer";
import uniqid from "uniqid";
import { users } from "../api/data";
const initUsers = users;
const existUser = {
  id: 1,
  firstname: "Ana",
  lastname: "Stannislawski",
  age: 1,
  allegiances: "Red Baneberry"
};
describe("User Tests", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      activeUser: null,
      users: [],
      visibleUsers: [],
      isRequestingUsers: true,
      errorLoadingUsers: null,
      loadingError: null
    });
  });
  it("add an item to user list", () => {
    expect(
      reducer(
        { users: initUsers },
        {
          type: UserActions.ADD_USER,
          user: { firstname: "Sepehr", lastname: "Aliakbari", id: "123" }
        }
      )
    ).toEqual({
      users: [
        ...initUsers,
        {
          id: "123",
          firstname: "Sepehr",
          lastname: "Aliakbari"
        }
      ],
      visibleUsers: [
        ...initUsers,
        {
          id: "123",
          firstname: "Sepehr",
          lastname: "Aliakbari"
        }
      ]
    });
  });
  it("remove an item from user list", () => {
    expect(
      reducer(
        { users: initUsers },
        {
          type: UserActions.DELETE_USER,
          user: existUser
        }
      )
    ).toEqual({
      users: initUsers.filter(item => item.id !== 1),
      visibleUsers: initUsers.filter(item => item.id !== 1)
    });
    expect(
      reducer(
        { users: initUsers },
        {
          type: UserActions.DELETE_USER,
          user: {
            id: 0,
            firstname: "Ana",
            lastname: "Stannislawski"
          }
        }
      )
    ).toEqual({
      users: initUsers,
      visibleUsers: initUsers
    });
  });
  it("update user active", () => {
    expect(
      reducer(
        { users: initUsers },
        {
          type: UserActions.UPDATE_ACTIVE_USER,
          user: existUser
        }
      )
    ).toEqual({
      activeUser: existUser,
      users: initUsers
    });
  });
  it("search users", () => {
    expect(
      reducer(
        { users: initUsers },
        {
          type: UserActions.SEARCH_USER,
          username: "Ana"
        }
      )
    ).toEqual({
      visibleUsers: [existUser],
      users: initUsers
    });
    expect(
      reducer(
        { users: initUsers },
        {
          type: UserActions.SEARCH_USER,
          username: "lmntfvc"
        }
      )
    ).toEqual({
      visibleUsers: [],
      users: initUsers
    });
  });
  expect(
    reducer(
      { users: initUsers },
      {
        type: UserActions.SEARCH_USER,
        username: ""
      }
    )
  ).toEqual({
    visibleUsers: initUsers,
    users: initUsers
  });
});
