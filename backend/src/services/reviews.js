import { Review } from "../db/models/Review.js";

export const getCustomerReviews = async (limit = 10) => {
  const reviews = await Review.find()
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .lean();

  const workingPhotos = [
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face&auto=format",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face&auto=format",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face&auto=format",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face&auto=format",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format",
    "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=64&h=64&fit=crop&crop=face&auto=format",
  ];

  const reviewsWithPhotos = reviews.map((review, index) => ({
    ...review,
    photo: review.photo || workingPhotos[index % workingPhotos.length],
  }));

  return reviewsWithPhotos;
};
