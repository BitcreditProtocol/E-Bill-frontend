export type Notification = {
  id: string;
  notification_type: string;
  reference_id: string;
  description: string;
  datetime: string;
  active: boolean;
  payload: {
    action_type: string;
    bill_id: string;
  };
};
