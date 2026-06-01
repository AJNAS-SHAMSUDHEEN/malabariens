export const WHATSAPP_NUMBER = "919946605923";
export const PRICE_PER_UNIT = 50;

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  quantity: number;
  notes?: string;
}

export function buildWhatsAppURL(order: OrderDetails): string {
  const total = order.quantity * PRICE_PER_UNIT;
  const message = `Hello MALABARIANS,

I would like to order:

🛍️ *Product:* Instant Avil Milk Mix (Banana & Cardamom)
📦 *Quantity:* ${order.quantity} packet${order.quantity > 1 ? "s" : ""}
💰 *Total Amount:* ₹${total}

👤 *Customer Name:* ${order.name}
📞 *Phone Number:* ${order.phone}
🏠 *Delivery Address:* ${order.address}${order.notes ? `\n📝 *Notes:* ${order.notes}` : ""}

Please confirm my order. Thank you! 🙏`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildSimpleWhatsAppURL(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello MALABARIANS, I am interested in ordering Instant Avil Milk Mix. Please share details.")}`;
}
