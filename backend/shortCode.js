import { UniqueCharOTP, UniqueOTP } from "unique-string-generator";

export default function getShortCode(url) {
  const randomCode = UniqueCharOTP(4).toLowerCase() + UniqueOTP(4);
  return randomCode;
}
