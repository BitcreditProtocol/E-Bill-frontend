export type NotificationActionType = "BuyBill" | "RecourseBill" | "AcceptBill" | "PayBill" | "CheckBill" | "CheckQuote";

export type Notification = {
  id: string;
  node_id: string;
  notification_type: string;
  reference_id: string;
  description: string;
  datetime: string;
  active: boolean;
  payload: {
    action_type: NotificationActionType;
    bill_id: string;
    sum?: number;
  };
};
