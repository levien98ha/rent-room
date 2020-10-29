export class Constants {
  // type success
  public static POPUP_ERROR = 0;
  public static POPUP_SUCCESS = 1;
  public static POPUP_INFOR = 2;
  public static POPUP_CONFIRM = 3;
  public static POPUP_DATE_CUSTOME = 4;

  // type overlay wait
  public static OVERLAY_WAIT_NON_SPIN = false;
  public static OVERLAY_WAIT_SPIN = true;

  public static LANGUAGE_EN = 'en';
  public static LANGUAGE_JP = 'jp';
  public static LANGUAGE_ENJP = 'enjp';

  public static MAX_DAY = 365;
  public static SESSION_NAME = 'jc_session';

  // role
  public static END_USER = 'END_USER';
  public static PACKAGE_TRANSPOT = 'PACKAGE_TRANSPOT';
  public static USER = 'USER';
  public static OPERATOR = 'OPERATOR';
  public static SYSTEM = 'SYSTEM';

  public static PATH_PAGE_DEVELOPMENT = '/page-development';

  public static PATH_PROFILE = '/profile';
  public static PATH_CHANGE_PASS = '/change-pass';

  public static PATH_OPERATOR_VEHICLE_DETAILS = '/manage/vehicle-details/:id';
  public static PATH_OPERATOR_VEHICLE_REGISTRATION = '/manage/vehicle-registration';
  public static PATH_OPERATOR_MYPAGE = '/manage/mypage';
  public static PATH_OPERATOR_MATTER = '/manage/matter';
  public static PATH_OPERATOR_EXPORT = '/manage/export';
  public static PATH_OPERATOR_INVOICE = '/manage/invoice';
  public static PATH_OPERATOR_TRANSPORT = '/manage/transport';
  public static PATH_OPERATOR_INVOICE_DETAIL = '/manage/invoice-detail';
  public static PATH_OPERATOR_TRANSPORTATION_COMPANIES = '/manage/transportation-companies';

  public static PATH_USER_MYPAGE = '/user/mypage';
  public static PATH_TRANSFORM_COMPANY_TRANSFORM = '/transform_company/transform';
  public static PATH_TRANSFORM_COMPANY_TRANSFORM_DETAIL = '/transform_company/transform-detail';
  public static PATH_END_USER = '/end-user';

  public static PATH_PAGE_NOTE_FOUND = '/page-not-found';
  public static PATH_LOGIN = '/login';
  public static PATH_FORGET_PASSWORD = '/forget-password';

  public static AVATAR_DEFAULT = '../../../assets/img/logo/user.png';

  public static PATHS_TEMPLATE = ['/form', '/test', '/button', '/color', '/data-table', '/overlay', '/user'];
  public static PATHS_ACCESS_OPERATOR = [
    Constants.PATH_OPERATOR_MYPAGE,
    Constants.PATH_OPERATOR_MATTER,
    Constants.PATH_OPERATOR_TRANSPORT,
    Constants.PATH_OPERATOR_EXPORT,
    Constants.PATH_OPERATOR_INVOICE,
    Constants.PATH_OPERATOR_INVOICE_DETAIL,
    Constants.PATH_CHANGE_PASS,
    Constants.PATH_OPERATOR_TRANSPORTATION_COMPANIES,
    Constants.PATH_PROFILE,
    Constants.PATH_OPERATOR_VEHICLE_DETAILS,
    Constants.PATH_OPERATOR_VEHICLE_REGISTRATION,
    ...Constants.PATHS_TEMPLATE
  ];

  public static PATHS_ACCESS_USER = [
    Constants.PATH_USER_MYPAGE,
    Constants.PATH_PROFILE,
    Constants.PATH_CHANGE_PASS,
    ...Constants.PATHS_TEMPLATE
  ];

  public static PATHS_ACCESS_TRANSFORM_COMPANY = [
    Constants.PATH_TRANSFORM_COMPANY_TRANSFORM,
    Constants.PATH_PROFILE,
    Constants.PATH_CHANGE_PASS,
    Constants.PATH_TRANSFORM_COMPANY_TRANSFORM_DETAIL,
    ...Constants.PATHS_TEMPLATE
  ];

  public static PATHS_ACCESS_END_USER = [
    ...Constants.PATHS_TEMPLATE,
    Constants.PATH_END_USER
  ];
}
