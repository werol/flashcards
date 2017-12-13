import { FormFieldBuilder } from "../component/forms/FormFieldBuilder";

export const MENU_FOR_USER = [
  {label: 'Home', link: '/'},
  {label: 'Logout', link: '/logout'},
  {label: 'Profile', link: '/profile'}
];

export const MENU_FOR_GUEST = [
  {label: 'Home', link: '/'},
  {label: 'Register', link: '/register'},
  {label: 'Login', link: '/login'}
];

export const USERNAME = "username";
export const PASSWORD = "password";
export const FIRST_NAME = "firstName";
export const LAST_NAME = "lastName";
export const EMAIL = "email";

export const getFormField = fieldKey => FORM_FIELDS.get(fieldKey);

const FORM_FIELDS = new Map([
  [FIRST_NAME, new FormFieldBuilder()
    .withName(FIRST_NAME)
    .withPlaceholder("first name")
    .withType("text")
    .withPattern("[A-Za-z]{3,30}")
    .build()
  ],
  [LAST_NAME, new FormFieldBuilder()
    .withName(LAST_NAME)
    .withPlaceholder("last name")
    .withType("text")
    .withPattern("[A-Za-z]{3,30}")
    .build()
  ],
  [EMAIL, new FormFieldBuilder()
    .withName(EMAIL)
    .withPlaceholder("email")
    .withType("email")
    .build()
  ],
  [USERNAME, new FormFieldBuilder()
    .withName(USERNAME)
    .withPlaceholder("username")
    .withType("text")
    .withPattern("[A-Za-z][A-Za-z0-9]{3,14}")
    .build()
  ],
  [PASSWORD, new FormFieldBuilder()
    .withName(PASSWORD)
    .withPlaceholder("password")
    .withType("password")
    .withPattern("[A-Za-z0-9]{6,15}")
    .build()
  ]
]);

const COLORS = ['#EC407A', '#EF5350', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#EF6C00'];

const getRandomElement = array => array[Math.floor(Math.random() * array.length)];

export const addColor = item => {
  return Object.assign(item, {color: getRandomElement(COLORS)})
};
