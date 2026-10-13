import { DocumentType, OrderType, PaymentMethod, type CreatedOrder } from '@noname/types';
import { roundMoney } from '@noname/domain';
import { useState } from 'react';
import { applyKeypadKey } from '@/lib/applyKeypadKey';
import { CheckoutStep } from '@/types/CheckoutStep';
import { useCreateOrder } from './useCreateOrder';
import type { OrderCart } from './useOrderCart';

const RUC_PATTERN = /^(10|20)\d{9}$/;

export const useCheckout = (cart: OrderCart) => {
  const createOrder = useCreateOrder();
  const [step, setStep] = useState(CheckoutStep.Order);
  const [orderType, setOrderType] = useState(OrderType.DineIn);
  const [documentType, setDocumentType] = useState(DocumentType.Boleta);
  const [customerDocument, setCustomerDocument] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.Cash);
  const [tendered, setTendered] = useState('');
  const [completed, setCompleted] = useState<CreatedOrder | null>(null);

  const isCash = paymentMethod === PaymentMethod.Cash;
  const tenderedAmount = Number(tendered) || 0;
  const change = roundMoney(tenderedAmount - cart.total);
  const documentIsValid = documentType !== DocumentType.Factura || RUC_PATTERN.test(customerDocument);
  const canConfirm = cart.lines.length > 0 && documentIsValid && (!isCash || change >= 0) && !createOrder.isPending;

  const confirm = () =>
    createOrder.mutate(
      {
        orderType,
        documentType,
        customerDocument,
        paymentMethod,
        amountTendered: isCash ? tenderedAmount : null,
        lines: cart.lines.map((line) => ({ menuItemId: line.menuItemId, quantity: line.quantity, selectedOptionIds: line.selection })),
      },
      {
        onSuccess: (order) => {
          setCompleted(order);
          setStep(CheckoutStep.Done);
        },
      },
    );

  const startNewOrder = () => {
    cart.clear();
    createOrder.reset();
    setCompleted(null);
    setTendered('');
    setCustomerDocument('');
    setStep(CheckoutStep.Order);
  };

  return {
    step,
    goToPayment: () => cart.lines.length > 0 && setStep(CheckoutStep.Payment),
    backToOrder: () => setStep(CheckoutStep.Order),
    orderType,
    setOrderType,
    documentType,
    setDocumentType,
    customerDocument,
    setCustomerDocument,
    paymentMethod,
    setPaymentMethod,
    isCash,
    tendered,
    pressTenderKey: (key: string) =>
      setTendered((current) => applyKeypadKey(current, key, { allowDecimal: true, maxDecimals: 2, maxLength: 8 })),
    setTenderedAmount: (amount: number) => setTendered(amount.toFixed(2)),
    change,
    canConfirm,
    confirm,
    createOrder,
    completed,
    startNewOrder,
  };
};

export type CheckoutState = ReturnType<typeof useCheckout>;
