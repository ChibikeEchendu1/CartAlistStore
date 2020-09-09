import _ from 'lodash';
const INITIAL_STATE = {
  email: '',
  password: '',
  Code: '',
  Name: '',
  staff: [],
  items: [],
  type: '',
  itemsNoBC: [],
  NameError: '',
  CodeError: '',
  EmailError: '',
  Added: false,
  Done: false,
  PasswordError: '',
  Loader: false,
  input5: '',
  Boss: false,
  Manager: false,
  new: false,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case 'email_changed':
      return {...state, email: action.payload};
    case 'Password_changed':
      return {...state, password: action.payload};
    case 'Code_Changed':
      return {...state, Code: action.payload};
    case 'Name_Changed':
      return {...state, Name: action.payload};
    case 'Type_changed':
      return {...state, type: action.payload};
    case 'Email_Error':
      return {...state, EmailError: action.payload};
    case 'Input5_Changed':
      return {...state, input5: action.payload};
    case 'Added':
      return {...state, Added: true};
    case 'Add_Item_Store':
      return {
        ...state,
        items: [...state.items, action.payload],
        Code: '',
        Name: '',
        email: '',
      };
    case 'Add_Item_StoreNoBC':
      return {
        ...state,
        itemsNoBC: [...state.itemsNoBC, action.payload],
        Code: '',
        Name: '',
        email: '',
      };
    case 'Code_Error':
      return {...state, CodeError: action.payload};

    case 'Clear_Item':
      return {...state, items: []};
    case 'Login_Done_Boss':
      return {...state, Boss: action.payload};
    case 'Done':
      return {...state, Done: true, items: []};
    case 'Login_Done_Manager':
      return {...state, Manager: action.payload};
    case 'Password_Error':
      return {...state, PasswordError: action.payload};
    case 'Spinner':
      return {...state, Loader: action.payload};
    case 'Name_Error':
      return {...state, NameError: action.payload};
    case 'Get_Staff':
      return {...state, staff: action.payload};
    case 'Login_NO':
      return {...state, new: true};
    default:
      return state;
  }
};
