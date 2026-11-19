import { useEffect } from "react";
import {
  RiShoppingCart2Fill,
  RiTimeLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const badgeStyles = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-rose-100 text-rose-700",
};

const Index = () => {
  const { recendOrders, totalOrders, pendingOrders, cancelledOrders } =
    useSelector((state) => state.dashboard);
    const navigate = useNavigate()
  useEffect(() => {
    console.log(totalOrders);
  }, []);

  const stats = [
    {
      label: "Orders",
      value: totalOrders,
      icon: RiShoppingCart2Fill,
      iconBg: "bg-green-100",
      iconColor: "text-green-700",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: RiTimeLine,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-700",
    },
    {
      label: "Cancelled Orders",
      value: cancelledOrders,
      icon: RiCloseCircleLine,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-700",
    },
  ];

  const redirect = (ord) => {
    let item = 0;
    for (let i = 0; i < ord.length; i++) {
      const item = ord.products[i].quantity + item;
    }
    navigate('/payment' , {
      state : {
        item,
        price :ord.price,
        orderId : ord._id
      }
    })

    console.log(ord);
  };
  return (
    <div className="w-full space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md sm:p-5"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBg}`}
            >
              <Icon className={`text-xl ${iconColor}`} />
            </div>
            <div className="flex flex-col text-slate-600">
              <h2 className="text-2xl font-bold leading-tight text-slate-800 sm:text-3xl">
                {value}
              </h2>
              <span className="text-sm">{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5 lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
            Recent Orders
          </h2>
          <Link
            to="/dashboard/orders"
            className="rounded-md px-3 py-1.5 text-sm text-indigo-600 transition hover:bg-indigo-50"
          >
            View all
          </Link>
        </div>

        <div className="-mx-4 overflow-x-auto sm:mx-0">
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
              {recendOrders?.map((order) => (
                <tr key={order.id} className="bg-white hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-800 sm:px-6">
                    {String(order._id).slice(0, 7)}....
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-800 sm:px-6">
                    ${order.price}
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
                        to={`/dashboard/orders/details/${order._id}`}
                        className="rounded-md bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 transition hover:bg-green-200"
                      >
                        View
                      </Link>
                      {order.payment_status !== "paid" && (
                        <span
                          onClick={() => redirect(order)}
                          className="rounded-md cursor-pointer bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-200"
                        >
                          Pay Now
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {recendOrders.length === 0 && (
          <p className="py-6 text-center text-sm text-gray-400">
            No recent orders.
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;
