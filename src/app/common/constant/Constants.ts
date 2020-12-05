export class Constants {
  // type success
  public static POPUP_ERROR = 0;
  public static POPUP_SUCCESS = 1;
  public static POPUP_INFOR = 2;
  public static POPUP_CONFIRM = 3;
  public static POPUP_DATE_CUSTOME = 4;

  public static SESSION = 'session';
  public static SAVE_INVOICE = 'saveInvoice';

  // type overlay wait
  public static OVERLAY_WAIT_NON_SPIN = false;
  public static OVERLAY_WAIT_SPIN = true;

  public static LANGUAGE_EN = 'en';
  public static LANGUAGE_JP = 'jp';
  public static LANGUAGE_ENJP = 'enjp';

  public static MAX_DAY = 365;
  public static SESSION_NAME = 'jc_session';

  // role
  public static USER = 'user';
  public static OPERATOR = 'operator';
  public static ADMIN = 'admin';

  public static PATH_PAGE_DEVELOPMENT = '/page-development';

  public static PATH_PROFILE = '/profile';
  public static PATH_CHANGE_PASS = '/change-pass';

  public static PATH_ADMIN_MYPAGE = '/manage';

  public static PATH_OPERATOR_MYPAGE = '/manage';

  public static PATH_USER_MYPAGE = '/home';

  public static PATHS_TEMPLATE = ['/home', '/login', '/room', '/room/:id'];

  public static PATH_LOGIN = '/login';

  public static AVATAR_DEFAULT = '../../../assets/img/logo/user.png';

  public static PATHS_ACCESS_OPERATOR = [
    Constants.PATH_OPERATOR_MYPAGE,
    Constants.PATH_CHANGE_PASS,
    ...Constants.PATHS_TEMPLATE
  ];

  public static PATHS_ACCESS_USER = [
    Constants.PATH_USER_MYPAGE,
    Constants.PATH_PROFILE,
    ...Constants.PATHS_TEMPLATE
  ];

  public static PATHS_ACCESS_END_USER = [
    ...Constants.PATHS_TEMPLATE
  ];
}
