import { useSelector } from "react-redux";

export default function Cart() {
  const cart = useSelector((state: any) => state.cart.items);

  const total = cart.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Check Out:</h1>

      {cart.map((item: any) => (
        <div key={item.id} className="border p-2 mb-2">
          <p>{item.title}</p>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}

      <h2 className="mt-4 font-bold">Total: ${total}</h2>
    </div>
  );
}
