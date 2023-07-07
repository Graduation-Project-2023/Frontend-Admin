export const TransactionData = [
  {
    id: 1,
    name: "amount_cents",
    label: "payment.amount",
  },
  {
    id: 2,
    name: "created_at",
    label: "payment.created_at",
    time: true,
  },
  {
    id: 15,
    name: "type",
    label: "payment.type",
    enum: true,
  },
  {
    id: 3,
    name: "source",
    label: "payment.source",
  },
  {
    id: 4,
    name: "success",
    label: "payment.success",
    enum: true,
  },
  {
    id: 5,
    name: "is_3d_secure",
    label: "payment.secure",
    enum: true,
  },
  {
    id: 6,
    name: "is_voided",
    label: "payment.isVoid",
    enum: true,
  },
  {
    id: 7,
    name: "is_refunded",
    label: "payment.isRefunded",
    enum: true,
  },
  {
    id: 8,
    name: "routing_bank",
    label: "payment.routingBank",
  },
  {
    id: 9,
    name: "card_holder_bank",
    label: "payment.cardHolderBank",
  },
  {
    id: 10,
    name: "subType",
    label: "payment.cardType",
  },
  {
    id: 11,
    name: "orderId",
    label: "payment.orderId",
  },
  {
    id: 12,
    name: "is_standalone_payment",
    label: "payment.isStandalone",
    enum: true,
  },
];
