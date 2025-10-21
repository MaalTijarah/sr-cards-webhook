export class SendWebhookNotificationDto {
  to: string;
  callbackType: string;
  payload: string;
  receivedAt: string;
}
