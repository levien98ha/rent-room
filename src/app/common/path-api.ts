export class PathAPI {
  public static ApplicationProperties = 'http://localhost:3000/';

  // USER
  public static PATH_LOG_IN = PathAPI.ApplicationProperties.concat('users/me/login');
  public static PATH_LOG_OUT = PathAPI.ApplicationProperties.concat('users/me/logout');
  public static PATH_RESET_PASSWORD = PathAPI.ApplicationProperties.concat('users/reset/password');
  public static PATH_USERS = PathAPI.ApplicationProperties.concat('users');
  public static PATH_LIST_USER = PathAPI.ApplicationProperties.concat('users/list');
  public static PATH_USER_PROFILE = PathAPI.ApplicationProperties.concat('users/profile');
  public static PATH_CHANGE_PASS = PathAPI.ApplicationProperties.concat('users/password');
  public static PATH_DELETE_USER = PathAPI.ApplicationProperties.concat('user/delete');
  public static PATH_CREATE_USER_ADMIN = PathAPI.ApplicationProperties.concat('admin/users');
  public static PATH_LIST_USER_REQUEST = PathAPI.ApplicationProperties.concat('users/request');

  // ROOM
  public static PATH_ROOM = PathAPI.ApplicationProperties.concat('room');
  public static PATH_ROOM_ID = PathAPI.ApplicationProperties.concat('room/id');
  public static PATH_LIST_ROOM = PathAPI.ApplicationProperties.concat('room/list');
  public static PATH_RECENTLY_ROOM = PathAPI.ApplicationProperties.concat('room/recently');
  public static PATH_SEARCH_ROOM = PathAPI.ApplicationProperties.concat('room/search');
  public static PATH_SEARCH_SAME_ROOM = PathAPI.ApplicationProperties.concat('room/search/same');
  public static PATH_LIST_ROOM_CUSTOMER = PathAPI.ApplicationProperties.concat('user/room');
  public static PATH_DELETE_ROOM = PathAPI.ApplicationProperties.concat('room/delete');
  public static PATH_LIST_ROOM_UNAVAILABLE = PathAPI.ApplicationProperties.concat('room/unvailable');

  // REQUEST
  public static PATH_REQUEST = PathAPI.ApplicationProperties.concat('request');
  public static PATH_LIST_REQUEST_SEND = PathAPI.ApplicationProperties.concat('request/send');
  public static PATH_LIST_REQUEST_RECEIVE = PathAPI.ApplicationProperties.concat('request/receive');
  public static PATH_LIST_REQUEST_USER = PathAPI.ApplicationProperties.concat('request/user');

  // MARKS ROOM
  public static PATH_MARK = PathAPI.ApplicationProperties.concat('mark');
  public static PATH_LIST_MARK = PathAPI.ApplicationProperties.concat('mark/list');

  // INVOICE
  public static PATH_INVOICE = PathAPI.ApplicationProperties.concat('invoice');
  public static PATH_LIST_INVOCIE = PathAPI.ApplicationProperties.concat('invoice/list');
  public static PATH_INVOICE_ID = PathAPI.ApplicationProperties.concat('invoice/id');
  public static PATH_DOWNLOAD_INVOCIE = PathAPI.ApplicationProperties.concat('invoice/download');
  public static PATH_DELETE_INVOCIE = PathAPI.ApplicationProperties.concat('invoice/delete');

  // INVOICE
  public static PATH_CATEGORY = PathAPI.ApplicationProperties.concat('category');
}
