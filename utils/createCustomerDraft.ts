import { FormGroups } from '@/types/enums';
import { customerDraft } from '@/types/interface';

export const createCustomerDraft = (inputValues: Record<string, Record<string, string>>): customerDraft => {
  return {
    email: inputValues[FormGroups.CUSTOMER].email,
    firstName: inputValues[FormGroups.CUSTOMER].firstName,
    lastName: inputValues[FormGroups.CUSTOMER].lastName,
    password: inputValues[FormGroups.CUSTOMER].password,
    addresses: [
      {
        phone: inputValues[FormGroups.SHIPPING_ADDRESS].phone,
        country: inputValues[FormGroups.SHIPPING_ADDRESS].country,
        city: inputValues[FormGroups.SHIPPING_ADDRESS].city,
        streetName: inputValues[FormGroups.SHIPPING_ADDRESS].streetName,
        building: inputValues[FormGroups.SHIPPING_ADDRESS].building,
        apartment: inputValues[FormGroups.SHIPPING_ADDRESS].apartment,
        postalCode: inputValues[FormGroups.SHIPPING_ADDRESS].postalCode,
      },
      {
        phone: inputValues[FormGroups.BILLING_ADDRESS].phone,
        country: inputValues[FormGroups.BILLING_ADDRESS].country,
        city: inputValues[FormGroups.BILLING_ADDRESS].city,
        streetName: inputValues[FormGroups.BILLING_ADDRESS].streetName,
        building: inputValues[FormGroups.BILLING_ADDRESS].building,
        apartment: inputValues[FormGroups.BILLING_ADDRESS].apartment,
        postalCode: inputValues[FormGroups.BILLING_ADDRESS].postalCode,
      },
    ],
    shippingAddressIds: [0],
    billingAddressIds: [1],
  };
};
