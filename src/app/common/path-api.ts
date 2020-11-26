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

  // ROOM
  public static PATH_ROOM = PathAPI.ApplicationProperties.concat('room');
  public static PATH_LIST_ROOM = PathAPI.ApplicationProperties.concat('room/list');
  public static PATH_RECENTLY_ROOM = PathAPI.ApplicationProperties.concat('room/recently');
  public static PATH_SEARCH_ROOM = PathAPI.ApplicationProperties.concat('room/search');
  public static PATH_SEARCH_SAME_ROOM = PathAPI.ApplicationProperties.concat('room/search/same');
  public static PATH_LIST_ROOM_CUSTOMER = PathAPI.ApplicationProperties.concat('user/room');
  public static PATH_DELETE_ROOM = PathAPI.ApplicationProperties.concat('room/delete');

  // REQUEST
  public static PATH_REQUEST = PathAPI.ApplicationProperties.concat('request');
  public static PATH_LIST_REQUEST_SEND = PathAPI.ApplicationProperties.concat('request/send');
  public static PATH_LIST_REQUEST_RECEIVE = PathAPI.ApplicationProperties.concat('request/receive');

  // MARKS ROOM
  public static PATH_MARK = PathAPI.ApplicationProperties.concat('mark');
  public static PATH_LIST_MARK = PathAPI.ApplicationProperties.concat('mark/list');

  // INVOICE
  public static PATH_INVOICE = PathAPI.ApplicationProperties.concat('invoice');
  public static PATH_LIST_INVOCIE = PathAPI.ApplicationProperties.concat('invoice/list');

  // INVOICE
  public static PATH_CATEGORY = PathAPI.ApplicationProperties.concat('category');
}
