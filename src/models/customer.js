import { model, Schema } from 'mongoose';

const customerSchema = new Schema(
  {
    photo: {
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
      type: Number,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    registerDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Customer = model('Customer', customerSchema);
