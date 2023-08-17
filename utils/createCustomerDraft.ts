import { FormGroups } from '@/types/enums';
import { customerDraft } from '@/types/interface';

export const createCustomerDraft = (inputValues: Record<string, Record<string, string | boolean>>): customerDraft => {
  return {
    email: inputValues[FormGroups.CUSTOMER].email as string,
    firstName: inputValues[FormGroups.CUSTOMER].firstName as string,
    lastName: inputValues[FormGroups.CUSTOMER].lastName as string,
    password: inputValues[FormGroups.CUSTOMER].password as string,
    addresses: [
      {
        phone: inputValues[FormGroups.SHIPPING_ADDRESS].phone as string,
        country: inputValues[FormGroups.SHIPPING_ADDRESS].country as string,
        city: inputValues[FormGroups.SHIPPING_ADDRESS].city as string,
        streetName: inputValues[FormGroups.SHIPPING_ADDRESS].streetName as string,
        building: inputValues[FormGroups.SHIPPING_ADDRESS].building as string,
        apartment: inputValues[FormGroups.SHIPPING_ADDRESS].apartment as string,
        postalCode: inputValues[FormGroups.SHIPPING_ADDRESS].postalCode as string,
      },
      {
        phone: inputValues[FormGroups.BILLING_ADDRESS].phone as string,
        country: inputValues[FormGroups.BILLING_ADDRESS].country as string,
        city: inputValues[FormGroups.BILLING_ADDRESS].city as string,
        streetName: inputValues[FormGroups.BILLING_ADDRESS].streetName as string,
        building: inputValues[FormGroups.BILLING_ADDRESS].building as string,
        apartment: inputValues[FormGroups.BILLING_ADDRESS].apartment as string,
        postalCode: inputValues[FormGroups.BILLING_ADDRESS].postalCode as string,
      },
    ],
    shippingAddressIds: [0],
    billingAddressIds: [1],
    defaultShippingAddress: inputValues[FormGroups.SHIPPING_ADDRESS].default ? 0 : null,
    defaultBillingAddress: inputValues[FormGroups.BILLING_ADDRESS].default ? 1 : null,
  };
};
