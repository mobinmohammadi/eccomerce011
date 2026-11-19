  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { Link, useParams } from "react-router";
  import { get_orders } from "../../store/Reducers/orderReducer";

  // const ordersData = [
  //   {
  //     id: "#344",
  //     price: "$233",
  //     paymentStatus: "pending",
  //     orderStatus: "pending",
  //   },
  //   {
  //     id: "#345",
  //     price: "$120",
  //     paymentStatus: "paid",
  //     orderStatus: "placed",
  //   },
  //   {
  //     id: "#346",
  //     price: "$89",
  //     paymentStatus: "paid",
  //     orderStatus: "warehouse",
  //   },
  //   {
  //     id: "#347",
  //     price: "$410",
  //     paymentStatus: "refunded",
  //     orderStatus: "cancelled",
  //   },
  // ];

  const badgeStyles = {
    pending: "bg-amber-100 text-amber-700",
    paid: "bg-green-100 text-green-700",
    refunded: "bg-rose-100 text-rose-700",
    placed: "bg-indigo-100 text-indigo-700",
    warehouse: "bg-sky-100 text-sky-700",
    cancelled: "bg-rose-100 text-rose-700",
  };

  const Orders = () => {
    const [status, setStatus] = useState("all");

    const dispatch = useDispatch();
    // const { orderId } = useParams();
    const { userInfo } = useSelector((state) => state.auth);
    const { myOrders, loader } = useSelector((state) => state.orders);

    useEffect(() => {
      dispatch(
        get_orders({
          status,
          customerId: userInfo.id,
        }),
      );
    }, []);

    const filteredOrders =
      status === "all"
        ? myOrders
        : myOrders.filter((o) => o.delivery_status === status);

    return (
      <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5 lg:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-slate-700 sm:text-xl">
            My Orders
          </h2>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:w-auto"
          >
            <option value="all">-- Order Status --</option>
            <option value="placed">Placed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="warehouse">Warehouse</option>
          </select>
        </div>

        {/* ===== Table ===== */}
        <div className="mt-4 -mx-4 overflow-x-auto sm:mx-0">
          <table className="min-w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 font-medium sm:px-6">
                  Order ID
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-medium sm:px-6">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-medium sm:px-6">
                  Payment Status
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-medium sm:px-6">
                  Order Status
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-medium sm:px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loader
                ? "loading...."
                : filteredOrders.map((order) => (
                    <tr key={order.id} className="bg-white hover:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-800 sm:px-6">
                        {order._id.slice(0, 7)}...
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-800 sm:px-6">
                        $ {order.price.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                            badgeStyles[order.payment_status] ??
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                            badgeStyles[order.delivery_status] ??
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {order.delivery_status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/dashboard/order-details/${order._id}`}
                            className="rounded-md bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 transition hover:bg-green-200"
                          >
                            View
                          </Link>
                          {order.paymentStatus === "pending" && (
                            <Link
                              to={`/dashboard/orders/${order.id.replace("#", "")}/pay`}
                              className="rounded-md bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-200"
                            >
                              Pay Now
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">
            No orders found with this status.
          </p>
        )}
      </div>
    );
  };

  export default Orders;
