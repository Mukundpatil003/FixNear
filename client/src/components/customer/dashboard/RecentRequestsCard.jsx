import {
  Wrench,
  Zap,
  Paintbrush,
  Scissors,
} from "lucide-react";

const iconMap = {
  plumber: Wrench,
  electrician: Zap,
  painter: Paintbrush,
  salon: Scissors,
};

const statusColor = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const RecentRequestsCard = ({ requests = [] }) => {

  return (

    <div className="rounded-[32px] bg-white p-8 shadow-lg">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-4xl font-bold">

          Recent Requests

        </h2>

        <button className="font-semibold text-indigo-600">

          View All

        </button>

      </div>

      <div className="space-y-5">

        {requests.length === 0 ? (

          <div className="py-16 text-center text-gray-500">

            No Recent Requests

          </div>

        ) : (

          requests.map((request) => {

            const Icon =
              iconMap[
                request.service?.toLowerCase()
              ] || Wrench;

            return (

              <div
                key={request._id}
                className="flex items-center justify-between rounded-3xl border border-gray-100 p-5 transition hover:bg-slate-50"
              >

                <div className="flex items-center gap-5">

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">

                    <Icon
                      size={28}
                      className="text-indigo-600"
                    />

                  </div>

                  <div>

                    <h3 className="text-xl font-semibold">

                      {request.service}

                    </h3>

                    <p className="mt-1 text-gray-500">

                      {new Date(
                        request.createdAt
                      ).toLocaleDateString()}

                    </p>

                  </div>

                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    statusColor[
                      request.status
                    ] ||
                    "bg-gray-100 text-gray-600"
                  }`}
                >

                  {request.status}

                </span>

              </div>

            );

          })

        )}

      </div>

    </div>

  );

};

export default RecentRequestsCard;