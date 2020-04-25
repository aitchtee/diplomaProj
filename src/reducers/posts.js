//* редюсер posts. имеет данные связанные конкретно с записями, которые работают только с записями

// начальные значения
const initialState = {
  posts: [],
};

export default function (state = initialState, action) {
  // возвращаем новый state
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state, //! (?) копируем из state в новый объект. тоже самое, что Object.assign({}, state, { posts: ['что-нибудь'] })
        posts: action.payload, // вносим новое значение 
      };
    case 'REMOVE_POSTS':
      return {
        ...state,
      };
    default:
      return state;
  }
};