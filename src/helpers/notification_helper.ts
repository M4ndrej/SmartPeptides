import { citiesData, namesData } from "@/data/notifications_data";

import { generateRandomNumber } from "./generate_random_number";
import { NotificationData } from "@/types/notifications";
import { ProductList } from "@/types/product";
import { getComProductSlug } from "./product_helper";

export const createRandomNotification = (
  allProducts: ProductList
): NotificationData | undefined => {
  if (!allProducts || !allProducts.length) return;

  const randomProductIndex = generateRandomNumber(0, allProducts.length - 1);
  const notificationType = ["purchase", "seeing"][generateRandomNumber(0, 1)];

  const randomProduct = allProducts[randomProductIndex];

  const [topMessage, bottomMessage] =
    notificationType == "purchase"
      ? createPurchaseMessages()
      : createSeeingMessages();

  const randomNotification: NotificationData = {
    topMessage,
    bottomMessage,
    productId: randomProduct.id,
    productName: randomProduct.name,
    productLink: `/${getComProductSlug(randomProduct)}`,
    productImages: randomProduct.images.map((image) => image.src),
  };
  return randomNotification;
};

const createPurchaseMessages = () => {
  const randomCityIndex = generateRandomNumber(0, citiesData.length - 1);
  const randomCity = citiesData[randomCityIndex];

  const randomNameIndex = generateRandomNumber(0, namesData.length - 1);
  const randomName = namesData[randomNameIndex];

  const randomTimeUnit = ["hours", "minutes"][generateRandomNumber(0, 1)];
  const randomTime = generateRandomNumber(
    1,
    randomTimeUnit == "hours" ? 23 : 59
  );

  const topMessage = `${randomName} in ${randomCity} purchased a`;
  const bottomMessage = `About ${randomTime} ${randomTimeUnit} ago`;
  return [topMessage, bottomMessage];
};

const createSeeingMessages = () => {
  const randomPeopleCount = generateRandomNumber(3, 15);
  const bottomMessage = `${randomPeopleCount} people seeing this product right now`;
  return ["", bottomMessage];
};
