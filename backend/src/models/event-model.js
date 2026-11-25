import mongoose from "mongoose";

function parseDateGGAAYYYY(value) {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? new Date("Invalid Date") : value;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(trimmed);
    if (!match) {
      return new Date("Invalid Date");
    }

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return new Date("Invalid Date");
    }

    const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) {
      return new Date("Invalid Date");
    }

    return date;
  }

  return new Date("Invalid Date");
}

function formatGGAAYYYY(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return date;
  }

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = String(date.getUTCFullYear());

  return `${day}-${month}-${year}`;
}

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Başlık zorunludur"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Kategori zorunludur"],
      trim: true,
      enum: {
        values: [
          "Akademik",
          "Kültür",
          "Spor",
          "Kulüp",
          "Kariyer",
          "Seminer",
          "Atölye",
          "Konferans",
          "Diğer",
        ],
        message: "{VALUE} geçerli bir kategori değil",
      },
    },
    date: {
      type: Date,
      required: [true, "Tarih zorunludur"],
      set: parseDateGGAAYYYY,
      get: formatGGAAYYYY,
    },
    time: {
      type: String,
      default: "09:00",
      trim: true,
    },
    location: {
      type: String,
      default: "Kampüs",
      trim: true,
    },
    capacity: {
      type: Number,
      default: 50,
      min: [1, "Kapasite en az 1 olmalı"],
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;