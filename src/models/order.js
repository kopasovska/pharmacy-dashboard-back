import { model, Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    products: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        'Confirmed',
        'Pending',
        'Shipped',
        'Delivered',
        'Completed',
        'Canceled',
      ],
      default: 'Confirmed',
    },
    order_date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

orderSchema.index({ name: 1 });

export const Order = model('Order', orderSchema);
