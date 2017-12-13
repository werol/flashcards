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
