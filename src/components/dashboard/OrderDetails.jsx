import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { get_detailsOrder } from "../../store/Reducers/orderReducer";

const OrderDetails = () => {
  const { orderId } = useParams();
  console.log(orderId);
  const dispatch = useDispatch();
  const { detailsOrder } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(get_detailsOrder(orderId));

    console.log("detailsOrder", detailsOrder);
  }, [dispatch, orderId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Order Details</h2>
          <p className="mt-1 text-sm text-slate-500">
            Order ID: #ORD-{detailsOrder._id}
          </p>
        </div>

        <Link
          to="/dashboard/myorders"
          className="w-fit rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Back to Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <p className="text-sm text-slate-500">Order Status</p>
          <span className="mt-3 inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
            {detailsOrder.delivery_status}
          </span>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <p className="text-sm text-slate-500">Payment Status</p>
          <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {detailsOrder.payment_status}
          </span>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <p className="text-sm text-slate-500">Order Date</p>
          <p className="mt-3 text-sm font-semibold text-slate-800">
            {detailsOrder?.createdAt}
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <h3 className="mb-5 text-lg font-semibold text-slate-800">
          Customer Information
        </h3>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-400">Full Name</p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              {detailsOrder.shippingInfo?.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Email Address</p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              {detailsOrder.shippingInfo?.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Phone Number</p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              {detailsOrder.shippingInfo?.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Payment Method</p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              Cash on Delivery
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <h3 className="mb-5 text-lg font-semibold text-slate-800">
          Shipping Address
        </h3>

        <div className="space-y-2 text-sm text-slate-600">
          <p>province : {detailsOrder.shippingInfo?.province}</p>
          <p>post : {detailsOrder.shippingInfo?.post}</p>
          <p>address : {detailsOrder.shippingInfo?.address}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-100">
        <div className="border-b border-slate-100 p-5">
          <h3 className="text-lg font-semibold text-slate-800">Order Items</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Quantity</th>
                <th className="px-5 py-4">Total</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {detailsOrder?.products?.map((p, i) => (
                <tr key={i}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt="Product"
                        className="h-12 w-12 rounded-md object-cover"
                      />
                      <span className="font-medium text-slate-700">
                        {p.name}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    {p.discount ? (
                      <div className="flex flex-col gap-0.5 mt-5">
                        ${p.price - Math.floor((p.price * p.discount) / 100)}
                        <p className="line-through">$ {p.price}</p>
                        <span className="text-red-500">-%{p.discount}</span>
                      </div>
                    ) : (
                      <span>
                        <p>$ {p.price}</p>
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">{p.quantity}</td>
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                    $
                    {(
                      (p.price - Math.floor((p.price * p.discount) / 100)) *
                      p.quantity
                    ).toLocaleString()}{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end border-t border-slate-100 p-5">
          <div className="w-full space-y-3 sm:w-64">
            <div className="flex justify-between text-sm text-slate-500">
              <span>Subtotal</span>
              <span>${detailsOrder.price}</span>
            </div>

            <div className="flex justify-between text-sm text-slate-500">
              <span>Shipping</span>
              <span>${detailsOrder.shipping}</span>
            </div>

            <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-800">
              <span>Total</span>
              <span className="text-green-600">${detailsOrder.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
