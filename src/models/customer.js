import { model, Schema } from 'mongoose';

const customerSchema = new Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    spent: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    register_date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

customerSchema.index({ name: 1 });

export const Customer = model('Customer', customerSchema);
