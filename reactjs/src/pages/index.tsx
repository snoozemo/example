import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/redux/redux.hooks";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { reset } from "@/redux/route.slice";
import service from "@/services";
export default function Index() {
  const { pathname } = useLocation();
  const { data } = useRequest(service.global.getRoutes);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data) {
      dispatch(() => reset(data));
    }
  }, [data]);
  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-400 font-mono">
      <div className="mx-auto mt-10 w-48">
        <h1 className="text-center text-2xl font-bold">react example</h1>
        <div className="mt-5 flex justify-between">
          <Link className="transition-all hover:underline" to="/">
            Home
          </Link>
          <Link className="transition-all hover:underline" to="/about">
            About
          </Link>
        </div>
        <div className="mt-10">
          <motion.div
            key={pathname}
            initial="initial"
            animate="in"
            variants={{
              initial: {
                opacity: 0,
                rotate: 180,
                scale: 1.5,
              },
              in: {
                opacity: 1,
                rotate: 0,
                scale: 1,
              },
              out: {
                opacity: 0,
                rotate: -180,
                scale: 1.5,
              },
            }}
            transition={{
              type: "tween",
              ease: "linear",
              duration: 0.2,
            }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
