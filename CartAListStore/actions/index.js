const emailvalid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordVaild = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
import {showMessage, hideMessage} from 'react-native-flash-message';

import {VARIABLES} from '../utils/Variables';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Linking, Alert, Platform} from 'react-native';

export const emailChanged = text => {
  return {
    type: 'email_changed',
    payload: text,
  };
};

export const PasswordChanged = text => {
  return {
    type: 'Password_changed',
    payload: text,
  };
};

export const Input5Changed = text => {
  return {
    type: 'Input5_Changed',
    payload: text,
  };
};

export const TypeChanged = text => {
  return {
    type: 'Type_changed',
    payload: text,
  };
};

export const CodeChanged = text => {
  return {
    type: 'Code_Changed',
    payload: text,
  };
};

export const AddItemStore = (Code, Quantity, Price, Name) => {
  return {
    type: 'Add_Item_Store',
    payload: {Code, Quantity, Price, Name},
  };
};

export const AddItemNoBarCode = (Code, Price, Name, Quantity) => {
  return {
    type: 'Add_Item_StoreNoBC',
    payload: {Code, Name, Price, Quantity},
  };
};

export const ClearItemStore = text => {
  return {
    type: 'Clear_Item',
    payload: text,
  };
};

export const NameChanged = text => {
  return {
    type: 'Name_Changed',
    payload: text,
  };
};

export const AddStaffBoss = (Name, value) => {
  console.log('we here');

  return async dispatch => {
    let token = await AsyncStorage.getItem('loginBoss');
    var Store = JSON.parse(token);
    dispatch({type: 'Spinner', payload: true});
    console.log(Name, value, Store.StoreId, 'lol');

    const res = await axios.post(VARIABLES.IP + '/api/Store/app/AddStaffBoss', {
      Name,
      value,
      StoreId: Store.StoreId,
      StoreName: Store.StoreName,
      StoreAddress: Store.StoreAddress,
      StoreType: Store.StoreType,
    });

    console.log(res, 'person');

    if (typeof res.data.error != 'undefined') {
      dispatch({type: 'Password_Error', payload: res.data.error});
    } else {
      dispatch({type: 'Get_Staff', payload: res.data});
    }

    dispatch({type: 'Spinner', payload: false});
  };
};

export const FetchStaff = () => async dispatch => {
  let token = await AsyncStorage.getItem('loginBoss');
  var Store = JSON.parse(token);
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(VARIABLES.IP + '/api/Store/app/FetchStaff', {
    StoreId: Store.StoreId,
  });
  dispatch({type: 'Get_Staff', payload: res.data});
  dispatch({type: 'Spinner', payload: false});
};

export const AddFullList = items => async dispatch => {
  //await AsyncStorage.removeItem('StoreItems');

  let token = await AsyncStorage.getItem('loginStaff'); // alow for both manager and clearck
  var Store = JSON.parse(token);
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(VARIABLES.IP + '/api/Store/app/AddFullList', {
    StoreId: Store.StoreId,
    StoreType: Store.StoreType,
    items,
  });
  var map = {};
  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    map[element.Code] = element;
  }
  let StoreItems = await AsyncStorage.getItem('StoreItems');
  if (StoreItems) {
    let List = JSON.parse(StoreItems);
    let merged = {...List, ...map};
    await AsyncStorage.setItem('StoreItems', JSON.stringify(merged));
  } else {
    await AsyncStorage.setItem('StoreItems', JSON.stringify(map));
  }
  showMessage({
    message: items.length + ' items sucessfully added',
    description: 'Success',
    type: 'default',
    backgroundColor: 'green', // background color
    color: 'white', // text color
  });
  dispatch({type: 'Done', payload: res.data});
  dispatch({type: 'Spinner', payload: false});
};

export const setPromoNBC = (newPrice, Date, item) => {
  console.log('we here');

  return async dispatch => {
    let token = await AsyncStorage.getItem('loginStaff');
    var Store = JSON.parse(token);
    dispatch({type: 'Spinner', payload: true});

    const res = await axios.post(VARIABLES.IP + '/api/Store/app/setPromoNBC', {
      newPrice,
      Date,
      item,
      StoreId: Store.StoreId,
      StoreName: Store.StoreName,
    });

    var map = res.data;
    let StoreItems = await AsyncStorage.getItem('StoreItemsNBC');
    let List = JSON.parse(StoreItems);
    let merged = {...List, ...map};
    await AsyncStorage.setItem('StoreItemsNBC', JSON.stringify(merged));
    showMessage({
      message: ' Promo sucessfully started',
      description: 'Success',
      type: 'default',
      backgroundColor: 'green', // background color
      color: 'white', // text color
    });
    dispatch({type: 'Added', payload: true});
    dispatch({type: 'Spinner', payload: false});
    dispatch({type: 'email_changed', payload: ''});
  };
};

export const setPromo = (newPrice, Date, item) => {
  console.log('we here');
  return async dispatch => {
    let token = await AsyncStorage.getItem('loginStaff');
    var Store = JSON.parse(token);
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(VARIABLES.IP + '/api/Store/app/setPromo', {
      newPrice,
      Date,
      item,
      StoreId: Store.StoreId,
      StoreName: Store.StoreName,
    });
    var map = res.data;
    let StoreItems = await AsyncStorage.getItem('StoreItems');
    let List = JSON.parse(StoreItems);
    let merged = {...List, ...map};
    await AsyncStorage.setItem('StoreItems', JSON.stringify(merged));
    showMessage({
      message: ' Promo sucessfully started',
      description: 'Success',
      type: 'default',
      backgroundColor: 'green', // background color
      color: 'white', // text color
    });
    dispatch({type: 'Added', payload: true});
    dispatch({type: 'Spinner', payload: false});
    dispatch({type: 'email_changed', payload: ''});
  };
};

export const ChangeNBC = (newPrice, Quantity, item, byweight) => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('loginStaff');
    var Store = JSON.parse(token);
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(VARIABLES.IP + '/api/Store/app/ChangeNBC', {
      newPrice,
      Quantity,
      item,
      byweight,
      StoreId: Store.StoreId,
      StoreName: Store.StoreName,
    });
    var map = res.data;
    let StoreItems = await AsyncStorage.getItem('StoreItemsNBC');
    let List = JSON.parse(StoreItems);
    let merged = {...List, ...map};
    await AsyncStorage.setItem('StoreItemsNBC', JSON.stringify(merged));
    showMessage({
      message: item.Name + ' sucessfully changed',
      description: 'Success',
      type: 'default',
      backgroundColor: 'green', // background color
      color: 'white', // text color
    });
    dispatch({type: 'Added', payload: true});
    dispatch({type: 'Spinner', payload: false});
    dispatch({type: 'email_changed', payload: ''});
  };
};

export const Change = (newPrice, Quantity, item, Name) => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('loginStaff');
    var Store = JSON.parse(token);
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(VARIABLES.IP + '/api/Store/app/Change', {
      newPrice,
      Quantity,
      item,
      Name,
      StoreId: Store.StoreId,
      StoreName: Store.StoreName,
    });
    var map = res.data;
    let StoreItems = await AsyncStorage.getItem('StoreItems');
    let List = JSON.parse(StoreItems);
    let merged = {...List, ...map};
    await AsyncStorage.setItem('StoreItems', JSON.stringify(merged));
    showMessage({
      message: item.Name + ' sucessfully changed',
      description: 'Success',
      type: 'default',
      backgroundColor: 'green', // background color
      color: 'white', // text color
    });
    dispatch({type: 'Added', payload: true});
    dispatch({type: 'Spinner', payload: false});
    dispatch({type: 'email_changed', payload: ''});
  };
};

export const sendEmailNBC = (msg, email, item) => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('loginStaff');
    var Store = JSON.parse(token);
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(VARIABLES.IP + '/api/Store/app/sendEmailNBC', {
      msg,
      email,
      item,
      StoreId: Store.StoreId,
      StoreName: Store.StoreName,
    });

    showMessage({
      message: item.Name + ' Reorder Sent changed',
      description: 'Success',
      type: 'default',
      backgroundColor: 'green', // background color
      color: 'white', // text color
    });
    dispatch({type: 'Added', payload: true});
    dispatch({type: 'Spinner', payload: false});
    dispatch({type: 'email_changed', payload: ''});
  };
};

export const sendEmailBC = (msg, email, item) => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('loginStaff');
    var Store = JSON.parse(token);
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(VARIABLES.IP + '/api/Store/app/sendEmailBC', {
      msg,
      email,
      item,
      StoreId: Store.StoreId,
      StoreName: Store.StoreName,
    });

    showMessage({
      message: item.Name + ' Reorder Sent changed',
      description: 'Success',
      type: 'default',
      backgroundColor: 'green', // background color
      color: 'white', // text color
    });
    dispatch({type: 'Added', payload: true});
    dispatch({type: 'Spinner', payload: false});
    dispatch({type: 'email_changed', payload: ''});
  };
};

export const sendTextNBC = (msg, mobile, item) => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('loginStaff');
    var Store = JSON.parse(token);
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(VARIABLES.IP + '/api/Store/app/sendTextNBC', {
      msg,
      mobile,
      item,
      StoreId: Store.StoreId,
      StoreName: Store.StoreName,
    });

    showMessage({
      message: item.Name + ' Reorder Sent changed',
      description: 'Success',
      type: 'default',
      backgroundColor: 'green', // background color
      color: 'white', // text color
    });
    dispatch({type: 'Added', payload: true});
    dispatch({type: 'Spinner', payload: false});
    dispatch({type: 'email_changed', payload: ''});
  };
};

export const sendTextBC = (msg, mobile, item) => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('loginStaff');
    var Store = JSON.parse(token);
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(VARIABLES.IP + '/api/Store/app/sendTextBC', {
      msg,
      mobile,
      item,
      StoreId: Store.StoreId,
      StoreName: Store.StoreName,
    });

    showMessage({
      message: item.Name + ' Reorder Sent changed',
      description: 'Success',
      type: 'default',
      backgroundColor: 'green', // background color
      color: 'white', // text color
    });
    dispatch({type: 'Added', payload: true});
    dispatch({type: 'Spinner', payload: false});
    dispatch({type: 'email_changed', payload: ''});
  };
};

export const Delete = item => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('loginStaff');
    var Store = JSON.parse(token);
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(VARIABLES.IP + '/api/Store/app/Delete', {
      item,
      StoreId: Store.StoreId,
      StoreName: Store.StoreName,
    });
    let StoreItems = await AsyncStorage.getItem('StoreItemsNBC');
    let List = JSON.parse(StoreItems);
    delete List[item.Search];
    await AsyncStorage.setItem('StoreItemsNBC', JSON.stringify(List));
    showMessage({
      message: item.Name + ' sucessfully changed',
      description: 'Success',
      type: 'default',
      backgroundColor: 'red', // background color
      color: 'white', // text color
    });
    dispatch({type: 'Added', payload: true});
    dispatch({type: 'Spinner', payload: false});
    dispatch({type: 'email_changed', payload: ''});
  };
};

export const DeleteBC = item => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('loginStaff');
    var Store = JSON.parse(token);
    dispatch({type: 'Spinner', payload: true});
    const res = await axios.post(VARIABLES.IP + '/api/Store/app/DeleteBC', {
      item,
      StoreId: Store.StoreId,
      StoreName: Store.StoreName,
    });
    let StoreItems = await AsyncStorage.getItem('StoreItemsNBC');
    let List = JSON.parse(StoreItems);
    delete List[item.Code];
    await AsyncStorage.setItem('StoreItemsNBC', JSON.stringify(List));
    showMessage({
      message: item.Name + ' sucessfully changed',
      description: 'Success',
      type: 'default',
      backgroundColor: 'red', // background color
      color: 'white', // text color
    });
    dispatch({type: 'Added', payload: true});
    dispatch({type: 'Spinner', payload: false});
    dispatch({type: 'email_changed', payload: ''});
  };
};

export const addNoBCItems = items => async dispatch => {
  //await AsyncStorage.removeItem('StoreItemsNBC');

  let token = await AsyncStorage.getItem('loginStaff'); // alow for both manager and clearck
  var Store = JSON.parse(token);
  dispatch({type: 'Spinner', payload: true});
  const res = await axios.post(VARIABLES.IP + '/api/Store/app/addNoBCItems', {
    StoreId: Store.StoreId,
    StoreType: Store.StoreType,
    items,
  });
  var map = res.data;

  let StoreItems = await AsyncStorage.getItem('StoreItemsNBC');
  if (StoreItems) {
    let List = JSON.parse(StoreItems);
    let merged = {...List, ...map};
    await AsyncStorage.setItem('StoreItemsNBC', JSON.stringify(merged));
  } else {
    await AsyncStorage.setItem('StoreItemsNBC', JSON.stringify(map));
  }

  showMessage({
    message: items.length + ' items sucessfully added',
    description: 'Success',
    type: 'default',
    backgroundColor: 'green', // background color
    color: 'white', // text color
  });

  dispatch({type: 'Done', payload: 'Done'});
  dispatch({type: 'Spinner', payload: false});
};

export const logincheck = () => async dispatch => {
  //await AsyncStorage.removeItem('loginStaff');
  //await AsyncStorage.removeItem('loginBoss');
  let token = await AsyncStorage.getItem('loginBoss');
  let list = await AsyncStorage.getItem('loginStaff');
  console.log(list, 'lsit');

  if (token) {
    setTimeout(() => {
      dispatch({type: 'Login_Done_Boss', payload: token});
    }, 1500);
  } else if (list) {
    setTimeout(() => {
      dispatch({type: 'Login_Done_Manager', payload: true});
    }, 1500);
  } else {
    setTimeout(() => {
      dispatch({type: 'Login_NO', payload: null});
    }, 3000);
  }
};

export const SignUpUser = ({Name, email, Code, password}) => {
  return async dispatch => {
    if (Name == '' || typeof Name == 'undefined') {
      dispatch({type: 'Name_Error', payload: 'Empty Field'});
      dispatch({type: 'Password_Error', payload: ''});
      dispatch({type: 'Email_Error', payload: ''});
      dispatch({type: 'Code_Error', payload: ''});
    } else if (email == '' || typeof email == 'undefined') {
      dispatch({type: 'Email_Error', payload: 'Empty Field'});
      dispatch({type: 'Password_Error', payload: ''});
      dispatch({type: 'Name_Error', payload: ''});
      dispatch({type: 'Code_Error', payload: ''});
    } else if (Code == '' || typeof Code == 'undefined') {
      dispatch({type: 'Code_Error', payload: 'Empty Field'});
      dispatch({type: 'Email_Error', payload: ''});
      dispatch({type: 'Password_Error', payload: ''});
      dispatch({type: 'Name_Error', payload: ''});
    } else if (password == '' || typeof password == 'undefined') {
      dispatch({type: 'Password_Error', payload: 'Empty Field'});
      dispatch({type: 'Email_Error', payload: ''});
      dispatch({type: 'Name_Error', payload: ''});
      dispatch({type: 'Code_Error', payload: ''});
    } else if (emailvalid.test(email) == false) {
      dispatch({type: 'Email_Error', payload: 'Enter an Email'});
      dispatch({type: 'Password_Error', payload: ''});
      dispatch({type: 'Name_Error', payload: ''});
      dispatch({type: 'Code_Error', payload: ''});
    } else if (passwordVaild.test(password) == false) {
      dispatch({
        type: 'Password_Error',
        payload: 'Must contain 8 charcters, uppercase, lowercase, digit',
      });
      dispatch({type: 'Email_Error', payload: ''});
      dispatch({type: 'Name_Error', payload: ''});
    } else {
      dispatch({type: 'Email_Error', payload: ''});
      dispatch({type: 'Password_Error', payload: ''});
      dispatch({type: 'Code_Error', payload: ''});
      dispatch({type: 'Name_Error', payload: ''});
      dispatch({type: 'Spinner', payload: true});
      const emailLower = email.toLowerCase();
      const res = await axios.post(
        VARIABLES.IP + '/api/Store/app/signupemail',
        {
          Name,
          password,
          Code,
          emailLower,
        },
      );

      console.log(res);

      if (typeof res.data.error != 'undefined') {
        dispatch({type: 'Password_Error', payload: res.data.error});
      } else {
        dispatch({type: 'Get_User', payload: res.data});
        if (res.data.Type == 0) {
          await AsyncStorage.setItem(
            'loginBoss',
            JSON.stringify({
              id: res.data._id,
              StoreId: res.data.StoreId,
              StoreName: res.data.StoreName,
              StoreAddress: res.data.StoreAddress,
              StoreType: res.data.StoreType,
              Name: res.data.Name,
            }),
          );

          dispatch({type: 'Login_Done_Boss', payload: res.data._id});
        } else if (res.data.Type == 2 || res.data.Type == 1) {
          let token = await AsyncStorage.getItem('staffList');
          if (token) {
            console.log('exist');

            let staffList = JSON.parse(token);
            let obj = staffList.find(o => o.id == res.data._id);
            console.log(obj, 'lol');
            if (obj == null || typeof obj == 'undefined') {
              console.log('lolkdsfjldjsfldjfi');

              staffList.push({
                Code: res.data.Code,
                id: res.data._id,
                StoreId: res.data.StoreId,
                StoreName: res.data.StoreName,
                StoreAddress: res.data.StoreAddress,
                StoreType: res.data.StoreType,
                Name: res.data.Name,
              });

              await AsyncStorage.setItem(
                'staffList',
                JSON.stringify(staffList),
              );
            }
          } else {
            console.log('does not exist');

            let staffList = [];

            staffList.push({
              Code: res.data.Code,
              id: res.data._id,
              StoreId: res.data.StoreId,
              StoreName: res.data.StoreName,
              StoreAddress: res.data.StoreAddress,
              StoreType: res.data.StoreType,
              Name: res.data.Name,
            });

            await AsyncStorage.setItem('staffList', JSON.stringify(staffList));
          }

          await AsyncStorage.setItem(
            'loginStaff',
            JSON.stringify({
              id: res.data._id,
              StoreId: res.data.StoreId,
              StoreName: res.data.StoreName,
              StoreAddress: res.data.StoreAddress,
              StoreType: res.data.StoreType,
              Name: res.data.Name,
              Type: res.data.Type,
            }),
          );

          dispatch({type: 'Login_Done_Manager', payload: res.data._id});
        } else {
          dispatch({type: 'Login_Done_Manager', payload: res.data._id});
        }
      }
      dispatch({type: 'Spinner', payload: false});
    }
  };
};
