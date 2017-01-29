// Action type
export const DIALOG_OPEN_ORDER    = 'DIALOG_OPEN_ORDER';
export const DIALOG_UPDATE_ORDER  = 'DIALOG_UPDATE_ORDER';
export const REFRESH_ORDER_LIST   = 'REFRESH_ORDER_LIST';

export const CLOSE_DIALOG         = 'CLOSE_DIALOG';
export const SEARCH_ORDER         = 'SEARCH_ORDER';

// Action creator
export function dialogOpenOrder(orderID){
  // console.log('1) action recevied open dialog - orderID:' + orderID)

  return {
    type: DIALOG_OPEN_ORDER,
    orderID: orderID
  };
}

export function closeDialog(){
  // console.log('1) action recevied close dialog')

  return {
    type: CLOSE_DIALOG
  };
}

export function dialogUpdateOrder(orderID){
  // console.log('1) action recevied update dialog - orderID:' + orderID)

  return {
    type: DIALOG_UPDATE_ORDER,
    orderID: orderID
  };
}

export function refreshOrderList(){
  // console.log('1) action recevied refresh list')
  return {
    type: REFRESH_ORDER_LIST
  }
}

export function search(keyword, status){
  // console.log('2) action recevied for search order')
  // console.log(keyword+ ", "+status);

  return {
    type: SEARCH_ORDER,
    keyword:keyword,
    status:status
  }
}