import React, {useState} from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservation from "../reservations/NewReservation";
import SeatReservation from "../reservations/SeatReservation";
import NewTable from "../tables/NewTable";
import { today } from "../utils/date-time";


/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState(today());
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route exact path="/reservations/new">
        <NewReservation setDate={setDate} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} setDate={setDate} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
