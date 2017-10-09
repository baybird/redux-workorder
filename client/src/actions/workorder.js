// Action type
export const DIALOG_OPEN_ORDER    = 'DIALOG_OPEN_ORDER';
export const DIALOG_UPDATE_ORDER  = 'DIALOG_UPDATE_ORDER';
export const REFRESH_ORDER_LIST   = 'REFRESH_ORDER_LIST';

export const CLOSE_DIALOG         = 'CLOSE_DIALOG';
export const SEARCH_ORDER         = 'SEARCH_ORDER';

// Action creator
export function dialogOpenOrder(orderID, authenticated){
  return {
    type: DIALOG_OPEN_ORDER,
    orderID: orderID,
    authenticated: authenticated
  };
}

export function closeDialog(authenticated){
  return {
    type: CLOSE_DIALOG,
    authenticated: authenticated
  };
}

export function dialogUpdateOrder(orderID){
  return {
    type: DIALOG_UPDATE_ORDER,
    orderID: orderID
  };
}

export function refreshOrderList(authenticated){
  return {
    type: REFRESH_ORDER_LIST,
    authenticated: authenticated
  }
}

export function search(keyword, status, authenticated){
  return {
    type: SEARCH_ORDER,
    keyword:keyword,
    status:status,
    authenticated: authenticated
  }
}
