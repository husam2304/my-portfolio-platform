import { useEffect } from "react";
import reactGA from "react-ga4";
import { useLocation } from "react-router-dom";

reactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);

export function Analytics() {
    const location = useLocation();
    useEffect(() => {
        reactGA.send({
            hitType: "pageview",
            page: location.pathname + location.search
        });
    }, [location]);
    return null;
}

export default Analytics;