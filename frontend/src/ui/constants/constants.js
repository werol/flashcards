import { FormFieldBuilder } from "../component/forms/FormFieldBuilder";

export const MENU_FOR_USER = [
  {label: 'Home', link: '/'},
  {label: 'Logout', link: '/logout'},
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

const COLORS = ['#ffb3ba', '#ffdfba', '#bae1ff'];

export const getColor = number => COLORS[number % COLORS.length];

export const INDEXED_DB_OBJECT_STORE_NAME = 'flashcardSets';
export const INDEXED_DB_OBJECT_STORE_KEY_PATH = 'setId';

export const FORM_MODE_CREATE = 'CREATE';
export const FORM_MODE_UPDATE = 'UPDATE';

export const OFFLINE = 'OFFLINE';
export const ONLINE = 'ONLINE';
